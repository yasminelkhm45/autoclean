"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  computeTotal,
  formatPrice,
  formulas,
  options,
  vehicleCategories,
  type FormulaId,
  type OptionId,
  type VehicleId,
} from "@/content/offre";
import { site } from "@/content/site";
import { frPhoneRegex } from "@/lib/validation";
import { OptionIcon } from "@/components/ui/OptionIcon";

/* ------------------------------------------------------------------ */
/*  État du tunnel : synchronisé avec l'URL + sessionStorage           */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "autoclean-reservation";
const stepLabels = ["Véhicule", "Formule", "Options", "Récapitulatif", "Coordonnées"] as const;

interface ContactFields {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  contactPreference: "appel" | "sms" | "";
  message: string;
  consent: boolean;
}

const emptyContact: ContactFields = {
  lastName: "",
  firstName: "",
  phone: "",
  email: "",
  contactPreference: "",
  message: "",
  consent: false,
};

const isVehicle = (v: string | null): v is VehicleId =>
  vehicleCategories.some((x) => x.id === v);
const isFormula = (v: string | null): v is FormulaId => formulas.some((x) => x.id === v);
const parseOptions = (v: string | null): OptionId[] =>
  (v ?? "")
    .split(",")
    .filter((id): id is OptionId => options.some((o) => o.id === id));

export function Funnel() {
  const router = useRouter();
  const params = useSearchParams();

  const vehicle = isVehicle(params.get("vehicule")) ? (params.get("vehicule") as VehicleId) : null;
  const formula = isFormula(params.get("formule")) ? (params.get("formule") as FormulaId) : null;
  const selectedOptions = parseOptions(params.get("options"));
  const rawStep = Number(params.get("etape") ?? "1");

  /* Étape maximale atteignable selon la saisie : progression jamais en avant sur une étape non validée. */
  const maxStep = !vehicle ? 1 : !formula ? 2 : 5;
  const step = Math.min(Math.max(1, Number.isFinite(rawStep) ? rawStep : 1), maxStep);

  const [contact, setContact] = useState<ContactFields>(emptyContact);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const restored = useRef(false);

  /* Restauration sessionStorage : URL prioritaire, stockage en secours. */
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<ContactFields> & { query?: string };
      setContact((c) => ({ ...c, ...saved, consent: false }));
      if (!params.get("vehicule") && saved.query) {
        router.replace(`/reservation?${saved.query}`, { scroll: false });
      }
    } catch {
      /* stockage illisible : on repart de zéro */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Sauvegarde continue (hors consentement, redemandé à chaque envoi). */
  useEffect(() => {
    const { consent: _consent, ...rest } = contact;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...rest, query: params.toString() }));
    } catch {
      /* stockage plein ou bloqué : non bloquant */
    }
  }, [contact, params]);

  const setQuery = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === "") next.delete(k);
        else next.set(k, v);
      }
      router.push(`/reservation?${next.toString()}`, { scroll: false });
    },
    [params, router]
  );

  const goTo = useCallback(
    (n: number) => {
      setQuery({ etape: String(n) });
      headingRef.current?.focus();
    },
    [setQuery]
  );

  const total = vehicle && formula ? computeTotal(formula, vehicle, selectedOptions) : null;

  /* ---------------------------- validation étape 5 ---------------------------- */
  const validateContact = (): boolean => {
    const e: Partial<Record<string, string>> = {};
    if (contact.lastName.trim().length < 2) e.lastName = "Indiquez votre nom.";
    if (contact.firstName.trim().length < 2) e.firstName = "Indiquez votre prénom.";
    if (!frPhoneRegex.test(contact.phone.trim()))
      e.phone = "Indiquez un numéro français valide, ex. 06 12 34 56 78.";
    if (contact.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()))
      e.email = "Cette adresse email semble invalide.";
    if (!contact.contactPreference)
      e.contactPreference = "Choisissez comment vous préférez être recontacté(e).";
    if (!contact.consent)
      e.consent = "Votre accord est nécessaire pour que nous puissions vous rappeler.";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = Object.keys(e)[0]!;
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      return false;
    }
    return true;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError(null);
    if (!vehicle || !formula || !validateContact()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicle,
          formula,
          options: selectedOptions,
          lastName: contact.lastName,
          firstName: contact.firstName,
          phone: contact.phone,
          email: contact.email.trim(),
          contactPreference: contact.contactPreference,
          message: contact.message,
          consent: contact.consent,
          website: honeypotRef.current?.value ?? "",
          startedAt: startedAt.current,
        }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
      };
      if (!json.ok) {
        if (json.fieldErrors) {
          setErrors(json.fieldErrors);
          const first = Object.keys(json.fieldErrors)[0];
          if (first)
            formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        }
        setServerError(json.error ?? "Certains champs sont à corriger ci-dessus.");
        setStatus("error");
        return;
      }
      sessionStorage.removeItem(STORAGE_KEY);
      router.push(
        `/reservation/confirmation?vehicule=${vehicle}&formule=${formula}${
          selectedOptions.length ? `&options=${selectedOptions.join(",")}` : ""
        }`
      );
    } catch {
      setServerError("La connexion a échoué. Vérifiez votre réseau puis réessayez.");
      setStatus("error");
    }
  };

  /* ------------------------------------------------------------------ */

  const fieldError = (name: string) =>
    errors[name] ? (
      <p id={`err-${name}`} className="mt-1.5 text-sm font-medium text-[#b00020]">
        {errors[name]}
      </p>
    ) : null;

  const inputClass = (name: string) =>
    `border-2 bg-blanc w-full rounded-xl px-4 py-3 text-base ${
      errors[name] ? "border-[#b00020]" : "border-noir/25 focus:border-noir"
    }`;

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-28 sm:px-6 lg:grid-cols-[1.7fr_1fr] lg:pb-16">
      <div>
        {/* Progression : cliquable en arrière uniquement */}
        <nav aria-label="Progression de la pré-réservation">
          <ol className="flex flex-wrap gap-2">
            {stepLabels.map((label, i) => {
              const n = i + 1;
              const current = n === step;
              const reachable = n < step;
              return (
                <li key={label}>
                  {reachable ? (
                    <button
                      type="button"
                      onClick={() => goTo(n)}
                      className="border-noir bg-blanc min-h-11 rounded-full border px-4 py-2 text-sm font-medium hover:bg-noir hover:text-blanc"
                    >
                      {n}. {label}
                    </button>
                  ) : (
                    <span
                      aria-current={current ? "step" : undefined}
                      className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium ${
                        current ? "bg-noir text-blanc" : "border-gris text-noir/50 border"
                      }`}
                    >
                      {n}. {label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <h2 ref={headingRef} tabIndex={-1} className="display mt-8 text-[length:var(--text-display-md)] outline-none">
          {step === 1 && "Quel véhicule nous confiez-vous ?"}
          {step === 2 && "Choisissez votre formule"}
          {step === 3 && "Des options à ajouter ?"}
          {step === 4 && "Votre récapitulatif"}
          {step === 5 && "Vos coordonnées"}
        </h2>

        {/* Étape 1 : Catégorie */}
        {step === 1 && (
          <fieldset className="mt-8 border-0 p-0">
            <legend className="sr-only">Catégorie de véhicule</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {vehicleCategories.map((v) => (
                <label
                  key={v.id}
                  className={`cursor-pointer rounded-[var(--radius-card)] border-2 p-5 transition-colors ${
                    vehicle === v.id ? "border-noir bg-noir text-blanc" : "border-noir/20 hover:border-noir"
                  }`}
                >
                  <input
                    type="radio"
                    name="vehicule"
                    value={v.id}
                    checked={vehicle === v.id}
                    onChange={() => setQuery({ vehicule: v.id, etape: "2" })}
                    className="sr-only"
                  />
                  <span className="block font-semibold">{v.label}</span>
                  <span className={`mt-1 block text-sm ${vehicle === v.id ? "text-gris" : "text-noir/60"}`}>
                    {v.examples}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* Étape 2 : Formule */}
        {step === 2 && (
          <fieldset className="mt-8 border-0 p-0">
            <legend className="sr-only">Formule</legend>
            <div className="grid gap-3">
              {formulas.map((f) => (
                <label
                  key={f.id}
                  className={`cursor-pointer rounded-[var(--radius-card)] border-2 p-5 transition-colors ${
                    formula === f.id ? "border-noir bg-noir text-blanc" : "border-noir/20 hover:border-noir"
                  }`}
                >
                  <input
                    type="radio"
                    name="formule"
                    value={f.id}
                    checked={formula === f.id}
                    onChange={() => setQuery({ formule: f.id, etape: "3" })}
                    className="sr-only"
                  />
                  <span className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="display text-xl">
                      {f.name}
                      {f.recommended && (
                        <span className="bg-jaune text-noir ml-3 rounded-full px-2.5 py-0.5 align-middle text-xs font-bold tracking-wide uppercase">
                          Recommandée
                        </span>
                      )}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(f.price)} · {f.duration}
                    </span>
                  </span>
                  <span className={`mt-2 block text-sm ${formula === f.id ? "text-gris" : "text-noir/60"}`}>
                    {f.tagline}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* Étape 3 : Options */}
        {step === 3 && (
          <>
            <fieldset className="mt-8 border-0 p-0">
              <legend className="text-noir/70 mb-4 text-sm">
                Facultatif : sélectionnez celles qui concernent votre véhicule.
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {options.map((o) => {
                  const checked = selectedOptions.includes(o.id);
                  return (
                    <label
                      key={o.id}
                      className={`flex cursor-pointer gap-4 rounded-[var(--radius-card)] border-2 p-4 transition-colors ${
                        checked ? "border-noir bg-noir text-blanc" : "border-noir/20 hover:border-noir"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="options"
                        value={o.id}
                        checked={checked}
                        onChange={() => {
                          const next = checked
                            ? selectedOptions.filter((id) => id !== o.id)
                            : [...selectedOptions, o.id];
                          setQuery({ options: next.join(",") });
                        }}
                        className="mt-1 h-5 w-5 shrink-0 accent-jaune"
                      />
                      <span>
                        <span className="flex items-center gap-2 font-semibold">
                          <OptionIcon icon={o.icon} className="h-5 w-5" />
                          {o.label} · +{formatPrice(o.price)}
                        </span>
                        <span className={`mt-1 block text-sm ${checked ? "text-gris" : "text-noir/60"}`}>
                          {o.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <button
              type="button"
              onClick={() => goTo(4)}
              className="bg-noir text-blanc mt-8 min-h-11 rounded-full px-7 py-3 font-semibold"
            >
              Voir le récapitulatif
            </button>
          </>
        )}

        {/* Étape 4 : Récapitulatif */}
        {step === 4 && vehicle && formula && (
          <>
            <dl className="border-noir/15 mt-8 divide-y rounded-[var(--radius-card)] border">
              <div className="divide-noir/15 flex justify-between gap-4 p-5">
                <dt className="text-noir/60">Véhicule</dt>
                <dd className="text-right font-semibold">
                  {vehicleCategories.find((v) => v.id === vehicle)?.label}
                </dd>
              </div>
              <div className="border-noir/15 flex justify-between gap-4 border-t p-5">
                <dt className="text-noir/60">Formule</dt>
                <dd className="text-right font-semibold">
                  {formulas.find((f) => f.id === formula)?.name} ({formatPrice(formulas.find((f) => f.id === formula)!.price)})
                </dd>
              </div>
              <div className="border-noir/15 flex justify-between gap-4 border-t p-5">
                <dt className="text-noir/60">Options</dt>
                <dd className="text-right font-semibold">
                  {selectedOptions.length
                    ? selectedOptions
                        .map((id) => {
                          const o = options.find((x) => x.id === id)!;
                          return `${o.label} (+${formatPrice(o.price)})`;
                        })
                        .join(", ")
                    : "Aucune"}
                </dd>
              </div>
              <div className="border-noir/15 bg-jaune flex justify-between gap-4 rounded-b-[var(--radius-card)] border-t p-5">
                <dt className="font-semibold">Total estimé</dt>
                <dd className="display text-2xl">{total !== null && formatPrice(total)}</dd>
              </div>
            </dl>
            <p className="text-noir/60 mt-4 text-sm">
              Ce total est confirmé avec vous par téléphone avant le rendez-vous. Aucun
              paiement en ligne.
            </p>
            <button
              type="button"
              onClick={() => goTo(5)}
              className="bg-noir text-blanc mt-8 min-h-11 rounded-full px-7 py-3 font-semibold"
            >
              Continuer vers mes coordonnées
            </button>
          </>
        )}

        {/* Étape 5 : Coordonnées */}
        {step === 5 && (
          <form ref={formRef} onSubmit={submit} noValidate className="mt-8 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="res-nom" className="mb-1.5 block font-medium">
                  Nom
                </label>
                <input
                  id="res-nom"
                  name="lastName"
                  autoComplete="family-name"
                  required
                  value={contact.lastName}
                  onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "err-lastName" : undefined}
                  className={inputClass("lastName")}
                />
                {fieldError("lastName")}
              </div>
              <div>
                <label htmlFor="res-prenom" className="mb-1.5 block font-medium">
                  Prénom
                </label>
                <input
                  id="res-prenom"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  value={contact.firstName}
                  onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "err-firstName" : undefined}
                  className={inputClass("firstName")}
                />
                {fieldError("firstName")}
              </div>
            </div>
            <div>
              <label htmlFor="res-tel" className="mb-1.5 block font-medium">
                Téléphone
              </label>
              <input
                id="res-tel"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder="06 12 34 56 78"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "err-phone" : undefined}
                className={inputClass("phone")}
              />
              {fieldError("phone")}
            </div>
            <div>
              <label htmlFor="res-email" className="mb-1.5 block font-medium">
                Email <span className="text-noir/50 font-normal">(facultatif, pour la confirmation écrite)</span>
              </label>
              <input
                id="res-email"
                name="email"
                type="email"
                autoComplete="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
                className={inputClass("email")}
              />
              {fieldError("email")}
            </div>
            <fieldset className="border-0 p-0">
              <legend className="mb-2 font-medium">Comment préférez-vous être recontacté(e) ?</legend>
              <div className="flex gap-3" role="radiogroup" aria-describedby={errors.contactPreference ? "err-contactPreference" : undefined}>
                {(
                  [
                    ["appel", "Par téléphone"],
                    ["sms", "Par SMS"],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className={`min-h-11 cursor-pointer rounded-full border-2 px-5 py-2.5 font-medium ${
                      contact.contactPreference === value
                        ? "border-noir bg-noir text-blanc"
                        : "border-noir/25"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contactPreference"
                      value={value}
                      checked={contact.contactPreference === value}
                      onChange={() => setContact({ ...contact, contactPreference: value })}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
              {fieldError("contactPreference")}
            </fieldset>
            <div>
              <label htmlFor="res-message" className="mb-1.5 block font-medium">
                Informations complémentaires{" "}
                <span className="text-noir/50 font-normal">(facultatif)</span>
              </label>
              <textarea
                id="res-message"
                name="message"
                rows={4}
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                placeholder="État du véhicule, contrainte de date, besoin urgent…"
                className={inputClass("message")}
              />
            </div>

            {/* Honeypot : invisible pour les humains, rempli par les robots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="res-website">Ne pas remplir ce champ</label>
              <input id="res-website" ref={honeypotRef} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={contact.consent}
                  onChange={(e) => setContact({ ...contact, consent: e.target.checked })}
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "err-consent" : undefined}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-noir"
                />
                <span className="text-sm leading-relaxed">
                  J'accepte que mes coordonnées soient utilisées uniquement pour traiter ma
                  demande de pré-réservation, conformément à la{" "}
                  <a href="/politique-de-confidentialite" className="underline underline-offset-4">
                    politique de confidentialité
                  </a>
                  .
                </span>
              </label>
              {fieldError("consent")}
            </div>

            {serverError && (
              <p role="alert" className="rounded-xl border-2 border-[#b00020] p-4 text-sm font-medium text-[#b00020]">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-noir text-blanc min-h-12 rounded-full px-8 py-3.5 text-base font-semibold disabled:opacity-50"
            >
              {status === "sending" ? "Envoi en cours…" : "Envoyer ma pré-réservation"}
            </button>
          </form>
        )}
      </div>

      {/* Récapitulatif sticky (desktop, dès l'étape 2) */}
      {step >= 2 && vehicle && (
        <aside className="hidden lg:block" aria-label="Récapitulatif du prix">
          <div className="bg-noir text-blanc sticky top-24 rounded-[var(--radius-card)] p-7">
            <h3 className="display text-xl">Votre estimation</h3>
            <dl className="mt-5 flex flex-col gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gris">Véhicule</dt>
                <dd className="text-right">{vehicleCategories.find((v) => v.id === vehicle)?.label}</dd>
              </div>
              {formula && (
                <div className="flex justify-between gap-4">
                  <dt className="text-gris">Formule</dt>
                  <dd className="text-right">
                    {formulas.find((f) => f.id === formula)?.name} ({formatPrice(formulas.find((f) => f.id === formula)!.price)})
                  </dd>
                </div>
              )}
              {selectedOptions.map((id) => {
                const o = options.find((x) => x.id === id)!;
                return (
                  <div key={id} className="flex justify-between gap-4">
                    <dt className="text-gris">{o.label}</dt>
                    <dd>+{formatPrice(o.price)}</dd>
                  </div>
                );
              })}
            </dl>
            <p
              className="border-blanc/20 mt-5 flex items-baseline justify-between border-t pt-5"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="font-medium">Total estimé</span>
              <span className="display text-jaune text-3xl">
                {total !== null ? formatPrice(total) : "…"}
              </span>
            </p>
            <p className="text-gris mt-3 text-xs leading-relaxed">
              Sans paiement en ligne. Le tarif est confirmé par téléphone avant le
              rendez-vous.
            </p>
          </div>
        </aside>
      )}

      {/* Barre de total fixe (mobile) */}
      {step >= 2 && total !== null && step < 5 && (
        <div className="border-noir/15 bg-blanc fixed inset-x-0 bottom-0 z-30 border-t p-3 lg:hidden">
          <div
            className="mx-auto flex max-w-md items-center justify-between gap-4"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-sm font-medium">
              Total estimé&nbsp;:{" "}
              <span className="display text-xl">{formatPrice(total)}</span>
            </span>
            <button
              type="button"
              onClick={() => goTo(Math.min(step + 1, 5))}
              className="bg-noir text-blanc min-h-11 rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              Continuer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

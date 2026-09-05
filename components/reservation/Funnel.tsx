"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OptionIcon } from "@/components/ui/OptionIcon";
import { VehicleSilhouette } from "@/components/ui/VehicleSilhouette";
import { reviews } from "@/content/avis";
import {
  computeTotal,
  formatPrice,
  formulas,
  getFormula,
  getOption,
  getVehicle,
  options as allOptions,
  vehicleCategories,
  type FormulaId,
  type OptionId,
  type VehicleId,
} from "@/content/offre";
import { site } from "@/content/site";
import { frPhoneRegex } from "@/lib/validation";
import { ContactStep, type ContactErrors } from "./ContactStep";
import { StepRail } from "./StepRail";
import { SummaryPanel } from "./SummaryPanel";
import {
  emptyContact,
  formatPhone,
  formatDateFr,
  maxReachableStep,
  parseFormula,
  parseOptions,
  parseVehicle,
  slotLabels,
  STEPS,
  type ContactValues,
  type Selection,
  type StepNumber,
} from "./shared";

const STORAGE_KEY = "autoclean-reservation";

/* ----------------------------- petits éléments ----------------------------- */

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 13 5 5L20 7" />
    </svg>
  );
}

function SelectedBadge() {
  return (
    <span className="bg-jaune text-noir absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full">
      <Check className="h-4 w-4" />
      <span className="sr-only">Sélectionné</span>
    </span>
  );
}

function StepHeader({
  title,
  intro,
  headingRef,
}: {
  title: string;
  intro: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="mb-6">
      <h2 ref={headingRef} tabIndex={-1} className="display text-[length:var(--text-display-sm)] outline-none">
        {title}
      </h2>
      <p className="text-noir/60 mt-2">{intro}</p>
    </div>
  );
}

/* --------------------------------- tunnel --------------------------------- */

export function Funnel() {
  const router = useRouter();
  const params = useSearchParams();

  const selection: Selection = useMemo(
    () => ({
      vehicle: parseVehicle(params.get("vehicule")),
      formula: parseFormula(params.get("formule")),
      options: parseOptions(params.get("options")),
    }),
    [params]
  );

  const maxReached = maxReachableStep(selection);
  const requested = Number(params.get("etape") ?? 1);
  const step = (Math.min(
    Math.max(Number.isFinite(requested) ? requested : 1, 1),
    maxReached
  ) || 1) as StepNumber;

  const total =
    selection.vehicle && selection.formula
      ? computeTotal(selection.formula, selection.vehicle, selection.options)
      : null;

  /* --------------------------- état du formulaire --------------------------- */

  const [contact, setContact] = useState<ContactValues>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  const startedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const pointerSelect = useRef(false);
  const firstRender = useRef(true);

  /* Reprise d'une saisie interrompue (rafraîchissement, retour arrière). */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setContact({ ...emptyContact, ...(JSON.parse(raw) as Partial<ContactValues>) });
    } catch {
      /* stockage indisponible : on repart d'un formulaire vide */
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...contact, consent: false }));
    } catch {
      /* stockage indisponible : la saisie n'est pas conservée, sans incidence */
    }
  }, [contact, restored]);

  /* --------------------------------- routage -------------------------------- */

  const go = useCallback(
    (next: Partial<Selection> & { step?: StepNumber }) => {
      const merged: Selection = {
        vehicle: next.vehicle !== undefined ? next.vehicle : selection.vehicle,
        formula: next.formula !== undefined ? next.formula : selection.formula,
        options: next.options !== undefined ? next.options : selection.options,
      };
      const sp = new URLSearchParams();
      if (merged.vehicle) sp.set("vehicule", merged.vehicle);
      if (merged.formula) sp.set("formule", merged.formula);
      if (merged.options.length) sp.set("options", merged.options.join(","));
      const target = Math.min(next.step ?? step, maxReachableStep(merged));
      sp.set("etape", String(target));
      router.replace(`/reservation?${sp.toString()}`, { scroll: false });
    },
    [router, selection, step]
  );

  /* Au changement d'étape : ramener le tunnel en haut et donner le focus au titre. */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  /* Sélection à la souris ou au doigt : on enchaîne sur l'étape suivante.
     Au clavier, les flèches parcourent les choix sans faire avancer le tunnel. */
  const clickVehicle = (id: VehicleId) => {
    if (!pointerSelect.current) return;
    pointerSelect.current = false;
    go({ vehicle: id, step: 2 });
  };

  const clickFormula = (id: FormulaId) => {
    if (!pointerSelect.current) return;
    pointerSelect.current = false;
    go({ formula: id, step: 3 });
  };

  const toggleOption = (id: OptionId) => {
    const next = selection.options.includes(id)
      ? selection.options.filter((o) => o !== id)
      : [...selection.options, id];
    go({ options: next });
  };

  /* -------------------------------- validation ------------------------------- */

  const validateField = useCallback(
    (key: keyof ContactValues, v: ContactValues): string | undefined => {
      switch (key) {
        case "firstName":
          return v.firstName.trim().length < 2 ? "Indiquez votre prénom." : undefined;
        case "lastName":
          return v.lastName.trim().length < 2 ? "Indiquez votre nom." : undefined;
        case "phone":
          return frPhoneRegex.test(v.phone.trim())
            ? undefined
            : "Indiquez un numéro français valide, par exemple 06 12 34 56 78.";
        case "email":
          return v.email.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())
            ? undefined
            : "Cette adresse email semble incomplète.";
        case "contactPreference":
          return v.contactPreference === ""
            ? "Dites-nous si vous préférez un appel ou un SMS."
            : undefined;
        case "consent":
          return v.consent ? undefined : "Cochez cette case pour que nous puissions vous rappeler.";
        default:
          return undefined;
      }
    },
    []
  );

  const setValue = useCallback(
    <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
      setContact((prev) => {
        const next = { ...prev, [key]: value };
        setErrors((e) => (e[key] ? { ...e, [key]: validateField(key, next) } : e));
        return next;
      });
    },
    [validateField]
  );

  const onBlurField = useCallback(
    (key: keyof ContactValues) => {
      setContact((prev) => {
        const next = key === "phone" ? { ...prev, phone: formatPhone(prev.phone) } : prev;
        setErrors((e) => ({ ...e, [key]: validateField(key, next) }));
        return next;
      });
    },
    [validateField]
  );

  /* --------------------------------- envoi ---------------------------------- */

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!selection.vehicle || !selection.formula) return;

    const keys: (keyof ContactValues)[] = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "contactPreference",
      "consent",
    ];
    const found: ContactErrors = {};
    for (const k of keys) {
      const msg = validateField(k, contact);
      if (msg) found[k] = msg;
    }
    setErrors(found);
    if (Object.keys(found).length > 0) {
      errorSummaryRef.current?.focus();
      return;
    }

    setStatus("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicle: selection.vehicle,
          formula: selection.formula,
          options: selection.options,
          firstName: contact.firstName.trim(),
          lastName: contact.lastName.trim(),
          phone: contact.phone.trim(),
          email: contact.email.trim(),
          contactPreference: contact.contactPreference,
          preferredDate: contact.preferredDate,
          preferredSlot: contact.preferredSlot,
          message: contact.message.trim(),
          consent: contact.consent,
          website: honeypotRef.current?.value ?? "",
          startedAt: startedAt.current,
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; reference?: string };
      if (!json.ok) throw new Error(json.error);

      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* rien à nettoyer */
      }

      const sp = new URLSearchParams({
        vehicule: selection.vehicle,
        formule: selection.formula,
      });
      if (selection.options.length) sp.set("options", selection.options.join(","));
      if (json.reference) sp.set("ref", json.reference);
      router.push(`/reservation/confirmation?${sp.toString()}`);
    } catch (err) {
      setServerError(
        err instanceof Error && err.message
          ? err.message
          : "L'envoi n'a pas abouti. Réessayez, ou appelez-nous directement."
      );
      setStatus("error");
      errorSummaryRef.current?.focus();
    }
  };

  /* --------------------------------- rendu ---------------------------------- */

  const errorList = Object.entries(errors).filter(([, v]) => v) as [string, string][];
  const canContinue =
    (step === 1 && !!selection.vehicle) ||
    (step === 2 && !!selection.formula) ||
    step === 3 ||
    step === 4;

  const nextLabel =
    step === 3 ? "Voir le récapitulatif" : step === 4 ? "Passer à mes coordonnées" : "Continuer";

  return (
    <div ref={topRef} className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-32 sm:px-6 lg:pb-16">
      <StepRail current={step} maxReached={maxReached} onGoTo={(s) => go({ step: s })} />

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          {/* Étape 1 : véhicule */}
          {step === 1 && (
            <section>
              <StepHeader
                title="Quel véhicule allons-nous nettoyer ?"
                intro="La catégorie nous sert à prévoir le temps de travail et le matériel."
                headingRef={headingRef}
              />
              <div
                role="radiogroup"
                aria-label="Catégorie de véhicule"
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {vehicleCategories.map((v) => {
                  const checked = selection.vehicle === v.id;
                  return (
                    <label
                      key={v.id}
                      onPointerDown={() => (pointerSelect.current = true)}
                      onClick={() => clickVehicle(v.id)}
                      className={[
                        "relative flex cursor-pointer flex-col items-center gap-3 rounded-[var(--radius-card)] border-2 p-5 text-center transition-colors",
                        checked ? "border-noir bg-noir/5" : "border-noir/15 hover:border-noir/45",
                      ].join(" ")}
                    >
                      <input
                        type="radio"
                        name="vehicule"
                        value={v.id}
                        checked={checked}
                        onChange={() => go({ vehicle: v.id })}
                        className="sr-only"
                      />
                      {checked && <SelectedBadge />}
                      <VehicleSilhouette type={v.silhouette} className="text-noir h-14 w-auto" />
                      <span className="font-semibold">{v.label}</span>
                      <span className="text-noir/50 text-xs leading-relaxed">
                        {v.examples.slice(0, 3).join(", ")}
                      </span>
                    </label>
                  );
                })}
              </div>
              <p className="text-noir/55 mt-5 text-sm">
                Votre véhicule ne rentre dans aucune case ? Choisissez le plus proche,
                nous ajusterons au téléphone.
              </p>
            </section>
          )}

          {/* Étape 2 : formule */}
          {step === 2 && (
            <section>
              <StepHeader
                title="Quelle formule pour votre véhicule ?"
                intro="Les trois formules sont cumulatives : chacune reprend la précédente."
                headingRef={headingRef}
              />
              <div
                role="radiogroup"
                aria-label="Formule de nettoyage"
                className="grid gap-4 lg:grid-cols-3"
              >
                {formulas.map((f) => {
                  const checked = selection.formula === f.id;
                  return (
                    <label
                      key={f.id}
                      onPointerDown={() => (pointerSelect.current = true)}
                      onClick={() => clickFormula(f.id)}
                      className={[
                        "relative flex cursor-pointer flex-col rounded-[var(--radius-card)] border-2 p-5 transition-colors",
                        checked ? "border-noir bg-noir/5" : "border-noir/15 hover:border-noir/45",
                      ].join(" ")}
                    >
                      <input
                        type="radio"
                        name="formule"
                        value={f.id}
                        checked={checked}
                        onChange={() => go({ formula: f.id })}
                        className="sr-only"
                      />
                      {f.badge && (
                        <span className="bg-jaune text-noir absolute -top-3 left-5 rounded-full px-3 py-1 text-xs font-semibold">
                          {f.badge}
                        </span>
                      )}
                      {checked && <SelectedBadge />}

                      <h3 className="display text-2xl">{f.name}</h3>
                      <p className="text-noir/60 mt-1 min-h-[2.75rem] text-sm">{f.tagline}</p>
                      <p className="display mt-2 text-4xl">{formatPrice(f.price)}</p>
                      <p className="text-noir/55 mt-1 text-sm">Durée estimée : {f.duration}</p>

                      <ul className="border-noir/10 mt-4 flex flex-col gap-2 border-t pt-4 text-sm">
                        {f.inclusions.map((inc) => (
                          <li key={inc.label} className="flex gap-2">
                            <Check className="text-jaune mt-1 h-3.5 w-3.5 shrink-0" />
                            <span>
                              {inc.label}
                              {inc.detail && (
                                <span className="text-noir/50 block text-xs">{inc.detail}</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {f.note && (
                        <p className="text-noir/60 border-noir/10 mt-4 border-t pt-4 text-sm italic">
                          {f.note}
                        </p>
                      )}

                      <span
                        className={[
                          "mt-5 flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors",
                          checked ? "bg-noir text-blanc" : "border-noir border-2",
                        ].join(" ")}
                      >
                        {checked ? "Formule sélectionnée" : "Choisir cette formule"}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          )}

          {/* Étape 3 : options */}
          {step === 3 && (
            <section>
              <StepHeader
                title="Des options à ajouter ?"
                intro="Tout est facultatif. Vous pourrez encore en ajouter au téléphone."
                headingRef={headingRef}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {allOptions.map((o) => {
                  const checked = selection.options.includes(o.id);
                  return (
                    <label
                      key={o.id}
                      className={[
                        "flex cursor-pointer gap-3 rounded-[var(--radius-card)] border-2 p-4 transition-colors",
                        checked ? "border-noir bg-noir/5" : "border-noir/15 hover:border-noir/45",
                      ].join(" ")}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOption(o.id)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={[
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                          checked ? "border-noir bg-noir text-jaune" : "border-noir/30",
                        ].join(" ")}
                      >
                        {checked && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="font-semibold">{o.label}</span>
                          <span className="shrink-0 font-semibold">+{formatPrice(o.price)}</span>
                        </span>
                        {o.badge && (
                          <span className="bg-jaune text-noir mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold">
                            {o.badge}
                          </span>
                        )}
                        <span className="text-noir/60 mt-1.5 flex gap-2 text-sm leading-relaxed">
                          <OptionIcon icon={o.icon} className="text-noir/45 mt-0.5 h-4 w-4 shrink-0" />
                          {o.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          )}

          {/* Étape 4 : récapitulatif */}
          {step === 4 && selection.vehicle && selection.formula && (
            <section>
              <StepHeader
                title="Voilà votre demande"
                intro="Vérifiez, corrigez si besoin : rien n'est encore envoyé."
                headingRef={headingRef}
              />

              <div className="mb-6 lg:hidden">
                <SummaryPanel selection={selection} onEdit={(s) => go({ step: s })} />
              </div>

              <div className="border-noir/12 rounded-[var(--radius-card)] border p-5">
                <h3 className="font-semibold">
                  Ce que comprend la formule {getFormula(selection.formula).name}
                </h3>
                <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {getFormula(selection.formula).inclusions.map((inc) => (
                    <li key={inc.label} className="flex gap-2">
                      <Check className="text-jaune mt-1 h-3.5 w-3.5 shrink-0" />
                      <span>{inc.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { t: "Produits professionnels", d: "Un produit par matériau, à la bonne dilution." },
                  {
                    t: "Créneau réservé",
                    d: `Le véhicule reste à l'atelier ${getFormula(selection.formula).duration}.`,
                  },
                  { t: "Paiement sur place", d: `${site.paymentMethods.join(", ")}.` },
                ].map((b) => (
                  <div key={b.t} className="border-noir/12 rounded-[var(--radius-card)] border p-4">
                    <p className="font-semibold">{b.t}</p>
                    <p className="text-noir/60 mt-1 text-sm leading-relaxed">{b.d}</p>
                  </div>
                ))}
              </div>

              <div className="bg-noir text-blanc mt-4 rounded-[var(--radius-card)] p-5">
                <p className="text-gris text-sm">
                  {site.rating.value}/5 sur Google, {site.clientsCount.toLowerCase()}
                </p>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {reviews.map((r) => (
                    <figure key={r.author}>
                      <blockquote className="text-sm leading-relaxed">{r.text}</blockquote>
                      <figcaption className="text-gris mt-2 text-sm">
                        {r.author}, avis {r.source}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Étape 5 : coordonnées */}
          {step === 5 && selection.vehicle && selection.formula && (
            <section>
              <StepHeader
                title="Vos coordonnées"
                intro={`Dernière étape. Nous vous rappelons ${site.callbackDelay} pour confirmer le créneau.`}
                headingRef={headingRef}
              />

              <div ref={errorSummaryRef} tabIndex={-1} aria-live="assertive" className="outline-none">
                {(errorList.length > 0 || serverError) && (
                  <div className="mb-6 rounded-[var(--radius-card)] border-2 border-[#b00020] p-4">
                    <p className="font-semibold text-[#b00020]">
                      {serverError ?? "Il manque encore quelques informations."}
                    </p>
                    {errorList.length > 0 && (
                      <ul className="mt-2 list-disc pl-5 text-sm text-[#b00020]">
                        {errorList.map(([k, v]) => (
                          <li key={k}>{v}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <form onSubmit={submit} noValidate className="relative">
                <ContactStep
                  values={contact}
                  setValue={setValue}
                  errors={errors}
                  onBlurField={onBlurField}
                  honeypotRef={honeypotRef}
                />

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-noir text-blanc hover:bg-noir/85 inline-flex min-h-12 items-center rounded-full px-8 py-3.5 text-base font-semibold disabled:opacity-60"
                  >
                    {status === "sending" ? "Envoi en cours…" : "Envoyer ma pré-réservation"}
                  </button>
                  <button
                    type="button"
                    onClick={() => go({ step: 4 })}
                    className="text-noir/60 hover:text-noir min-h-11 text-sm underline underline-offset-4"
                  >
                    Revenir au récapitulatif
                  </button>
                </div>
                <p className="text-noir/55 mt-3 text-sm">
                  Envoyer cette demande ne vous engage à rien et ne déclenche aucun paiement.
                </p>
              </form>
            </section>
          )}

          {/* Navigation de bas de page (grand écran : la barre fixe s'en charge sur mobile) */}
          {step < 5 && (
            <div className="mt-8 hidden items-center justify-between gap-4 lg:flex">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => go({ step: (step - 1) as StepNumber })}
                  className="border-noir/20 hover:border-noir inline-flex min-h-11 items-center rounded-full border-2 px-6 py-3 text-sm font-semibold"
                >
                  Retour
                </button>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-4">
                {step === 3 && selection.options.length === 0 && (
                  <span className="text-noir/55 text-sm">Aucune option sélectionnée</span>
                )}
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => go({ step: (step + 1) as StepNumber })}
                  className="bg-noir text-blanc hover:bg-noir/85 inline-flex min-h-11 items-center rounded-full px-7 py-3 text-sm font-semibold disabled:opacity-40"
                >
                  {nextLabel}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Colonne latérale : récapitulatif permanent */}
        <aside className="hidden lg:sticky lg:top-24 lg:block">
          <SummaryPanel selection={selection} onEdit={(s) => go({ step: s })} />

          {step === 5 && (
            <div className="border-noir/12 mt-4 rounded-[var(--radius-card)] border p-5">
              <h2 className="font-semibold">Ce qui se passe ensuite</h2>
              <ol className="mt-3 flex flex-col gap-3 text-sm">
                {[
                  "Vous envoyez cette demande.",
                  `Nous vous rappelons ${site.callbackDelay}.`,
                  "Le créneau et le tarif sont confirmés ensemble.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="bg-noir text-blanc flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-noir/70">{t}</span>
                  </li>
                ))}
              </ol>
              {(contact.preferredDate || contact.preferredSlot) && (
                <p className="text-noir/60 border-noir/10 mt-4 border-t pt-4 text-sm">
                  Souhait indiqué :{" "}
                  {contact.preferredDate ? formatDateFr(contact.preferredDate) : "date libre"}
                  {contact.preferredSlot && `, ${slotLabels[contact.preferredSlot].toLowerCase()}`}.
                </p>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Barre fixe mobile : le total reste sous les yeux du début à la fin */}
      {step < 5 && (
        <div className="border-noir/10 bg-blanc/95 fixed inset-x-0 bottom-0 z-30 border-t backdrop-blur-sm lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => go({ step: (step - 1) as StepNumber })}
                aria-label="Étape précédente"
                className="border-noir/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 5 8 12l7 7" />
                </svg>
              </button>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-noir/55 text-xs">Total estimé</p>
              <p className="display text-xl">{total !== null ? formatPrice(total) : "…"}</p>
            </div>
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => go({ step: (step + 1) as StepNumber })}
              className="bg-noir text-blanc inline-flex min-h-12 shrink-0 items-center rounded-full px-6 text-sm font-semibold disabled:opacity-40"
            >
              {nextLabel}
            </button>
          </div>
        </div>
      )}

      {/* Annonce du parcours aux lecteurs d'écran */}
      <p className="sr-only" aria-live="polite">
        Étape {step} sur {STEPS.length} : {STEPS[step - 1]!.label}
        {total !== null ? `. Total estimé ${total} euros.` : ""}
        {selection.vehicle ? ` Véhicule : ${getVehicle(selection.vehicle).label}.` : ""}
        {selection.options.length > 0
          ? ` Options : ${selection.options.map((o) => getOption(o).label).join(", ")}.`
          : ""}
      </p>
    </div>
  );
}

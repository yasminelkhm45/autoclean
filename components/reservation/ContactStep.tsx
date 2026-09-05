"use client";

import type { RefObject } from "react";
import { slotLabels, todayIso, type ContactValues } from "./shared";

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const fieldBase =
  "bg-blanc w-full rounded-xl border-2 px-4 py-3 text-base transition-colors placeholder:text-noir/35";

function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex flex-wrap items-baseline gap-x-2 font-medium">
        {label}
        {optional && <span className="text-noir/50 text-sm font-normal">facultatif</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-noir/55 mt-0.5 text-sm">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-[#b00020]">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5v5.5M12 16.4h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/** Groupe de choix courts sous forme de boutons radio visibles. */
function ChoiceGroup<T extends string>({
  legend,
  name,
  value,
  onChange,
  choices,
  error,
  hint,
  columns = 2,
}: {
  legend: string;
  name: string;
  value: T | "";
  onChange: (v: T) => void;
  choices: { value: T; label: string }[];
  error?: string;
  hint?: string;
  columns?: 2 | 3;
}) {
  return (
    <fieldset>
      <legend className="font-medium">{legend}</legend>
      {hint && <p className="text-noir/55 mt-0.5 text-sm">{hint}</p>}
      <div
        className={`mt-2 grid gap-2.5 ${columns === 3 ? "grid-cols-3" : "grid-cols-2"}`}
      >
        {choices.map((c) => {
          const checked = value === c.value;
          return (
            <label
              key={c.value}
              className={[
                "flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 px-3 py-2.5 text-center text-sm font-medium transition-colors",
                checked ? "border-noir bg-noir text-blanc" : "border-noir/20 hover:border-noir/50",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                value={c.value}
                checked={checked}
                onChange={() => onChange(c.value)}
                className="sr-only"
                aria-describedby={error ? `${name}-error` : undefined}
              />
              {c.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-[#b00020]">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function ContactStep({
  values,
  setValue,
  errors,
  onBlurField,
  honeypotRef,
}: {
  values: ContactValues;
  setValue: <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => void;
  errors: ContactErrors;
  onBlurField: (key: keyof ContactValues) => void;
  honeypotRef: RefObject<HTMLInputElement | null>;
}) {
  const border = (k: keyof ContactValues) =>
    errors[k] ? "border-[#b00020]" : "border-noir/20 focus:border-noir";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="prenom" label="Prénom" error={errors.firstName}>
          <input
            id="prenom"
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            onChange={(e) => setValue("firstName", e.target.value)}
            onBlur={() => onBlurField("firstName")}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "prenom-error" : undefined}
            className={`${fieldBase} ${border("firstName")}`}
          />
        </Field>
        <Field id="nom" label="Nom" error={errors.lastName}>
          <input
            id="nom"
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={(e) => setValue("lastName", e.target.value)}
            onBlur={() => onBlurField("lastName")}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "nom-error" : undefined}
            className={`${fieldBase} ${border("lastName")}`}
          />
        </Field>
      </div>

      <Field
        id="telephone"
        label="Téléphone"
        hint="C'est par là que nous vous recontactons pour caler le créneau."
        error={errors.phone}
      >
        <input
          id="telephone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="06 12 34 56 78"
          value={values.phone}
          onChange={(e) => setValue("phone", e.target.value)}
          onBlur={() => onBlurField("phone")}
          aria-invalid={!!errors.phone}
          aria-describedby={
            errors.phone ? "telephone-error telephone-hint" : "telephone-hint"
          }
          className={`${fieldBase} ${border("phone")}`}
        />
      </Field>

      <Field
        id="email"
        label="Email"
        optional
        hint="Pour recevoir le récapitulatif par écrit."
        error={errors.email}
      >
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="prenom@exemple.fr"
          value={values.email}
          onChange={(e) => setValue("email", e.target.value)}
          onBlur={() => onBlurField("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error email-hint" : "email-hint"}
          className={`${fieldBase} ${border("email")}`}
        />
      </Field>

      <ChoiceGroup
        legend="Vous préférez être joint par"
        name="contactPreference"
        value={values.contactPreference}
        onChange={(v) => setValue("contactPreference", v)}
        error={errors.contactPreference}
        choices={[
          { value: "appel", label: "Appel" },
          { value: "sms", label: "SMS" },
        ]}
      />

      <div className="border-noir/12 grid gap-5 rounded-[var(--radius-card)] border p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <h3 className="font-semibold">Quand souhaitez-vous déposer le véhicule ?</h3>
          <p className="text-noir/55 mt-0.5 text-sm">
            Indicatif : nous confirmons ensemble par téléphone. Laissez vide si vous
            êtes flexible.
          </p>
        </div>
        <Field id="date-souhaitee" label="Date souhaitée" optional error={errors.preferredDate}>
          <input
            id="date-souhaitee"
            name="preferredDate"
            type="date"
            min={todayIso()}
            value={values.preferredDate}
            onChange={(e) => setValue("preferredDate", e.target.value)}
            onBlur={() => onBlurField("preferredDate")}
            aria-invalid={!!errors.preferredDate}
            aria-describedby={errors.preferredDate ? "date-souhaitee-error" : undefined}
            className={`${fieldBase} ${border("preferredDate")}`}
          />
        </Field>
        <ChoiceGroup
          legend="Moment de la journée"
          name="preferredSlot"
          columns={3}
          value={values.preferredSlot}
          onChange={(v) => setValue("preferredSlot", v)}
          choices={[
            { value: "matin", label: slotLabels.matin },
            { value: "apres-midi", label: slotLabels["apres-midi"] },
            { value: "indifferent", label: slotLabels.indifferent },
          ]}
        />
      </div>

      <Field
        id="message"
        label="Quelque chose à nous signaler ?"
        optional
        hint="Une tache tenace, une odeur persistante, une zone à surveiller."
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => setValue("message", e.target.value)}
          aria-describedby="message-hint"
          className={`${fieldBase} ${border("message")} resize-y`}
        />
      </Field>

      <div>
        <label
          htmlFor="consent"
          className={[
            "flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors",
            errors.consent ? "border-[#b00020]" : "border-noir/20 hover:border-noir/50",
          ].join(" ")}
        >
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => setValue("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="accent-noir mt-0.5 h-5 w-5 shrink-0"
          />
          <span className="text-sm leading-relaxed">
            J'accepte qu'AutoClean Diois utilise ces informations pour me recontacter
            au sujet de cette demande. Elles ne servent à rien d'autre et ne sont
            jamais transmises à des tiers.{" "}
            <a
              href="/politique-de-confidentialite"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Politique de confidentialité
            </a>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 text-sm font-medium text-[#b00020]">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Piège à robots : invisible et hors du parcours au clavier. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
      </div>
    </div>
  );
}

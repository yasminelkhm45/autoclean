"use client";

import { useRef, useState } from "react";

export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const values = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    const e: Partial<Record<string, string>> = {};
    if (values.name.length < 2) e.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Indiquez une adresse email valide.";
    if (values.message.length < 10)
      e.message = "Dites-nous en un peu plus (10 caractères minimum).";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = Object.keys(e)[0]!;
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: String(fd.get("website") ?? ""),
          startedAt: startedAt.current,
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error);
      setStatus("sent");
      formRef.current?.reset();
    } catch (err) {
      setServerError(
        err instanceof Error && err.message
          ? err.message
          : "L'envoi a échoué. Réessayez ou appelez-nous directement."
      );
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p role="status" className="bg-jaune rounded-[var(--radius-card)] p-6 font-medium">
        Message envoyé. Nous vous répondons rapidement, généralement sous 24 h ouvrées.
      </p>
    );
  }

  const errClass = (name: string) =>
    `border-2 bg-blanc w-full rounded-xl px-4 py-3 text-base ${
      errors[name] ? "border-[#b00020]" : "border-noir/45 focus:border-noir"
    }`;

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="relative grid gap-5">
      <div>
        <label htmlFor="contact-nom" className="mb-1.5 block font-medium">
          Nom
        </label>
        <input id="contact-nom" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-c-name" : undefined} className={errClass("name")} />
        {errors.name && <p id="err-c-name" className="mt-1.5 text-sm font-medium text-[#b00020]">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block font-medium">
          Email
        </label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-c-email" : undefined} className={errClass("email")} />
        {errors.email && <p id="err-c-email" className="mt-1.5 text-sm font-medium text-[#b00020]">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block font-medium">
          Votre question
        </label>
        <textarea id="contact-message" name="message" rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-c-message" : undefined} className={errClass("message")} />
        {errors.message && <p id="err-c-message" className="mt-1.5 text-sm font-medium text-[#b00020]">{errors.message}</p>}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Ne pas remplir ce champ</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {serverError && (
        <p role="alert" className="rounded-xl border-2 border-[#b00020] p-4 text-sm font-medium text-[#b00020]">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-noir text-blanc min-h-11 justify-self-start rounded-full px-7 py-3 font-semibold disabled:opacity-50"
      >
        {status === "sending" ? "Envoi…" : "Envoyer ma question"}
      </button>
    </form>
  );
}

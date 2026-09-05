import { NextResponse } from "next/server";
import { reservationSchema } from "@/lib/validation";
import { isRateLimited, clientIp } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import {
  computeTotal,
  formatPrice,
  getFormula,
  getOption,
  getVehicle,
  type FormulaId,
  type OptionId,
  type VehicleId,
} from "@/content/offre";
import { site } from "@/content/site";

const slotLabels: Record<string, string> = {
  matin: "le matin",
  "apres-midi": "l'après-midi",
  indifferent: "peu importe",
};

/** Référence courte et lisible au téléphone : AC-JJMM-XXXX. */
function makeReference(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `AC-${pad(d.getDate())}${pad(d.getMonth() + 1)}-${suffix}`;
}

function formatWish(date?: string, slot?: string): string {
  if (!date && !slot) return "Souhait de créneau : aucun, client flexible";
  const parts: string[] = [];
  if (date) {
    const [y, m, dd] = date.split("-").map(Number);
    parts.push(
      y && m && dd
        ? new Date(y, m - 1, dd).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        : date
    );
  }
  if (slot) parts.push(slotLabels[slot] ?? slot);
  return `Souhait de créneau : ${parts.join(", ")}`;
}

const MIN_FILL_TIME_MS = 4000; // délai minimum de soumission (anti-bot)

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isRateLimited(`reservation:${ip}`, 5)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes envoyées. Réessayez dans une heure ou appelez-nous directement." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête illisible." }, { status: 400 });
  }

  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot rempli ou soumission trop rapide → on répond « ok » sans rien envoyer.
  if (data.website || Date.now() - data.startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true, reference: makeReference() });
  }

  const reference = makeReference();

  const vehicle = getVehicle(data.vehicle as VehicleId);
  const formula = getFormula(data.formula as FormulaId);
  const chosenOptions = (data.options as OptionId[]).map(getOption);
  const total = computeTotal(formula.id, vehicle.id, data.options as OptionId[]);

  const recap = [
    `Véhicule : ${vehicle.label}`,
    `Formule : ${formula.name} (${formatPrice(formula.price)})`,
    chosenOptions.length
      ? `Options : ${chosenOptions.map((o) => `${o.label} (+${formatPrice(o.price)})`).join(", ")}`
      : "Options : aucune",
    `Total estimé : ${formatPrice(total)}`,
  ].join("\n");

  try {
    await sendEmail({
      to: process.env.RESERVATION_TO_EMAIL ?? site.email,
      subject: `[${reference}] Pré-réservation : ${data.firstName} ${data.lastName} (${formula.name}, ${formatPrice(total)})`,
      text: [
        `Nouvelle pré-réservation reçue via autoclean-diois.fr (référence ${reference})`,
        "",
        recap,
        "",
        `Client : ${data.firstName} ${data.lastName}`,
        `Téléphone : ${data.phone}`,
        data.email ? `Email : ${data.email}` : "Email : non communiqué",
        `Préférence de contact : ${data.contactPreference === "appel" ? "Appel téléphonique" : "SMS"}`,
        formatWish(data.preferredDate, data.preferredSlot),
        data.message ? `Informations complémentaires :\n${data.message}` : "Informations complémentaires : aucune",
      ].join("\n"),
    });

    if (data.email) {
      await sendEmail({
        to: data.email,
        subject: `Votre pré-réservation chez ${site.name} (${reference})`,
        text: [
          `Bonjour ${data.firstName},`,
          "",
          `Votre pré-réservation est bien arrivée. Nous vous rappelons ${site.callbackDelay} au ${data.phone} pour confirmer ensemble le créneau et le tarif.`,
          "",
          `Votre référence : ${reference}`,
          "",
          "Votre récapitulatif :",
          recap,
          formatWish(data.preferredDate, data.preferredSlot),
          "",
          "Aucun paiement n'est demandé en ligne : vous réglez à l'atelier (carte, espèces ou virement) une fois le véhicule récupéré.",
          "",
          `À très vite,`,
          `${site.name}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
          `${site.phone} · Instagram ${site.instagramHandle}`,
        ].join("\n"),
      });
    }
  } catch (err) {
    console.error("Échec d'envoi de l'email de pré-réservation :", err);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué de notre côté. Réessayez, ou appelez-nous directement." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, reference });
}

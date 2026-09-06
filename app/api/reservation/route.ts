import { NextResponse } from "next/server";
import {
  computeTotal,
  type FormulaId,
  type OptionId,
  type VehicleId,
} from "@/content/offre";
import { site } from "@/content/site";
import { sendEmail } from "@/lib/email";
import {
  clientEmail,
  icsAttachment,
  ownerEmail,
  type ReservationData,
} from "@/lib/email-templates";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { reservationSchema } from "@/lib/validation";

/** Délai minimum de remplissage : en dessous, c'est un robot. */
const MIN_FILL_TIME_MS = 4000;

/** Référence courte et lisible au téléphone : AC-JJMM-XXXX. */
function makeReference(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `AC-${pad(d.getDate())}${pad(d.getMonth() + 1)}-${suffix}`;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isRateLimited(`reservation:${ip}`, 5)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes envoyées. Réessayez dans une heure." },
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

  // Piège à robots rempli ou soumission trop rapide : on répond « ok » sans rien envoyer.
  if (data.website || Date.now() - data.startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true, reference: makeReference() });
  }

  const reference = makeReference();
  const reservation: ReservationData = {
    reference,
    vehicle: data.vehicle as VehicleId,
    formula: data.formula as FormulaId,
    options: data.options as OptionId[],
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email || undefined,
    contactPreference: data.contactPreference,
    preferredDate: data.preferredDate || undefined,
    preferredSlot: data.preferredSlot || undefined,
    message: data.message || undefined,
  };

  // Le total est recalculé côté serveur : il ne vient jamais du client.
  // `null` signifie « sur devis », cas des utilitaires en formule Prestige.
  const total = computeTotal(reservation.formula, reservation.vehicle, reservation.options);

  try {
    const atelier = ownerEmail(reservation, total);
    await sendEmail({
      to: process.env.RESERVATION_TO_EMAIL ?? site.email,
      subject: atelier.subject,
      text: atelier.text,
      html: atelier.html,
      ...(atelier.event && {
        attachments: [icsAttachment(atelier.event, `rendez-vous-${reference}.ics`)],
      }),
      ...(reservation.email && { replyTo: reservation.email }),
    });

    if (reservation.email) {
      const client = clientEmail(reservation, total);
      await sendEmail({
        to: reservation.email,
        subject: client.subject,
        text: client.text,
        html: client.html,
        ...(client.event && {
          attachments: [icsAttachment(client.event, `autoclean-diois-${reference}.ics`)],
        }),
      });
    }
  } catch (err) {
    console.error("Échec d'envoi de la pré-réservation :", err);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué de notre côté. Réessayez ou appelez-nous." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, reference });
}

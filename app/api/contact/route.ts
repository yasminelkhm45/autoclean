import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { isRateLimited, clientIp } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { site } from "@/content/site";

const MIN_FILL_TIME_MS = 3000;

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isRateLimited(`contact:${ip}`, 5)) {
    return NextResponse.json(
      { ok: false, error: "Trop de messages envoyés. Réessayez dans une heure." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête illisible." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Champs invalides." },
      { status: 422 }
    );
  }

  const data = parsed.data;
  if (data.website || Date.now() - data.startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendEmail({
      to: process.env.RESERVATION_TO_EMAIL ?? site.email,
      subject: `Question via le site : ${data.name}`,
      text: `De : ${data.name} <${data.email}>\n\n${data.message}`,
    });
  } catch (err) {
    console.error("Échec d'envoi du message de contact :", err);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué de notre côté. Réessayez ou appelez-nous." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

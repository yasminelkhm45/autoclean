/**
 * Envoi d'emails via l'API Resend (fetch natif, sans dépendance).
 * Sans RESEND_API_KEY, l'email est journalisé côté serveur (utile en dev).
 *
 * Les messages partent en text/plain : un contenu client contenant des balises
 * s'affiche donc littéralement, sans être interprété. Reste le sujet, construit
 * à partir du nom saisi : on en retire les retours à la ligne et les caractères
 * de contrôle, qui n'ont rien à faire dans un en-tête d'email.
 */

/** Nettoie une valeur destinée à un en-tête : ni saut de ligne, ni caractère de contrôle. */
export function sanitizeHeader(value: string, maxLength = 180): string {
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\r\n\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESERVATION_FROM_EMAIL ?? "AutoClean Diois <onboarding@resend.dev>";

  if (!apiKey) {
    console.info(`[email non envoyé : RESEND_API_KEY absente] À: ${to} | ${sanitizeHeader(subject)}\n${text}`);
    return;
  }

  const cleanSubject = sanitizeHeader(subject);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject: cleanSubject, text }),
  });

  if (!res.ok) {
    throw new Error(`Resend a répondu ${res.status} : ${await res.text()}`);
  }
}

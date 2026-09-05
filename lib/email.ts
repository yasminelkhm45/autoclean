/**
 * Envoi d'emails via l'API Resend (fetch natif, sans dépendance).
 * Sans RESEND_API_KEY, l'email est journalisé côté serveur (utile en dev).
 */
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
    console.info(`[email non envoyé : RESEND_API_KEY absente] À: ${to} | ${subject}\n${text}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text }),
  });

  if (!res.ok) {
    throw new Error(`Resend a répondu ${res.status} : ${await res.text()}`);
  }
}

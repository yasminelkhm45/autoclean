import { site } from "@/content/site";

/**
 * Génération d'un événement de calendrier.
 *
 * Les dates sont émises en heure locale flottante (sans suffixe Z ni TZID) :
 * la norme RFC 5545 les fait interpréter dans le fuseau de l'appareil. Pour un
 * atelier local dont les clients sont dans le même fuseau, c'est exact et cela
 * évite d'embarquer un bloc VTIMEZONE dans chaque message.
 */

export interface CalendarEvent {
  start: Date;
  /** Durée en heures. */
  hours: number;
  title: string;
  description: string;
  location: string;
  /** TENTATIVE tant que le créneau n'a pas été confirmé par téléphone. */
  confirmed: boolean;
  /** Identifiant stable : réutiliser la même valeur met l'événement à jour. */
  uid: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

function toIcsDate(d: Date): string {
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}00`
  );
}

/** Échappement des caractères réservés par la norme. */
function esc(v: string): string {
  return v
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** Repliage des lignes à 75 octets, exigé par la norme. */
function fold(line: string): string {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let current = "";
  for (const char of line) {
    const candidate = current + char;
    if (Buffer.from(candidate, "utf8").length > (out.length === 0 ? 75 : 74)) {
      out.push(current);
      current = char;
    } else {
      current = candidate;
    }
  }
  out.push(current);
  return out.join("\r\n ");
}

export function buildIcs(event: CalendarEvent): string {
  const end = new Date(event.start.getTime() + event.hours * 3600_000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//Reservation//FR`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(event.start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${esc(event.title)}`,
    `DESCRIPTION:${esc(event.description)}`,
    `LOCATION:${esc(event.location)}`,
    `STATUS:${event.confirmed ? "CONFIRMED" : "TENTATIVE"}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(event.title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

/** Lien Google Agenda, utile quand le client n'ouvre pas les pièces jointes. */
export function googleCalendarUrl(event: CalendarEvent): string {
  const end = new Date(event.start.getTime() + event.hours * 3600_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toIcsDate(event.start)}/${toIcsDate(end)}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Construit la date de début à partir du souhait exprimé dans le formulaire.
 * Renvoie `null` si aucune date n'a été donnée : mieux vaut ne pas proposer
 * d'ajout à l'agenda que d'inventer un créneau.
 */
export function slotToDate(
  isoDate: string | undefined,
  slot: string | undefined
): Date | null {
  if (!isoDate) return null;
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return null;
  const heure = slot === "apres-midi" ? 14 : 9;
  return new Date(y, m - 1, d, heure, 0, 0, 0);
}

/** Extrait une durée en heures d'un libellé du type « 4 h 30 à 6 h ». */
export function durationToHours(label: string, fallback = 3): number {
  const matches = [...label.matchAll(/(\d+)\s*h(?:\s*(\d+))?/g)];
  const last = matches.at(-1);
  if (!last) return fallback;
  return Number(last[1]) + (last[2] ? Number(last[2]) / 60 : 0);
}

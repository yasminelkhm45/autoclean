import {
  formatPrice,
  formatTarif,
  getFormula,
  getOption,
  getTarif,
  getVehicle,
  type FormulaId,
  type OptionId,
  type VehicleId,
} from "@/content/offre";
import { site } from "@/content/site";
import {
  buildIcs,
  durationToHours,
  googleCalendarUrl,
  slotToDate,
  type CalendarEvent,
} from "@/lib/ics";
import {
  emailLayout,
  escapeHtml,
  multiline,
  noteBox,
  recapTable,
  steps,
  totalBand,
} from "@/lib/email-layout";

export interface ReservationData {
  reference: string;
  vehicle: VehicleId;
  formula: FormulaId;
  options: OptionId[];
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  contactPreference: "appel" | "sms";
  preferredDate?: string;
  preferredSlot?: string;
  message?: string;
}

const slotLabels: Record<string, string> = {
  matin: "le matin",
  "apres-midi": "l'après-midi",
  indifferent: "peu importe le moment",
};

export function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function wishLabel(d: ReservationData): string {
  if (!d.preferredDate && !d.preferredSlot) return "Aucun, client flexible";
  const parts: string[] = [];
  if (d.preferredDate) parts.push(formatDateFr(d.preferredDate));
  if (d.preferredSlot) parts.push(slotLabels[d.preferredSlot] ?? d.preferredSlot);
  return parts.join(", ");
}

/* --------------------------- pièces communes --------------------------- */

function lignes(d: ReservationData) {
  const vehicle = getVehicle(d.vehicle);
  const formula = getFormula(d.formula);
  const tarif = getTarif(d.formula, d.vehicle);
  const chosen = d.options.map(getOption);
  return { vehicle, formula, tarif, chosen };
}

function recapRows(d: ReservationData) {
  const { vehicle, formula, tarif, chosen } = lignes(d);
  return [
    { label: "Véhicule", value: escapeHtml(vehicle.label) },
    {
      label: "Formule",
      value: `${escapeHtml(formula.name)} <span style="font-weight:400;">(${escapeHtml(
        formatTarif(d.formula, d.vehicle)
      )})</span>`,
    },
    { label: "Durée estimée", value: escapeHtml(tarif.duration) },
    {
      label: "Options",
      value: chosen.length
        ? chosen.map((o) => `${escapeHtml(o.label)} +${formatPrice(o.price)}`).join("<br />")
        : "Aucune",
    },
  ];
}

/** Événement d'agenda, seulement si le client a exprimé une date. */
export function reservationEvent(
  d: ReservationData,
  audience: "client" | "atelier"
): CalendarEvent | null {
  const start = slotToDate(d.preferredDate, d.preferredSlot);
  if (!start) return null;
  const { vehicle, formula, tarif } = lignes(d);
  const hours = durationToHours(tarif.duration);
  const titre =
    audience === "client"
      ? `Nettoyage ${formula.name} chez ${site.name} (à confirmer)`
      : `${d.firstName} ${d.lastName}, ${formula.name}, ${vehicle.label} (à confirmer)`;
  const description =
    audience === "client"
      ? `Créneau souhaité, à confirmer par téléphone. Référence ${d.reference}. Formule ${formula.name}, ${vehicle.label}. Atelier : ${site.address.street}, ${site.address.postalCode} ${site.address.city}. Téléphone : ${site.phone}.`
      : `Pré-réservation ${d.reference}. Client : ${d.firstName} ${d.lastName}, ${d.phone}. Formule ${formula.name}, ${vehicle.label}. Créneau à confirmer par téléphone.`;
  return {
    start,
    hours,
    title: titre,
    description,
    location: `${site.name}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
    confirmed: false,
    uid: `${d.reference}-${audience}@autoclean-diois.fr`,
  };
}

export function icsAttachment(event: CalendarEvent, filename: string) {
  return {
    filename,
    content: Buffer.from(buildIcs(event), "utf8").toString("base64"),
  };
}

/* ------------------------------ atelier ------------------------------ */

export function ownerEmail(d: ReservationData, total: number | null) {
  const { vehicle, formula, chosen } = lignes(d);
  const event = reservationEvent(d, "atelier");
  const contact = d.contactPreference === "appel" ? "Appel téléphonique" : "SMS";

  const body = [
    recapTable(recapRows(d)),
    totalBand("Total estimé", total !== null ? formatPrice(total) : "Sur devis"),
    recapTable([
      { label: "Client", value: escapeHtml(`${d.firstName} ${d.lastName}`) },
      {
        label: "Téléphone",
        value: `<a href="tel:${escapeHtml(d.phone.replace(/\s/g, ""))}" style="color:#000;">${escapeHtml(d.phone)}</a>`,
      },
      {
        label: "Email",
        value: d.email
          ? `<a href="mailto:${escapeHtml(d.email)}" style="color:#000;">${escapeHtml(d.email)}</a>`
          : "Non communiqué",
      },
      { label: "À contacter par", value: escapeHtml(contact) },
      { label: "Créneau souhaité", value: escapeHtml(wishLabel(d)) },
    ]),
    d.message ? noteBox("Message du client", multiline(d.message)) : "",
    event
      ? noteBox(
          "Agenda",
          `Le fichier joint ajoute ce créneau à votre agenda en <strong>provisoire</strong>. Il passera en confirmé une fois le rendez-vous calé au téléphone.`
        )
      : "",
  ].join("");

  const html = emailLayout({
    preheader: `${d.firstName} ${d.lastName} — ${formula.name} — ${vehicle.label}`,
    eyebrow: `Référence ${d.reference}`,
    title: "Nouvelle pré-réservation",
    intro: `<strong style="color:#000;">${escapeHtml(`${d.firstName} ${d.lastName}`)}</strong> vient de déposer une demande sur le site. Il reste à le rappeler pour confirmer le créneau et le tarif.`,
    body,
    cta: {
      label: `Appeler ${escapeHtml(d.firstName)}`,
      href: `tel:${d.phone.replace(/\s/g, "")}`,
    },
    secondary: event
      ? { label: "Ajouter le créneau à Google Agenda", href: googleCalendarUrl(event) }
      : undefined,
  });

  const text = [
    `Nouvelle pré-réservation (référence ${d.reference})`,
    "",
    `Véhicule : ${vehicle.label}`,
    `Formule : ${formula.name} (${formatTarif(d.formula, d.vehicle)})`,
    `Durée estimée : ${getTarif(d.formula, d.vehicle).duration}`,
    chosen.length
      ? `Options : ${chosen.map((o) => `${o.label} (+${formatPrice(o.price)})`).join(", ")}`
      : "Options : aucune",
    `Total estimé : ${total !== null ? formatPrice(total) : "Sur devis"}`,
    "",
    `Client : ${d.firstName} ${d.lastName}`,
    `Téléphone : ${d.phone}`,
    `Email : ${d.email || "non communiqué"}`,
    `À contacter par : ${contact}`,
    `Créneau souhaité : ${wishLabel(d)}`,
    d.message ? `\nMessage du client :\n${d.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `[${d.reference}] ${d.firstName} ${d.lastName}, ${formula.name}, ${vehicle.label}`,
    html,
    text,
    event,
  };
}

/* ------------------------------- client ------------------------------- */

export function clientEmail(d: ReservationData, total: number | null) {
  const { vehicle, formula, chosen } = lignes(d);
  const event = reservationEvent(d, "client");

  const body = [
    recapTable(recapRows(d)),
    totalBand("Total estimé", total !== null ? formatPrice(total) : "Sur devis"),
    steps([
      "Nous étudions votre demande à l'atelier.",
      `Nous vous rappelons <strong>${escapeHtml(site.callbackDelay)}</strong> au ${escapeHtml(d.phone)}.`,
      "Nous fixons ensemble le créneau, et le tarif est confirmé.",
    ]),
    event
      ? noteBox(
          "Votre créneau souhaité",
          `${escapeHtml(wishLabel(d))}. Le fichier joint l'ajoute à votre agenda en <strong>provisoire</strong> : il ne vaut pas confirmation tant que nous ne nous sommes pas parlé.`
        )
      : noteBox(
          "Aucune date imposée",
          "Vous n'avez pas indiqué de préférence de créneau, nous verrons cela ensemble au téléphone."
        ),
    noteBox(
      "Aucun paiement en ligne",
      `Rien ne vous est demandé maintenant. Le règlement se fait à l'atelier : ${escapeHtml(site.paymentMethods.join(", ").toLowerCase())}.`
    ),
  ].join("");

  const html = emailLayout({
    preheader: `Votre demande est bien arrivée. Nous vous rappelons ${site.callbackDelay}.`,
    eyebrow: `Référence ${d.reference}`,
    title: "Votre demande est bien arrivée",
    intro: `Bonjour ${escapeHtml(d.firstName)}, merci pour votre confiance. Voici le récapitulatif de votre pré-réservation. Nous vous rappelons <strong style="color:#000;">${escapeHtml(site.callbackDelay)}</strong> pour caler le rendez-vous.`,
    body,
    cta: event
      ? { label: "Ajouter à mon agenda", href: googleCalendarUrl(event) }
      : { label: "Voir nos réalisations", href: `${site.url}/avant-apres` },
    secondary: { label: `Une question ? Appelez-nous au ${site.phone}`, href: site.phoneHref },
  });

  const text = [
    `Bonjour ${d.firstName},`,
    "",
    `Votre pré-réservation est bien arrivée. Nous vous rappelons ${site.callbackDelay} au ${d.phone} pour confirmer ensemble le créneau et le tarif.`,
    "",
    `Référence : ${d.reference}`,
    "",
    "Récapitulatif :",
    `Véhicule : ${vehicle.label}`,
    `Formule : ${formula.name} (${formatTarif(d.formula, d.vehicle)})`,
    `Durée estimée : ${getTarif(d.formula, d.vehicle).duration}`,
    chosen.length
      ? `Options : ${chosen.map((o) => `${o.label} (+${formatPrice(o.price)})`).join(", ")}`
      : "Options : aucune",
    `Total estimé : ${total !== null ? formatPrice(total) : "Sur devis"}`,
    `Créneau souhaité : ${wishLabel(d)}`,
    "",
    `Aucun paiement en ligne : le règlement se fait à l'atelier (${site.paymentMethods.join(", ").toLowerCase()}).`,
    "",
    `${site.name}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
    site.phone,
  ].join("\n");

  return {
    subject: `Votre pré-réservation chez ${site.name} (${d.reference})`,
    html,
    text,
    event,
  };
}

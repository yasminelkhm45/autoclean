import {
  formulas,
  options,
  vehicleCategories,
  type FormulaId,
  type OptionId,
  type VehicleId,
} from "@/content/offre";

export const STEPS = [
  { n: 1, key: "vehicule", label: "Véhicule" },
  { n: 2, key: "formule", label: "Formule" },
  { n: 3, key: "options", label: "Options" },
  { n: 4, key: "recapitulatif", label: "Récapitulatif" },
  { n: 5, key: "coordonnees", label: "Coordonnées" },
] as const;

export type StepNumber = 1 | 2 | 3 | 4 | 5;

export interface Selection {
  vehicle: VehicleId | null;
  formula: FormulaId | null;
  options: OptionId[];
}

export interface ContactValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactPreference: "appel" | "sms" | "";
  preferredPeriod: "semaine" | "week-end" | "indifferent" | "";
  preferredSlot: "matin" | "apres-midi" | "indifferent" | "";
  message: string;
  consent: boolean;
}

export const emptyContact: ContactValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  contactPreference: "",
  preferredPeriod: "",
  preferredSlot: "",
  message: "",
  consent: false,
};

export const periodLabels: Record<Exclude<ContactValues["preferredPeriod"], "">, string> = {
  semaine: "En semaine",
  "week-end": "Le week-end",
  indifferent: "Peu importe",
};

export const slotLabels: Record<Exclude<ContactValues["preferredSlot"], "">, string> = {
  matin: "Le matin",
  "apres-midi": "L'après-midi",
  indifferent: "Peu importe",
};

/* ------------------------------ parsing ------------------------------ */

export function parseVehicle(v: string | null): VehicleId | null {
  return vehicleCategories.some((c) => c.id === v) ? (v as VehicleId) : null;
}

export function parseFormula(v: string | null): FormulaId | null {
  return formulas.some((f) => f.id === v) ? (v as FormulaId) : null;
}

export function parseOptions(v: string | null): OptionId[] {
  if (!v) return [];
  const valid = new Set(options.map((o) => o.id));
  const seen = new Set<string>();
  return v
    .split(",")
    .filter((id) => valid.has(id as OptionId) && !seen.has(id) && seen.add(id))
    .map((id) => id as OptionId);
}

/** Étape la plus avancée que les choix actuels autorisent. */
export function maxReachableStep(s: Selection): StepNumber {
  if (!s.vehicle) return 1;
  if (!s.formula) return 2;
  return 5;
}

/* ------------------------------ formats ------------------------------ */

/** Regroupe un numéro français par paires : 0612345678 → 06 12 34 56 78. */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+33")) {
    const rest = digits.slice(3);
    return ("+33 " + (rest.match(/.{1,2}/g) ?? []).join(" ")).trim();
  }
  return (digits.match(/.{1,2}/g) ?? []).join(" ").trim();
}

export function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

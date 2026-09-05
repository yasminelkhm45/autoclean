import { z } from "zod";
import { formulas, options, vehicleCategories } from "@/content/offre";

const formulaIds = formulas.map((f) => f.id) as [string, ...string[]];
const vehicleIds = vehicleCategories.map((v) => v.id) as [string, ...string[]];
const optionIds = new Set(options.map((o) => o.id));

/** Téléphone français : 0X XX XX XX XX ou +33X…, espaces/points/tirets tolérés. */
export const frPhoneRegex = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

export const reservationSchema = z.object({
  vehicle: z.enum(vehicleIds, { message: "Choisissez une catégorie de véhicule." }),
  formula: z.enum(formulaIds, { message: "Choisissez une formule." }),
  options: z
    .array(z.string())
    .refine((ids) => ids.every((id) => optionIds.has(id as never)), {
      message: "Option inconnue.",
    })
    .default([]),
  lastName: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom.")
    .max(80, "Le nom est trop long."),
  firstName: z
    .string()
    .trim()
    .min(2, "Indiquez votre prénom.")
    .max(80, "Le prénom est trop long."),
  phone: z
    .string()
    .trim()
    .regex(frPhoneRegex, "Indiquez un numéro français valide, ex. 06 12 34 56 78."),
  email: z
    .union([z.literal(""), z.string().trim().email("Cette adresse email semble invalide.")])
    .optional(),
  contactPreference: z.enum(["appel", "sms"], {
    message: "Choisissez comment vous préférez être recontacté(e).",
  }),
  message: z.string().trim().max(2000, "Message trop long (2000 caractères max).").optional(),
  consent: z.literal(true, {
    message: "Votre accord est nécessaire pour que nous puissions vous rappeler.",
  }),
  /* Anti-spam */
  website: z.string().max(0).optional(), // honeypot : doit rester vide
  startedAt: z.number(), // horodatage d'ouverture du formulaire
});

export type ReservationInput = z.input<typeof reservationSchema>;
export type ReservationData = z.output<typeof reservationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(120, "Nom trop long."),
  email: z.string().trim().email("Indiquez une adresse email valide."),
  message: z
    .string()
    .trim()
    .min(10, "Dites-nous en un peu plus (10 caractères minimum).")
    .max(2000, "Message trop long."),
  website: z.string().max(0).optional(),
  startedAt: z.number(),
});

export type ContactData = z.output<typeof contactSchema>;

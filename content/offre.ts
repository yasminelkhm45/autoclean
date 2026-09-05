/**
 * Source unique de vérité de l'offre commerciale.
 * Utilisée par : /prestations, le tunnel de réservation, le JSON-LD et les emails.
 * Modifier un prix ici le met à jour partout.
 */

export type FormulaId = "essentielle" | "confort" | "prestige";
export type OptionId =
  | "cuir-alcantara"
  | "poils-animaux"
  | "ciel-de-toit"
  | "vehicule-tres-sale"
  | "ceramique-vitres"
  | "lave-glace"
  | "pression-pneus";
export type VehicleId = "citadine" | "berline-break" | "suv" | "monospace-familial" | "utilitaire";

export interface Formula {
  id: FormulaId;
  name: string;
  price: number; // EUR TTC, prix « à partir de »
  duration: string;
  tagline: string;
  highlights: [string, string, string];
  inclusions: string[];
  recommended?: boolean;
  image: string;
}

export interface Option {
  id: OptionId;
  label: string;
  price: number; // EUR TTC
  description: string;
  /** Nom d'icône rendu par components/ui/OptionIcon.tsx */
  icon: "leather" | "pet" | "roof" | "deep" | "glass" | "washer" | "tire";
}

export interface VehicleCategory {
  id: VehicleId;
  label: string;
  examples: string;
  /** Modificateur de prix en EUR appliqué à la formule (0 par défaut). */
  priceModifier: number;
}

export const formulas: Formula[] = [
  {
    id: "essentielle",
    name: "Essentielle",
    price: 70,
    duration: "≈ 2 h",
    tagline: "La remise au propre complète de l'habitacle.",
    highlights: [
      "Aspiration complète, coffre inclus",
      "Plastiques nettoyés et protégés",
      "Vitres intérieures sans traces",
    ],
    inclusions: [
      "Aspiration intégrale : sièges, moquettes, tapis, coffre",
      "Dépoussiérage des aérateurs et des recoins",
      "Nettoyage et protection de tous les plastiques intérieurs",
      "Nettoyage des vitres intérieures",
      "Nettoyage des seuils et cadres de portes",
      "Parfum d'ambiance offert",
    ],
    image: "formules/essentielle.jpg",
  },
  {
    id: "confort",
    name: "Confort",
    price: 90,
    duration: "≈ 3 h",
    tagline: "L'Essentielle, plus le shampoing des sièges et moquettes.",
    highlights: [
      "Tout le contenu de l'Essentielle",
      "Sièges tissu shampooinés en profondeur",
      "Moquettes et tapis injectés-extraits",
    ],
    inclusions: [
      "Tout le contenu de la formule Essentielle",
      "Shampoing des sièges en tissu par injection-extraction",
      "Shampoing des moquettes et des tapis",
      "Traitement des taches courantes (boissons, boue, traces d'usage)",
      "Séchage contrôlé avant restitution",
    ],
    recommended: true,
    image: "formules/confort.jpg",
  },
  {
    id: "prestige",
    name: "Prestige",
    price: 120,
    duration: "≈ 4 h",
    tagline: "Le nettoyage le plus complet, vapeur et finitions comprises.",
    highlights: [
      "Tout le contenu de la formule Confort",
      "Décontamination vapeur de l'habitacle",
      "Finitions poste par poste, au pinceau",
    ],
    inclusions: [
      "Tout le contenu de la formule Confort",
      "Nettoyage vapeur : assainit sans détremper les matériaux",
      "Détail des commandes, contours de boutons et grilles au pinceau",
      "Traitement anti-odeurs de l'habitacle",
      "Dressing final des plastiques, aspect d'origine",
    ],
    image: "formules/prestige.jpg",
  },
];

export const options: Option[] = [
  {
    id: "cuir-alcantara",
    label: "Cuir / Alcantara",
    price: 20,
    description: "Nettoyant dédié puis lait nourrissant : le cuir reste souple et ne craquelle pas.",
    icon: "leather",
  },
  {
    id: "poils-animaux",
    label: "Poils d'animaux",
    price: 10,
    description: "Brosse spéciale et passage minutieux là où l'aspirateur seul ne suffit pas.",
    icon: "pet",
  },
  {
    id: "ciel-de-toit",
    label: "Ciel de toit",
    price: 30,
    description: "Nettoyage délicat du plafond, sans décoller le tissu ni laisser d'auréoles.",
    icon: "roof",
  },
  {
    id: "vehicule-tres-sale",
    label: "Véhicule très sale",
    price: 20,
    description: "Temps et produits supplémentaires pour un habitacle très encrassé ou négligé.",
    icon: "deep",
  },
  {
    id: "ceramique-vitres",
    label: "Céramique vitres",
    price: 30,
    description: "Traitement hydrophobe du pare-brise : l'eau perle, la visibilité gagne sous la pluie.",
    icon: "glass",
  },
  {
    id: "lave-glace",
    label: "Liquide lave-glace",
    price: 10,
    description: "Vérification et remise à niveau du lave-glace avant restitution.",
    icon: "washer",
  },
  {
    id: "pression-pneus",
    label: "Pression des pneus",
    price: 5,
    description: "Contrôle et ajustement de la pression des quatre pneus aux valeurs constructeur.",
    icon: "tire",
  },
];

export const vehicleCategories: VehicleCategory[] = [
  { id: "citadine", label: "Citadine", examples: "Clio, 208, C3, Twingo, Polo…", priceModifier: 0 },
  { id: "berline-break", label: "Berline / Break", examples: "Mégane, 308 SW, Passat, Classe C…", priceModifier: 0 },
  { id: "suv", label: "SUV / 4x4", examples: "3008, Captur, Tiguan, Duster…", priceModifier: 0 },
  { id: "monospace-familial", label: "Monospace & Familial", examples: "Scénic, C4 Picasso, Espace, Sharan…", priceModifier: 0 },
  { id: "utilitaire", label: "Utilitaire professionnel", examples: "Kangoo, Berlingo, Trafic, Master…", priceModifier: 0 },
];

/* ------------------------------------------------------------------ */

export function getFormula(id: FormulaId): Formula {
  const f = formulas.find((x) => x.id === id);
  if (!f) throw new Error(`Formule inconnue : ${id}`);
  return f;
}

export function getOption(id: OptionId): Option {
  const o = options.find((x) => x.id === id);
  if (!o) throw new Error(`Option inconnue : ${id}`);
  return o;
}

export function getVehicle(id: VehicleId): VehicleCategory {
  const v = vehicleCategories.find((x) => x.id === id);
  if (!v) throw new Error(`Catégorie inconnue : ${id}`);
  return v;
}

export function computeTotal(
  formulaId: FormulaId,
  vehicleId: VehicleId,
  optionIds: OptionId[]
): number {
  const base = getFormula(formulaId).price + getVehicle(vehicleId).priceModifier;
  return optionIds.reduce((sum, id) => sum + getOption(id).price, base);
}

export const formatPrice = (n: number) => `${n}\u00A0€`;

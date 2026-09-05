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
  /** Phrase de contexte affichée dans le tunnel, quand elle aide à choisir. */
  note?: string;
  highlights: [string, string, string];
  inclusions: { label: string; detail?: string }[];
  /** Étiquette courte affichée sur la carte. Une seule formule doit en porter une. */
  badge?: string;
  recommended?: boolean;
  image: string;
}

export interface Option {
  id: OptionId;
  label: string;
  price: number; // EUR TTC
  description: string;
  /** Étiquette courte. Réservée aux deux options qui changent vraiment la décision. */
  badge?: string;
  /** Nom d'icône rendu par components/ui/OptionIcon.tsx */
  icon: "leather" | "pet" | "roof" | "deep" | "glass" | "washer" | "tire";
}

export interface VehicleCategory {
  id: VehicleId;
  label: string;
  /** Modèles repères, pour que le client se reconnaisse sans hésiter. */
  examples: string[];
  /** Silhouette dessinée par components/ui/VehicleSilhouette.tsx */
  silhouette: VehicleId;
  /** Modificateur de prix en EUR appliqué à la formule (0 par défaut). */
  priceModifier: number;
}

export const formulas: Formula[] = [
  {
    id: "essentielle",
    name: "Essentielle",
    price: 70,
    duration: "2 h à 3 h",
    tagline: "L'entretien intérieur efficace",
    highlights: [
      "Aspiration complète, coffre inclus",
      "Plastiques nettoyés et désinfectés",
      "Vitres intérieures sans traces",
    ],
    inclusions: [
      { label: "Aspiration de tout l'habitacle" },
      { label: "Nettoyage en profondeur des moquettes et du coffre" },
      { label: "Shampoing des tapis" },
      { label: "Nettoyage et désinfection des plastiques" },
      { label: "Cadres de portes et vitres intérieures" },
    ],
    image: "formules/essentielle.jpg",
  },
  {
    id: "confort",
    name: "Confort",
    price: 90,
    duration: "3 h à 4 h 30",
    tagline: "L'équilibre entre le temps passé et le résultat",
    highlights: [
      "Tout le contenu de l'Essentielle",
      "Sièges shampooinés et désinfectés",
      "Plastiques protégés contre les UV",
    ],
    inclusions: [
      { label: "Tout le contenu de la formule Essentielle" },
      { label: "Protection des plastiques", detail: "Anti-UV et anti-blanchissement" },
      { label: "Shampoing et désinfection des sièges" },
      { label: "Nettoyage des rails de sièges" },
      { label: "Senteur d'habitacle au choix" },
    ],
    badge: "Le plus demandé",
    recommended: true,
    image: "formules/confort.jpg",
  },
  {
    id: "prestige",
    name: "Prestige",
    price: 120,
    duration: "4 h 30 à 6 h",
    tagline: "La rénovation intérieure complète",
    note: "Le choix des vendeurs et des acheteurs : un habitacle qui se présente comme en concession.",
    highlights: [
      "Tout le contenu du Confort",
      "Désinfection vapeur de l'habitacle",
      "Zones cachées et recoins traités",
    ],
    inclusions: [
      { label: "Tout le contenu de la formule Confort" },
      { label: "Shampoing des moquettes" },
      {
        label: "Désinfection vapeur : habitacle, moquettes, tapis et coffre",
        detail: "Élimine 99,99 % des bactéries",
      },
      { label: "Nettoyage de la boîte à gants" },
      { label: "Nettoyage approfondi du compartiment de roue de secours" },
      { label: "Zones difficiles d'accès sous la banquette arrière" },
    ],
    image: "formules/prestige.jpg",
  },
];

export const options: Option[] = [
  {
    id: "cuir-alcantara",
    label: "Entretien cuir / Alcantara",
    price: 20,
    description:
      "Soin nourrissant puis protection hydrophobe. À refaire environ tous les 6 mois pour que le cuir reste souple.",
    badge: "Le plus demandé",
    icon: "leather",
  },
  {
    id: "poils-animaux",
    label: "Poils d'animaux",
    price: 10,
    description:
      "Extraction des poils incrustés dans les textiles, là où l'aspiration seule ne suffit pas.",
    badge: "Nécessaire si vous transportez un animal",
    icon: "pet",
  },
  {
    id: "ciel-de-toit",
    label: "Nettoyage du ciel de toit",
    price: 30,
    description:
      "Saletés, traces de cigarette et auréoles éliminées sans décoller le tissu du plafond.",
    icon: "roof",
  },
  {
    id: "vehicule-tres-sale",
    label: "Véhicule très sale",
    price: 20,
    description:
      "Supplément de temps pour une forte remise en état : sable, boue, paille, chantier.",
    icon: "deep",
  },
  {
    id: "ceramique-vitres",
    label: "Protection céramique des vitres",
    price: 30,
    description:
      "Traitement hydrophobe : l'eau perle, la visibilité gagne sous la pluie. Tient 6 à 12 mois.",
    icon: "glass",
  },
  {
    id: "lave-glace",
    label: "Remplissage du lave-glace",
    price: 10,
    description: "Remise à niveau avec un produit adapté à la saison.",
    icon: "washer",
  },
  {
    id: "pression-pneus",
    label: "Pression des pneus",
    price: 5,
    description: "Contrôle et ajustement des quatre pneus aux valeurs constructeur.",
    icon: "tire",
  },
];

export const vehicleCategories: VehicleCategory[] = [
  {
    id: "citadine",
    label: "Citadine",
    examples: ["Peugeot 208", "Renault Clio", "Citroën C3", "VW Polo", "Toyota Yaris"],
    silhouette: "citadine",
    priceModifier: 0,
  },
  {
    id: "berline-break",
    label: "Berline / Break",
    examples: ["Peugeot 508", "Audi A4", "BMW Série 3", "VW Golf", "Škoda Octavia"],
    silhouette: "berline-break",
    priceModifier: 0,
  },
  {
    id: "suv",
    label: "SUV / 4x4",
    examples: ["Peugeot 3008", "VW Tiguan", "BMW X3", "Audi Q5", "Renault Austral"],
    silhouette: "suv",
    priceModifier: 0,
  },
  {
    id: "monospace-familial",
    label: "Monospace & familial",
    examples: ["Peugeot 5008", "Renault Espace", "Citroën Berlingo", "Kangoo 5 places"],
    silhouette: "monospace-familial",
    priceModifier: 0,
  },
  {
    id: "utilitaire",
    label: "Utilitaire professionnel",
    examples: ["Fourgons", "Véhicules d'artisan", "Bennes", "Cabines approfondies"],
    silhouette: "utilitaire",
    priceModifier: 0,
  },
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

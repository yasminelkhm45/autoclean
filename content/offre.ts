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

/** Tarif et durée d'une formule pour une catégorie de véhicule donnée. */
export interface Tarif {
  /** EUR TTC. `null` signifie « sur devis » : aucun total ne peut être calculé. */
  price: number | null;
  /** `true` quand le prix est un plancher et non un tarif ferme. */
  from?: boolean;
  duration: string;
}

export interface Formula {
  id: FormulaId;
  name: string;
  /** Un tarif par catégorie de véhicule. */
  tarifs: Record<VehicleId, Tarif>;
  tagline: string;
  /** Phrase de contexte affichée dans le tunnel, quand elle aide à choisir. */
  note?: string;
  highlights: [string, string, string];
  inclusions: { label: string; detail?: string }[];
  /** Étiquette courte affichée sur la carte. Une seule formule doit en porter une. */
  badge?: string;
  /** Texte alternatif du visuel, décrivant réellement la photo. */
  imageAlt: string;
  /** Contenu de la page dédiée /prestations/[id]. */
  page: {
    metaTitle: string;
    metaDescription: string;
    intro: string;
    forWho: string[];
    notFor: string;
    process: { title: string; text: string }[];
  };
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
  /** Émoji affiché devant la description dans le tunnel. */
  emoji: string;
}

export interface VehicleCategory {
  id: VehicleId;
  label: string;
  /** Modèles repères, pour que le client se reconnaisse sans hésiter. */
  examples: string[];
  /** Illustration dans public/images/vehicules/, même gabarit pour les cinq. */
  image: string;
  /** Avertissement affiché quand le tarif de la catégorie est indicatif. */
  quoteNotice?: string;
}

export const formulas: Formula[] = [
  {
    id: "essentielle",
    name: "Essentielle",
    tarifs: {
      citadine: { price: 60, duration: "1 h 30 à 2 h 30" },
      "berline-break": { price: 70, duration: "2 h à 3 h" },
      suv: { price: 80, duration: "2 h 30 à 4 h" },
      "monospace-familial": { price: 100, duration: "3 h 30 à 5 h" },
      utilitaire: { price: 80, from: true, duration: "Sur devis" },
    },
    tagline: "L'entretien intérieur efficace",
    highlights: [
      "Aspiration complète, coffre inclus",
      "Plastiques nettoyés et désinfectés",
      "Vitres intérieures sans traces",
    ],
    inclusions: [
      { label: "Aspiration habitacle" },
      { label: "Nettoyage en profondeur moquettes et coffre" },
      { label: "Shampoing des tapis" },
      { label: "Nettoyage et désinfection des plastiques" },
      { label: "Cadres de portes et vitres intérieures" },
    ],
    page: {
      metaTitle: "Formule Essentielle : dès 60 €",
      metaDescription:
        "Aspiration, plastiques désinfectés, vitres intérieures et tapis shampooinés. De 60 à 100 € selon la catégorie du véhicule, à Die dans la Drôme.",
      intro:
        "L'Essentielle est l'entretien de fond d'un habitacle déjà suivi. Elle remet à zéro tout ce qui se voit et se touche au quotidien, sans passer par le shampoing des sièges. C'est la formule qui convient à un véhicule nettoyé une à deux fois par an.",
      forWho: [
        "Un véhicule entretenu régulièrement, sans tache ni odeur installée",
        "Un entretien de saison, typiquement au printemps après les mois de pluie",
        "Un budget maîtrisé, avec la possibilité d'ajouter une option ciblée",
      ],
      notFor:
        "Si les sièges portent des taches ou si une odeur s'est installée, l'Essentielle n'ira pas assez loin : il faut l'extraction de la formule Confort.",
      process: [
        {
          title: "Aspiration intégrale",
          text: "Sièges, moquettes, tapis, coffre, rails et interstices. C'est la base de tout : aucune méthode ne fonctionne sur un habitacle encore chargé de particules.",
        },
        {
          title: "Plastiques et surfaces",
          text: "Nettoyage puis désinfection de la planche de bord, de la console, des contre-portes et des commandes, avec un produit qui ne laisse pas de film gras.",
        },
        {
          title: "Vitres et cadres de portes",
          text: "Les vitres se nettoient côté intérieur, là où se dépose le film qui gêne la visibilité de nuit. Les cadres et seuils, souvent oubliés, sont traités à part.",
        },
        {
          title: "Shampoing des tapis",
          text: "Les tapis sortent du véhicule et sont lavés séparément, puis séchés avant d'être remis en place.",
        },
      ],
    },
    image: "formules/essentielle.jpg",
    imageAlt:
      "Tableau de bord et aérateurs nets d'une voiture entretenue, vus depuis la place du conducteur",
  },
  {
    id: "confort",
    name: "Confort",
    tarifs: {
      citadine: { price: 80, duration: "2 h 30 à 4 h" },
      "berline-break": { price: 90, duration: "3 h à 4 h 30" },
      suv: { price: 100, duration: "4 h à 5 h 30" },
      "monospace-familial": { price: 130, duration: "5 h à 7 h" },
      utilitaire: { price: 110, from: true, duration: "Sur devis" },
    },
    tagline: "L'équilibre parfait pour votre véhicule",
    highlights: [
      "Tout le contenu de l'Essentielle",
      "Sièges shampooinés et désinfectés",
      "Plastiques protégés contre les UV",
    ],
    inclusions: [
      { label: "Tous les éléments de la formule Essentielle" },
      { label: "Protection des plastiques", detail: "Protection UV et anti-blanchissement" },
      { label: "Shampoing et désinfection des sièges" },
      { label: "Rails de sièges" },
      { label: "Senteurs" },
    ],
    badge: "Le plus demandé",
    recommended: true,
    page: {
      metaTitle: "Formule Confort : sièges lavés dès 80 €",
      metaDescription:
        "Shampoing et désinfection des sièges, protection anti-UV des plastiques, rails et senteur. De 80 à 130 € selon le véhicule, à Die dans la Drôme.",
      intro:
        "La Confort est le premier niveau où l'habitacle change vraiment d'aspect, parce qu'on retire la saleté au lieu de la déplacer. C'est notre formule la plus demandée, et celle que nous recommandons dans le doute.",
      forWho: [
        "Des sièges tissu marqués, ternis ou tachés",
        "Un véhicule familial, avec les traces habituelles de la vie à bord",
        "Un habitacle qui n'a pas été nettoyé en profondeur depuis plus d'un an",
      ],
      notFor:
        "Pour une préparation avant vente, une odeur de tabac installée ou un ciel de toit marqué, la formule Prestige reste plus adaptée.",
      process: [
        {
          title: "Tout le contenu de l'Essentielle",
          text: "Aspiration intégrale, plastiques, vitres et cadres de portes sont traités d'abord, dans le même ordre.",
        },
        {
          title: "Shampoing des sièges par injection-extraction",
          text: "Une solution chaude est injectée dans la fibre puis ré-aspirée immédiatement, chargée de ce qu'elle a décollé. La saleté sort du véhicule au lieu d'être étalée.",
        },
        {
          title: "Protection des plastiques",
          text: "Application d'un traitement anti-UV qui limite le blanchissement de la planche de bord, principal signe de vieillissement visuel d'un habitacle.",
        },
        {
          title: "Rails de sièges et finitions",
          text: "Les rails concentrent poussière, miettes et gravier. Ils sont dégagés, puis l'habitacle reçoit la senteur de votre choix.",
        },
      ],
    },
    image: "formules/confort.jpg",
    imageAlt:
      "Siège de voiture shampooiné à la brosse, mousse visible sur la sellerie, main gantée",
  },
  {
    id: "prestige",
    name: "Prestige",
    tarifs: {
      citadine: { price: 110, duration: "4 h à 5 h 30" },
      "berline-break": { price: 120, duration: "4 h 30 à 6 h" },
      suv: { price: 130, duration: "5 h 30 à 7 h" },
      "monospace-familial": { price: 160, duration: "7 h à 9 h" },
      utilitaire: { price: null, duration: "Sur devis" },
    },
    tagline: "La rénovation intérieure premium",
    badge: "Pour les passionnés du détail",
    note: "Idéal avant une vente ou après l'achat d'un véhicule.",
    highlights: [
      "Tout le contenu du Confort",
      "Désinfection vapeur de l'habitacle",
      "Zones cachées et recoins traités",
    ],
    inclusions: [
      { label: "Tous les éléments de la formule Confort" },
      { label: "Shampoing des moquettes" },
      {
        label: "Désinfection vapeur de l'habitacle, moquettes, tapis et coffre",
        detail: "Élimine 99,99 % des bactéries",
      },
      { label: "Nettoyage de la boîte à gants" },
      { label: "Nettoyage approfondi du compartiment de roue de secours" },
      { label: "Nettoyage des zones difficiles d'accès sous banquette arrière" },
    ],
    page: {
      metaTitle: "Formule Prestige : rénovation dès 110 €",
      metaDescription:
        "Désinfection vapeur, moquettes shampooinées, zones cachées et traitement des odeurs. De 110 à 160 € selon le véhicule, à Die dans la Drôme.",
      intro:
        "La Prestige est une remise en état, pas un entretien. Elle traite ce que les autres formules laissent de côté : les moquettes en profondeur, les zones inaccessibles, et tout ce qui tient de l'odeur plutôt que de la saleté visible.",
      forWho: [
        "Préparer un véhicule avant une vente entre particuliers",
        "Repartir sur une base saine après l'achat d'une occasion",
        "Un habitacle marqué par le tabac, un animal ou plusieurs années sans entretien",
      ],
      notFor:
        "Sur un véhicule déjà suivi, la Prestige est surdimensionnée : la Confort donnera un résultat très proche pour trente euros de moins.",
      process: [
        {
          title: "Tout le contenu de la Confort",
          text: "L'aspiration, les plastiques, les vitres et le shampoing des sièges sont réalisés en amont.",
        },
        {
          title: "Shampoing des moquettes",
          text: "Les moquettes fixes reçoivent le même traitement d'injection-extraction que les sièges. C'est l'étape qui change la couleur d'un plancher encrassé.",
        },
        {
          title: "Désinfection vapeur",
          text: "La vapeur assainit avec très peu d'eau et atteint ce qu'aucune brosse n'atteint : contours de commandes, grilles d'aération, coutures, rails.",
        },
        {
          title: "Zones cachées et détail",
          text: "Boîte à gants, compartiment de roue de secours, dessous de banquette arrière. Ce sont les endroits qu'un acheteur ouvre et que personne ne nettoie.",
        },
      ],
    },
    image: "formules/prestige.jpg",
    imageAlt:
      "Nettoyeur vapeur en action sur la moquette d'un habitacle, vapeur visible",
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
    emoji: "🧴",
  },
  {
    id: "poils-animaux",
    label: "Poils d'animaux",
    price: 10,
    description:
      "Extraction des poils incrustés dans les textiles, là où l'aspiration seule ne suffit pas.",
    badge: "Nécessaire si vous transportez un animal",
    icon: "pet",
    emoji: "🐾",
  },
  {
    id: "ciel-de-toit",
    label: "Nettoyage du ciel de toit",
    price: 30,
    description:
      "Saletés, traces de cigarette et auréoles éliminées sans décoller le tissu du plafond.",
    icon: "roof",
    emoji: "🧽",
  },
  {
    id: "vehicule-tres-sale",
    label: "Véhicule très sale",
    price: 20,
    description:
      "Supplément de temps pour une forte remise en état : sable, boue, paille, chantier.",
    icon: "deep",
    emoji: "🪣",
  },
  {
    id: "ceramique-vitres",
    label: "Protection céramique des vitres",
    price: 30,
    description:
      "Application d'un traitement hydrophobe : l'eau perle, et une légère protection facilite le nettoyage des moustiques et des autres contaminants routiers. Durée d'action de 6 à 12 mois.",
    icon: "glass",
    emoji: "💧",
  },
  {
    id: "lave-glace",
    label: "Remplissage du lave-glace",
    price: 10,
    description: "Remise à niveau avec un produit adapté à la saison.",
    icon: "washer",
    emoji: "💦",
  },
  {
    id: "pression-pneus",
    label: "Pression des pneus",
    price: 5,
    description: "Contrôle et ajustement des quatre pneus aux valeurs constructeur.",
    icon: "tire",
    emoji: "🛞",
  },
];

/** Dimensions communes aux cinq illustrations de véhicules. */
export const vehicleImageSize = { width: 640, height: 248 } as const;

export const vehicleCategories: VehicleCategory[] = [
  {
    id: "citadine",
    label: "Citadine",
    examples: ["Peugeot 206, 207, 208", "Renault Clio", "Citroën C3", "VW Polo", "Audi A1", "Toyota Yaris"],
    image: "/images/vehicules/citadine.png",
  },
  {
    id: "berline-break",
    label: "Berline / Break",
    examples: ["Peugeot 508", "Audi A4", "BMW Série 3", "Mercedes Classe C", "Renault Mégane", "VW Golf", "Škoda Octavia"],
    image: "/images/vehicules/berline-break.png",
  },
  {
    id: "suv",
    label: "SUV / 4x4",
    examples: ["Peugeot 2008, 3008", "VW Tiguan", "BMW X3", "Audi Q5", "Hyundai Tucson", "Renault Austral"],
    image: "/images/vehicules/suv.png",
  },
  {
    id: "monospace-familial",
    label: "Monospace & familial",
    examples: ["Peugeot 5008", "Renault Scenic, Espace", "Citroën Berlingo", "Renault Kangoo 5 places", "Ford Tourneo", "VW Caravelle"],
    image: "/images/vehicules/monospace-familial.png",
  },
  {
    id: "utilitaire",
    label: "Utilitaire professionnel",
    examples: ["Fourgons", "Véhicules d'artisan", "Bennes", "Utilitaires de chantier", "Cabines approfondies"],
    image: "/images/vehicules/utilitaire.png",
    quoteNotice:
      "Les utilitaires font l'objet d'un devis personnalisé : le volume, le type de cabine, l'état du véhicule et les équipements arrière changent tout. Les tarifs affichés sont indicatifs.",
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

/** Tarif d'une formule pour une catégorie de véhicule. */
export function getTarif(formulaId: FormulaId, vehicleId: VehicleId): Tarif {
  return getFormula(formulaId).tarifs[vehicleId];
}

/** Prix plancher d'une formule, toutes catégories confondues. */
export function minPrice(formulaId: FormulaId): number {
  const prices = Object.values(getFormula(formulaId).tarifs)
    .map((t) => t.price)
    .filter((p): p is number => p !== null);
  return Math.min(...prices);
}

/** Prix plafond d'une formule, pour le balisage AggregateOffer. */
export function maxPrice(formulaId: FormulaId): number {
  const prices = Object.values(getFormula(formulaId).tarifs)
    .map((t) => t.price)
    .filter((p): p is number => p !== null);
  return Math.max(...prices);
}

/**
 * Total estimé. Renvoie `null` quand la formule est sur devis pour cette
 * catégorie : mieux vaut afficher « sur devis » qu'un chiffre inventé.
 */
export function computeTotal(
  formulaId: FormulaId,
  vehicleId: VehicleId,
  optionIds: OptionId[]
): number | null {
  const base = getTarif(formulaId, vehicleId).price;
  if (base === null) return null;
  return optionIds.reduce((sum, id) => sum + getOption(id).price, base);
}

/** `true` si le montant affiché est un plancher et non un tarif ferme. */
export function isFromPrice(formulaId: FormulaId, vehicleId: VehicleId): boolean {
  return getTarif(formulaId, vehicleId).from === true;
}

export const formatPrice = (n: number) => `${n}\u00A0€`;

/** Montant prêt à afficher, qui gère « à partir de » et « sur devis ». */
export function formatTarif(formulaId: FormulaId, vehicleId: VehicleId): string {
  const t = getTarif(formulaId, vehicleId);
  if (t.price === null) return "Sur devis";
  return t.from ? `À partir de ${formatPrice(t.price)}` : formatPrice(t.price);
}

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
}

export interface VehicleCategory {
  id: VehicleId;
  label: string;
  /** Modèles repères, pour que le client se reconnaisse sans hésiter. */
  examples: string[];
  /** Illustration dans public/images/vehicules/, même gabarit pour les cinq. */
  image: string;
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
    page: {
      metaTitle: "Formule Essentielle, 70 € : l'entretien",
      metaDescription:
        "Aspiration complète, plastiques désinfectés, vitres intérieures et tapis shampooinés. 2 à 3 heures de travail, 70 € à Die dans la Drôme.",
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
    page: {
      metaTitle: "Formule Confort, 90 € : sièges lavés",
      metaDescription:
        "Shampoing et désinfection des sièges, protection anti-UV des plastiques, rails et senteur. 3 h à 4 h 30 de travail, 90 € à Die dans la Drôme.",
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
    page: {
      metaTitle: "Formule Prestige, 120 € : rénovation",
      metaDescription:
        "Désinfection vapeur, moquettes shampooinées, zones cachées et traitement des odeurs. 4 h 30 à 6 h de travail, 120 € à Die dans la Drôme.",
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

/** Dimensions communes aux cinq illustrations de véhicules. */
export const vehicleImageSize = { width: 640, height: 248 } as const;

export const vehicleCategories: VehicleCategory[] = [
  {
    id: "citadine",
    label: "Citadine",
    examples: ["Peugeot 208", "Renault Clio", "Citroën C3", "VW Polo", "Toyota Yaris"],
    image: "/images/vehicules/citadine.png",
    priceModifier: 0,
  },
  {
    id: "berline-break",
    label: "Berline / Break",
    examples: ["Peugeot 508", "Audi A4", "BMW Série 3", "VW Golf", "Škoda Octavia"],
    image: "/images/vehicules/berline-break.png",
    priceModifier: 0,
  },
  {
    id: "suv",
    label: "SUV / 4x4",
    examples: ["Peugeot 3008", "VW Tiguan", "BMW X3", "Audi Q5", "Renault Austral"],
    image: "/images/vehicules/suv.png",
    priceModifier: 0,
  },
  {
    id: "monospace-familial",
    label: "Monospace & familial",
    examples: ["Peugeot 5008", "Renault Espace", "Citroën Berlingo", "Kangoo 5 places"],
    image: "/images/vehicules/monospace-familial.png",
    priceModifier: 0,
  },
  {
    id: "utilitaire",
    label: "Utilitaire professionnel",
    examples: ["Fourgons", "Véhicules d'artisan", "Bennes", "Cabines approfondies"],
    image: "/images/vehicules/utilitaire.png",
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

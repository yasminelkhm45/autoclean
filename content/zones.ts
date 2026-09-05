/**
 * Communes couvertes par l'atelier de Die.
 * Chaque commune a sa page (`/zone-intervention/[slug]`) : le contenu doit donc
 * rester réellement différent d'une commune à l'autre. Des pages qui ne
 * changeraient que le nom de la ville seraient des pages satellites, mal vues
 * par Google et sans intérêt pour le lecteur.
 *
 * Distances et temps de trajet : indicatifs, à confirmer (voir NOTES-A-CONFIRMER.md).
 */
export interface Zone {
  name: string;
  slug: string;
  postalCode: string;
  /** Temps de trajet indicatif depuis l'atelier de Die. */
  travelTime: string;
  distanceKm: number;
  /** Route principale empruntée depuis la commune. */
  route: string;
  /** Deux phrases d'introduction, propres à la commune. */
  intro: string;
  /** Ce qui distingue vraiment les véhicules ou les habitudes de ce secteur. */
  context: string;
  /** Conseil pratique d'organisation pour venir depuis cette commune. */
  practical: string;
  /** Communes voisines rattachées, pour la longue traîne. */
  nearby: string[];
}

export const zones: Zone[] = [
  {
    name: "Die",
    slug: "die",
    postalCode: "26150",
    travelTime: "Atelier sur place",
    distanceKm: 0,
    route: "Atelier situé dans la commune",
    intro:
      "L'atelier est à Die : c'est ici que tout se passe, du dépôt du véhicule au contrôle final sous éclairage. Les Diois n'ont donc aucun trajet à prévoir.",
    context:
      "À Die, une bonne partie des véhicules que nous recevons vit dehors toute l'année. Le stationnement en extérieur, les allers-retours au marché et les chemins de vigne laissent le même trio de traces : poussière calcaire incrustée dans les moquettes, plastiques ternis par le soleil, et pollen au printemps.",
    practical:
      "Beaucoup de clients déposent le véhicule le matin et repartent à pied : le centre-ville et les commerces sont accessibles rapidement. Vous n'avez pas besoin d'un deuxième véhicule pour faire nettoyer le premier.",
    nearby: ["Ponet-et-Saint-Auban", "Romeyer", "Molières-Glandaz", "Barsac"],
  },
  {
    name: "Châtillon-en-Diois",
    slug: "chatillon-en-diois",
    postalCode: "26410",
    travelTime: "environ 15 minutes",
    distanceKm: 14,
    route: "D539 puis D93",
    intro:
      "Châtillon-en-Diois est à un quart d'heure de l'atelier par la D539. C'est la commune du haut Diois d'où nous voyons arriver le plus de véhicules.",
    context:
      "Les véhicules qui descendent du cirque d'Archiane ou des cols arrivent souvent avec de la terre et du gravier tassés dans les tapis, et de la boue séchée sur les seuils et les bas de portes. C'est un encrassement mécanique, pas graisseux : il part bien à l'injection-extraction, à condition de traiter aussi les seuils, que l'aspirateur oublie.",
    practical:
      "Le trajet aller-retour tient dans une matinée. Si vous préférez ne faire qu'un déplacement, déposez le véhicule à l'ouverture et récupérez-le en fin de journée : c'est le rythme le plus confortable pour les formules Confort et Prestige.",
    nearby: ["Menglon", "Saint-Roman", "Treschenu-Creyers", "Boulc"],
  },
  {
    name: "Luc-en-Diois",
    slug: "luc-en-diois",
    postalCode: "26310",
    travelTime: "environ 20 minutes",
    distanceKm: 20,
    route: "D93 en direction de Die",
    intro:
      "Luc-en-Diois se trouve à une vingtaine de minutes de l'atelier par la D93, l'axe qui remonte la vallée de la Drôme. Le trajet est direct, sans détour par les cols.",
    context:
      "Sur ce secteur, ce sont surtout des véhicules qui font beaucoup de kilomètres quotidiens : trajets domicile-travail vers Die ou Crest, siège conducteur marqué, volant lustré, et cette poussière fine qui s'installe dans les aérateurs et ressort à chaque démarrage.",
    practical:
      "Si vous descendez travailler vers Die, le dépôt du matin ne vous coûte aucun trajet supplémentaire. Dites-le-nous au téléphone : nous calons le créneau sur vos horaires plutôt que l'inverse.",
    nearby: ["Poyols", "Beaurières", "Recoubeau-Jansac", "Lesches-en-Diois"],
  },
  {
    name: "Saillans",
    slug: "saillans",
    postalCode: "26340",
    travelTime: "environ 25 minutes",
    distanceKm: 25,
    route: "D93 en remontant la vallée",
    intro:
      "Saillans est à environ 25 minutes de l'atelier, en remontant la D93 le long de la Drôme. C'est la porte d'entrée du Diois depuis la vallée.",
    context:
      "Ici, la rivière fait la différence : serviettes humides, sable et poussière de galets, sacs de baignade posés à même les sièges tout l'été. L'humidité répétée dans les tissus finit par produire une odeur de renfermé que les désodorisants masquent quelques jours seulement. C'est précisément ce que l'extraction et la vapeur traitent à la source.",
    practical:
      "Beaucoup de clients de Saillans combinent le dépôt avec une journée à Die. Prévenez-nous si votre créneau est serré : sur la formule Essentielle, deux à trois heures suffisent.",
    nearby: ["Vercheny", "Aurel", "Espenel", "Sainte-Croix"],
  },
  {
    name: "Aouste-sur-Sye",
    slug: "aouste-sur-sye",
    postalCode: "26400",
    travelTime: "environ 35 minutes",
    distanceKm: 35,
    route: "D93 via Saillans",
    intro:
      "Aouste-sur-Sye est à un peu plus d'une demi-heure de l'atelier par la D93. Le trajet se fait d'une traite, sans portion de montagne.",
    context:
      "Sur ce bas de vallée, nous recevons beaucoup de véhicules familiaux et de véhicules d'entreprise. Les sièges arrière portent les traces classiques de la vie de famille : goûters, boissons renversées, taches anciennes sur les tissus. Ce sont des salissures organiques, celles qui ressortent quelques jours après un nettoyage mal séché si l'extraction n'a pas été menée jusqu'au bout.",
    practical:
      "À cette distance, l'aller-retour dans la journée reste simple, mais autant que le déplacement serve : la formule Confort ou Prestige rentabilise mieux le trajet qu'un simple passage d'aspirateur.",
    nearby: ["Piégros-la-Clastre", "Mirabel-et-Blacons", "Suze", "Vaunaveys-la-Rochette"],
  },
  {
    name: "Crest",
    slug: "crest",
    postalCode: "26400",
    travelTime: "environ 40 minutes",
    distanceKm: 38,
    route: "D93, axe Crest vers Die",
    intro:
      "Crest est à une quarantaine de minutes de l'atelier par la D93. C'est la ville la plus importante de la vallée de la Drôme et le secteur d'où viennent le plus de véhicules professionnels.",
    context:
      "Artisans, commerciaux, véhicules de société : sur ce secteur, le nettoyage intérieur est souvent une remise en état avant restitution de leasing, avant revente, ou simplement pour ne plus recevoir un client dans un habitacle poussiéreux. Les attentes portent moins sur le parfum que sur l'état réel des sièges, du ciel de toit et des plastiques.",
    practical:
      "Pour un véhicule professionnel, nous établissons une facture au nom de l'entreprise. Si le véhicule doit être immobilisé le moins longtemps possible, dites-le à la prise de rendez-vous : nous calons la prestation sur un créneau continu.",
    nearby: ["Divajeu", "Eurre", "Chabrillan", "Allex"],
  },
  {
    name: "Livron-sur-Drôme",
    slug: "livron-sur-drome",
    postalCode: "26250",
    travelTime: "environ 50 minutes",
    distanceKm: 52,
    route: "D93 puis vallée de la Drôme",
    intro:
      "Livron-sur-Drôme marque la limite de notre zone habituelle, à une cinquantaine de minutes de l'atelier. Le déplacement se justifie surtout pour les prestations complètes.",
    context:
      "À cette distance, les demandes concernent presque toujours une remise en état sérieuse : véhicule acheté d'occasion dont on veut effacer l'historique, habitacle marqué par le tabac, ou préparation avant une vente entre particuliers. Ce sont des interventions longues, où la vapeur et le traitement des odeurs font l'essentiel du travail.",
    practical:
      "Pour un trajet de cette longueur, la formule Prestige a plus de sens qu'un passage rapide : le véhicule reste à l'atelier une demi-journée et vous ne faites le déplacement qu'une fois. Appelez-nous en amont, nous bloquons un créneau adapté.",
    nearby: ["Loriol-sur-Drôme", "Grâne", "La Voulte-sur-Rhône", "Étoile-sur-Rhône"],
  },
];

export function getZone(slug: string): Zone | undefined {
  return zones.find((z) => z.slug === slug);
}

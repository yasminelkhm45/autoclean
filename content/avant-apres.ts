/**
 * Zones photographiées avant et après prestation.
 *
 * Les fichiers attendus sont dérivés du slug :
 *   public/images/avant-apres/{slug}-avant.jpg          (16:9, 1600×900)
 *   public/images/avant-apres/{slug}-apres.jpg          (mêmes dimensions)
 *   public/images/avant-apres/{slug}-avant-vignette.jpg (480×270)
 *   public/images/avant-apres/{slug}-apres-vignette.jpg (480×270)
 *
 * Les deux photos d'une paire doivent avoir exactement les mêmes dimensions
 * et le même cadrage : sinon le curseur du comparateur fait glisser deux
 * images désalignées et l'effet tombe à plat.
 */
export interface BeforeAfterZone {
  slug: string;
  /** Nom court affiché sous la vignette. */
  label: string;
  /** Une phrase sur le travail réalisé, affichée sous le comparateur. */
  description: string;
  /** Texte alternatif de la photo « avant ». */
  altBefore: string;
  /** Texte alternatif de la photo « après ». */
  altAfter: string;
  width: number;
  height: number;
}

export const beforeAfterZones: BeforeAfterZone[] = [
  {
    slug: "sol-plastique",
    label: "Sol et tapis",
    description:
      "Tapis caoutchouc à picots chargé de terre sèche et de gravier. Les picots piègent la poussière et l'aspirateur passe au-dessus : il faut décoller puis extraire, alvéole par alvéole.",
    altBefore:
      "Tapis de sol en caoutchouc d'une voiture, couvert de terre sèche incrustée entre les picots, avant nettoyage",
    altAfter:
      "Le même tapis de sol en caoutchouc, noir et net, après nettoyage à l'atelier AutoClean Diois",
    width: 1600,
    height: 900,
  },
  {
    slug: "sol-moquette",
    label: "Sol moquette",
    description:
      "Plancher conducteur en moquette, chargé de gravier, de terre sèche et de brins de paille. L'aspirateur seul retire ce qui est en surface : le reste est pris dans la fibre et sort à l'injection-extraction.",
    altBefore:
      "Moquette de plancher conducteur couverte de gravier, de terre et de débris végétaux, avant nettoyage",
    altAfter:
      "La même moquette de plancher, uniformément noire et sans débris, après nettoyage à l'atelier AutoClean Diois",
    width: 1536,
    height: 864,
  },
  {
    slug: "sieges-cuir",
    label: "Sièges cuir",
    description:
      "Banquette arrière en cuir clair, ternie par le frottement et les traces d'usage. Nettoyant pH neutre, puis lait nourrissant : le cuir retrouve sa teinte sans être détrempé.",
    altBefore:
      "Banquette arrière en cuir beige d'une berline, grisée et marquée par l'usage, avant nettoyage",
    altAfter:
      "La même banquette en cuir beige, propre et nourrie, après nettoyage à l'atelier AutoClean Diois",
    width: 1600,
    height: 900,
  },
  {
    slug: "sieges-tissu",
    label: "Sièges tissu",
    description:
      "Siège conducteur en tissu, auréoles et salissures installées dans la fibre. Shampoing par injection-extraction : la saleté sort du véhicule au lieu d'être étalée en surface.",
    altBefore:
      "Siège conducteur en tissu noir taché et auréolé, avant shampoing par injection-extraction",
    altAfter:
      "Le même siège en tissu noir, uniforme et sans auréole, après shampoing par AutoClean Diois",
    width: 1152,
    height: 648,
  },
  {
    slug: "volant",
    label: "Volant et tableau de bord",
    description:
      "Volant lustré par les mains et poussière prise dans le grain des plastiques. Traitement au détail des commandes, des aérateurs et du combiné d'instruments.",
    altBefore:
      "Volant et tableau de bord d'une Volkswagen encrassés, volant lustré et plastiques poussiéreux, avant nettoyage",
    altAfter:
      "Le même volant et tableau de bord nettoyés au détail par AutoClean Diois, plastiques ravivés",
    width: 1600,
    height: 900,
  },
  {
    slug: "plastiques-de-porte",
    label: "Plastiques de porte",
    description:
      "Contre-porte, poignée intérieure et grille de haut-parleur. Ce sont les zones qu'on touche tous les jours et que le passage rapide d'un chiffon ne nettoie jamais vraiment.",
    altBefore:
      "Panneau de porte intérieur d'un utilitaire, poignée et plastiques encrassés, avant nettoyage",
    altAfter:
      "Le même panneau de porte, poignée et grille de haut-parleur nettoyées, après passage à l'atelier",
    width: 1600,
    height: 900,
  },
  {
    slug: "cadres-de-portes",
    label: "Cadres de portes",
    description:
      "Cadre de porte et montant, la zone qu'on ne voit que portière ouverte. Poussière, traces de pluie et dépôts sur la gâche : c'est le premier détail qu'un acheteur remarque en ouvrant la voiture.",
    altBefore:
      "Cadre de porte d'un monospace bleu, poussière et traces déposées sur la peinture et la gâche, avant nettoyage",
    altAfter:
      "Le même cadre de porte net et lustré, gâche et joints nettoyés, après passage chez AutoClean Diois",
    width: 1600,
    height: 900,
  },
];

export function zoneImagePath(slug: string, side: "avant" | "apres", thumb = false) {
  return `/images/avant-apres/${slug}-${side}${thumb ? "-vignette" : ""}.jpg`;
}

export function getZoneBySlug(slug: string) {
  return beforeAfterZones.find((z) => z.slug === slug);
}

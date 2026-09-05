/**
 * Articles de conseils.
 *
 * Chaque article répond à une question que les gens tapent réellement dans un
 * moteur de recherche, avec une réponse utile en tête de page. Ils servent à
 * deux choses : être trouvés sur des recherches d'information, et amener vers
 * les pages de prestation par des liens internes contextuels.
 *
 * Pour ajouter un article : copier un objet, changer le slug (il devient l'URL),
 * remplir les blocs. Le lien interne s'écrit [texte du lien](/chemin).
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "key"; text: string }
  | { type: "cta"; text: string; href: string; label: string };

export interface Article {
  slug: string;
  /** Titre affiché en H1 : court, sans nom de marque. */
  title: string;
  /** Balise title : 55 à 60 caractères, marque comprise via le template. */
  metaTitle: string;
  /** Meta description : 140 à 155 caractères. */
  metaDescription: string;
  /** Réponse directe, affichée juste sous le H1 et reprise dans les extraits. */
  excerpt: string;
  category: "Tarifs" | "Entretien" | "Odeurs" | "Revente" | "Méthodes";
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  readingMinutes: number;
  blocks: Block[];
  related: string[]; // slugs
}

export const articles: Article[] = [
  {
    slug: "prix-nettoyage-interieur-voiture",
    title: "Combien coûte un nettoyage intérieur de voiture ?",
    metaTitle: "Prix d'un nettoyage intérieur voiture",
    metaDescription:
      "Comptez 60 à 150 € pour un nettoyage intérieur de voiture en France. Ce qui fait varier le prix, ce qui est inclus, et ce qui justifie l'écart.",
    excerpt:
      "En France, un nettoyage intérieur professionnel se situe entre 60 et 150 € pour une voiture particulière. L'écart tient à trois choses : le temps passé, les machines utilisées et l'état de départ du véhicule.",
    category: "Tarifs",
    publishedAt: "2026-02-10",
    updatedAt: "2026-08-28",
    readingMinutes: 5,
    blocks: [
      {
        type: "h2",
        text: "Trois niveaux de prestation, trois budgets",
      },
      {
        type: "p",
        text: "Sous l'expression « nettoyage intérieur » se cachent des interventions très différentes. Un aspirateur en libre-service à 2 € et une remise en état complète à 130 € portent le même nom, ce qui explique la confusion et beaucoup de déceptions.",
      },
      {
        type: "p",
        text: "Le premier niveau est l'entretien de surface : aspiration de l'habitacle et du coffre, plastiques essuyés, vitres intérieures. Deux à trois heures de travail, entre 60 et 80 € selon les régions. C'est ce qu'il faut à un véhicule déjà suivi, une à deux fois par an.",
      },
      {
        type: "p",
        text: "Le deuxième niveau ajoute le shampoing des textiles par injection-extraction : sièges, moquettes, tapis. C'est le premier palier où le véhicule change vraiment d'aspect, parce qu'on retire la saleté au lieu de la déplacer. Comptez trois à quatre heures et 85 à 110 €.",
      },
      {
        type: "p",
        text: "Le troisième niveau est une rénovation : vapeur, ciel de toit, zones cachées, traitement des odeurs, finitions au détail. Une demi-journée de travail, 110 à 150 €. C'est le niveau demandé avant une revente ou après l'achat d'une occasion.",
      },
      {
        type: "key",
        text: "Le prix suit le temps passé, presque linéairement. Un tarif nettement en dessous du marché ne signale pas une bonne affaire mais une prestation plus courte.",
      },
      { type: "h2", text: "Ce qui fait monter la facture" },
      {
        type: "p",
        text: "Quatre facteurs pèsent réellement sur le devis, et ils sont tous liés au temps supplémentaire qu'ils imposent :",
      },
      {
        type: "ul",
        items: [
          "La taille du véhicule. Un monospace sept places représente presque deux fois la surface textile d'une citadine.",
          "L'état de départ. Un habitacle très encrassé, avec de la boue séchée ou du sable, demande une passe de dégrossissage avant même de commencer.",
          "Les matériaux. Le cuir et l'Alcantara ne se traitent pas comme un tissu : produits dédiés, application manuelle, temps de pénétration.",
          "Les poils d'animaux. Ils ne s'aspirent pas, ils s'extraient. C'est mécanique, long, et cela ne peut pas être fait vite.",
        ],
      },
      {
        type: "p",
        text: "À l'inverse, deux choses ne devraient pas faire monter le prix : le parfum d'ambiance et le lavage extérieur, qui relèvent d'un autre métier. Méfiez-vous des offres qui gonflent la note avec des lignes de ce type.",
      },
      { type: "h2", text: "Pourquoi une station de lavage ne se compare pas" },
      {
        type: "p",
        text: "L'aspirateur en libre-service coûte quelques euros et rend un vrai service entre deux prestations. Mais il ne fait qu'une chose : retirer ce qui est en surface. La saleté qui donne à un habitacle son aspect fatigué est ailleurs, prise dans la fibre des moquettes, dans le grain des plastiques et dans la mousse des sièges.",
      },
      {
        type: "p",
        text: "Un injecteur-extracteur envoie une solution chaude dans le textile puis la ré-aspire immédiatement, chargée de ce qu'elle a décollé. C'est cette étape, impossible à reproduire avec un aspirateur, qui change la couleur d'une moquette. La vapeur, elle, assainit avec très peu d'eau et atteint des recoins où aucune brosse ne passe.",
      },
      { type: "h2", text: "Est-ce que cela se rentabilise ?" },
      {
        type: "p",
        text: "Sur un véhicule que vous gardez, la réponse est surtout une question de confort et de santé : un habitacle propre, c'est moins de poussière respirée et des matériaux qui vieillissent moins vite, en particulier les plastiques exposés au soleil.",
      },
      {
        type: "p",
        text: "Sur un véhicule que vous vendez, le calcul est plus direct. Les professionnels de l'occasion préparent systématiquement les véhicules avant mise en vente, et pas par coquetterie : un intérieur soigné raccourcit le délai de vente et limite la négociation. Le sujet est développé dans notre article sur [le nettoyage avant une vente](/conseils/nettoyer-voiture-avant-vente).",
      },
      { type: "h2", text: "Nos tarifs à Die" },
      {
        type: "p",
        text: "Nos trois formules suivent exactement les trois niveaux décrits plus haut : Essentielle à 70 €, Confort à 90 € et Prestige à 120 €, options à la carte. Le tarif annoncé est celui que vous payez : il est confirmé par téléphone avant le rendez-vous, jamais découvert à l'arrivée.",
      },
      {
        type: "cta",
        text: "Le détail de ce que contient chaque formule est sur la page des prestations, et le simulateur de pré-réservation calcule votre total en deux minutes.",
        href: "/reservation",
        label: "Calculer mon tarif",
      },
    ],
    related: ["nettoyer-voiture-avant-vente", "vapeur-ou-shampoing"],
  },

  {
    slug: "enlever-tache-siege-voiture",
    title: "Enlever une tache sur un siège de voiture",
    metaTitle: "Enlever une tache sur un siège auto",
    metaDescription:
      "Café, gras, boue, encre : la méthode à appliquer selon la tache et le matériau, les erreurs qui fixent la tache, et quand il faut passer la main.",
    excerpt:
      "Une tache fraîche se traite par absorption, jamais par frottement. Une tache ancienne demande une extraction. Dans les deux cas, l'eau seule aggrave presque toujours les choses en élargissant l'auréole.",
    category: "Entretien",
    publishedAt: "2026-03-04",
    updatedAt: "2026-08-28",
    readingMinutes: 6,
    blocks: [
      { type: "h2", text: "Le premier réflexe : absorber, pas frotter" },
      {
        type: "p",
        text: "Frotter une tache fraîche fait deux choses, toutes les deux mauvaises : cela l'étale sur une surface plus large et cela la pousse plus profond dans la mousse du siège, là où elle deviendra bien plus difficile à retirer.",
      },
      {
        type: "ol",
        items: [
          "Tamponnez avec un chiffon microfibre sec ou du papier absorbant, du bord vers le centre.",
          "Changez de zone propre sur le chiffon à chaque passage, sinon vous remettez ce que vous venez de retirer.",
          "Répétez jusqu'à ce que le chiffon ressorte sec.",
          "Seulement ensuite, humidifiez très légèrement et retamponnez.",
        ],
      },
      {
        type: "key",
        text: "Du bord vers le centre, toujours. L'inverse crée l'auréole que tout le monde connaît.",
      },
      { type: "h2", text: "Selon la nature de la tache" },
      { type: "h3", text: "Café, thé, soda, jus" },
      {
        type: "p",
        text: "Ce sont des taches à base de sucre et de tanins. Elles s'enlèvent bien tant qu'elles sont fraîches, avec de l'eau tiède et un peu de savon neutre. Le piège est le sucre : mal rincé, il reste collant et attire la poussière, ce qui donne une auréole plus sombre au bout de quelques semaines. Le rinçage compte autant que le nettoyage.",
      },
      { type: "h3", text: "Gras, huile, cosmétiques" },
      {
        type: "p",
        text: "L'eau ne fait rien sur le gras, elle le repousse. Saupoudrez de la terre de Sommières ou du bicarbonate, laissez agir plusieurs heures pour absorber, puis aspirez. S'il reste une trace, il faut un produit tensioactif prévu pour les textiles automobiles, pas un dégraissant ménager qui décolorera le tissu.",
      },
      { type: "h3", text: "Boue et terre" },
      {
        type: "p",
        text: "Contre-intuitif mais essentiel : laissez sécher complètement. Une boue sèche s'aspire et se brosse ; une boue humide s'incruste définitivement dans la fibre dès que vous la touchez. C'est l'erreur la plus fréquente après une sortie en montagne.",
      },
      { type: "h3", text: "Encre, feutre, teinture" },
      {
        type: "p",
        text: "Ce sont les seules taches où il vaut mieux ne rien tenter. Les solvants domestiques dissolvent le pigment mais aussi la teinture du tissu, et le résultat est une zone décolorée pire que la tache d'origine. Sur du cuir, un feutre peut être retiré, mais uniquement avec un produit prévu pour, et jamais avec de l'alcool.",
      },
      { type: "h2", text: "Selon le matériau" },
      {
        type: "ul",
        items: [
          "Tissu : tolérant, mais il retient l'humidité. Le vrai risque est le séchage insuffisant, qui produit une odeur de moisi en deux jours.",
          "Cuir : ne jamais détremper. Un nettoyant pH neutre, puis un lait nourrissant, sans quoi le cuir sèche et craquelle.",
          "Alcantara : le plus fragile. Il se marque au frottement et perd son aspect velouté dès qu'on l'agresse. Tamponner, rien d'autre.",
          "Ciel de toit : le tissu est collé sur une mousse. Trop d'eau décolle la colle, et le ciel de toit tombe. C'est irréversible.",
        ],
      },
      { type: "h2", text: "Les erreurs qui coûtent cher" },
      {
        type: "ul",
        items: [
          "Le nettoyant ménager multi-usage : trop alcalin, il décolore les tissus automobiles et attaque les vernis des plastiques.",
          "Le nettoyeur haute pression à l'intérieur : l'eau passe sous les moquettes et stagne sur le plancher métallique.",
          "Le sèche-cheveux à pleine chaleur : il fixe les protéines des taches organiques au lieu de les retirer.",
          "Trop de produit : ce qui n'est pas rincé reste et attire la saleté. La tache revient en surface une semaine plus tard.",
        ],
      },
      { type: "h2", text: "Quand passer la main" },
      {
        type: "p",
        text: "Trois situations justifient une intervention professionnelle : une tache ancienne déjà séchée, une tache qui a traversé jusqu'à la mousse, et une tache sur un matériau délicat. Dans ces cas, l'injection-extraction retire la matière au lieu de la diluer, et le séchage contrôlé évite l'odeur de renfermé.",
      },
      {
        type: "cta",
        text: "Nos formules Confort et Prestige incluent le shampoing des sièges et le traitement des taches courantes.",
        href: "/prestations",
        label: "Voir les formules",
      },
    ],
    related: ["vapeur-ou-shampoing", "odeur-tabac-voiture"],
  },

  {
    slug: "odeur-tabac-voiture",
    title: "Faire partir une odeur de tabac dans une voiture",
    metaTitle: "Odeur de tabac dans une voiture",
    metaDescription:
      "Un désodorisant masque l'odeur de tabac quelques jours. Pour l'éliminer, il faut traiter les quatre endroits où elle se loge vraiment.",
    excerpt:
      "L'odeur de tabac ne flotte pas dans l'air : elle est déposée sur les textiles, le ciel de toit, les plastiques et le circuit de ventilation. Tant que ces quatre supports ne sont pas traités, elle revient.",
    category: "Odeurs",
    publishedAt: "2026-04-15",
    updatedAt: "2026-08-28",
    readingMinutes: 5,
    blocks: [
      { type: "h2", text: "Pourquoi les désodorisants ne suffisent jamais" },
      {
        type: "p",
        text: "La fumée de cigarette dépose un film de goudrons et de composés volatils sur toutes les surfaces de l'habitacle. Ce film continue de relarguer son odeur pendant des mois, chaque fois que la température monte, c'est-à-dire à chaque stationnement au soleil.",
      },
      {
        type: "p",
        text: "Un désodorisant ajoute une odeur par-dessus. Pendant quelques jours, le nez perçoit surtout la nouvelle. Puis le parfum s'épuise, le film est toujours là, et l'odeur revient exactement comme avant. C'est pour cela qu'un véhicule fumeur « sent le tabac et la vanille » au bout de deux semaines.",
      },
      {
        type: "key",
        text: "Tant que le dépôt n'est pas retiré, l'odeur revient. Il n'y a pas d'exception à cette règle.",
      },
      { type: "h2", text: "Les quatre supports à traiter" },
      { type: "h3", text: "1. Les textiles" },
      {
        type: "p",
        text: "Sièges, moquettes et tapis absorbent le plus. Ils se traitent par injection-extraction : la solution chaude décolle le dépôt dans la fibre, l'aspiration l'évacue immédiatement. C'est le poste qui représente la plus grosse part du résultat.",
      },
      { type: "h3", text: "2. Le ciel de toit" },
      {
        type: "p",
        text: "C'est le support le plus exposé, parce que la fumée monte, et le plus souvent oublié. Il se nettoie sans détremper le tissu, sous peine de décoller la colle et de le faire tomber. Un ciel de toit de véhicule fumeur passe généralement du beige au blanc cassé : la différence est visible à l'œil nu.",
      },
      { type: "h3", text: "3. Les plastiques et les vitres" },
      {
        type: "p",
        text: "Le film jaunâtre déposé sur le pare-brise intérieur et les plastiques est du goudron. Il se retire au nettoyant adapté, jamais à l'eau seule. En prime, la visibilité de nuit s'améliore nettement une fois le pare-brise dégraissé côté intérieur.",
      },
      { type: "h3", text: "4. Le circuit de ventilation" },
      {
        type: "p",
        text: "L'odeur circule aussi par la ventilation. Le filtre d'habitacle se change, c'est peu coûteux et souvent négligé. Sans cela, le circuit rediffuse l'odeur dans un habitacle pourtant propre.",
      },
      { type: "h2", text: "Ce qui fonctionne à la maison, et ses limites" },
      {
        type: "ul",
        items: [
          "Aérer largement plusieurs jours : utile en complément, insuffisant seul.",
          "Bicarbonate de soude sur les moquettes, une nuit, puis aspiration : réduit l'odeur de surface, n'atteint pas la mousse.",
          "Vinaigre blanc dilué sur les plastiques : dégraisse correctement, à condition de rincer.",
          "Changer soi-même le filtre d'habitacle : accessible sur la plupart des modèles, c'est le meilleur rapport effort/résultat.",
        ],
      },
      {
        type: "p",
        text: "Ces gestes font baisser l'intensité de l'odeur. Ils ne l'éliminent pas sur un véhicule fumé quotidiennement pendant des années, parce qu'ils n'atteignent ni la mousse des sièges ni le ciel de toit.",
      },
      { type: "h2", text: "Le traitement professionnel" },
      {
        type: "p",
        text: "En atelier, la séquence est toujours la même : extraction des textiles, nettoyage du ciel de toit, dégraissage des plastiques et des vitres, puis vapeur pour assainir les zones inaccessibles. Le séchage contrôlé termine le travail : un textile mal séché remplace une odeur par une autre.",
      },
      {
        type: "p",
        text: "Sur un véhicule fumeur depuis longtemps, il faut être honnête : on obtient un habitacle neutre, pas un habitacle neuf. Certains dépôts ont migré dans des mousses qu'aucune machine n'atteint sans démonter les sièges.",
      },
      {
        type: "cta",
        text: "Le traitement complet des odeurs fait partie de la formule Prestige, avec la désinfection vapeur de l'habitacle.",
        href: "/prestations",
        label: "Voir la formule Prestige",
      },
    ],
    related: ["poils-animaux-voiture", "nettoyer-voiture-avant-vente"],
  },

  {
    slug: "poils-animaux-voiture",
    title: "Poils d'animaux dans la voiture : les retirer vraiment",
    metaTitle: "Enlever les poils d'animaux en voiture",
    metaDescription:
      "Les poils de chien et de chat ne s'aspirent pas : ils s'accrochent à la fibre. Les méthodes qui marchent, celles qui font perdre du temps.",
    excerpt:
      "Un poil d'animal n'est pas de la poussière : il se visse dans la trame du tissu et l'aspiration passe au-dessus. Il faut d'abord le décrocher mécaniquement, ensuite seulement aspirer.",
    category: "Entretien",
    publishedAt: "2026-05-06",
    updatedAt: "2026-08-28",
    readingMinutes: 4,
    blocks: [
      { type: "h2", text: "Pourquoi l'aspirateur seul échoue" },
      {
        type: "p",
        text: "Un poil animal possède des écailles microscopiques orientées dans un sens. Au contact d'un tissu, il s'y ancre comme un minuscule crochet, et l'électricité statique le plaque encore davantage. Le flux d'air d'un aspirateur, même puissant, passe au-dessus sans le déloger.",
      },
      {
        type: "p",
        text: "C'est pour cela qu'on peut aspirer un siège pendant dix minutes et le retrouver couvert de poils dès qu'on passe la main dessus. Le problème n'est pas la puissance, c'est le principe.",
      },
      { type: "h2", text: "L'ordre des opérations" },
      {
        type: "ol",
        items: [
          "Décrocher : brosse en caoutchouc, gant de toilettage ou raclette, en passant toujours dans le même sens pour rassembler les poils en amas.",
          "Rassembler : les amas se retirent à la main, c'est plus rapide que n'importe quelle machine.",
          "Aspirer : maintenant seulement, avec un embout brosse, pour prendre ce qui reste en surface.",
          "Finir : un rouleau adhésif sur les zones verticales, portes et dossiers, que la brosse atteint mal.",
        ],
      },
      {
        type: "key",
        text: "Inverser les deux premières étapes double le temps passé pour un résultat moitié moindre.",
      },
      { type: "h2", text: "Les astuces qui marchent réellement" },
      {
        type: "ul",
        items: [
          "Le gant en latex ou un ballon de baudruche frotté : la charge statique attire les poils. Efficace et gratuit.",
          "Une brosse en caoutchouc dure, plus efficace que toutes les brosses à poils souples.",
          "Un léger brumisateur d'eau : humidifier à peine casse la statique et alourdit les poils, qui se rassemblent au lieu de voler.",
          "Une raclette de fenêtre en caoutchouc, remarquablement efficace sur les moquettes.",
        ],
      },
      {
        type: "p",
        text: "En revanche, le rouleau adhésif seul sur un siège entier est une perte de temps, et l'aspirateur sans embout brosse ne fait presque rien.",
      },
      { type: "h2", text: "Prévenir plutôt que rattraper" },
      {
        type: "p",
        text: "Une housse ou une couverture dédiée, lavée régulièrement, évite l'essentiel du problème. Sur les véhicules de propriétaires de chiens, c'est le seul geste qui change durablement la donne. Le coffre, souvent laissé nu, est celui qui accumule le plus.",
      },
      { type: "h2", text: "Le passage en atelier" },
      {
        type: "p",
        text: "Sur un véhicule utilisé quotidiennement avec un animal, les poils finissent par migrer partout : rails de sièges, entre l'assise et le dossier, sous les tapis, dans les grilles d'aération. L'extraction complète demande de démonter ce qui se démonte sans outil et d'y passer le temps nécessaire, brosse en main.",
      },
      {
        type: "p",
        text: "S'ajoute souvent une odeur, distincte du problème visuel : elle vient du sébum déposé sur les textiles, et se traite comme les autres odeurs organiques, par extraction puis vapeur. Le principe est le même que pour [l'odeur de tabac](/conseils/odeur-tabac-voiture).",
      },
      {
        type: "cta",
        text: "L'option « poils d'animaux » couvre cette extraction approfondie, en complément de la formule choisie.",
        href: "/reservation",
        label: "Ajouter l'option",
      },
    ],
    related: ["odeur-tabac-voiture", "enlever-tache-siege-voiture"],
  },

  {
    slug: "nettoyer-voiture-avant-vente",
    title: "Nettoyer sa voiture avant de la vendre",
    metaTitle: "Nettoyer sa voiture avant de la vendre",
    metaDescription:
      "Un habitacle soigné raccourcit le délai de vente et limite la négociation. Ce qu'il faut traiter en priorité et dans quel ordre s'y prendre.",
    excerpt:
      "L'acheteur juge l'entretien mécanique d'après ce qu'il voit de l'entretien visible. Un habitacle négligé fait naître un doute sur le reste, et ce doute se paie au moment de négocier.",
    category: "Revente",
    publishedAt: "2026-06-02",
    updatedAt: "2026-08-28",
    readingMinutes: 5,
    blocks: [
      { type: "h2", text: "Ce que l'acheteur lit dans un habitacle" },
      {
        type: "p",
        text: "Personne ne peut vérifier l'état d'un moteur en cinq minutes sur un parking. Alors l'acheteur se fie à ce qu'il peut évaluer : la propreté, l'état des sièges, l'odeur. Ce sont des indices d'entretien, et ils décident de l'ambiance de la négociation avant même le premier mot.",
      },
      {
        type: "p",
        text: "Un habitacle propre envoie un message simple : ce véhicule a été suivi. Un habitacle négligé ouvre la porte à toutes les questions, et l'acheteur baisse son offre pour se couvrir d'un risque qu'il ne peut pas mesurer. C'est exactement la raison pour laquelle les professionnels de l'occasion préparent systématiquement leurs véhicules avant de les exposer.",
      },
      {
        type: "key",
        text: "Le nettoyage ne cache aucun défaut mécanique. Il évite d'en faire imaginer.",
      },
      { type: "h2", text: "Les postes qui comptent le plus" },
      {
        type: "p",
        text: "Tout ne se vaut pas. Si le temps ou le budget est limité, l'ordre de priorité est le suivant :",
      },
      {
        type: "ol",
        items: [
          "L'odeur. C'est la première chose perçue à l'ouverture de la portière, et la plus difficile à faire oublier.",
          "Les sièges, en particulier le siège conducteur, celui que l'acheteur regarde en premier parce qu'il trahit le kilométrage réel.",
          "Le volant et le levier de vitesse : lustrés et brillants, ils signalent l'usure mieux que le compteur.",
          "Les plastiques du tableau de bord, dont l'aspect terne vieillit visuellement un véhicule de plusieurs années.",
          "Les vitres intérieures, dont le film gras est immédiatement visible à contre-jour.",
        ],
      },
      { type: "h2", text: "Ce qu'il ne faut pas faire" },
      {
        type: "ul",
        items: [
          "Noyer l'habitacle sous un désodorisant puissant : cela signale à l'acheteur qu'on lui cache une odeur.",
          "Appliquer un rénovateur plastique brillant : l'effet gras est reconnaissable et fait douteux.",
          "Nettoyer la veille de la visite sans laisser sécher : un habitacle humide sent le renfermé au moment précis où il faut convaincre.",
          "Oublier le coffre, la boîte à gants et les vide-poches, que tout acheteur sérieux ouvre.",
        ],
      },
      { type: "h2", text: "Quand s'y prendre" },
      {
        type: "p",
        text: "Faites nettoyer le véhicule avant la séance photo de l'annonce, pas après. Les photos font le premier tri : elles décident du nombre d'appels que vous recevrez, et donc de votre marge de négociation. Un habitacle net sur les photos attire des acheteurs déjà mieux disposés.",
      },
      {
        type: "p",
        text: "Comptez trois à cinq jours entre le nettoyage et les visites, le temps que tout soit parfaitement sec et que l'habitacle retrouve une odeur neutre plutôt qu'une odeur de produit.",
      },
      { type: "h2", text: "Et après un achat d'occasion ?" },
      {
        type: "p",
        text: "La démarche symétrique a autant de sens. Un véhicule d'occasion arrive avec l'historique de son précédent propriétaire : ses miettes, ses odeurs, ses poils d'animaux. Une remise en état complète au moment de l'achat repart d'une base saine, et c'est le meilleur moment pour le faire, avant d'avoir pris ses habitudes dedans.",
      },
      {
        type: "cta",
        text: "La formule Prestige est celle qui correspond à une préparation de vente ou à une remise en état après achat.",
        href: "/prestations",
        label: "Voir les formules",
      },
    ],
    related: ["prix-nettoyage-interieur-voiture", "odeur-tabac-voiture"],
  },

  {
    slug: "vapeur-ou-shampoing",
    title: "Vapeur ou shampoing : quelle méthode pour quel matériau",
    metaTitle: "Vapeur ou shampoing : que choisir ?",
    metaDescription:
      "L'injection-extraction retire la saleté des textiles, la vapeur assainit sans détremper. Deux méthodes complémentaires, un usage par matériau.",
    excerpt:
      "L'injection-extraction et la vapeur ne sont pas concurrentes : la première retire la saleté des textiles, la seconde assainit et atteint ce qui est inaccessible. Le bon réflexe est de savoir laquelle va où.",
    category: "Méthodes",
    publishedAt: "2026-07-08",
    updatedAt: "2026-08-28",
    readingMinutes: 5,
    blocks: [
      { type: "h2", text: "L'injection-extraction, en deux mots" },
      {
        type: "p",
        text: "La machine injecte une solution chaude dans la fibre du textile, puis la ré-aspire dans le même mouvement, chargée de tout ce qu'elle vient de décoller. La saleté sort du véhicule au lieu d'être déplacée à sa surface, et c'est exactement ce que l'on voit dans la cuve de récupération à la fin.",
      },
      {
        type: "p",
        text: "C'est la seule méthode qui change réellement la couleur d'une moquette encrassée. Sa limite est l'eau qu'elle introduit : sans aspiration suffisante et sans séchage contrôlé, le textile reste humide et développe une odeur en deux jours.",
      },
      { type: "h2", text: "La vapeur, en deux mots" },
      {
        type: "p",
        text: "La vapeur travaille à haute température avec très peu d'eau. Elle décolle les résidus, assainit les surfaces et se glisse dans les endroits qu'aucune brosse n'atteint : contours de boutons, grilles d'aération, rails de sièges, coutures.",
      },
      {
        type: "p",
        text: "Sa limite est symétrique : elle décolle mais n'extrait pas. Sur une moquette très encrassée, elle remonte la saleté en surface sans l'évacuer. D'où l'ordre logique, vapeur puis extraction, ou extraction puis vapeur selon le poste traité.",
      },
      {
        type: "key",
        text: "L'extraction retire, la vapeur assainit. Un habitacle vraiment propre utilise les deux, à des endroits différents.",
      },
      { type: "h2", text: "Quelle méthode pour quel matériau" },
      {
        type: "ul",
        items: [
          "Sièges tissu et moquettes : injection-extraction. C'est le seul moyen de sortir la saleté de la mousse.",
          "Cuir : ni l'une ni l'autre. Un nettoyant pH neutre puis un lait nourrissant, sans excès d'eau ni chaleur.",
          "Alcantara : vapeur à distance, très légère. L'extraction écrase les fibres et le matériau perd son velouté.",
          "Plastiques et commandes : vapeur, qui atteint les reliefs et les contours de boutons.",
          "Ciel de toit : vapeur uniquement, et prudemment. L'eau décolle l'adhésif, et un ciel de toit tombé ne se recolle pas.",
          "Grilles d'aération : vapeur, suivie d'un passage au pinceau.",
        ],
      },
      { type: "h2", text: "Le point que tout le monde sous-estime : le séchage" },
      {
        type: "p",
        text: "La plupart des mauvaises expériences de nettoyage intérieur ne viennent pas du nettoyage lui-même, mais du séchage. Un textile rendu humide développe une odeur de renfermé en quarante-huit heures, et cette odeur est plus difficile à traiter que la saleté d'origine.",
      },
      {
        type: "p",
        text: "C'est aussi pourquoi la durée annoncée d'une prestation compte : trois à quatre heures ne sont pas trois heures de frottage, elles incluent le temps de pénétration des produits et le séchage. Un nettoyage intérieur complet rendu en quarante-cinq minutes n'a pas séché.",
      },
      { type: "h2", text: "Et le nettoyage à sec ?" },
      {
        type: "p",
        text: "Les mousses et sprays dits « sans rinçage » ont leur utilité sur une tache isolée et fraîche, ou quand aucune machine n'est disponible. Sur un habitacle entier, ils déposent un résidu qui reste dans la fibre et attire la poussière : le véhicule se resalit plus vite qu'avant.",
      },
      {
        type: "cta",
        text: "Nos formules combinent les deux méthodes selon les matériaux de votre véhicule, avec un séchage contrôlé avant restitution.",
        href: "/prestations",
        label: "Voir le détail des formules",
      },
    ],
    related: ["enlever-tache-siege-voiture", "prix-nettoyage-interieur-voiture"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const articlesByDate = [...articles].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

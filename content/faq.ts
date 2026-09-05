/**
 * Questions / réponses.
 * `home: true` = affichée dans la FAQ courte de l'accueil.
 * Règle AEO : chaque réponse commence par une phrase qui répond directement,
 * puis développe.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  home?: boolean;
}

export const faq: FaqItem[] = [
  {
    id: "duree",
    question: "Combien de temps dure une prestation ?",
    answer:
      "Comptez environ 2 heures pour la formule Essentielle, 3 heures pour la Confort et 4 heures pour la Prestige. La durée exacte dépend de l'état du véhicule et des options choisies : nous vous donnons un créneau précis lors de l'appel de confirmation, et nous vous prévenons si le séchage des sièges demande un peu plus de temps.",
    home: true,
  },
  {
    id: "produits",
    question: "Quels produits utilisez-vous ?",
    answer:
      "Nous travaillons uniquement avec des produits professionnels de detailing, choisis par type de matériau : nettoyants dédiés pour le tissu, le cuir, les plastiques et les vitres. Chaque produit est appliqué à la bonne dilution, ce qui nettoie en profondeur sans agresser les surfaces ni laisser de film gras.",
    home: true,
  },
  {
    id: "lieu",
    question: "Où se déroule la prestation ?",
    answer:
      "La prestation se déroule dans notre atelier à Die, à l'abri et avec tout notre équipement à demeure : injecteur-extracteur, vapeur, éclairage de contrôle. Vous déposez le véhicule au créneau convenu et vous le récupérez une fois le travail terminé : nous vous prévenons dès qu'il est prêt.",
    home: true,
  },
  {
    id: "vider",
    question: "Dois-je vider mon véhicule avant de venir ?",
    answer:
      "Oui, dans la mesure du possible : retirez vos effets personnels (documents, sièges enfant, objets de valeur) avant de déposer le véhicule. Cela nous fait gagner du temps sur la prestation elle-même et évite toute manipulation de vos affaires. Pas besoin en revanche de pré-nettoyer quoi que ce soit, c'est notre travail.",
  },
  {
    id: "odeurs",
    question: "Pouvez-vous éliminer les mauvaises odeurs (tabac, animaux, humidité) ?",
    answer:
      "Oui : nous traitons la cause de l'odeur, pas seulement le symptôme. Les odeurs s'incrustent dans les textiles ; le shampoing par injection-extraction et le nettoyage vapeur en viennent à bout dans la grande majorité des cas (tabac, animal, lait renversé, humidité). Un désodorisant seul masque l'odeur quelques jours ; l'extraction la supprime.",
    home: true,
  },
  {
    id: "entretien",
    question: "Comment entretenir mon habitacle après la prestation ?",
    answer:
      "Un coup d'aspirateur régulier et un chiffon microfibre légèrement humide sur les plastiques suffisent à prolonger le résultat plusieurs mois. Évitez les lingettes brillantes qui encrassent les surfaces, et traitez les taches rapidement avant qu'elles ne s'incrustent.",
  },
  {
    id: "frequence",
    question: "À quelle fréquence faire nettoyer l'intérieur de sa voiture ?",
    answer:
      "Pour un usage courant, un nettoyage complet une à deux fois par an maintient l'habitacle en bon état. Si vous transportez des enfants, des animaux, ou si le véhicule sert au travail, un passage tous les 4 à 6 mois est plus adapté. Entre deux prestations complètes, la formule Essentielle suffit souvent en entretien.",
  },
  {
    id: "paiement",
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Vous pouvez régler par carte bancaire, en espèces ou par virement, au moment de récupérer votre véhicule. Aucun paiement n'est demandé en ligne : la pré-réservation ne vous engage à rien tant que le créneau n'est pas confirmé ensemble par téléphone.",
    home: true,
  },
  /* ---- Questions AEO / recherche conversationnelle ---- */
  {
    id: "lavage-vs-detailing",
    question: "Quelle différence entre un lavage classique et un detailing intérieur ?",
    answer:
      "Un lavage classique dépoussière ; un detailing intérieur remet l'habitacle dans un état proche de l'origine. Concrètement : shampoing des sièges en profondeur, extraction de la saleté incrustée dans les moquettes, nettoyage des recoins au pinceau, traitement des plastiques. C'est un travail de plusieurs heures avec un matériel qu'on ne trouve pas en station de lavage.",
    home: true,
  },
  {
    id: "taches-anciennes",
    question: "Pouvez-vous enlever des taches anciennes ou incrustées ?",
    answer:
      "Dans la plupart des cas, oui : l'injection-extraction dissout puis aspire la tache au cœur de la fibre, là où un nettoyage de surface ne fait que l'étaler. Certaines taches très anciennes (teinture, brûlure, javel) peuvent laisser une trace atténuée : nous vous disons honnêtement ce qui est rattrapable dès le dépôt du véhicule.",
  },
  {
    id: "vehicules-societe",
    question: "Prenez-vous en charge les véhicules de société et les utilitaires ?",
    answer:
      "Oui, nous nettoyons les véhicules professionnels : utilitaires, véhicules de service et de flotte. Nous établissons une facture au nom de l'entreprise et le règlement par virement est accepté. Pour plusieurs véhicules, contactez-nous directement : nous organisons les passages pour limiter l'immobilisation.",
  },
  {
    id: "delai-rdv",
    question: "Quel est le délai pour obtenir un rendez-vous ?",
    answer:
      "En général, nous proposons un créneau sous une à deux semaines. Après votre pré-réservation en ligne, nous vous rappelons sous 24 h ouvrées pour convenir ensemble de la date qui vous arrange. Pour un besoin urgent (départ, revente), signalez-le dans le formulaire : nous faisons notre possible.",
  },
  {
    id: "vapeur-materiaux",
    question: "Le nettoyage vapeur abîme-t-il les matériaux de l'habitacle ?",
    answer:
      "Non, correctement utilisée, la vapeur est au contraire l'une des méthodes les plus douces : elle nettoie et assainit avec très peu d'eau et sans produit agressif. Le point clé est la maîtrise de la température et de la distance selon le matériau (cuir, tissu, plastique), ce qui fait partie de notre métier.",
  },
  {
    id: "avant-revente",
    question: "Un nettoyage intérieur vaut-il le coup avant de revendre sa voiture ?",
    answer:
      "Oui : un habitacle impeccable rassure l'acheteur, accélère la vente et se répercute directement sur le prix négocié. Pour une revente, la formule Confort ou Prestige est la plus adaptée : sièges shampooinés, odeurs traitées, plastiques ravivés : le véhicule se présente comme en sortie de concession.",
  },
];

export const homeFaq = faq.filter((q) => q.home).slice(0, 6);

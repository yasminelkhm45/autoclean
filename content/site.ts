/**
 * Informations générales du site.
 * ⚠️ Les champs marqués « À CONFIRMER » sont des hypothèses de travail :
 * voir NOTES-A-CONFIRMER.md à la racine du projet.
 */
export const site = {
  name: "AutoClean Diois",
  legalName: "AutoClean Diois", // À CONFIRMER (raison sociale exacte, SIRET)
  url: "https://autoclean-diois.fr",
  phone: "06 07 66 98 87",
  phoneHref: "tel:+33607669887",
  email: "contact@autoclean-diois.fr", // À CONFIRMER
  instagram: "https://www.instagram.com/autoclean_diois",
  instagramHandle: "@autoclean_diois",
  googleBusinessUrl: "https://g.page/autoclean-diois", // À CONFIRMER (lien fiche Google)
  address: {
    street: "", // À CONFIRMER (rue et numéro exacts de l'atelier)
    postalCode: "26150",
    city: "Solaure-en-Diois",
    region: "Auvergne-Rhône-Alpes",
    country: "FR",
  },
  /** Nom court employé dans les textes courants : « l'atelier, à Solaure ». */
  cityShort: "Solaure",
  /** Ville de référence du bassin, celle que les clients cherchent. */
  mainTown: "Die",
  // Point GPS de la mairie de Solaure-en-Diois, à affiner sur l'atelier exact.
  geo: { latitude: 44.7133, longitude: 5.4307 },
  openingHours: [
    // À CONFIRMER
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "18:00" },
    { days: ["Saturday"], opens: "09:00", closes: "12:00" },
  ],
  openingHoursLabel: [
    "Lundi au vendredi : 8h30 à 18h00",
    "Samedi : 9h00 à 12h00 (sur rendez-vous)",
  ],
  priceRange: "60€ – 160€",
  rating: { value: 5, count: 12, source: "Google" }, // À CONFIRMER (nombre d'avis exact)
  clientsCount: "Plus de 50 clients satisfaits",
  paymentMethods: ["Carte bancaire", "Espèces", "Virement"],
  callbackDelay: "sous 24 h ouvrées", // Délai de rappel annoncé. À CONFIRMER
} as const;

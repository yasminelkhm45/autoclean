/**
 * Informations générales du site.
 * ⚠️ Les champs marqués « À CONFIRMER » sont des hypothèses de travail :
 * voir NOTES-A-CONFIRMER.md à la racine du projet.
 */
export const site = {
  name: "AutoClean Diois",
  legalName: "AutoClean Diois", // À CONFIRMER (raison sociale exacte, SIRET)
  url: "https://autoclean-diois.fr",
  phone: "+33 6 00 00 00 00", // À CONFIRMER
  phoneHref: "tel:+33600000000", // À CONFIRMER
  email: "contact@autoclean-diois.fr", // À CONFIRMER
  instagram: "https://www.instagram.com/autoclean_diois",
  instagramHandle: "@autoclean_diois",
  googleBusinessUrl: "https://g.page/autoclean-diois", // À CONFIRMER (lien fiche Google)
  address: {
    street: "Zone artisanale de Chamarges", // À CONFIRMER (adresse exacte de l'atelier)
    postalCode: "26150",
    city: "Die",
    region: "Auvergne-Rhône-Alpes",
    country: "FR",
  },
  geo: { latitude: 44.7539, longitude: 5.3697 }, // À CONFIRMER (coordonnées de l'atelier)
  openingHours: [
    // À CONFIRMER
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "18:00" },
    { days: ["Saturday"], opens: "09:00", closes: "12:00" },
  ],
  openingHoursLabel: [
    "Lundi – vendredi : 8h30 – 18h00",
    "Samedi : 9h00 – 12h00 (sur rendez-vous)",
  ],
  priceRange: "70€ – 120€",
  rating: { value: 5, count: 12, source: "Google" }, // À CONFIRMER (nombre d'avis exact)
  clientsCount: "Plus de 50 clients satisfaits",
  paymentMethods: ["Carte bancaire", "Espèces", "Virement"],
  callbackDelay: "sous 24 h ouvrées", // Délai de rappel annoncé. À CONFIRMER
} as const;

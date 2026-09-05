/**
 * Avis clients réels uniquement : ne jamais inventer d'avis.
 * Pour ajouter un avis : copier un objet, coller le texte exact laissé par le client.
 */
export interface Review {
  author: string;
  text: string;
  rating: 5 | 4 | 3 | 2 | 1;
  source: "Google";
}

export const reviews: Review[] = [
  {
    author: "Lea G.",
    text: "Très satisfaite de la prestation, ma voiture est comme neuve. Travail soigné et personne de confiance, je recommande !",
    rating: 5,
    source: "Google",
  },
  {
    author: "Caroline L.",
    text: "Prestation impeccable, intérieur nickel et équipe très professionnelle. Je recommande vivement.",
    rating: 5,
    source: "Google",
  },
];

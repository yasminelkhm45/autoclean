/**
 * Communes couvertes. À CONFIRMER avec le client avant mise en ligne.
 * Pour ajouter une commune : ajouter un objet { name, travelTime }.
 */
export interface Zone {
  name: string;
  travelTime: string; // temps de trajet indicatif depuis l'atelier de Die
}

export const zones: Zone[] = [
  { name: "Die", travelTime: "Atelier sur place" },
  { name: "Châtillon-en-Diois", travelTime: "≈ 15 min" },
  { name: "Luc-en-Diois", travelTime: "≈ 20 min" },
  { name: "Saillans", travelTime: "≈ 20 min" },
  { name: "Aouste-sur-Sye", travelTime: "≈ 30 min" },
  { name: "Crest", travelTime: "≈ 35 min" },
  { name: "Livron-sur-Drôme", travelTime: "≈ 50 min" },
];

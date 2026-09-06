import { brandOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Prestations et tarifs AutoClean Diois";

export default function OgImage() {
  return brandOg("Formules de 60 à 160 €");
}

import { brandOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Résultats avant / après AutoClean Diois";

export default function OgImage() {
  return brandOg("Avant / après : jugez sur pièces");
}

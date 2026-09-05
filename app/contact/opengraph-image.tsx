import { brandOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contact AutoClean Diois";

export default function OgImage() {
  return brandOg("Parlons de votre voiture");
}

import { brandOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "AutoClean Diois, nettoyage automobile intérieur à Die";

export default function OgImage() {
  return brandOg("Votre voiture, comme neuve.");
}

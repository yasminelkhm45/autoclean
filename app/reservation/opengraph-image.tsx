import { brandOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Pré-réservation en ligne AutoClean Diois";

export default function OgImage() {
  return brandOg("Pré-réservez en 2 minutes");
}

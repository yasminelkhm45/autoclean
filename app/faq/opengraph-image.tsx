import { brandOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "FAQ AutoClean Diois";

export default function OgImage() {
  return brandOg("Vos questions, nos réponses");
}

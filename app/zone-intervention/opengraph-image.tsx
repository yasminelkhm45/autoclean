import { brandOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Zone d'intervention AutoClean Diois";

export default function OgImage() {
  return brandOg("Die et tout le Diois");
}

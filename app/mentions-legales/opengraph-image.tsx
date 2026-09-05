import { brandOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "AutoClean Diois";

export default function OgImage() {
  return brandOg("Mentions légales");
}

import { brandOg, ogSize, ogContentType } from "@/lib/og";
import { zones, getZone } from "@/content/zones";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Zone d'intervention AutoClean Diois";

export function generateStaticParams() {
  return zones.map((z) => ({ commune: z.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ commune: string }> }) {
  const { commune } = await params;
  const z = getZone(commune);
  return brandOg(z ? `Nettoyage intérieur à ${z.name}` : "Die et le Diois");
}

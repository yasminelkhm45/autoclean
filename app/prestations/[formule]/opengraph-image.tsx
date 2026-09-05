import { brandOg, ogSize, ogContentType } from "@/lib/og";
import { formulas, formatPrice } from "@/content/offre";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Formules de nettoyage intérieur AutoClean Diois";

export function generateStaticParams() {
  return formulas.map((f) => ({ formule: f.id }));
}

export default async function OgImage({ params }: { params: Promise<{ formule: string }> }) {
  const { formule } = await params;
  const f = formulas.find((x) => x.id === formule);
  return brandOg(f ? `Formule ${f.name}, ${formatPrice(f.price)}` : "Nos formules");
}

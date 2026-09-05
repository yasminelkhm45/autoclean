import { brandOg, ogSize, ogContentType } from "@/lib/og";
import { articles, getArticle } from "@/content/articles";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Conseils d'entretien AutoClean Diois";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return brandOg(getArticle(slug)?.title ?? "Conseils d'entretien intérieur");
}

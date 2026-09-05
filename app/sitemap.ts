import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { formulas } from "@/content/offre";
import { site } from "@/content/site";
import { zones } from "@/content/zones";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statiques: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "monthly" },
    { path: "/prestations", priority: 0.9, freq: "monthly" },
    { path: "/reservation", priority: 0.9, freq: "monthly" },
    { path: "/avant-apres", priority: 0.8, freq: "monthly" },
    { path: "/zone-intervention", priority: 0.8, freq: "monthly" },
    { path: "/conseils", priority: 0.7, freq: "weekly" },
    { path: "/faq", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.5, freq: "yearly" },
    { path: "/mentions-legales", priority: 0.1, freq: "yearly" },
    { path: "/politique-de-confidentialite", priority: 0.1, freq: "yearly" },
  ];

  return [
    ...statiques.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...formulas.map((f) => ({
      url: `${site.url}/prestations/${f.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...zones.map((z) => ({
      url: `${site.url}/zone-intervention/${z.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/conseils/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}

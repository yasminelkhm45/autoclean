import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "", priority: 1 },
    { path: "/prestations", priority: 0.9 },
    { path: "/reservation", priority: 0.9 },
    { path: "/avant-apres", priority: 0.8 },
    { path: "/zone-intervention", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
    { path: "/mentions-legales", priority: 0.1 },
    { path: "/politique-de-confidentialite", priority: 0.1 },
  ];
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}

import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Manifeste d'application web.
 *
 * Le fichier livré par le générateur de favicons déclarait les deux icônes en
 * `maskable`, ce qui est faux ici : Android rogne une icône maskable dans un
 * cercle couvrant 80 % de la surface, et les lobes de l'éclaboussure arrivent
 * à 16 px du bord. Les icônes fournies sont donc déclarées en `any`, et deux
 * versions dédiées, recentrées sur fond noir, servent au format maskable.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, nettoyage automobile intérieur à ${site.address.city}`,
    short_name: site.name,
    description:
      "Nettoyage intérieur de voiture en atelier à Die, dans le Diois. Formules de 60 à 160 €, pré-réservation en ligne.",
    lang: "fr-FR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFFFFF",
    theme_color: "#000000",
    categories: ["business", "lifestyle"],
    icons: [
      { src: "/icons/icon-96.png", sizes: "96x96", type: "image/png", purpose: "any" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

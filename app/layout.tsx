import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/sections/Header";
import { Footer, MobileActionBar } from "@/components/sections/Footer";
import { site } from "@/content/site";

/*
 * Fontes self-hostées en woff2 (aucun CDN tiers).
 * Display : Bricolage Grotesque 800, substitut web de Steg Regular (licence
 * web indisponible), choisi pour ses graisses lourdes et son dessin géométrique.
 * Texte : Inter, substitut neutre d'Helvetica Neue.
 * next/font génère automatiquement les métriques de repli (size-adjust) → CLS nul au swap.
 */
const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-latin-800-normal.woff2",
  weight: "800",
  display: "swap",
  variable: "--font-bricolage",
  adjustFontFallback: "Arial",
  preload: true,
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600" },
  ],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: "Arial",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AutoClean Diois | Nettoyage automobile intérieur à Die",
    template: "%s | AutoClean Diois",
  },
  description:
    "Nettoyage intérieur de voiture en atelier à Solaure, près de Die (Drôme) : aspiration, shampoing des sièges, vapeur. De 60 à 160 €. Pré-réservez en ligne.",
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
};

/* Barre de navigateur assortie à l'en-tête du site sur mobile. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${inter.variable}`}>
      {/*
        suppressHydrationWarning : de nombreuses extensions de navigateur
        (gestionnaires de mots de passe, pipettes à couleurs, bloqueurs)
        ajoutent leurs propres attributs sur <body> avant que React n'hydrate.
        React signale alors une différence entre le HTML du serveur et celui du
        client, alors que le code n'y est pour rien. La consigne ne couvre que
        les attributs de cette balise, pas son contenu.
      */}
      <body suppressHydrationWarning>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}

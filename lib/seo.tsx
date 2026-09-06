import type { Metadata } from "next";
import { site } from "@/content/site";
import { formulas, formatPrice, minPrice, maxPrice } from "@/content/offre";
import { zones } from "@/content/zones";
import type { FaqItem } from "@/content/faq";

/** Métadonnées communes : title, description, canonical absolu, OG/Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "fr_FR",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Rendu inline d'un bloc JSON-LD. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** LocalBusiness > AutomotiveBusiness > AutoWash : accueil uniquement. */
export function autoWashJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    "@id": `${site.url}/#atelier`,
    name: site.name,
    url: site.url,
    telephone: site.phone,
    priceRange: site.priceRange,
    image: `${site.url}/images/og/default.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: zones.map((z) => ({ "@type": "City", name: z.name })),
    sameAs: [site.instagram, site.googleBusinessUrl],
    // Une fourchette plutôt qu'un prix unique : le tarif suit la catégorie
    // de véhicule, et annoncer un chiffre ferme serait inexact.
    makesOffer: formulas.map((f) => ({
      "@type": "AggregateOffer",
      "@id": `${site.url}/prestations#${f.id}`,
      priceCurrency: "EUR",
      lowPrice: minPrice(f.id),
      highPrice: maxPrice(f.id),
      offerCount: 5,
      itemOffered: {
        "@type": "Service",
        name: `Nettoyage intérieur, formule ${f.name}`,
        description: `${f.tagline} À partir de ${formatPrice(minPrice(f.id))} selon la catégorie de véhicule.`,
        serviceType: "Nettoyage automobile intérieur",
        areaServed: "Diois, Drôme",
        provider: { "@id": `${site.url}/#atelier` },
      },
    })),
  };
}

/** FAQPage : utilisé uniquement sur /faq pour éviter le balisage dupliqué. */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

/** Article de conseils : type Article, suffisant et stable côté Google. */
export function articleJsonLd(a: {
  slug: string;
  title: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
}) {
  const url = `${site.url}/conseils/${a.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: a.title,
    description: a.metaDescription,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    inLanguage: "fr-FR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/marque/logo-noir.svg`,
      },
    },
  };
}

/** Service détaillé : utilisé sur les pages de formule et de commune. */
export function serviceJsonLd({
  name,
  description,
  url,
  priceRange,
  areaServed,
}: {
  name: string;
  description: string;
  url: string;
  /** [plancher, plafond] : le tarif dépend de la catégorie de véhicule. */
  priceRange?: [number, number];
  areaServed: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    serviceType: "Nettoyage automobile intérieur",
    url,
    provider: {
      "@type": "AutoWash",
      "@id": `${site.url}/#atelier`,
      name: site.name,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressCountry: site.address.country,
      },
    },
    areaServed: areaServed.map((n) => ({ "@type": "City", name: n })),
    ...(priceRange && {
      offers: {
        "@type": "AggregateOffer",
        lowPrice: priceRange[0],
        highPrice: priceRange[1],
        priceCurrency: "EUR",
        offerCount: 5,
        availability: "https://schema.org/InStock",
        url: `${site.url}/reservation`,
      },
    }),
  };
}

export function imageObjectJsonLd(
  images: { url: string; caption: string; width?: number; height?: number }[]
) {
  return images.map((img) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: img.url,
    url: img.url,
    caption: img.caption,
    ...(img.width && { width: img.width }),
    ...(img.height && { height: img.height }),
    creditText: site.name,
    creator: { "@type": "Organization", name: site.name },
  }));
}

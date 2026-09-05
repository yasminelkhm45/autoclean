import type { Metadata } from "next";
import { site } from "@/content/site";
import { formulas, formatPrice } from "@/content/offre";
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
    makesOffer: formulas.map((f) => ({
      "@type": "Offer",
      "@id": `${site.url}/prestations#${f.id}`,
      priceCurrency: "EUR",
      price: f.price,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: f.price,
        priceCurrency: "EUR",
        valueAddedTaxIncluded: true,
      },
      itemOffered: {
        "@type": "Service",
        name: `Nettoyage intérieur, formule ${f.name}`,
        description: `${f.tagline} À partir de ${formatPrice(f.price)}, durée ${f.duration}.`,
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

export function imageObjectJsonLd(images: { url: string; caption: string }[]) {
  return images.map((img) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: img.url,
    caption: img.caption,
  }));
}

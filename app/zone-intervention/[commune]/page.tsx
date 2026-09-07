import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { formulas, formatPrice, minPrice } from "@/content/offre";
import { site } from "@/content/site";
import { zones, getZone } from "@/content/zones";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return zones.map((z) => ({ commune: z.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ commune: string }>;
}) {
  const { commune } = await params;
  const z = getZone(commune);
  if (!z) return {};
  const court = z.name.length > 12;
  const base =
    z.distanceKm === 0
      ? `Nettoyage intérieur de voiture à ${z.name} (${z.postalCode}) : notre atelier est dans la commune.`
      : `Nettoyage intérieur de voiture pour ${z.name} (${z.postalCode}), à ${z.distanceKm} km de notre atelier de Solaure, ${z.travelTime} de trajet.`;
  const suite = " Formules de 60 à 160 €, pré-réservation en ligne.";
  const description = (base + suite).length <= 158 ? base + suite : `${base} Formules de 60 à 160 €.`;

  return pageMetadata({
    title: court
      ? `Nettoyage voiture à ${z.name}`
      : `Nettoyage intérieur voiture à ${z.name}`,
    description,
    path: `/zone-intervention/${z.slug}`,
  });
}

export default async function CommunePage({
  params,
}: {
  params: Promise<{ commune: string }>;
}) {
  const { commune } = await params;
  const zone = getZone(commune);
  if (!zone) notFound();
  const others = zones.filter((z) => z.slug !== zone.slug);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `Nettoyage intérieur de voiture à ${zone.name}`,
          description: `Nettoyage automobile intérieur pour les habitants de ${zone.name} et des environs, réalisé à l'atelier de Solaure-en-Diois.`,
          url: `${site.url}/zone-intervention/${zone.slug}`,
          areaServed: [zone.name, ...zone.nearby],
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Zone d'intervention", href: "/zone-intervention" },
          { name: zone.name, href: `/zone-intervention/${zone.slug}` },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 pt-8 text-center sm:px-6">
        <h1 className="display text-[length:var(--text-display-xl)]">
          Nettoyage intérieur de voiture à {zone.name}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed">{zone.intro}</p>

        <dl className="border-noir/12 mt-6 grid gap-4 rounded-[var(--radius-card)] border p-5 text-center sm:grid-cols-3">
          <div>
            <dt className="text-noir/55 text-sm">Distance de l'atelier</dt>
            <dd className="mt-1 font-semibold">
              {zone.distanceKm === 0 ? "Sur place" : `${zone.distanceKm} km`}
            </dd>
          </div>
          <div>
            <dt className="text-noir/55 text-sm">Temps de trajet</dt>
            <dd className="mt-1 font-semibold">{zone.travelTime}</dd>
          </div>
          <div>
            <dt className="text-noir/55 text-sm">Itinéraire</dt>
            <dd className="mt-1 font-semibold">{zone.route}</dd>
          </div>
        </dl>
      </div>

      <section aria-labelledby="specificites" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 id="specificites" className="display text-center text-[length:var(--text-display-md)]">
          Ce que nous voyons sur les véhicules de {zone.name}
        </h2>
        <p className="text-noir/80 mx-auto mt-4 max-w-2xl text-center leading-relaxed">{zone.context}</p>

        <h2 className="display mt-10 text-center text-[length:var(--text-display-md)]">
          Comment s'organiser depuis {zone.name}
        </h2>
        <p className="text-noir/80 mx-auto mt-4 max-w-2xl text-center leading-relaxed">{zone.practical}</p>
        <p className="text-noir/80 mx-auto mt-4 max-w-2xl text-center leading-relaxed">
          Le travail se fait exclusivement à l'atelier, à {site.cityShort} :
          l'injecteur-extracteur, la vapeur et l'éclairage de contrôle ne se
          transportent pas. Vous déposez le véhicule au créneau convenu et nous
          vous prévenons dès qu'il est prêt.
        </p>
      </section>

      <section aria-labelledby="formules" className="bg-noir text-blanc">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
          <h2 id="formules" className="display text-center text-[length:var(--text-display-md)]">
            Nos formules, mêmes tarifs pour tout le Diois
          </h2>
          <p className="text-gris mx-auto mt-3 max-w-xl text-center">
            Aucun supplément de distance : le tarif ne dépend que de la formule et
            des options choisies.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {formulas.map((f) => (
              <li key={f.id}>
                <Link
                  href={`/prestations/${f.id}`}
                  className="border-blanc/20 hover:border-jaune block h-full rounded-[var(--radius-card)] border p-5 text-center transition-colors"
                >
                  <p className="display text-xl">{f.name}</p>
                  <p className="display text-jaune mt-2 text-3xl">
                    dès {formatPrice(minPrice(f.id))}
                  </p>
                  <p className="text-gris mt-3 text-sm leading-relaxed">{f.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <ButtonLink href="/reservation" variant="yellow">
              Pré-réserver depuis {zone.name}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="alentours" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 id="alentours" className="display text-center text-[length:var(--text-display-md)]">
          Autour de {zone.name}
        </h2>
        <p className="text-noir/70 mx-auto mt-4 max-w-2xl text-center">
          Nous recevons également les véhicules de {zone.nearby.slice(0, -1).join(", ")} et{" "}
          {zone.nearby[zone.nearby.length - 1]}.
        </p>

        <h2 className="display mt-10 text-center text-[length:var(--text-display-md)]">
          Les autres communes couvertes
        </h2>
        <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {others.map((z) => (
            <li key={z.slug}>
              <Link
                href={`/zone-intervention/${z.slug}`}
                className="border-noir/45 hover:border-noir inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm transition-colors"
              >
                {z.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-noir/60 mt-6 text-center text-sm">
          Retour à la{" "}
          <Link href="/zone-intervention" className="font-medium underline underline-offset-4">
            carte de la zone d'intervention
          </Link>
          .
        </p>
      </section>
    </>
  );
}

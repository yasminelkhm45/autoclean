import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";
import { zones } from "@/content/zones";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Zone d'intervention : Die et le Diois",
  description:
    "Atelier de nettoyage automobile à Die (26150). Clients de Châtillon-en-Diois, Saillans, Crest et de toute la vallée de la Drôme : temps de trajet indicatifs.",
  path: "/zone-intervention",
});

export default function ZoneInterventionPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Zone d'intervention", href: "/zone-intervention" }]} />

      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6">
        <p className="eyebrow">Où nous trouver</p>
        <h1 className="display mx-auto mt-3 max-w-3xl text-[length:var(--text-display-xl)]">
          Nettoyage de voiture à Die et dans le Diois
        </h1>
        <div className="text-noir/75 mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-relaxed">
          <p>
            Notre atelier se trouve à Die ({site.address.postalCode}), au cœur de la
            vallée de la Drôme. Le travail se fait exclusivement en atelier&nbsp;: c'est ce
            qui nous permet d'utiliser l'injecteur-extracteur, la vapeur et un éclairage
            de contrôle. Un matériel qui ne se transporte pas.
          </p>
          <p>
            Nos clients viennent de Die bien sûr, mais aussi de tout le Diois et de la
            vallée jusqu'à Crest et Livron. Le principe est simple&nbsp;: vous déposez le
            véhicule le matin ou en début d'après-midi, et vous profitez de Die le temps
            de la prestation, ou vous combinez le dépôt avec vos courses et
            rendez-vous sur place.
          </p>
        </div>
      </div>

      <section className="section-pad-sm">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="display text-[length:var(--text-display-md)]">
              Temps de trajet indicatifs
            </h2>
            <table className="mt-6 hidden w-full text-left sm:table">
              <caption className="sr-only">
                Communes couvertes, distance et temps de trajet jusqu'à l'atelier de Die
              </caption>
              <thead>
                <tr className="border-noir border-b-2">
                  <th scope="col" className="py-3 pr-4 font-semibold">Commune</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Distance</th>
                  <th scope="col" className="py-3 font-semibold">Trajet</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((z) => (
                  <tr key={z.slug} className="border-gris/60 border-b">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      <Link
                        href={`/zone-intervention/${z.slug}`}
                        className="font-medium underline-offset-4 hover:underline"
                      >
                        {z.name}
                      </Link>
                      <span className="text-noir/60 block text-sm">{z.postalCode}</span>
                    </th>
                    <td className="py-3 pr-4">
                      {z.distanceKm === 0 ? "Sur place" : `${z.distanceKm} km`}
                    </td>
                    <td className="py-3">{z.travelTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Sous 640px, trois colonnes deviennent illisibles : on empile. */}
            <ul className="divide-noir/10 mt-6 divide-y sm:hidden">
              {zones.map((z) => (
                <li key={z.slug} className="py-3">
                  <Link
                    href={`/zone-intervention/${z.slug}`}
                    className="flex min-h-11 items-center justify-between gap-3"
                  >
                    <span>
                      <span className="font-medium underline-offset-4">{z.name}</span>
                      <span className="text-noir/60 block text-sm">{z.postalCode}</span>
                    </span>
                    <span className="text-noir/70 shrink-0 text-right text-sm">
                      {z.distanceKm === 0 ? "Sur place" : `${z.distanceKm} km`}
                      <span className="text-noir/60 block">{z.travelTime}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-noir/60 mt-4 text-sm">
              Chaque commune a sa page, avec le détail du trajet et ce que nous
              observons sur les véhicules du secteur. Vous venez d'ailleurs&nbsp;?
              Vous êtes les bienvenus : appelez-nous, on s'organise.
            </p>
          </div>
          <div>
            <h2 className="display text-[length:var(--text-display-md)]">L'atelier</h2>
            <address className="mt-4 not-italic leading-relaxed">
              <strong>{site.name}</strong>
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
            <ul className="text-noir/75 mt-3 text-sm leading-relaxed">
              {site.openingHoursLabel.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="mt-6">
              <MapEmbed
                query={`${site.name}, ${site.address.postalCode} ${site.address.city}`}
                label="Carte Google Maps de l'atelier AutoClean Diois à Die"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <ButtonLink href="/reservation">Pré-réserver ma prestation</ButtonLink>
        </div>
      </section>
    </>
  );
}

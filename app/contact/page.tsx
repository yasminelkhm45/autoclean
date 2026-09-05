import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact et accès à l'atelier de Die",
  description:
    "Une question sur nos prestations ? Appelez-nous, écrivez-nous ou passez à l'atelier à Die (26150). Horaires, adresse et plan d'accès.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-3 max-w-3xl text-[length:var(--text-display-xl)]">
          Une question ? Parlons-en.
        </h1>
        <p className="text-noir/70 mt-5 max-w-2xl text-lg">
          Ce formulaire sert aux questions. Pour réserver une prestation, passez
          plutôt par la <a href="/reservation" className="underline underline-offset-4">pré-réservation en ligne</a> :
          c'est plus rapide pour vous comme pour nous.
        </p>
      </div>

      <section className="section-pad-sm">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="display text-[length:var(--text-display-sm)]">Écrivez-nous</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="display text-[length:var(--text-display-sm)]">Ou plus direct</h2>
              <a
                href={site.phoneHref}
                className="bg-noir text-blanc mt-5 inline-flex min-h-12 items-center gap-3 rounded-full px-7 py-3.5 text-lg font-semibold"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3A19.5 19.5 0 0 1 5.2 13 19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.9.7a2 2 0 0 1 1.7 2Z" />
                </svg>
                {site.phone}
              </a>
              <p className="mt-4">
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
                  Instagram {site.instagramHandle}
                </a>{" "}
                pour voir nos dernières réalisations en photos.
              </p>
            </div>
            <div>
              <h2 className="display text-[length:var(--text-display-sm)]">L'atelier</h2>
              <address className="mt-4 not-italic leading-relaxed">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </address>
              <ul className="text-noir/75 mt-3 text-sm leading-relaxed">
                {site.openingHoursLabel.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="mt-5">
                <MapEmbed
                  query={`${site.name}, ${site.address.postalCode} ${site.address.city}`}
                  label="Carte Google Maps de l'atelier AutoClean Diois à Die"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

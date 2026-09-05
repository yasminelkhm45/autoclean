import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { BeforeAfter, beforeAfterZones } from "@/components/sections/BeforeAfter";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";
import { pageMetadata, JsonLd, imageObjectJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Avant / après : nos résultats en photos",
  description:
    "Sièges, moquettes, volant, plastiques : comparez l'avant et l'après de nos nettoyages intérieurs réalisés en atelier à Die. Faites glisser le curseur.",
  path: "/avant-apres",
});

export default function AvantApresPage() {
  return (
    <>
      <JsonLd
        data={imageObjectJsonLd(
          beforeAfterZones.flatMap((z) => [
            {
              url: `${site.url}/images/avant-apres/${z.slug}-avant.jpg`,
              caption: `${z.label} avant nettoyage, AutoClean Diois`,
            },
            {
              url: `${site.url}/images/avant-apres/${z.slug}-apres.jpg`,
              caption: `${z.label} après nettoyage, AutoClean Diois`,
            },
          ])
        )}
      />
      <Breadcrumbs items={[{ name: "Avant / Après", href: "/avant-apres" }]} />

      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6">
        <p className="eyebrow">Résultats réels</p>
        <h1 className="display mx-auto mt-3 max-w-3xl text-[length:var(--text-display-xl)]">
          Avant / après&nbsp;: jugez sur pièces
        </h1>
        <p className="text-noir/70 mt-5 max-w-2xl text-lg">
          Chaque comparateur montre la même zone du même véhicule, photographiée
          sous le même angle avant et après notre passage. Faites glisser le
          curseur, au doigt, à la souris ou au clavier.
        </p>
      </div>

      <section className="section-pad-sm">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          {beforeAfterZones.map((z, i) => (
            <BeforeAfter key={z.slug} slug={z.slug} label={z.label} priority={i === 0} />
          ))}
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <div className="bg-jaune flex flex-col items-start gap-5 rounded-[var(--radius-card)] p-8 sm:p-10">
            <h2 className="display text-[length:var(--text-display-md)]">
              Votre habitacle peut être la prochaine photo.
            </h2>
            <ButtonLink href="/reservation">Pré-réserver</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { beforeAfterZones, zoneImagePath } from "@/content/avant-apres";
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
  const [premiere, ...autres] = beforeAfterZones;

  return (
    <>
      <JsonLd
        data={imageObjectJsonLd(
          beforeAfterZones.flatMap((z) => [
            {
              url: `${site.url}${zoneImagePath(z.slug, "avant")}`,
              caption: z.altBefore,
              width: z.width,
              height: z.height,
            },
            {
              url: `${site.url}${zoneImagePath(z.slug, "apres")}`,
              caption: z.altAfter,
              width: z.width,
              height: z.height,
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
        <p className="text-noir/70 mx-auto mt-5 max-w-2xl text-lg">
          Chaque comparateur montre la même zone du même véhicule, photographiée
          sous le même angle avant et après notre passage. Faites glisser le
          curseur, au doigt, à la souris ou au clavier.
        </p>
      </div>

      <section className="section-pad-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* La première zone est mise en avant : c'est l'écart le plus
              spectaculaire, et elle sert d'exemple d'usage du curseur. */}
          {premiere && (
            <div className="mx-auto max-w-4xl">
              <BeforeAfter
                slug={premiere.slug}
                sizes="(min-width: 1024px) 56rem, 100vw"
                priority
                withCaption
              />
            </div>
          )}

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-10">
            {autres.map((z) => (
              <BeforeAfter
                key={z.slug}
                slug={z.slug}
                sizes="(min-width: 1024px) 45vw, 100vw"
                withCaption
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-sm pt-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="bg-jaune flex flex-col items-center gap-5 rounded-[var(--radius-card)] p-8 text-center sm:p-10">
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

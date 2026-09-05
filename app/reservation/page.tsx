import { Suspense } from "react";
import { BreadcrumbJsonLd } from "@/components/sections/Breadcrumbs";
import { Funnel } from "@/components/reservation/Funnel";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pré-réserver un nettoyage en ligne",
  description:
    "Pré-réservez votre nettoyage intérieur en 5 étapes : véhicule, formule, options, récapitulatif. Sans paiement en ligne, rappel sous 24 h ouvrées.",
  path: "/reservation",
});

const promises = [
  {
    title: "Sans paiement en ligne",
    text: "Vous ne réglez rien ici. Le paiement se fait à l'atelier, une fois le véhicule récupéré.",
  },
  {
    title: `Rappel ${site.callbackDelay}`,
    text: "Nous vous appelons pour caler le créneau et confirmer le tarif avant toute intervention.",
  },
  {
    title: "Tarif ferme",
    text: "Le prix affiché ici est celui que vous paierez : pas de supplément découvert à l'arrivée.",
  },
];

export default function ReservationPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Pré-réservation", href: "/reservation" }]} />
      <div className="bg-noir text-blanc">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 lg:py-16">
          <h1 className="display mx-auto max-w-3xl text-[length:var(--text-display-lg)]">
            Pré-réservez votre nettoyage
          </h1>
          <p className="text-gris mx-auto mt-4 max-w-xl text-lg">
            Cinq étapes, deux minutes. Le total se met à jour au fur et à mesure,
            et rien n'est envoyé avant votre validation.
          </p>
        </div>
      </div>

      <div className="pt-8 lg:pt-10">
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-busy="true">
              <p className="text-noir/60">Chargement du formulaire…</p>
            </div>
          }
        >
          <Funnel />
        </Suspense>
      </div>

      <section aria-label="Nos engagements" className="section-pad-sm border-noir/10 border-t">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:px-6">
          {promises.map((p) => (
            <div key={p.title}>
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-noir/60 mt-2 text-sm leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

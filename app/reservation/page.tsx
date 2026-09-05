import { Suspense } from "react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Funnel } from "@/components/reservation/Funnel";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pré-réserver un nettoyage intérieur en ligne",
  description:
    "Pré-réservez votre nettoyage intérieur en 5 étapes : véhicule, formule, options, récapitulatif. Sans paiement en ligne, rappel sous 24 h ouvrées.",
  path: "/reservation",
});

const reassurance = [
  {
    title: "Comment ça fonctionne",
    text: `Vous envoyez votre demande, nous vous rappelons ${site.callbackDelay} pour confirmer ensemble le créneau et le tarif. La pré-réservation ne vous engage à rien.`,
  },
  {
    title: "Des produits professionnels",
    text: "Un produit dédié par matériau, appliqué à la bonne dilution : propre en profondeur, sans agresser les surfaces.",
  },
  {
    title: "Un temps optimisé",
    text: "Le créneau est calé à l'avance et le matériel est prêt à votre arrivée : vous récupérez le véhicule à l'heure annoncée.",
  },
  {
    title: "Paiement sur place",
    text: `Aucun paiement en ligne. Vous réglez à l'atelier : ${site.paymentMethods.join(", ").toLowerCase()}.`,
  },
];

export default function ReservationPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Pré-réservation", href: "/reservation" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-10 sm:px-6">
        <h1 className="display max-w-3xl text-[length:var(--text-display-lg)]">
          Pré-réservez votre nettoyage intérieur
        </h1>
        <p className="text-noir/70 mt-4 max-w-2xl">
          Deux minutes, cinq étapes, aucun paiement en ligne. Nous vous rappelons{" "}
          {site.callbackDelay} pour confirmer le créneau.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6" aria-busy="true">
            Chargement du formulaire…
          </div>
        }
      >
        <Funnel />
      </Suspense>

      <section aria-label="Réassurance" className="section-pad-sm bg-noir text-blanc">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {reassurance.map((r) => (
            <div key={r.title} className="border-blanc/20 border-t pt-4">
              <h2 className="font-semibold">{r.title}</h2>
              <p className="text-gris mt-2 text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

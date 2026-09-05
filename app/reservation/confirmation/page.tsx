import Link from "next/link";
import { Logomark } from "@/components/ui/Logo";
import {
  computeTotal,
  formatPrice,
  formulas,
  options,
  vehicleCategories,
  type FormulaId,
  type OptionId,
  type VehicleId,
} from "@/content/offre";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pré-réservation envoyée",
  description: "Votre demande de pré-réservation a bien été envoyée à AutoClean Diois.",
  path: "/reservation/confirmation",
  noindex: true,
});

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ vehicule?: string; formule?: string; options?: string }>;
}) {
  const params = await searchParams;
  const vehicle = vehicleCategories.find((v) => v.id === params.vehicule);
  const formula = formulas.find((f) => f.id === params.formule);
  const chosen = (params.options ?? "")
    .split(",")
    .map((id) => options.find((o) => o.id === id))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));
  const total =
    vehicle && formula
      ? computeTotal(
          formula.id as FormulaId,
          vehicle.id as VehicleId,
          chosen.map((o) => o.id as OptionId)
        )
      : null;

  return (
    <div className="bg-noir text-blanc relative overflow-hidden">
      <Logomark className="text-jaune/10 pointer-events-none absolute -top-24 -right-24 h-96 w-96" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-28">
        <p className="eyebrow text-jaune">C'est envoyé</p>
        <h1 className="display mt-4 text-[length:var(--text-display-lg)]">
          Votre pré-réservation est bien reçue.
        </h1>
        <p className="text-gris mt-6 text-lg leading-relaxed">
          Nous vous rappelons <strong className="text-blanc">{site.callbackDelay}</strong> pour
          confirmer ensemble le créneau et le tarif. Aucun paiement ne vous sera demandé
          avant la prestation.
        </p>

        {vehicle && formula && (
          <dl className="border-blanc/20 mt-10 divide-y rounded-[var(--radius-card)] border">
            <div className="flex justify-between gap-4 p-5">
              <dt className="text-gris">Véhicule</dt>
              <dd className="font-semibold">{vehicle.label}</dd>
            </div>
            <div className="border-blanc/20 flex justify-between gap-4 border-t p-5">
              <dt className="text-gris">Formule</dt>
              <dd className="font-semibold">
                {formula.name} ({formatPrice(formula.price)})
              </dd>
            </div>
            <div className="border-blanc/20 flex justify-between gap-4 border-t p-5">
              <dt className="text-gris">Options</dt>
              <dd className="text-right font-semibold">
                {chosen.length
                  ? chosen.map((o) => `${o.label} (+${formatPrice(o.price)})`).join(", ")
                  : "Aucune"}
              </dd>
            </div>
            {total !== null && (
              <div className="border-blanc/20 flex justify-between gap-4 border-t p-5">
                <dt className="font-semibold">Total estimé</dt>
                <dd className="display text-jaune text-2xl">{formatPrice(total)}</dd>
              </div>
            )}
          </dl>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-jaune text-noir inline-flex min-h-11 items-center rounded-full px-6 py-3 font-semibold"
          >
            Nos réalisations sur Instagram
          </a>
          <Link
            href="/"
            className="border-blanc inline-flex min-h-11 items-center rounded-full border-2 px-6 py-3 font-semibold"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

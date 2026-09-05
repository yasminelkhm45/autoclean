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

const nextSteps = [
  {
    title: "Nous étudions votre demande",
    text: "Elle arrive directement à l'atelier, avec le détail de votre formule et de vos options.",
  },
  {
    title: `Nous vous rappelons ${site.callbackDelay}`,
    text: "Pour convenir du créneau, confirmer le tarif et répondre à vos questions.",
  },
  {
    title: "Le rendez-vous est fixé",
    text: `Vous déposez le véhicule à Die et réglez sur place : ${site.paymentMethods.join(", ").toLowerCase()}.`,
  },
];

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{
    vehicule?: string;
    formule?: string;
    options?: string;
    ref?: string;
  }>;
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
  const reference = params.ref?.match(/^AC-\d{4}-\d{4}$/) ? params.ref : null;

  return (
    <>
      <div className="bg-noir text-blanc relative overflow-hidden">
        <Logomark className="text-jaune/10 pointer-events-none absolute -top-32 -right-24 h-96 w-96" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
          <span className="bg-jaune text-noir inline-flex h-12 w-12 items-center justify-center rounded-full">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m4 13 5 5L20 7" />
            </svg>
          </span>
          <h1 className="display mt-6 text-[length:var(--text-display-lg)]">
            Votre demande est bien arrivée
          </h1>
          <p className="text-gris mx-auto mt-5 max-w-xl text-lg leading-relaxed">
            Nous vous rappelons <strong className="text-blanc">{site.callbackDelay}</strong> au
            numéro que vous avez indiqué. Aucun paiement ne vous sera demandé avant la
            prestation.
          </p>
          {reference && (
            <p className="border-blanc/25 mt-6 inline-block rounded-full border px-4 py-2 text-sm">
              Référence de votre demande : <strong>{reference}</strong>
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        {vehicle && formula && (
          <section aria-labelledby="recap">
            <h2 id="recap" className="display text-center text-[length:var(--text-display-sm)]">
              Ce que vous avez demandé
            </h2>
            <dl className="border-noir/12 divide-noir/10 mt-5 divide-y rounded-[var(--radius-card)] border">
              <div className="flex justify-between gap-4 p-5">
                <dt className="text-noir/60">Véhicule</dt>
                <dd className="text-right font-semibold">{vehicle.label}</dd>
              </div>
              <div className="flex justify-between gap-4 p-5">
                <dt className="text-noir/60">Formule</dt>
                <dd className="text-right font-semibold">
                  {formula.name} ({formatPrice(formula.price)})
                  <span className="text-noir/55 block text-sm font-normal">
                    Durée estimée : {formula.duration}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between gap-4 p-5">
                <dt className="text-noir/60 shrink-0">Options</dt>
                <dd className="min-w-0 text-right font-semibold">
                  {chosen.length
                    ? chosen.map((o) => `${o.label} (+${formatPrice(o.price)})`).join(", ")
                    : "Aucune"}
                </dd>
              </div>
              {total !== null && (
                <div className="bg-noir text-blanc flex items-baseline justify-between gap-4 rounded-b-[var(--radius-card)] p-5">
                  <dt className="font-semibold">Total estimé</dt>
                  <dd className="display text-jaune text-2xl">{formatPrice(total)}</dd>
                </div>
              )}
            </dl>
          </section>
        )}

        <section aria-labelledby="suite" className="mt-12">
          <h2 id="suite" className="display text-center text-[length:var(--text-display-sm)]">
            Ce qui se passe maintenant
          </h2>
          <ol className="mt-5 flex flex-col gap-5">
            {nextSteps.map((s, i) => (
              <li key={s.title} className="flex flex-col items-center gap-3 text-center">
                <span className="bg-noir text-blanc flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-noir/60 mt-1 text-sm leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="border-noir/10 mt-12 flex flex-wrap items-center justify-center gap-4 border-t pt-8">
          <a
            href={site.phoneHref}
            className="bg-noir text-blanc inline-flex min-h-11 items-center rounded-full px-6 py-3 font-semibold"
          >
            Une précision ? Appelez-nous
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="border-noir inline-flex min-h-11 items-center rounded-full border-2 px-6 py-3 font-semibold"
          >
            Voir nos réalisations
          </a>
          <Link
            href="/"
            className="text-noir/60 hover:text-noir min-h-11 text-sm underline underline-offset-4"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </>
  );
}

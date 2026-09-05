import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { BrandImage } from "@/components/ui/BrandImage";
import { ButtonLink } from "@/components/ui/Button";
import { OptionIcon } from "@/components/ui/OptionIcon";
import { formulas, options, vehicleCategories, formatPrice } from "@/content/offre";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tarifs du nettoyage intérieur voiture",
  description:
    "Trois formules de nettoyage intérieur à Die : Essentielle 70 €, Confort 90 €, Prestige 120 €. Options cuir, poils d'animaux, ciel de toit. Tarifs affichés.",
  path: "/prestations",
});

/** Lignes du tableau comparatif, dérivées des inclusions. */
const comparisonRows: { label: string; values: [boolean, boolean, boolean] }[] = [
  { label: "Aspiration de tout l'habitacle", values: [true, true, true] },
  { label: "Moquettes et coffre nettoyés en profondeur", values: [true, true, true] },
  { label: "Shampoing des tapis", values: [true, true, true] },
  { label: "Plastiques nettoyés et désinfectés", values: [true, true, true] },
  { label: "Cadres de portes et vitres intérieures", values: [true, true, true] },
  { label: "Protection anti-UV des plastiques", values: [false, true, true] },
  { label: "Shampoing et désinfection des sièges", values: [false, true, true] },
  { label: "Rails de sièges", values: [false, true, true] },
  { label: "Senteur d'habitacle", values: [false, true, true] },
  { label: "Shampoing des moquettes", values: [false, false, true] },
  { label: "Désinfection vapeur de l'habitacle", values: [false, false, true] },
  { label: "Boîte à gants et compartiment de roue de secours", values: [false, false, true] },
  { label: "Zones cachées sous la banquette arrière", values: [false, false, true] },
];

function CheckOrDash({ included }: { included: boolean }) {
  return included ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-auto h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 13 5 5L20 7" />
    </svg>
  ) : (
    <span aria-hidden="true" className="text-noir/30">·</span>
  );
}

export default function PrestationsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Prestations", href: "/prestations" }]} />

      <div className="mx-auto max-w-6xl px-4 pt-8 pb-4 sm:px-6">
        <p className="eyebrow">Prestations & tarifs</p>
        <h1 className="display mt-3 max-w-3xl text-[length:var(--text-display-xl)]">
          Nos formules de nettoyage intérieur
        </h1>
        <p className="text-noir/70 mt-5 max-w-2xl text-lg">
          Trois formules, des prix affichés, et des options à la carte. Le tarif
          exact est confirmé par téléphone avant votre rendez-vous : jamais de
          supplément découvert à l'arrivée.
        </p>
      </div>

      {/* Formules détaillées */}
      <section aria-labelledby="formules" className="section-pad-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="formules" className="sr-only">Les trois formules</h2>
          <div className="flex flex-col gap-12">
            {formulas.map((f, i) => (
              <article
                key={f.id}
                id={f.id}
                className={`grid scroll-mt-24 items-center gap-8 rounded-[var(--radius-card)] p-6 sm:p-10 lg:grid-cols-2 ${
                  f.recommended ? "bg-noir text-blanc" : "border-gris/70 border"
                }`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  {f.recommended && (
                    <p className="bg-jaune text-noir mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase">
                      Notre recommandation
                    </p>
                  )}
                  <h3 className="display text-[length:var(--text-display-md)]">
                    {f.name}
                  </h3>
                  <p className={`mt-2 ${f.recommended ? "text-gris" : "text-noir/70"}`}>
                    {f.tagline}
                  </p>
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="display text-5xl">{formatPrice(f.price)}</span>
                    <span className={`text-sm ${f.recommended ? "text-gris" : "text-noir/60"}`}>
                      à partir de · {f.duration}
                    </span>
                  </p>
                  <ul className="mt-6 flex flex-col gap-2.5 text-sm sm:text-base">
                    {f.inclusions.map((inc) => (
                      <li key={inc.label} className="flex gap-2.5">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="text-jaune mt-1 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m4 13 5 5L20 7" />
                        </svg>
                        <span>
                          {inc.label}
                          {inc.detail && (
                            <span className="text-noir/55 block text-sm">{inc.detail}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6">
                    <Link
                      href={`/prestations/${f.id}`}
                      className="font-medium underline underline-offset-4"
                    >
                      Tout savoir sur la formule {f.name}
                    </Link>
                  </p>
                  <ButtonLink
                    href={`/reservation?formule=${f.id}`}
                    variant={f.recommended ? "yellow" : "primary"}
                    className="mt-7"
                  >
                    Pré-réserver la {f.name}
                  </ButtonLink>
                </div>
                <BrandImage
                  src={f.image}
                  alt={`Illustration de la formule ${f.name}`}
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className={i % 2 === 1 ? "lg:order-1" : ""}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tableau comparatif : table dès 768px, cartes empilées en dessous */}
      <section aria-labelledby="comparatif" className="section-pad-sm border-gris/50 border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="comparatif" className="display text-[length:var(--text-display-md)]">
            Comparer les trois formules
          </h2>

          <table className="mt-8 hidden w-full border-collapse text-sm md:table">
            <caption className="sr-only">
              Contenu inclus dans chaque formule de nettoyage intérieur
            </caption>
            <thead>
              <tr className="border-noir border-b-2 text-left">
                <th scope="col" className="py-3 pr-4 font-semibold">Inclus dans la prestation</th>
                {formulas.map((f) => (
                  <th key={f.id} scope="col" className="px-4 py-3 text-center">
                    <span className="display block text-lg">{f.name}</span>
                    <span className="text-noir/60 font-normal">{formatPrice(f.price)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-gris/60 border-b">
                  <th scope="row" className="py-3 pr-4 text-left font-normal">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className={`px-4 py-3 text-center ${formulas[i]?.recommended ? "bg-jaune/25" : ""}`}>
                      <CheckOrDash included={v} />
                      <span className="sr-only">{v ? "Inclus" : "Non inclus"}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Version mobile : cartes empilées, pas de scroll horizontal */}
          <div className="mt-8 flex flex-col gap-5 md:hidden">
            {formulas.map((f, fi) => (
              <section
                key={f.id}
                aria-label={`Contenu de la formule ${f.name}`}
                className={`rounded-[var(--radius-card)] p-5 ${f.recommended ? "bg-noir text-blanc" : "border-gris/70 border"}`}
              >
                <h3 className="display flex items-baseline justify-between text-xl">
                  {f.name}
                  <span className="text-base">{formatPrice(f.price)}</span>
                </h3>
                <ul className="mt-4 flex flex-col gap-2 text-sm">
                  {comparisonRows
                    .filter((r) => r.values[fi])
                    .map((r) => (
                      <li key={r.label} className="flex gap-2.5">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="text-jaune mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m4 13 5 5L20 7" />
                        </svg>
                        {r.label}
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Options additionnelles */}
      <section aria-labelledby="options" className="section-pad bg-noir text-blanc">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow text-jaune">À la carte</p>
          <h2 id="options" className="display mt-3 text-[length:var(--text-display-md)]">
            Les options additionnelles
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((o) => (
              <li key={o.id} className="border-blanc/15 flex flex-col gap-3 rounded-[var(--radius-card)] border p-6">
                <div className="flex items-center justify-between">
                  <span className="bg-jaune text-noir flex h-11 w-11 items-center justify-center rounded-full">
                    <OptionIcon icon={o.icon} />
                  </span>
                  <span className="display text-xl">+{formatPrice(o.price)}</span>
                </div>
                <h3 className="text-lg font-semibold">{o.label}</h3>
                <p className="text-gris text-sm leading-relaxed">{o.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Catégories de véhicules */}
      <section aria-labelledby="vehicules" className="section-pad-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="vehicules" className="display text-[length:var(--text-display-md)]">
            Tous les véhicules sont les bienvenus
          </h2>
          <p className="text-noir/70 mt-4 max-w-2xl">
            De la citadine à l'utilitaire, les formules s'appliquent à toutes les
            catégories. Vous précisez la vôtre à la première étape de la
            pré-réservation.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vehicleCategories.map((v) => (
              <li key={v.id} className="border-gris/70 rounded-[var(--radius-card)] border p-5">
                <h3 className="font-semibold">{v.label}</h3>
                <p className="text-noir/60 mt-1 text-sm">{v.examples.join(", ")}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/reservation" className="mt-10">
            Pré-réserver ma prestation
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { formulas, formatPrice, minPrice } from "@/content/offre";

export function FormulaCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {formulas.map((f) => (
        <li
          key={f.id}
          className={`relative flex flex-col rounded-[var(--radius-card)] p-6 text-center sm:p-7 ${
            f.recommended
              ? "bg-noir text-blanc"
              : "border-gris/70 bg-blanc border"
          }`}
        >
          {/* La Confort porte la pastille jaune, la Prestige une pastille sobre :
              deux repères de même poids annuleraient la hiérarchie. */}
          {f.recommended ? (
            <span className="bg-jaune text-noir absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold tracking-wide whitespace-nowrap uppercase">
              Notre recommandation
            </span>
          ) : (
            f.badge && (
              <span className="bg-noir text-blanc absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold tracking-wide whitespace-nowrap uppercase">
                {f.badge}
              </span>
            )
          )}
          <h3 className="display text-2xl sm:text-3xl">{f.name}</h3>
          <p className={`mt-2 text-sm ${f.recommended ? "text-gris" : "text-noir/70"}`}>
            {f.tagline}
          </p>
          <p className="mt-5 flex flex-wrap items-baseline justify-center gap-2">
            <span className={`text-sm ${f.recommended ? "text-gris" : "text-noir/60"}`}>
              à partir de
            </span>
            <span className="display text-4xl">{formatPrice(minPrice(f.id))}</span>
          </p>
          <ul className="mx-auto mt-5 flex w-fit flex-col gap-2.5 text-left text-sm">
            {f.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <svg viewBox="0 0 24 24" aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${f.recommended ? "text-jaune" : "text-noir"}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m4 13 5 5L20 7" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-2 pt-7">
            <Link
              href={`/reservation?formule=${f.id}`}
              className={`flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors ${
                f.recommended
                  ? "bg-jaune text-noir hover:bg-blanc"
                  : "bg-noir text-blanc hover:bg-noir/85"
              }`}
            >
              Pré-réserver la {f.name}
            </Link>
            <Link
              href={`/prestations#${f.id}`}
              className="flex min-h-11 items-center justify-center text-sm font-medium underline-offset-4 hover:underline"
            >
              Voir le détail
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

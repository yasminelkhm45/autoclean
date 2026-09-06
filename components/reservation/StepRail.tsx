"use client";

import { STEPS, type StepNumber } from "./shared";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 13 5 5L20 7" />
    </svg>
  );
}

/**
 * Repère de progression.
 *
 * Une barre unique se remplit en jaune au fil des étapes, les pastilles
 * franchies restant posées dessus. C'est plus lisible qu'une suite de traits
 * indépendants : d'un coup d'œil, on voit la part du parcours déjà faite.
 *
 * Les étapes déjà franchies sont de vrais boutons : revenir en arrière est le
 * geste le plus fréquent dans un tunnel, il ne doit jamais obliger à chercher
 * le bouton « Retour ».
 */
export function StepRail({
  current,
  maxReached,
  onGoTo,
}: {
  current: StepNumber;
  maxReached: StepNumber;
  onGoTo: (step: StepNumber) => void;
}) {
  const total = STEPS.length;
  const currentStep = STEPS[current - 1]!;
  const progress = ((current - 1) / (total - 1)) * 100;
  /* La piste relie le centre de la première pastille à celui de la dernière. */
  const inset = `${50 / total}%`;

  return (
    <div className="bg-noir text-blanc rounded-[var(--radius-card)] px-4 py-5 sm:px-6">
      {/* Sous 768px : une jauge et le nom de l'étape en cours */}
      <div className="md:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-semibold">{currentStep.label}</p>
          <p className="text-gris text-sm">
            Étape {current} sur {total}
          </p>
        </div>
        <div className="bg-blanc/20 mt-3 h-2 overflow-hidden rounded-full">
          <div
            className="bg-jaune h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>

      {/* À partir de 768px : les cinq étapes nommées sur une barre continue */}
      <div className="relative hidden md:block">
        <div
          aria-hidden="true"
          className="bg-blanc/20 absolute top-5 h-[3px] -translate-y-1/2 rounded-full"
          style={{ left: inset, right: inset }}
        />
        <div
          aria-hidden="true"
          className="bg-jaune absolute top-5 h-[3px] -translate-y-1/2 rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ left: inset, width: `calc((100% - 2 * ${inset}) * ${progress / 100})` }}
        />

        <ol className="relative flex">
          {STEPS.map((s) => {
            const done = s.n < current;
            const isCurrent = s.n === current;
            const reachable = s.n <= maxReached && !isCurrent;

            const dot = (
              <span
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 motion-reduce:transition-none",
                  isCurrent
                    ? "bg-jaune text-noir ring-jaune/30 scale-110 ring-4"
                    : done
                      ? "bg-jaune text-noir"
                      : "bg-noir border-blanc/45 text-gris border-2",
                ].join(" ")}
              >
                {done ? <Check className="h-4 w-4" /> : s.n}
              </span>
            );

            const label = (
              <span
                className={[
                  "mt-2 block text-center text-xs lg:text-sm",
                  isCurrent
                    ? "text-blanc font-semibold"
                    : done
                      ? "text-gris"
                      : "text-gris/60",
                ].join(" ")}
              >
                {s.label}
              </span>
            );

            return (
              <li key={s.key} className="flex flex-1 flex-col items-center">
                {reachable ? (
                  <button
                    type="button"
                    onClick={() => onGoTo(s.n as StepNumber)}
                    className="group flex flex-col items-center rounded-xl px-1"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none">
                      {dot}
                    </span>
                    <span className="group-hover:text-blanc">{label}</span>
                  </button>
                ) : (
                  <span
                    className="flex flex-col items-center px-1"
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {dot}
                    {label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

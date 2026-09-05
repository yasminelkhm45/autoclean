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
 * Repère de progression. Les étapes déjà franchies sont de vrais boutons :
 * revenir en arrière est le geste le plus fréquent dans un tunnel, il ne doit
 * jamais obliger à repasser par le bouton « Retour ».
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
  const currentStep = STEPS[current - 1]!;

  return (
    <div className="bg-noir text-blanc rounded-[var(--radius-card)] px-4 py-4 sm:px-6">
      {/* Mobile : une seule étape nommée + jauge */}
      <div className="md:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-semibold">{currentStep.label}</p>
          <p className="text-gris text-sm">Étape {current} sur {STEPS.length}</p>
        </div>
        <div className="bg-blanc/20 mt-3 h-1.5 overflow-hidden rounded-full">
          <div
            className="bg-jaune h-full rounded-full transition-[width] duration-300"
            style={{ width: `${(current / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* À partir de 768px : les cinq étapes nommées */}
      <ol className="hidden items-center md:flex">
        {STEPS.map((s, i) => {
          const done = s.n < current;
          const isCurrent = s.n === current;
          const reachable = s.n <= maxReached && !isCurrent;

          const dot = (
            <span
              className={[
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                isCurrent
                  ? "bg-jaune text-noir"
                  : done
                    ? "bg-blanc text-noir"
                    : "border-blanc/45 text-gris border",
              ].join(" ")}
            >
              {done ? <Check className="h-4 w-4" /> : s.n}
            </span>
          );

          const label = (
            <span
              className={[
                "text-xs whitespace-nowrap lg:text-sm",
                isCurrent ? "text-blanc font-semibold" : done ? "text-gris" : "text-gris/60",
              ].join(" ")}
            >
              {s.label}
            </span>
          );

          return (
            <li key={s.key} className="flex flex-1 items-center gap-3 last:flex-none">
              {reachable ? (
                <button
                  type="button"
                  onClick={() => onGoTo(s.n as StepNumber)}
                  className="hover:text-blanc flex items-center gap-2.5 rounded-full text-left"
                >
                  {dot}
                  {label}
                </button>
              ) : (
                <span
                  className="flex items-center gap-2.5"
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {dot}
                  {label}
                </span>
              )}
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`h-px flex-1 ${done ? "bg-jaune" : "bg-blanc/25"}`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

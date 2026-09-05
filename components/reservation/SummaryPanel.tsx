"use client";

import {
  computeTotal,
  formatPrice,
  getFormula,
  getOption,
  getVehicle,
} from "@/content/offre";
import type { Selection, StepNumber } from "./shared";

function EditButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-noir/55 hover:text-noir -my-1 shrink-0 py-1.5 text-sm underline underline-offset-4"
    >
      Modifier<span className="sr-only"> {label}</span>
    </button>
  );
}

/**
 * Le total doit rester sous les yeux du premier au dernier écran : c'est ce qui
 * évite l'abandon au moment du récapitulatif. Le même panneau sert de colonne
 * latérale sur grand écran et de bloc récapitulatif dans le corps de l'étape 4.
 */
export function SummaryPanel({
  selection,
  onEdit,
  compact = false,
}: {
  selection: Selection;
  onEdit: (step: StepNumber) => void;
  compact?: boolean;
}) {
  const { vehicle, formula, options: chosen } = selection;
  const total = vehicle && formula ? computeTotal(formula, vehicle, chosen) : null;

  return (
    <div className="border-noir/12 bg-blanc rounded-[var(--radius-card)] border">
      <div className="border-noir/12 border-b px-5 py-4">
        <h2 className={`text-center ${compact ? "font-semibold" : "display text-xl"}`}>Votre prestation</h2>
      </div>

      <dl className="divide-noir/10 divide-y text-sm">
        <div className="flex items-start justify-between gap-3 px-5 py-4">
          <div>
            <dt className="text-noir/55">Véhicule</dt>
            <dd className="mt-0.5 font-semibold">
              {vehicle ? getVehicle(vehicle).label : "À choisir"}
            </dd>
          </div>
          {vehicle && <EditButton onClick={() => onEdit(1)} label="le véhicule" />}
        </div>

        <div className="flex items-start justify-between gap-3 px-5 py-4">
          <div>
            <dt className="text-noir/55">Formule</dt>
            <dd className="mt-0.5 font-semibold">
              {formula ? (
                <>
                  {getFormula(formula).name}
                  <span className="text-noir/55 ml-1.5 font-normal">
                    {formatPrice(getFormula(formula).price)}
                  </span>
                </>
              ) : (
                "À choisir"
              )}
            </dd>
            {formula && (
              <p className="text-noir/55 mt-1">Durée estimée : {getFormula(formula).duration}</p>
            )}
          </div>
          {formula && <EditButton onClick={() => onEdit(2)} label="la formule" />}
        </div>

        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <dt className="text-noir/55">Options</dt>
            {formula && <EditButton onClick={() => onEdit(3)} label="les options" />}
          </div>
          <dd className="mt-1.5">
            {chosen.length === 0 ? (
              <span className="text-noir/55">Aucune</span>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {chosen.map((id) => {
                  const o = getOption(id);
                  return (
                    <li key={id} className="flex justify-between gap-3">
                      <span>{o.label}</span>
                      <span className="shrink-0 font-medium">+{formatPrice(o.price)}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </dd>
        </div>
      </dl>

      <div className="bg-noir text-blanc flex items-baseline justify-between gap-3 rounded-b-[var(--radius-card)] px-5 py-4">
        <span className="font-semibold">Total estimé</span>
        <span className="display text-jaune text-2xl" aria-live="polite">
          {total !== null ? formatPrice(total) : "…"}
        </span>
      </div>

      <p className="text-noir/55 px-5 py-3 text-center text-xs leading-relaxed">
        Aucun paiement en ligne. Le tarif est reconfirmé par téléphone avant le
        rendez-vous, et le règlement se fait sur place.
      </p>
    </div>
  );
}

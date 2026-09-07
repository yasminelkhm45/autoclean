"use client";

import {
  computeTotal,
  formatPrice,
  formatTarif,
  getFormula,
  getTarif,
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

function Ligne({
  titre,
  children,
  onEdit,
  editLabel,
}: {
  titre: string;
  children: React.ReactNode;
  onEdit?: () => void;
  editLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 py-4 sm:flex-1 sm:justify-start">
      <div className="min-w-0">
        <dt className="text-noir/55 text-sm">{titre}</dt>
        <dd className="mt-0.5 text-sm font-semibold">{children}</dd>
      </div>
      {onEdit && editLabel && <EditButton onClick={onEdit} label={editLabel} />}
    </div>
  );
}

/**
 * Récapitulatif de la prestation, placé sous le contenu de l'étape.
 *
 * Il était auparavant en colonne de droite. Le déplacer sous les cartes libère
 * toute la largeur pour les formules, qui étaient trop verticales, et le
 * récapitulatif reste visible au moment où l'on descend cliquer sur
 * « Choisir cette formule ».
 */
export function SummaryPanel({
  selection,
  onEdit,
}: {
  selection: Selection;
  onEdit: (step: StepNumber) => void;
}) {
  const { vehicle, formula, options: chosen } = selection;
  const surDevis = vehicle && formula && getTarif(formula, vehicle).price === null;
  const total = vehicle && formula ? computeTotal(formula, vehicle, chosen) : null;

  return (
    <section
      aria-label="Récapitulatif de votre prestation"
      className="border-noir/12 bg-blanc overflow-hidden rounded-[var(--radius-card)] border"
    >
      <dl className="divide-noir/10 flex flex-col divide-y sm:flex-row sm:divide-x sm:divide-y-0">
        <Ligne
          titre="Véhicule"
          onEdit={vehicle ? () => onEdit(1) : undefined}
          editLabel="le véhicule"
        >
          {vehicle ? getVehicle(vehicle).label : "À choisir"}
        </Ligne>

        <Ligne
          titre="Formule"
          onEdit={formula ? () => onEdit(2) : undefined}
          editLabel="la formule"
        >
          {formula && vehicle ? (
            <>
              {getFormula(formula).name}
              <span className="text-noir/55 ml-1.5 font-normal">
                {formatTarif(formula, vehicle)}
              </span>
              <span className="text-noir/55 mt-0.5 block font-normal">
                Durée : {getTarif(formula, vehicle).duration}
              </span>
            </>
          ) : (
            "À choisir"
          )}
        </Ligne>

        <Ligne
          titre="Options"
          onEdit={formula ? () => onEdit(3) : undefined}
          editLabel="les options"
        >
          {chosen.length === 0 ? (
            <span className="text-noir/55 font-normal">Aucune</span>
          ) : (
            <ul className="flex flex-col gap-1">
              {chosen.map((id) => {
                const o = getOption(id);
                return (
                  <li key={id} className="font-normal">
                    {o.label}{" "}
                    <span className="font-semibold">+{formatPrice(o.price)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </Ligne>

        <div className="bg-noir text-blanc flex items-center justify-between gap-4 px-5 py-4 sm:w-64 sm:shrink-0 sm:flex-col sm:items-start sm:justify-center">
          <dt className="text-gris text-sm">
            {surDevis ? "Montant" : "Total estimé"}
          </dt>
          <dd className="display text-jaune text-2xl" aria-live="polite">
            {surDevis
              ? "Sur devis"
              : total !== null
                ? formatPrice(total)
                : "…"}
          </dd>
        </div>
      </dl>

      <p className="text-noir/55 border-noir/10 border-t px-5 py-3 text-center text-xs leading-relaxed">
        Aucun paiement en ligne. Le tarif est reconfirmé par téléphone avant le
        rendez-vous, et le règlement se fait sur place.
      </p>
    </section>
  );
}

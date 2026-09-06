import Image from "next/image";
import {
  formatTarif,
  formulas,
  getTarif,
  vehicleCategories,
  vehicleImageSize,
  type FormulaId,
} from "@/content/offre";

/**
 * Grille tarifaire par catégorie de véhicule.
 *
 * Le prix dépend de la surface à traiter : une citadine et un monospace sept
 * places ne demandent pas le même temps. Afficher un prix unique obligerait à
 * annoncer un tarif haut pour tout le monde, ou à créer des surprises au
 * téléphone. Le tableau règle les deux problèmes.
 *
 * `formula` limite l'affichage à une seule ligne, pour les pages de formule.
 */
export function PriceTable({ formula }: { formula?: FormulaId }) {
  const lignes = formula ? formulas.filter((f) => f.id === formula) : formulas;

  return (
    <div>
      {/* À partir de 768px : un vrai tableau, lisible en diagonale */}
      <table className="hidden w-full border-collapse text-sm md:table">
        <caption className="sr-only">
          Tarifs par formule et par catégorie de véhicule
        </caption>
        <thead>
          <tr className="border-noir border-b-2">
            <th scope="col" className="py-3 pr-4 text-left font-semibold">
              Formule
            </th>
            {vehicleCategories.map((v) => (
              <th key={v.id} scope="col" className="px-3 py-3 text-center font-semibold">
                <Image
                  src={v.image}
                  alt=""
                  width={vehicleImageSize.width}
                  height={vehicleImageSize.height}
                  sizes="120px"
                  className="mx-auto mb-1 h-auto w-full max-w-[6.5rem]"
                />
                {v.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map((f) => (
            <tr key={f.id} className="border-gris/60 border-b">
              <th scope="row" className="py-4 pr-4 text-left">
                <span className="display block text-lg">{f.name}</span>
                <span className="text-noir/60 text-xs font-normal">{f.tagline}</span>
              </th>
              {vehicleCategories.map((v) => {
                const t = getTarif(f.id, v.id);
                return (
                  <td
                    key={v.id}
                    className={`px-3 py-4 text-center ${f.recommended ? "bg-jaune/25" : ""}`}
                  >
                    <span className="display block text-xl">{formatTarif(f.id, v.id)}</span>
                    <span className="text-noir/60 block text-xs">{t.duration}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sous 768px : une carte par véhicule, sans défilement horizontal */}
      <div className="flex flex-col gap-4 md:hidden">
        {vehicleCategories.map((v) => (
          <div
            key={v.id}
            className="border-gris/70 rounded-[var(--radius-card)] border p-5 text-center"
          >
            <Image
              src={v.image}
              alt=""
              width={vehicleImageSize.width}
              height={vehicleImageSize.height}
              sizes="180px"
              className="mx-auto h-auto w-full max-w-[11rem]"
            />
            <p className="mt-2 font-semibold">{v.label}</p>
            <dl className="divide-noir/10 mt-3 divide-y text-sm">
              {lignes.map((f) => (
                <div key={f.id} className="flex items-baseline justify-between gap-3 py-2.5">
                  <dt className="text-left">
                    {f.name}
                    <span className="text-noir/60 block text-xs">
                      {getTarif(f.id, v.id).duration}
                    </span>
                  </dt>
                  <dd className="display shrink-0 text-lg">{formatTarif(f.id, v.id)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <p className="text-noir/60 mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed">
        {vehicleCategories.find((v) => v.quoteNotice)?.quoteNotice}
      </p>
    </div>
  );
}

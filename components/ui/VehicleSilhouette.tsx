import type { VehicleId } from "@/content/offre";

/**
 * Silhouettes maison plutôt que des photos de catalogue : même trait pour les
 * cinq catégories, poids négligeable, et le vitrage reprend le jaune de la charte.
 * La carrosserie suit currentColor pour se teinter avec l'état de la carte.
 */

type Shape = {
  body: string;
  glass: string[];
  wheels: [number, number];
  wheelY: number;
  wheelR: number;
};

const shapes: Record<VehicleId, Shape> = {
  citadine: {
    body:
      "M14 66 V56 C14 51 17 48 22 47 L48 41 L68 25 C71 22 75 21 79 21 H118 C123 21 128 23 132 27 L150 45 L174 51 C180 52 183 55 183 61 V66 Z",
    glass: ["M74 27 H98 V43 L62 45 Z", "M104 27 H118 L134 43 H104 Z"],
    wheels: [56, 148],
    wheelY: 66,
    wheelR: 14,
  },
  "berline-break": {
    body:
      "M10 66 V56 C10 51 13 48 18 47 L40 42 L62 24 C65 21 69 20 73 20 H128 C133 20 138 22 142 26 L160 45 L182 51 C188 52 191 55 191 61 V66 Z",
    glass: ["M68 26 H94 V44 L54 45 Z", "M100 26 H128 L144 44 H100 Z"],
    wheels: [52, 156],
    wheelY: 66,
    wheelR: 14,
  },
  suv: {
    body:
      "M12 64 V50 C12 44 15 41 21 40 L44 35 L64 18 C67 15 71 14 75 14 H126 C131 14 136 16 140 20 L158 38 L182 45 C188 46 191 49 191 56 V64 Z",
    glass: ["M70 20 H96 V38 L56 39 Z", "M102 20 H126 L142 38 H102 Z"],
    wheels: [54, 156],
    wheelY: 64,
    wheelR: 17,
  },
  "monospace-familial": {
    body:
      "M12 65 V46 C12 40 15 36 21 34 L46 27 C52 18 58 14 66 14 H126 C132 14 138 17 142 22 L160 42 L182 48 C188 49 191 52 191 58 V65 Z",
    glass: ["M60 21 H92 V40 L32 41 L38 31 Z", "M98 21 H126 L144 40 H98 Z"],
    wheels: [54, 158],
    wheelY: 65,
    wheelR: 15,
  },
  utilitaire: {
    body:
      "M10 65 V22 C10 17 13 14 19 14 H118 C126 14 132 17 137 23 L157 44 L182 50 C188 51 191 54 191 60 V65 Z",
    glass: ["M104 22 H118 C122 22 125 23 127 26 L140 42 H104 Z"],
    wheels: [48, 158],
    wheelY: 65,
    wheelR: 15,
  },
};

export function VehicleSilhouette({
  type,
  className = "",
}: {
  type: VehicleId;
  className?: string;
}) {
  const s = shapes[type];
  return (
    <svg viewBox="0 0 200 84" aria-hidden="true" className={className} fill="none">
      <path d={s.body} fill="currentColor" />
      {s.glass.map((d, i) => (
        <path key={i} d={d} className="text-jaune" fill="currentColor" />
      ))}
      {s.wheels.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={s.wheelY} r={s.wheelR} fill="currentColor" />
          <circle cx={cx} cy={s.wheelY} r={s.wheelR * 0.4} className="text-blanc" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

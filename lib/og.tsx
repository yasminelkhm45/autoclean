import { ImageResponse } from "next/og";
import { logomarkPaths, logomarkViewBox } from "@/lib/logomark-paths";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/* Couleurs de la charte, dupliquées ici car l'OG est rendue hors CSS. */
const JAUNE = "#FFFF00";
const NOIR = "#000000";
const BLANC = "#FFFFFF";
const GRIS = "#C0C4C8";

function Mark({ size, opacity = 1 }: { size: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox={logomarkViewBox} style={{ opacity }}>
      {logomarkPaths.map((d, i) => (
        <path key={i} d={d} fill={JAUNE} />
      ))}
    </svg>
  );
}

/** Image de partage à la charte : fond noir, logomark officiel, titre display. */
export function brandOg(title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NOIR,
          padding: 64,
          position: "relative",
        }}
      >
        {/* Logomark en filigrane, débordant du cadre comme sur le site */}
        <div style={{ position: "absolute", right: -130, top: -110, display: "flex" }}>
          <Mark size={480} opacity={0.14} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Mark size={64} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ color: BLANC, fontSize: 48, fontWeight: 800, fontStyle: "italic" }}>
              AutoClean
            </span>
            <span style={{ color: BLANC, fontSize: 26, fontWeight: 700 }}>Diois</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: BLANC,
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div style={{ color: GRIS, fontSize: 30 }}>
            Nettoyage automobile intérieur · Die, Drôme (26)
          </div>
        </div>
      </div>
    ),
    ogSize
  );
}

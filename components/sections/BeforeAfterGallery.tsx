"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { CompareSlider } from "@/components/sections/CompareSlider";
import {
  beforeAfterZones,
  zoneImagePath,
  type BeforeAfterZone,
} from "@/content/avant-apres";

/**
 * Un seul comparateur à la fois, sélectionné par une rangée de vignettes.
 *
 * Le motif est celui d'un jeu d'onglets : les vignettes portent role="tab" et
 * le comparateur role="tabpanel", avec navigation aux flèches et tabindex
 * mobile. Cela évite d'empiler cinq comparateurs, ce qui allongeait la page et
 * chargeait dix photos pleine résolution d'un coup.
 */
export function BeforeAfterGallery({
  zones = beforeAfterZones,
}: {
  zones?: BeforeAfterZone[];
}) {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = zones[index];
  if (!active) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % zones.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + zones.length) % zones.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = zones.length - 1;
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        id={`panneau-${active.slug}`}
        role="tabpanel"
        aria-labelledby={`onglet-${active.slug}`}
        className="mx-auto max-w-4xl"
      >
        {/* key force le remontage : le curseur repart au centre à chaque zone */}
        <CompareSlider
          key={active.slug}
          label={active.label}
          caption={active.description}
          before={
            <Image
              src={zoneImagePath(active.slug, "avant")}
              alt={active.altBefore}
              width={active.width}
              height={active.height}
              sizes="(min-width: 1024px) 56rem, 100vw"
              priority={index === 0}
              className="h-auto w-full"
            />
          }
          after={
            <Image
              src={zoneImagePath(active.slug, "apres")}
              alt={active.altAfter}
              width={active.width}
              height={active.height}
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="h-auto w-full"
            />
          }
        />
      </div>

      {/*
        Sous 640px la rangée défile horizontalement avec accroche : cinq
        vignettes lisibles ne tiennent pas dans la largeur d'un téléphone,
        et les réduire jusqu'à ce qu'elles rentrent les rendrait illisibles.
      */}
      <div
        role="tablist"
        aria-label="Choisir une zone à comparer"
        onKeyDown={onKeyDown}
        className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
      >
        {zones.map((z, i) => {
          const selected = i === index;
          return (
            <button
              key={z.slug}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`onglet-${z.slug}`}
              aria-selected={selected}
              aria-controls={`panneau-${z.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={[
                "w-36 shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] border-2 text-center transition-colors sm:w-40",
                selected ? "border-noir" : "border-noir/20 hover:border-noir/60",
              ].join(" ")}
            >
              <Image
                src={zoneImagePath(z.slug, "avant", true)}
                alt=""
                width={480}
                height={270}
                sizes="160px"
                className="h-20 w-full object-cover"
              />
              <span
                className={[
                  "block px-2 py-2.5 text-xs font-semibold",
                  selected ? "bg-noir text-blanc" : "",
                ].join(" ")}
              >
                {z.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

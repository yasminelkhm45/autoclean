"use client";

import { useCallback, useId, useRef, useState, type ReactNode } from "react";

/**
 * Comparateur avant/après à curseur.
 * Accessible : rôle slider, contrôle au clavier (flèches, Début/Fin),
 * aria-valuenow annoncé en pourcentage « après » visible.
 */
export function CompareSlider({
  before,
  after,
  label,
  caption,
}: {
  before: ReactNode;
  after: ReactNode;
  label: string;
  /** Phrase de contexte affichée sous le comparateur, en plus du libellé. */
  caption?: string;
}) {
  const [value, setValue] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const id = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(100, Math.max(0, Math.round(pct))));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") setValue((v) => Math.max(0, v - step));
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") setValue((v) => Math.min(100, v + step));
    else if (e.key === "Home") setValue(0);
    else if (e.key === "End") setValue(100);
    else return;
    e.preventDefault();
  };

  return (
    <figure className="m-0">
      <div
        ref={ref}
        className="relative select-none overflow-hidden rounded-[var(--radius-card)]"
        onPointerDown={onPointerDown}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* Avant (dessous) */}
        <div aria-hidden="true">{before}</div>
        {/* Après (dessus, rogné) */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          {after}
        </div>

        {/* Étiquettes */}
        <span className="bg-noir text-blanc absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold" aria-hidden="true">
          Avant
        </span>
        <span className="bg-jaune text-noir absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold" aria-hidden="true">
          Après
        </span>

        {/* Poignée = l'élément slider focusable */}
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Comparateur avant / après : ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${value} % de l'image « après » visible`}
          aria-describedby={id}
          onKeyDown={onKeyDown}
          className="absolute inset-y-0 w-11 -translate-x-1/2 cursor-ew-resize touch-none"
          style={{ left: `${value}%` }}
        >
          <span className="bg-blanc absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="bg-jaune text-noir absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-sm"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
      <figcaption id={id} className="mt-4 text-center">
        <span className="font-semibold">{label}</span>
        {caption && (
          <span className="text-noir/70 mx-auto mt-1 block max-w-2xl text-sm leading-relaxed">
            {caption}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

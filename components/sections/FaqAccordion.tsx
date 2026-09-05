"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/content/faq";

/**
 * Accordéon accessible : bouton avec aria-expanded / aria-controls,
 * région associée, questions en H2 (ou H3 sur l'accueil via headingLevel).
 */
export function FaqAccordion({
  items,
  headingLevel = "h2",
  dark = false,
}: {
  items: FaqItem[];
  headingLevel?: "h2" | "h3";
  dark?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();
  const H = headingLevel;

  return (
    <div className={`divide-y ${dark ? "divide-blanc/15" : "divide-noir/15"}`}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-panel-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;
        return (
          <div key={item.id}>
            <H className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex min-h-11 w-full items-center justify-center gap-4 py-5 text-center text-base font-semibold sm:text-lg"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={`bg-jaune text-noir flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${open ? "rotate-45" : ""}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </H>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className={`mx-auto max-w-2xl pb-6 text-center text-base leading-relaxed ${dark ? "text-gris" : "text-noir/75"}`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}

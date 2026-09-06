"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

const nav = [
  { href: "/prestations", label: "Prestations" },
  { href: "/avant-apres", label: "Avant / Après" },
  { href: "/zone-intervention", label: "Zone d'intervention" },
  { href: "/conseils", label: "Conseils" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Fermer à chaque changement de page. */
  useEffect(() => setOpen(false), [pathname]);

  /* Menu ouvert : page bloquée, focus dans le panneau, Échap pour sortir. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="border-gris/50 bg-blanc/95 sticky top-0 z-40 border-b backdrop-blur-sm">
        <a
          href="#contenu"
          className="bg-jaune text-noir sr-only z-50 rounded-full px-4 py-2 font-semibold focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            aria-label="AutoClean Diois, accueil"
            /* Le lockup porte plus de blanc en haut qu'en bas : deux pixels
               vers le bas rétablissent l'équilibre optique dans la barre. */
            className="translate-y-[2px] text-xl sm:text-2xl"
          >
            <Logo withMark={false} />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center text-sm font-medium underline-offset-8 transition-colors hover:underline ${
                    active ? "decoration-jaune underline decoration-4" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <ButtonLink href="/reservation" className="ml-2">
              Pré-réserver
            </ButtonLink>
          </nav>

          <button
            ref={burgerRef}
            type="button"
            className="-mr-1.5 flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
              <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
            </svg>
          </button>
        </div>
      </header>

      {/*
        Le panneau est rendu en dehors du <header> : celui-ci porte un
        backdrop-filter, qui fait de lui le bloc conteneur de ses descendants
        en position fixe. Un panneau plein écran placé à l'intérieur se
        retrouverait donc collé à la hauteur du header, soit invisible.
      */}
      {open && (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="bg-noir text-blanc fixed inset-0 z-50 flex flex-col overflow-y-auto lg:hidden"
        >
          <div className="border-blanc/15 flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
            <Link
              href="/"
              aria-label="AutoClean Diois, accueil"
              className="translate-y-[2px] text-xl sm:text-2xl"
              onClick={() => setOpen(false)}
            >
              <Logo tone="blanc" withMark={false} />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false);
                burgerRef.current?.focus();
              }}
              className="-mr-1.5 flex h-11 w-11 shrink-0 items-center justify-center"
            >
              <span className="sr-only">Fermer le menu</span>
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" />
              </svg>
            </button>
          </div>

          <nav aria-label="Navigation mobile" className="flex flex-1 flex-col px-4 py-6 sm:px-6">
            <ul className="flex flex-col">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="border-blanc/10 border-b">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`display flex min-h-14 items-center text-2xl ${
                        active ? "text-jaune" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink
              href="/reservation"
              variant="yellow"
              className="mt-8 w-full"
              onClick={() => setOpen(false)}
            >
              Pré-réserver
            </ButtonLink>
          </nav>
        </div>
      )}
    </>
  );
}

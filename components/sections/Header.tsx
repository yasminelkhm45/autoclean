"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="border-gris/50 bg-blanc/95 sticky top-0 z-40 border-b backdrop-blur-sm">
      <a
        href="#contenu"
        className="bg-jaune text-noir sr-only z-50 rounded-full px-4 py-2 font-semibold focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Aller au contenu
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="AutoClean Diois, accueil" className="text-xl sm:text-2xl">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium underline-offset-8 transition-colors hover:underline ${
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
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Menu mobile plein écran, noir, typographie display */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="bg-noir text-blanc fixed inset-x-0 top-[57px] bottom-0 z-40 overflow-y-auto lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="flex flex-col gap-1 px-6 py-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`display py-3 text-3xl ${pathname === item.href ? "text-jaune" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/reservation" variant="yellow" className="mt-6 self-start">
            Pré-réserver
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, Logomark } from "@/components/ui/Logo";
import { formulas } from "@/content/offre";
import { site } from "@/content/site";
import { zones } from "@/content/zones";

export function Footer() {
  return (
    <footer className="bg-noir text-blanc relative overflow-hidden pb-28 lg:pb-0">
      <Logomark className="text-jaune/10 pointer-events-none absolute -right-24 -bottom-24 h-96 w-96" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_2fr]">
        <div>
          <Link href="/" aria-label="AutoClean Diois, accueil" className="text-2xl">
            <Logo tone="blanc" />
          </Link>
          <p className="text-gris mt-4 max-w-xs text-sm leading-relaxed">
            Nettoyage automobile intérieur en atelier, à Solaure, à sept kilomètres de Die.
          </p>
          <address className="text-gris mt-6 text-sm not-italic leading-relaxed">
            Situé à {site.cityShort}
            <br />
            {site.address.postalCode} {site.address.city}
            <br />
            <a href={site.phoneHref} className="text-blanc mt-2 inline-block py-1 underline-offset-4 hover:underline">
              {site.phone}
            </a>
            <br />
            <a
              href={site.instagram}
              rel="noopener noreferrer"
              target="_blank"
              className="text-blanc inline-block py-1 underline-offset-4 hover:underline"
            >
              Instagram {site.instagramHandle}
            </a>
          </address>
        </div>

        <nav aria-label="Pied de page" className="grid gap-8 text-sm sm:grid-cols-3">
          <div>
            <h2 className="text-blanc font-semibold">Le service</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                ["/prestations", "Toutes les formules"],
                ...formulas.map((f) => [`/prestations/${f.id}`, `Formule ${f.name}`] as const),
                ["/avant-apres", "Avant / Après"],
                ["/reservation", "Pré-réserver"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href!} className="inline-block py-1.5 underline-offset-4 hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-blanc font-semibold">Dans le Diois</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link
                    href={`/zone-intervention/${z.slug}`}
                    className="inline-block py-1.5 underline-offset-4 hover:underline"
                  >
                    {z.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-blanc font-semibold">En savoir plus</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                ["/conseils", "Conseils d'entretien"],
                ["/faq", "Questions fréquentes"],
                ["/zone-intervention", "Zone d'intervention"],
                ["/contact", "Contact"],
                ["/mentions-legales", "Mentions légales"],
                ["/politique-de-confidentialite", "Confidentialité"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href!} className="inline-block py-1.5 underline-offset-4 hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

      </div>
      <div className="border-blanc/15 text-gris relative border-t px-4 py-5 text-center text-xs">
        © {new Date().getFullYear()} {site.name}, {site.address.city}, Drôme
      </div>
    </footer>
  );
}

/** Barre d'action fixe en bas sur mobile : Pré-réserver + Appeler.
 *  Masquée sur le tunnel, qui a sa propre barre de total. */
export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/reservation")) return null;
  return (
    <div className="border-gris/50 bg-blanc/95 fixed inset-x-0 bottom-0 z-30 border-t p-3 backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <Link
          href="/reservation"
          className="bg-noir text-blanc flex min-h-11 flex-1 items-center justify-center rounded-full px-4 text-sm font-semibold"
        >
          Pré-réserver
        </Link>
        <a
          href={site.phoneHref}
          className="border-noir flex min-h-11 flex-1 items-center justify-center rounded-full border-2 px-4 text-sm font-semibold"
        >
          Appeler
        </a>
      </div>
    </div>
  );
}

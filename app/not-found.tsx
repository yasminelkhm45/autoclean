import Link from "next/link";
import { Logomark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="bg-noir text-blanc relative overflow-hidden">
      <Logomark className="text-jaune/10 pointer-events-none absolute -right-24 -top-24 h-96 w-96" />
      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="eyebrow text-jaune">Erreur 404</p>
        <h1 className="display mt-4 text-[length:var(--text-display-lg)]">
          Cette page a été aspirée.
        </h1>
        <p className="text-gris mx-auto mt-5 max-w-md text-lg">
          L'adresse demandée n'existe pas ou plus. Le reste du site, lui, est impeccable.
        </p>
        <Link
          href="/"
          className="bg-jaune text-noir mt-8 inline-flex min-h-11 items-center rounded-full px-7 py-3 font-semibold"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

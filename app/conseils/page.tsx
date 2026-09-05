import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { articlesByDate } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Conseils entretien intérieur voiture",
  description:
    "Taches, odeurs, poils d'animaux, prix, revente : nos réponses détaillées aux questions que l'on nous pose le plus souvent à l'atelier de Die.",
  path: "/conseils",
});

const dateFr = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default function ConseilsPage() {
  const [featured, ...rest] = articlesByDate;

  return (
    <>
      <Breadcrumbs items={[{ name: "Conseils", href: "/conseils" }]} />

      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6">
        <h1 className="display mx-auto max-w-3xl text-[length:var(--text-display-xl)]">
          Conseils d'entretien intérieur
        </h1>
        <p className="text-noir/70 mx-auto mt-4 max-w-2xl text-lg">
          Ce que nous constatons à l'atelier, mis par écrit : les méthodes qui
          fonctionnent, celles qui font perdre du temps, et ce qui relève
          vraiment du professionnel.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        {featured && (
          <Link
            href={`/conseils/${featured.slug}`}
            className="bg-noir text-blanc group block rounded-[var(--radius-card)] p-6 text-center sm:p-8"
          >
            <p className="text-jaune text-sm font-semibold">{featured.category}</p>
            <h2 className="display mx-auto mt-3 max-w-2xl text-[length:var(--text-display-md)] group-hover:underline">
              {featured.title}
            </h2>
            <p className="text-gris mx-auto mt-4 max-w-2xl leading-relaxed">{featured.excerpt}</p>
            <p className="text-gris mt-5 text-sm">
              {dateFr(featured.publishedAt)}, {featured.readingMinutes} min de lecture
            </p>
          </Link>
        )}

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/conseils/${a.slug}`}
                className="border-noir/12 hover:border-noir/45 group flex h-full flex-col rounded-[var(--radius-card)] border p-5 text-center transition-colors"
              >
                <p className="text-noir/55 text-sm font-semibold">{a.category}</p>
                <h2 className="mt-2 text-lg font-semibold group-hover:underline">{a.title}</h2>
                <p className="text-noir/65 mt-3 text-sm leading-relaxed">{a.excerpt}</p>
                <p className="text-noir/60 mt-auto pt-4 text-sm">
                  {a.readingMinutes} min de lecture
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="bg-jaune mt-10 flex flex-col items-center gap-4 rounded-[var(--radius-card)] p-6 text-center sm:p-8">
          <h2 className="display text-[length:var(--text-display-sm)]">
            Votre habitacle mérite mieux qu'un tutoriel
          </h2>
          <p className="mx-auto max-w-2xl">
            Ces méthodes fonctionnent chez vous. Pour ce qui demande une machine,
            l'atelier est à Die et le devis se fait en ligne en deux minutes.
          </p>
          <ButtonLink href="/reservation">Pré-réserver une prestation</ButtonLink>
        </div>
      </div>
    </>
  );
}

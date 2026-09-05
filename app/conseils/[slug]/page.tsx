import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Prose, slugifyHeading } from "@/components/sections/Prose";
import { articles, getArticle } from "@/content/articles";
import { JsonLd, articleJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/conseils/${a.slug}`,
  });
}

const dateFr = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const headings = article.blocks.filter((b) => b.type === "h2");
  const related = article.related
    .map(getArticle)
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <Breadcrumbs
        items={[
          { name: "Conseils", href: "/conseils" },
          { name: article.title, href: `/conseils/${article.slug}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6">
        <div className="text-center">
          <p className="text-noir/55 text-sm font-semibold">{article.category}</p>
          <h1 className="display mt-3 text-[length:var(--text-display-lg)]">{article.title}</h1>
        </div>

        <p className="border-noir/15 mt-6 border-l-4 pl-5 text-lg leading-relaxed">
          {article.excerpt}
        </p>

        <p className="text-noir/60 mt-5 text-center text-sm">
          Publié le {dateFr(article.publishedAt)}
          {article.updatedAt !== article.publishedAt &&
            `, mis à jour le ${dateFr(article.updatedAt)}`}
          , {article.readingMinutes} min de lecture
        </p>

        {headings.length > 2 && (
          <nav
            aria-label="Sommaire"
            className="border-noir/12 mt-8 rounded-[var(--radius-card)] border p-5"
          >
            <h2 className="font-semibold">Au sommaire</h2>
            <ol className="mt-3 flex flex-col gap-2 text-sm">
              {headings.map((h) => (
                <li key={h.text}>
                  <a
                    href={`#${slugifyHeading(h.text)}`}
                    className="text-noir/70 hover:text-noir inline-block py-1 underline-offset-4 hover:underline"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-10">
          <Prose blocks={article.blocks} />
        </div>

        {related.length > 0 && (
          <aside className="border-noir/10 mt-14 border-t pt-8">
            <h2 className="display text-center text-[length:var(--text-display-sm)]">À lire aussi</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/conseils/${r.slug}`}
                    className="border-noir/12 hover:border-noir/45 block h-full rounded-[var(--radius-card)] border p-5 transition-colors"
                  >
                    <p className="text-noir/55 text-sm font-semibold">{r.category}</p>
                    <p className="mt-1.5 font-semibold">{r.title}</p>
                    <p className="text-noir/60 mt-2 text-sm leading-relaxed">{r.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </>
  );
}

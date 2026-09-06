import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/content/articles";

/** Transforme [texte](/chemin) en lien Next, le reste en texte brut. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link
        key={`${m.index}-${m[2]}`}
        href={m[2]!}
        className="decoration-jaune font-medium underline decoration-2 underline-offset-4"
      >
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Identifiant d'ancre stable, dérivé du titre. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={slugifyHeading(b.text)}
                className="display mt-6 scroll-mt-24 text-center text-[length:var(--text-display-sm)]"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-2 text-center text-lg font-semibold">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-noir/80 leading-relaxed">
                {inline(b.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mx-auto flex w-fit flex-col gap-2.5 text-left">
                {b.items.map((it) => (
                  <li key={it} className="text-noir/80 flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="bg-noir mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mx-auto flex w-fit flex-col gap-3 text-left">
                {b.items.map((it, n) => (
                  <li key={it} className="text-noir/80 flex gap-3 leading-relaxed">
                    <span className="bg-noir text-blanc mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                      {n + 1}
                    </span>
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ol>
            );
          case "key":
            return (
              <p
                key={i}
                className="bg-jaune/25 my-2 rounded-[var(--radius-card)] px-5 py-4 text-center font-medium"
              >
                {inline(b.text)}
              </p>
            );
          case "cta":
            return (
              <div
                key={i}
                className="bg-noir text-blanc mt-6 flex flex-col items-center gap-4 rounded-[var(--radius-card)] p-6 text-center"
              >
                <p className="text-gris mx-auto max-w-xl leading-relaxed">{b.text}</p>
                <Link
                  href={b.href}
                  className="bg-jaune text-noir inline-flex min-h-11 items-center rounded-full px-6 py-3 text-sm font-semibold"
                >
                  {b.label}
                </Link>
              </div>
            );
        }
      })}
    </div>
  );
}

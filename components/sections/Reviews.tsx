import { reviews } from "@/content/avis";
import { site } from "@/content/site";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-jaune flex gap-0.5" aria-hidden="true">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
          <path d="m12 2 3 6.6 7 .8-5.2 4.8L18.2 21 12 17.4 5.8 21l1.4-6.8L2 9.4l7-.8L12 2Z" />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <Stars rating={5} />
        <p className="text-sm font-medium">
          Note {site.rating.value}/5 sur{" "}
          <a
            href={site.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Google
          </a>
        </p>
      </div>
      <ul className="grid gap-5 md:grid-cols-2">
        {reviews.map((r) => (
          <li key={r.author} className="border-blanc/15 flex flex-col items-center gap-4 rounded-[var(--radius-card)] border p-6 text-center sm:p-7">
            <Stars rating={r.rating} />
            <blockquote className="text-base leading-relaxed">« {r.text} »</blockquote>
            <p className="text-gris mt-auto text-sm">
              <span className="text-blanc font-semibold">{r.author}</span>, avis {r.source}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

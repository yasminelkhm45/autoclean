import type { Option } from "@/content/offre";

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const icons: Record<Option["icon"], React.ReactNode> = {
  /* Siège cuir */
  leather: (
    <>
      <path d="M8 4h6a2 2 0 0 1 2 2v8l1 6H7l1-6V6a2 2 0 0 1 2-2Z" transform="translate(0.5 0)" />
      <path d="M9 8h6M9 11h6" transform="translate(0.5 0)" />
    </>
  ),
  /* Patte d'animal */
  pet: (
    <>
      <circle cx="8" cy="8" r="1.7" />
      <circle cx="16" cy="8" r="1.7" />
      <circle cx="5.5" cy="12.5" r="1.6" />
      <circle cx="18.5" cy="12.5" r="1.6" />
      <path d="M12 12c2.6 0 4.8 1.9 4.8 4.1 0 1.6-1.2 2.6-2.6 2.4-.9-.1-1.5-.5-2.2-.5s-1.3.4-2.2.5c-1.4.2-2.6-.8-2.6-2.4C7.2 13.9 9.4 12 12 12Z" />
    </>
  ),
  /* Ciel de toit */
  roof: (
    <>
      <path d="M4 12c1-4 4-7 8-7s7 3 8 7" />
      <path d="M4 12h16" />
      <path d="M8 15.5h.01M12 16h.01M16 15.5h.01" />
    </>
  ),
  /* Nettoyage renforcé */
  deep: (
    <>
      <path d="M6 20 12 4l6 16" />
      <path d="M8.5 14h7" />
      <path d="M4 20h16" />
    </>
  ),
  /* Vitre hydrophobe */
  glass: (
    <>
      <path d="M5 6h14l-1.5 12h-11L5 6Z" />
      <path d="M12 10c1.2 1.5 1.8 2.6 1.8 3.5A1.8 1.8 0 0 1 12 15.2a1.8 1.8 0 0 1-1.8-1.7c0-.9.6-2 1.8-3.5Z" />
    </>
  ),
  /* Lave-glace */
  washer: (
    <>
      <path d="M7 14a5 5 0 0 0 10 0c0-3-3-7-5-9-2 2-5 6-5 9Z" />
      <path d="M10 14a2 2 0 0 0 2 2" />
    </>
  ),
  /* Pression pneus */
  tire: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 4v2.5M12 17.5V20M4 12h2.5M17.5 12H20" />
    </>
  ),
};

export function OptionIcon({
  icon,
  className = "h-6 w-6",
}: {
  icon: Option["icon"];
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps}>
      {icons[icon]}
    </svg>
  );
}

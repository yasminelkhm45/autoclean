import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "yellow" | "outline" | "outline-light";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-150 sm:px-7 sm:text-base";

const variants: Record<Variant, string> = {
  /* CTA primaire : noir, texte blanc (jaune au survol pour rester AA) */
  primary: "bg-noir text-blanc hover:bg-noir/85",
  /* CTA sur fond noir : jaune, texte noir */
  yellow: "bg-jaune text-noir hover:bg-blanc",
  outline: "border-2 border-noir text-noir hover:bg-noir hover:text-blanc",
  "outline-light": "border-2 border-blanc text-blanc hover:bg-blanc hover:text-noir",
};

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...rest
}: { variant?: Variant } & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={`${base} ${variants[variant]} disabled:opacity-50 ${className}`} {...rest} />
  );
}

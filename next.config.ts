import type { NextConfig } from "next";

/**
 * En-têtes de sécurité.
 *
 * Next n'en pose aucun par défaut : sans cette configuration, le site est
 * intégrable en iframe par n'importe qui, et rien ne limite les origines
 * autorisées à charger des scripts.
 *
 * La CSP tolère 'unsafe-inline' sur les scripts et les styles : Next injecte
 * son script d'amorçage et ses styles critiques en ligne. La durcir davantage
 * demanderait un middleware générant un nonce par requête, ce qui rendrait
 * toutes les pages dynamiques et ferait perdre le rendu statique.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://maps.google.com",
      "font-src 'self'",
      // Carte Google Maps, chargée uniquement après clic de l'utilisateur
      "frame-src https://www.google.com https://maps.google.com",
      "connect-src 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/presta", destination: "/prestations", permanent: true },
      { source: "/presta/:path*", destination: "/prestations", permanent: true },
      { source: "/pre-reservation", destination: "/reservation", permanent: true },
      { source: "/pre-reservation/:path*", destination: "/reservation", permanent: true },
    ];
  },
};

export default nextConfig;

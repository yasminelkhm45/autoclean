import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

import type { NextConfig } from "next";

// Baked in at build time. This deploy's domain never changes, so a static
// redirect is fine; if it ever needs to vary per environment, move this to
// `proxy.ts` (which reads env at request time).
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://abilitycenter.org";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Bare root → the one real page.
      {
        source: "/",
        destination: "/get-help",
        permanent: false,
      },
      // Everything else → the marketing site. The negative lookahead keeps
      // `/get-help` (and sub-paths), Next internals, and any file with an
      // extension (favicon, /header/*.png, robots.txt, …) from matching.
      {
        source: "/:path((?!get-help|_next|.*\\.).*)",
        destination: SITE_URL,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

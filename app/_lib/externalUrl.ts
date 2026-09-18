/**
 * Build an absolute URL to the main marketing site.
 *
 * Footer and header links point to a separate site, so callers pass just the
 * path (e.g. `/contact-us`) and this prefixes it with `NEXT_PUBLIC_SITE_URL`.
 *
 *   externalUrl("/contact-us") -> "https://theabilitycenter.org/contact-us"
 *
 * If the env var is unset (e.g. local dev without .env.local) it falls back to
 * a root-relative path so links still resolve, just to this app.
 */
const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");

export function externalUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

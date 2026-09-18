import Link from "next/link";
import { ReactNode } from "react";

export interface TextLinkProps {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
}

// Inline link for body copy: brand blue, no underline at rest, underline on
// hover. The `!` prefixes are needed to beat the site-wide
// `a:not(.button-link) { text-decoration: underline; }` base rule in
// globals.css, which otherwise wins on specificity over a plain utility.
const TextLink = ({ href, children, isExternal }: TextLinkProps) => {
  const className = "text-brand-light-blue !no-underline hover:!underline";

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default TextLink;

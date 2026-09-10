import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  /** rendered brighter at rest (e.g. "Give") */
  emphasized?: boolean;
  /** this link also opens a dropdown menu */
  hasMenu?: boolean;
};

/**
 * Top-nav link with an underline that wipes in from left to right on
 * hover / keyboard focus (scaleX from 0 → 1, anchored left).
 *
 * When it triggers a dropdown, the parent `<li>` carries the `group` class and
 * the panel reacts to `group-hover` / `group-focus-within` — so the underline
 * also shows whenever the menu is open.
 */
export function NavLink({
  href,
  children,
  emphasized = false,
  hasMenu = false,
}: NavLinkProps) {
  return (
    <a
      href={href}
      aria-haspopup={hasMenu || undefined}
      className={[
        "relative inline-block py-1 text-[17px] font-bold uppercase tracking-wide",
        "transition-colors duration-200",
        emphasized ? "text-white" : "text-nav",
        "hover:text-white focus-visible:text-white focus-visible:outline-none",
        hasMenu ? "group-hover:text-white group-focus-within:text-white" : "",
        // sliding underline
        "after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-0.5",
        "after:h-px after:origin-left after:scale-x-0 after:bg-current after:content-['']",
        "after:transition-transform after:duration-300 after:ease-out",
        "hover:after:scale-x-100 focus-visible:after:scale-x-100",
        hasMenu
          ? "group-hover:after:scale-x-100 group-focus-within:after:scale-x-100"
          : "",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

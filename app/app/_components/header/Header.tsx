import { externalUrl } from "@/app/_lib/externalUrl";
import { navItems, searchHref } from "./header.data";
import { NavMenu } from "./NavMenu";

export function Header() {
  return (
    // `relative` so mega panels can anchor here and span the full viewport width
    <header className="relative z-30 bg-brand-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-4">
        <a
          href={externalUrl("/")}
          aria-label="The Ability Center — home"
          className="shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/header/aclogo.png"
            alt="The Ability Center"
            width={1157}
            height={144}
            className="h-10 w-auto"
          />
        </a>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-end gap-x-7 gap-y-2">
            {navItems.map((item) => (
              <NavMenu key={item.label} item={item} />
            ))}
            <li>
              <a
                href={searchHref}
                aria-label="Search"
                className="inline-flex items-center text-white/70 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none"
              >
                <svg
                  viewBox="0 0 24 24"
                  width={18}
                  height={18}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.8-3.8" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

import { externalUrl } from "@/app/_lib/externalUrl";
import { give, navItems } from "./header.data";
import { MobileNav } from "./MobileNav";
import { NavMenu } from "./NavMenu";
import { SearchLink } from "./SearchLink";

export function Header() {
  return (
    // `relative` so mega panels can anchor here and span the full viewport width
    <header className="relative z-30 bg-brand-navy/98 text-white">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between px-4 py-2 lg:py-9 lg:px-0">
        <a
          href={externalUrl("/")}
          aria-label="The Ability Center — home"
          className="shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/header/aclogo.png"
            alt="The Ability Center"
            width={321}
            height={40}
            className="h-6 w-[193px] lg:h-10 lg:w-[321px]"
          />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex flex-wrap items-center justify-end gap-x-7 mr-2">
            {navItems.map((item) => (
              <NavMenu key={item.label} item={item} />
            ))}
            <li>
              <a
                href={give.href}
                className="inline-block bg-brand-navy px-5 py-2 text-[17px] font-bold uppercase tracking-wide text-white button-link"
              >
                {give.label}
              </a>
            </li>
            <li>
              <SearchLink className="ml-4" />
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <SearchLink />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

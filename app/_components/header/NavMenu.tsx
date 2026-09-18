import type { NavItem } from "./header.data";
import { NavLink } from "./NavLink";

/**
 * One primary-nav entry.
 *
 * - No `menu`      → plain <NavLink>.
 * - `menu.single`  → dropdown: a single vertical column of links, anchored to
 *                    the trigger.
 * - `menu.mega`    → full-width panel of heading + link columns spread with
 *                    `justify-between`, anchored to the header container.
 *
 * Open/close is CSS-only for this pass: the <li> is the `group`, and panels
 * react to `group-hover` / `group-focus-within`. A JS layer (Escape to close,
 * click-outside, hover-intent delay) can wrap this later without changing the
 * markup.
 */

// Shared visibility / transition behaviour for both panel types.
const panel = [
  "pointer-events-none invisible absolute z-50 opacity-0 translate-y-[1px]",
  "transition duration-200 ease-out",
  // invisible bridge across the gap between trigger and panel so the pointer
  // can travel down without the menu closing
  "before:absolute before:inset-x-0 before:bottom-full before:h-4 before:content-['']",
  "group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-hover:translate-y-0",
  "group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0",
].join(" ");

export function NavMenu({ item }: { item: NavItem }) {
  if (!item.menu) {
    return (
      <li>
        <NavLink href={item.href} emphasized={item.emphasized} >
          {item.label}
        </NavLink>
      </li>
    );
  }

  const isMega = item.menu.type === "mega";

  return (
    // single → anchor the panel to this <li>; mega → stay static so its panel
    // anchors to <header> and spans the full viewport width.
    //
    // `lg:py-9 lg:-my-9` grows the hover target to fill the header's vertical
    // padding (Header uses `lg:py-9`) without shifting layout, so the pointer
    // can travel from the trigger down to the panel without a dead gap.
    <li
      className={`group lg:-my-9 lg:py-9 ${isMega ? "" : "relative"}`}
    >
      <NavLink href={item.href} emphasized={item.emphasized} hasMenu>
        {item.label}
      </NavLink>

      {item.menu.type === "single" ? (
        <div
          className={`${panel} left-0 top-full min-w-[240px] bg-brand-navy py-2`}
        >
          <ul>
            {item.menu.items.map((leaf) => (
              <li key={leaf.label}>
                <a
                  href={leaf.href}
                  {...(leaf.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="button-link block px-4 py-2 text-[17px] text-nav transition-colors hover:bg-white/5 hover:text-white"
                >
                  {leaf.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className={`${panel} inset-x-0 top-full w-full border-t-[0.5px] border-[#444444] bg-brand-navy`}
        >
          <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-x-8 gap-y-10 px-6 py-6">
            {item.menu.columns.map((col) => (
              <div key={col.heading} className="flex min-w-[160px] flex-col gap-x-3">
                {col.headingHref ? (
                  <a
                    href={col.headingHref}
                    className="button-link text-[16px] font-bold tracking-wide text-white"
                  >
                    {col.heading}
                  </a>
                ) : (
                  <span className="text-[16px] font-bold tracking-wide text-white">
                    {col.heading}
                  </span>
                )}
                <ul className="flex flex-col gap-2">
                  {col.items.map((leaf) => (
                    <li key={leaf.label}>
                      <a
                        href={leaf.href}
                        {...(leaf.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="button-link -mx-2 block px-2 py-1 text-[17px] text-nav transition-colors hover:bg-brand-purple hover:text-white"
                      >
                        {leaf.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

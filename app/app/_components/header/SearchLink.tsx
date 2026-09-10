import { searchHref } from "./header.data";

/** Search icon link — shared by the desktop nav and the mobile control cluster. */
export function SearchLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={searchHref}
      aria-label="Search"
      className={`inline-flex items-center text-white/70 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width={24}
        height={24}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.8-3.8" />
      </svg>
    </a>
  );
}

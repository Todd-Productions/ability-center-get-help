"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { externalUrl } from "@/app/_lib/externalUrl";

const SearchContext = createContext<{ open: () => void } | null>(null);

/**
 * Wraps the header content. Owns the open/closed state for the slide-down
 * search panel and renders the panel itself (anchored to the `relative`
 * <header>). Any `<SearchButton/>` inside opens it via context.
 *
 * Submitting sends the browser to the marketing site's search:
 * `${NEXT_PUBLIC_SITE_URL}/?s=<query>`.
 */
export function HeaderSearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    window.location.assign(externalUrl(`/?s=${encodeURIComponent(q)}`));
  };

  return (
    <SearchContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      {/* Covers the whole header and slides down from the top when opened. */}
      <div
        className={`absolute inset-x-0 top-0 z-50 bg-brand-navy transition-transform duration-300 ease-out pt-24 pb-12 ${
          isOpen ? "translate-y-0" : "pointer-events-none -translate-y-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="mx-auto max-w-[1320px] px-4 py-10 lg:px-0">
          <form
            onSubmit={submit}
            className="flex items-center gap-6 border-b-2 border-white pb-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH"
              aria-label="Search"
              className="min-w-0 flex-1 bg-transparent text-[48px] font-bold uppercase leading-none text-nav outline-none placeholder:text-nav"
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close search"
              className="shrink-0 text-nav transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </form>
          <p className="mt-3 text-[18px] text-nav">
            Hit enter to search or ESC to close
          </p>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

/** Magnifier icon button that opens the search panel. */
export function SearchButton({ className = "" }: { className?: string }) {
  const ctx = useContext(SearchContext);

  return (
    <button
      type="button"
      onClick={() => ctx?.open()}
      aria-label="Open search"
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
    </button>
  );
}

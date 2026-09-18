"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { navItems, type NavColumn, type NavItem } from "./header.data";

/**
 * Mobile navigation drawer.
 *
 * A 3-line burger (shown below `lg`) opens a panel that slides in from the
 * right at ~70% width, navy background, white text. Links are a plain
 * accordion: a chevron points down when collapsed and spins to point up when
 * open. Two nesting levels can expand — top-level items (30px) and, inside a
 * mega menu, each column heading (16px) with its links (16px).
 */

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-5 shrink-0 transition-transform duration-200 ${
        open ? "-rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Level 2 accordion: one mega-menu column (heading + its links). */
function ColumnAccordion({
  column,
  onNavigate,
}: {
  column: NavColumn;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-3 pl-4 text-left text-[16px]"
      >
        <span>{column.heading}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <ul className="pb-2">
          {column.items.map((leaf) => (
            <li key={leaf.label}>
              <a
                href={leaf.href}
                onClick={onNavigate}
                {...(leaf.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="button-link block py-2 pl-8 text-[16px]"
              >
                {leaf.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Level 1 accordion: one top-level nav item. */
function ItemAccordion({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.menu) {
    return (
      <a
        href={item.href}
        onClick={onNavigate}
        className="button-link block border-b border-white/10 py-4 text-[30px]"
      >
        {item.label}
      </a>
    );
  }

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-4 text-left text-[30px]"
      >
        <span>{item.label}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className="pb-2">
          {item.menu.type === "single"
            ? item.menu.items.map((leaf) => (
                <a
                  key={leaf.label}
                  href={leaf.href}
                  onClick={onNavigate}
                  {...(leaf.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="button-link block py-2 pl-4 text-[16px]"
                >
                  {leaf.label}
                </a>
              ))
            : item.menu.columns.map((col) => (
                <ColumnAccordion
                  key={col.heading}
                  column={col}
                  onNavigate={onNavigate}
                />
              ))}
        </div>
      )}
    </div>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portal target (`document.body`) only exists on the client. Start `false` so
  // the server and first client render agree, then flip after mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex items-center justify-center p-2 text-white lg:hidden"
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
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] lg:hidden ${
              open ? "" : "pointer-events-none"
            }`}
            aria-hidden={!open}
          >
            <div
              onClick={close}
              className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className={`absolute inset-y-0 right-0 flex w-[70%] flex-col overflow-y-auto bg-brand-navy text-white shadow-xl transition-transform duration-300 ease-out ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-end p-4">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="inline-flex items-center justify-center p-2 text-white"
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
              </div>

              <nav aria-label="Mobile" className="px-6 pb-10">
                {navItems.map((item) => (
                  <ItemAccordion
                    key={item.label}
                    item={item}
                    onNavigate={close}
                  />
                ))}
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

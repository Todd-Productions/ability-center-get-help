"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sticky wrapper that hides the header on scroll-down and reveals it on
 * scroll-up. It also stays visible while near the top of the page and once the
 * user reaches the bottom.
 *
 * Kept separate from <Header/> so the header markup itself stays a server
 * component — only this thin shell ships to the client.
 */
const TOP_ZONE = 80; // px from the top where the header is always shown
const MIN_DELTA = 6; // ignore sub-pixel / rubber-band scroll jitter
const BOTTOM_ZONE = 8; // px from the bottom that still counts as "reached the end"

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      ticking.current = false;
      const y = Math.max(0, window.scrollY);

      // Absolute position wins regardless of scroll speed / direction, so a
      // slow drift into the top or bottom zone still reveals the header.
      const atTop = y <= TOP_ZONE;
      const atBottom =
        window.innerHeight + y >=
        document.documentElement.scrollHeight - BOTTOM_ZONE;

      if (atTop || atBottom) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      // Otherwise decide by direction, ignoring jitter. Don't update lastY on a
      // sub-threshold move so small scrolls can accumulate.
      const delta = y - lastY.current;
      if (Math.abs(delta) < MIN_DELTA) return;

      setHidden(delta > 0); // scrolling down → hide
      lastY.current = y;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={[
        "sticky top-0 z-40 will-change-transform",
        "transition-transform duration-300 ease-out motion-reduce:transition-none",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

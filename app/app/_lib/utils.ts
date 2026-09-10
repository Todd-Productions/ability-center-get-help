type ClassValue = string | number | null | false | undefined | ClassValue[];

/**
 * Join conditional class names, skipping falsy values.
 *
 * Minimal, dependency-free stand-in for the usual `clsx` + `tailwind-merge`
 * `cn` helper — enough for how it's used here (strings + `cond && "class"`).
 * Swap in `twMerge(clsx(...))` if Tailwind class conflict resolution is needed.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }

  return out.join(" ");
}

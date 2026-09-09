/**
 * Placeholder for the Google Website Translator dropdown shown in the design.
 *
 * Rendered as a plain, non-interactive <select> so the layout is accurate.
 * Replace with the real widget mount point (`<div id="google_translate_element" />`
 * plus its script) when translation is wired up.
 */
export function TranslateWidget() {
  return (
    <div className="mt-3 inline-block">
      <select
        aria-label="Translate this site"
        defaultValue=""
        className="rounded border border-white/40 bg-white px-2 py-1 text-sm text-[#0a2547]"
      >
        <option value="" disabled>
          Select Language
        </option>
      </select>
    </div>
  );
}

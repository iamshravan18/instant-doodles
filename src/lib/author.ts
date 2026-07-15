/* ============================================================
   AUTHOR / EDITORIAL IDENTITY — single source of truth.

   Used by the Author component (UI) and schema.ts (Person JSON-LD).
   Kept import-free so it can be consumed from both server components
   and the schema layer without creating an import cycle with site.ts.

   Only factual, owner-supplied properties live here. Do not add
   fabricated credentials, awards, employers, dates, or social
   profiles — those must be provided by the guide owner before use.
   ============================================================ */

export const AUTHOR = {
  name: "Shravan Gupta",
  role: "Digital Marketing & Affiliate Marketing Specialist",
  bio: "Shravan Gupta is a digital marketing and affiliate marketing specialist and the editor of the Independent InstaDoodle Guide. He researches whiteboard-animation and doodle-video software using official product information and firsthand inspection, then writes the guidance published across this site.",
  experience:
    "His work focuses on digital marketing and affiliate marketing, with a particular emphasis on clear, honest product-education content for creative software.",
  responsibility:
    "He is responsible for the guide's research methodology, the separation of verified facts from editorial interpretation, and its affiliate-disclosure standards.",
  /** Canonical page describing the author and the guide. */
  path: "/about",
} as const;

/**
 * Editorial "last reviewed" marker for authored pages.
 * Update when the guidance is next reviewed. Kept as a single constant
 * so `dateModified` in schema and the visible byline never drift apart.
 */
export const EDITORIAL_LAST_UPDATED_ISO = "2026-07-16";
export const EDITORIAL_LAST_UPDATED_LABEL = "July 16, 2026";

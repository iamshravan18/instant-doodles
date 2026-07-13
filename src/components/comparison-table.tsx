import type { ReactNode } from "react";

export interface CompareRow {
  dimension: string;
  instadoodle: ReactNode;
  alternative: ReactNode;
}

/**
 * Responsive comparison table.
 * - md+ : a real semantic <table> with row/column headers.
 * - <md : the same data re-flowed into stacked, readable cards
 *         (never shrunk-to-unreadable). Both are server-rendered.
 */
export function ComparisonTable({
  caption,
  altName,
  rows,
}: {
  caption: string;
  altName: string;
  rows: CompareRow[];
}) {
  return (
    <div>
      {/* Desktop / tablet: semantic table */}
      <div className="hidden overflow-x-auto rounded-[var(--r-lg)] border-2 border-ink md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-lavender">
              <th scope="col" className="w-[34%] px-5 py-4 font-extrabold">Dimension</th>
              <th scope="col" className="border-l border-black/10 px-5 py-4 font-extrabold text-violet">InstaDoodle</th>
              <th scope="col" className="border-l border-black/10 px-5 py-4 font-extrabold">{altName}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.dimension} className={i % 2 ? "bg-card" : "bg-[var(--lavender-soft)]"}>
                <th scope="row" className="border-t border-black/10 px-5 py-4 align-top font-bold">{row.dimension}</th>
                <td className="border-l border-t border-black/10 px-5 py-4 align-top text-ink">{row.instadoodle}</td>
                <td className="border-l border-t border-black/10 px-5 py-4 align-top text-muted">{row.alternative}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <ul className="space-y-4 md:hidden">
        {rows.map((row) => (
          <li key={row.dimension} className="rounded-[var(--r-md)] border-2 border-ink bg-card p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted">{row.dimension}</p>
            <div className="mt-3 grid gap-3">
              <div className="rounded-lg border border-violet/30 bg-[var(--lavender-soft)] p-3">
                <p className="text-xs font-extrabold text-violet">InstaDoodle</p>
                <p className="mt-1 text-sm text-ink">{row.instadoodle}</p>
              </div>
              <div className="rounded-lg border border-black/12 p-3">
                <p className="text-xs font-extrabold text-ink">{altName}</p>
                <p className="mt-1 text-sm text-muted">{row.alternative}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { allPages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Search the guide",
  description: "Search the Independent InstaDoodle Guide by workflow, use case, comparison, or topic.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

function normalizeQuery(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value ?? "").trim().toLowerCase();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = normalizeQuery(q);
  const results = query
    ? allPages.filter((page) => {
        if (page.noindex) return false;
        const searchable = [
          page.title,
          page.h1,
          page.description,
          page.intro,
          page.primaryKeyword,
          page.slug.join(" "),
        ]
          .join(" ")
          .toLowerCase();
        return searchable.includes(query);
      })
    : [];

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet">Guide search</p>
      <h1 className="mt-3 text-[length:var(--step-4)] font-black leading-[0.98] tracking-[-0.035em]">
        Find a guide for the decision you are making.
      </h1>
      <p className="answer-summary mt-5 max-w-2xl text-[length:var(--step-1)] leading-8 text-muted">
        Search the guide by topic, workflow, use case, or comparison. Search results are not indexed, so they do not create low-value duplicate pages.
      </p>

      <form action="/search" className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="guide-search">Search the guide</label>
        <input
          id="guide-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Try: AI whiteboard animation"
          className="min-h-12 flex-1 rounded-xl border-2 border-ink bg-card px-4 text-ink outline-none placeholder:text-muted focus:border-violet"
        />
        <button type="submit" className="min-h-12 rounded-xl bg-violet px-6 font-extrabold text-white transition hover:bg-ink">
          Search guides
        </button>
      </form>

      {query && (
        <div className="mt-10" aria-live="polite">
          <h2 className="text-2xl font-black">{results.length} result{results.length === 1 ? "" : "s"} for “{query}”</h2>
          {results.length > 0 ? (
            <ul className="mt-5 grid gap-4">
              {results.map((page) => {
                const href = `/${page.slug.join("/")}`;
                return (
                  <li key={href}>
                    <Link href={href} className="block rounded-2xl border border-black/12 bg-card p-6 transition hover:border-violet hover:shadow-[var(--shadow-card)]">
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-violet">{page.eyebrow}</p>
                      <h3 className="mt-2 text-xl font-black">{page.title}</h3>
                      <p className="mt-2 text-muted">{page.description}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-4 text-muted">No guide matched that wording. Try “features”, “training”, “comparison”, or “whiteboard animation”.</p>
          )}
        </div>
      )}
    </section>
  );
}

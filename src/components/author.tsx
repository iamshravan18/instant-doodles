import Link from "next/link";
import { AUTHOR, EDITORIAL_LAST_UPDATED_ISO, EDITORIAL_LAST_UPDATED_LABEL } from "@/lib/author";

/**
 * Reusable author / editorial-attribution byline.
 *
 * Rendered on educational pages (via `SitePage.showAuthor`) and the
 * About / Editorial Policy pages to reinforce E-E-A-T. Uses only the
 * factual author data from `@/lib/author`; no fabricated photo,
 * credentials, or social links.
 */
export function AuthorByline({
  updatedIso = EDITORIAL_LAST_UPDATED_ISO,
  updatedLabel = EDITORIAL_LAST_UPDATED_LABEL,
}: {
  updatedIso?: string;
  updatedLabel?: string;
}) {
  return (
    <section aria-labelledby="author-byline-title" className="border-b border-black/10 bg-card">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-black/12 bg-paper p-5 sm:flex-row sm:items-start sm:p-6">
          <span
            aria-hidden
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-ink bg-violet text-lg font-black text-white"
          >
            SG
          </span>
          <div className="min-w-0">
            <p id="author-byline-title" className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
              Written &amp; reviewed by
            </p>
            <p className="mt-1 text-lg font-black tracking-[-0.02em]">{AUTHOR.name}</p>
            <p className="text-sm font-semibold text-muted">{AUTHOR.role}</p>
            <p className="mt-3 max-w-2xl text-sm text-muted">{AUTHOR.bio}</p>
            <p className="mt-2 max-w-2xl text-sm text-muted">{AUTHOR.responsibility}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <Link href={AUTHOR.path} className="font-bold text-violet hover:underline">
                About the author &amp; this guide <span aria-hidden>→</span>
              </Link>
              <Link href="/editorial-policy" className="font-bold text-violet hover:underline">
                Editorial policy <span aria-hidden>→</span>
              </Link>
              <span className="text-muted">
                Last updated{" "}
                <time dateTime={updatedIso} className="font-semibold text-ink">
                  {updatedLabel}
                </time>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

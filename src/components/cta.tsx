import Link from "next/link";
import { AffiliateLink } from "./affiliate-link";
import { TrackedLink } from "./tracked-link";
import { ANALYTICS_EVENTS, type AnalyticsEvent } from "@/lib/analytics";

/** Substantial closing CTA. Always shows a useful internal next step;
 *  the external official-offer button only renders when the affiliate
 *  URL is configured (fails safe). */
export function CtaBand({
  eyebrow = "Next step",
  title,
  body,
  primaryHref,
  primaryLabel,
  primaryEvent = ANALYTICS_EVENTS.finalCta,
  secondaryHref,
  secondaryLabel,
  placement,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  primaryHref: string;
  primaryLabel: string;
  primaryEvent?: AnalyticsEvent;
  secondaryHref?: string;
  secondaryLabel?: string;
  placement: string;
}) {
  return (
    <section className="bg-paper">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-[var(--r-xl)] border-2 border-ink bg-ink px-6 py-14 text-white shadow-[var(--shadow-hard-lavender)] sm:px-12">
          <div aria-hidden className="absolute inset-x-0 top-0 -z-0 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(199,9,163,0.35),transparent_60%)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-lavender">{eyebrow}</p>
            <h2 className="mx-auto mt-4 text-[length:var(--step-3)] font-black leading-[1.03] tracking-[-0.03em]">{title}</h2>
            {body && <p className="mx-auto mt-4 max-w-xl text-white/75">{body}</p>}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <TrackedLink
                href={primaryHref}
                event={primaryEvent}
                eventDetail={{ placement }}
                className="rounded-full bg-white px-6 py-3 font-extrabold text-ink transition hover:bg-magenta hover:text-white"
              >
                {primaryLabel} <span aria-hidden>→</span>
              </TrackedLink>
              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="rounded-full border-2 border-white/60 px-6 py-3 font-extrabold text-white transition hover:border-white hover:bg-white/10"
                >
                  {secondaryLabel}
                </Link>
              )}
              <AffiliateLink
                placement={`${placement}_offer`}
                className="rounded-full border-2 border-white px-6 py-3 font-extrabold text-white transition hover:bg-white hover:text-ink"
              >
                Check the official offer <span aria-hidden>↗</span>
              </AffiliateLink>
            </div>
            <p className="mx-auto mt-6 max-w-lg text-xs text-white/55">
              This is an independent guide, not the official InstaDoodle website. Verify current features, pricing and
              terms on the official offer page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

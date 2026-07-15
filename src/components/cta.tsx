import Link from "next/link";
import { AffiliateOfferCta } from "./affiliate-link";
import { OfficialProductImage, type OfficialProductImageKey } from "./official-product-image";
import { TrackedLink } from "./tracked-link";
import { ANALYTICS_EVENTS, type AnalyticsEvent } from "@/lib/analytics";

/**
 * A closing CTA always provides an internal next step. The external offer and
 * its adjacent disclosure appear only after an approved affiliate URL is set.
 */
export function CtaBand({
  eyebrow = "Next step",
  title,
  body,
  visualImage,
  visualAlt,
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
  visualImage?: OfficialProductImageKey;
  visualAlt?: string;
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
          <div className={`relative mx-auto ${visualImage ? "grid max-w-5xl items-center gap-9 text-left lg:grid-cols-[0.75fr_1.25fr]" : "max-w-3xl text-center"}`}>
            {visualImage && visualAlt && (
              <OfficialProductImage
                image={visualImage}
                alt={visualAlt}
                sizes="(min-width: 1024px) 28vw, 100vw"
                className="bg-card shadow-none"
              />
            )}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-lavender">{eyebrow}</p>
              <h2 className={`mt-4 text-[length:var(--step-3)] font-black leading-[1.03] tracking-[-0.03em] ${visualImage ? "max-w-2xl" : "mx-auto"}`}>{title}</h2>
              {body && <p className={`mt-4 max-w-xl text-white/75 ${visualImage ? "" : "mx-auto"}`}>{body}</p>}
              <div className={`mt-8 flex flex-wrap items-center gap-3 ${visualImage ? "justify-start" : "justify-center"}`}>
                <TrackedLink
                  href={primaryHref}
                  event={primaryEvent}
                  eventDetail={{ placement }}
                  className="min-h-12 rounded-full bg-white px-6 py-3 font-extrabold text-ink transition hover:bg-magenta hover:text-white"
                >
                  {primaryLabel} <span aria-hidden>→</span>
                </TrackedLink>
                {secondaryHref && secondaryLabel && (
                  <Link
                    href={secondaryHref}
                    className="min-h-12 rounded-full border-2 border-white/60 px-6 py-3 font-extrabold text-white transition hover:border-white hover:bg-white/10"
                  >
                    {secondaryLabel}
                  </Link>
                )}
                <AffiliateOfferCta
                  placement={`${placement}_offer`}
                  className="min-h-12 rounded-full border-2 border-white px-6 py-3 font-extrabold text-white transition hover:bg-white hover:text-ink"
                />
              </div>
              <p className={`mt-6 max-w-lg text-xs text-white/55 ${visualImage ? "" : "mx-auto"}`}>
                This is an independent guide, not the official InstaDoodle website. Verify current features, pricing, and terms on the official offer page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

interface AffiliateOfferCtaProps {
  className?: string;
  placement: string;
  label?: string;
  tone?: "dark" | "light";
}

/**
 * Environment-gated commercial CTA. The button and its adjacent disclosure
 * render together only when an approved destination is configured. `tone`
 * adapts the disclosure color for dark (default, CtaBand) or light surfaces.
 */
export function AffiliateOfferCta({ className, placement, label = "Check the official offer", tone = "dark" }: AffiliateOfferCtaProps) {
  const href = process.env.NEXT_PUBLIC_AFFILIATE_URL;
  if (!href) return null;

  const noteClass = tone === "light" ? "text-muted" : "text-white/65";

  return (
    <div className="flex basis-full flex-col items-center gap-2 sm:basis-auto">
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className={className}
        onClick={() => trackEvent(ANALYTICS_EVENTS.affiliateLink, { placement })}
      >
        {label} <span aria-hidden>↗</span>
        <span className="sr-only"> (opens the official site in a new tab)</span>
      </a>
      <p className={`max-w-56 text-center text-[11px] leading-4 ${noteClass}`}>
        Affiliate disclosure: this link may earn this independent guide a commission at no extra cost to you.
      </p>
    </div>
  );
}

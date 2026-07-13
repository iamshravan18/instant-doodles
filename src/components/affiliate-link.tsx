"use client";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

interface AffiliateLinkProps {
  className?: string;
  children: React.ReactNode;
  placement: string;
}

/**
 * Environment-gated affiliate CTA.
 * Renders nothing until NEXT_PUBLIC_AFFILIATE_URL (an approved HopLink) is set,
 * so the guide ships with affiliate actions safely disabled.
 * Opens the external official offer in a new tab and fires the affiliate
 * analytics event before the browser hands off to the new tab.
 */
export function AffiliateLink({ className, children, placement }: AffiliateLinkProps) {
  const href = process.env.NEXT_PUBLIC_AFFILIATE_URL;
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={className}
      onClick={() => trackEvent(ANALYTICS_EVENTS.affiliateLink, { placement })}
    >
      {children}
      <span className="sr-only"> (opens the official site in a new tab)</span>
    </a>
  );
}

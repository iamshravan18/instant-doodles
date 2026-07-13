export const ANALYTICS_EVENTS = {
  primaryCta: "primary_cta_click",
  affiliateLink: "affiliate_link_click",
  pricingCta: "pricing_cta_click",
  navigationCta: "navigation_cta_click",
  videoPlay: "video_play",
  comparisonCta: "comparison_cta_click",
  finalCta: "final_cta_click",
  contactAction: "contact_action",
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export function trackEvent(event: AnalyticsEvent, detail?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("instadoodle:analytics", { detail: { event, ...detail } }));
  const dataLayer = (window as Window & { dataLayer?: Array<Record<string, string>> }).dataLayer;
  dataLayer?.push({ event, ...detail });
}

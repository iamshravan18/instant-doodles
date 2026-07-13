# Analytics event map

No analytics provider or ID is configured. The client helper dispatches `instadoodle:analytics` and forwards to an already-configured `window.dataLayer` only when present. Events contain only event name and placement/destination context; no personal data is collected by this code.

| Event | Trigger |
|---|---|
| `primary_cta_click` | Primary product-guide CTAs |
| `affiliate_link_click` | Environment-gated official-offer link |
| `pricing_cta_click` | Pricing route CTA |
| `navigation_cta_click` | Header workflow CTA |
| `video_play` | Reserved for a future real video player; not emitted by a static image |
| `comparison_cta_click` | Comparison CTAs |
| `final_cta_click` | Final homepage CTA |
| `contact_action` | Contact-route links |

Any analytics provider must be configured with an approved environment variable. Do not add a provider ID or expose a server-only key in the browser bundle.

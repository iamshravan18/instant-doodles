# Production-readiness audit — Independent InstaDoodle Guide

- Audit date: 2026-07-13 (post-redesign, post-motion-fix)
- Repository: `/Users/apple/Documents/Playground/instant-doodles`
- Branch: `main`
- Framework: Next.js 16.2.10 (App Router, Turbopack), React 19.2.4, Tailwind CSS 4, `motion` 12
- Scope: 21 rendered routes (home + 20 data-driven routes served by one `[...slug]` template), plus `robots.txt` and `sitemap.xml`.

> This report reflects the **current** state after the motion defect fix and the content redesign. All pre-redesign word counts and the earlier "blank page" findings are superseded and must not be read as current. Word counts below are freshly measured from the rendered `<main>` of the production build (`next start`) and are approximate; they include the in-page breadcrumb, hero, body, related-links band and closing CTA, and exclude the shared global header and footer.

---

## 1. Executive summary

- **Build/lint/types:** `npm run lint` PASS, `npx tsc --noEmit` PASS, `npm run build` PASS (26 prerendered entries), `git diff --check` PASS.
- **Routing:** All 21 routes return HTTP 200. Exactly one `<h1>` per route. No broken internal links. No failed network/image requests.
- **Motion defect:** Fixed and verified. SSR / no-JS / reduced-motion content is fully visible (zero hidden `opacity:0` wrappers in `<main>` in those modes); scroll-reveal animation still runs for normal-motion clients.
- **SEO safety:** Indexing is environment-gated on `NEXT_PUBLIC_SITE_URL`. With it unset (current default build) every route emits `noindex, follow`, `robots.txt` disallows all, and the sitemap is empty — a deliberate fail-safe. With it set, 17 routes emit `index, follow` and 4 placeholders (`/pricing`, `/contact`, `/privacy`, `/terms`) remain `noindex, follow`; `robots.txt` allows all and the sitemap lists exactly the 17 indexable URLs.
- **Responsive:** Zero horizontal overflow on all 21 routes at 6 widths (1440/1024/768/430/390/375).
- **Console/hydration:** Zero console errors, zero console warnings, zero hydration mismatches, zero page errors across all 21 routes.
- **Primary launch blockers:** owner business/legal inputs (pricing, legal text, contact, identity), written permission to reuse official InstaDoodle artwork, production `NEXT_PUBLIC_SITE_URL`, and editorial depth/verified product research on the thinner commercial routes. Details in sections 9–10.

---

## 2. Motion defect — root cause and fix

**Defect (pre-fix):** `src/components/motion.tsx` primitives (`Reveal`, `Stagger`, `StaggerItem`) baked their hidden initial state (`opacity:0; translateY`) into server-rendered HTML because `useReducedMotion()` returns `false` during SSR. With JS disabled, before hydration, and for reduced-motion users the opacity was never restored, so most page content rendered invisible. Because QA screenshots capture with `reducedMotion: "reduce"`, full-page captures showed blank hero/body sections.

**Fix:** `motion.tsx` now renders plain, fully-visible elements on the server and during the hydrating render; entry animations attach only on the client for users who have not requested reduced motion. Client/hydration state is read with `useSyncExternalStore` (`getServerSnapshot → false`, client snapshot → `true`), which is hydration-safe and — unlike the previous `useEffect(() => setMounted(true))` — does not trip the `react-hooks/set-state-in-effect` lint rule. Behaviour is preserved: content visible with JS off, for reduced-motion users and for crawlers, with scroll-reveal retained otherwise.

**Verification (this session):**
- No-JS render (all 21 routes): `<main>` word count > 0, zero `opacity:0` descendants, `<h1>` computed opacity `1`.
- Reduced-motion render (key routes `/`, `/features`, `/use-cases`, `/whiteboard-animation-software`, `/alternatives/doodly`, `/samples`, `/resources`, `/privacy`): zero `opacity:0` descendants, `<h1>` opacity `1`.
- Normal-motion render: `<h1>` visible; below-the-fold reveal wrappers legitimately start at `opacity:0` and animate in on scroll (expected `whileInView` behaviour, not a defect).
- Zero hydration warnings/errors on every route.

---

## 3. Route + SEO matrix (measured)

`BASE` = `NEXT_PUBLIC_SITE_URL`. "Robots (configured)" is the directive emitted once `BASE` is set; without `BASE` every route is `noindex, follow` (fail-safe). Canonicals use `BASE` (or the `https://example.com` fallback when unset) and are never the official vendor domain. Words = approximate rendered `<main>` word count.

| # | Route | HTTP | Words | Intended index | Robots (configured) | Canonical path | H1 count | JSON-LD types | Breadcrumb (LD + nav) |
|--:|---|:--:|--:|:--:|:--:|---|:--:|---|:--:|
| 1 | `/` | 200 | 962 | Index | `index, follow` | `/` | 1 | WebSite, WebPage | n/a (root) |
| 2 | `/features` | 200 | 706 | Index | `index, follow` | `/features` | 1 | BreadcrumbList, WebPage | yes |
| 3 | `/use-cases` | 200 | 595 | Index | `index, follow` | `/use-cases` | 1 | BreadcrumbList, WebPage | yes |
| 4 | `/alternatives` | 200 | 419 | Index | `index, follow` | `/alternatives` | 1 | BreadcrumbList, WebPage | yes |
| 5 | `/resources` | 200 | 486 | Index | `index, follow` | `/resources` | 1 | BreadcrumbList, WebPage | yes |
| 6 | `/whiteboard-animation-software` | 200 | 477 | Index | `index, follow` | `/whiteboard-animation-software` | 1 | BreadcrumbList, WebPage | yes |
| 7 | `/ai-whiteboard-animation` | 200 | 405 | Index | `index, follow` | `/ai-whiteboard-animation` | 1 | BreadcrumbList, WebPage | yes |
| 8 | `/doodle-video-creator` | 200 | 345 | Index | `index, follow` | `/doodle-video-creator` | 1 | BreadcrumbList, WebPage | yes |
| 9 | `/whiteboard-video-maker` | 200 | 346 | Index | `index, follow` | `/whiteboard-video-maker` | 1 | BreadcrumbList, WebPage | yes |
| 10 | `/educational-video-maker` | 200 | 365 | Index | `index, follow` | `/educational-video-maker` | 1 | BreadcrumbList, WebPage | yes |
| 11 | `/training-video-software` | 200 | 314 | Index | `index, follow` | `/training-video-software` | 1 | BreadcrumbList, WebPage | yes |
| 12 | `/whiteboard-animation-examples` | 200 | 348 | Index | `index, follow` | `/whiteboard-animation-examples` | 1 | BreadcrumbList, WebPage | yes |
| 13 | `/alternatives/doodly` | 200 | 449 | Index | `index, follow` | `/alternatives/doodly` | 1 | BreadcrumbList, WebPage | yes (3-level) |
| 14 | `/alternatives/videoscribe` | 200 | 397 | Index | `index, follow` | `/alternatives/videoscribe` | 1 | BreadcrumbList, WebPage | yes (3-level) |
| 15 | `/alternatives/animaker` | 200 | 415 | Index | `index, follow` | `/alternatives/animaker` | 1 | BreadcrumbList, WebPage | yes (3-level) |
| 16 | `/samples` | 200 | 352 | Index | `index, follow` | `/samples` | 1 | BreadcrumbList, WebPage | yes |
| 17 | `/pricing` | 200 | 248 | **Noindex** | `noindex, follow` | `/pricing` | 1 | BreadcrumbList, WebPage | yes |
| 18 | `/about` | 200 | 228 | Index | `index, follow` | `/about` | 1 | BreadcrumbList, WebPage | yes |
| 19 | `/contact` | 200 | 159 | **Noindex** | `noindex, follow` | `/contact` | 1 | BreadcrumbList, WebPage | yes |
| 20 | `/privacy` | 200 | 152 | **Noindex** | `noindex, follow` | `/privacy` | 1 | BreadcrumbList, WebPage | yes |
| 21 | `/terms` | 200 | 143 | **Noindex** | `noindex, follow` | `/terms` | 1 | BreadcrumbList, WebPage | yes |

Titles: all 21 unique. Meta descriptions: present and unique on all 21. Sitemap (configured): 17 URLs = 21 − 4 noindex placeholders.

## 3a. Per-route quality signals (measured)

Internal-link out-count is anchors inside the document (`<a href="/…">`, includes shared header/footer + related + CTA); all targets resolve to real routes. Images = loaded/total at initial `networkidle` (below-the-fold `next/image` lazy assets load on scroll — the QA screenshot pass autoscrolls and confirms every image renders; zero failed requests). `noAlt` = images missing alt text. Console/hydration = errors + warnings + hydration mismatches.

| Route | Internal links | Images (loaded/total, noAlt) | Affiliate CTA (unset build) | Console/hydration | Overflow (6 widths) |
|---|--:|---|:--:|:--:|:--:|
| `/` | 36 | 6/10 lazy, 0 noAlt | 0 (env-gated) | 0 / 0 | none |
| `/features` | 30 | 15/16 lazy, 0 noAlt | 0 | 0 / 0 | none |
| `/use-cases` | 30 | 3/4 lazy, 0 noAlt | 0 | 0 / 0 | none |
| `/alternatives` | 33 | 2/2, 0 noAlt | 0 | 0 / 0 | none |
| `/resources` | 30 | 2/2, 0 noAlt | 0 | 0 / 0 | none |
| `/whiteboard-animation-software` | 30 | 7/8 lazy, 0 noAlt | 0 | 0 / 0 | none |
| `/ai-whiteboard-animation` | 30 | 4/4, 0 noAlt | 0 | 0 / 0 | none |
| `/doodle-video-creator` | 30 | 6/6, 0 noAlt | 0 | 0 / 0 | none |
| `/whiteboard-video-maker` | 30 | 4/4, 0 noAlt | 0 | 0 / 0 | none |
| `/educational-video-maker` | 30 | 3/3, 0 noAlt | 0 | 0 / 0 | none |
| `/training-video-software` | 30 | 4/4, 0 noAlt | 0 | 0 / 0 | none |
| `/whiteboard-animation-examples` | 30 | 4/4, 0 noAlt | 0 | 0 / 0 | none |
| `/alternatives/doodly` | 31 | 2/2, 0 noAlt | 0 | 0 / 0 | none |
| `/alternatives/videoscribe` | 31 | 2/2, 0 noAlt | 0 | 0 / 0 | none |
| `/alternatives/animaker` | 31 | 2/2, 0 noAlt | 0 | 0 / 0 | none |
| `/samples` | 30 | 4/4, 0 noAlt | 0 | 0 / 0 | none |
| `/pricing` | 30 | 2/2, 0 noAlt | 0 | 0 / 0 | none |
| `/about` | 30 | 2/2, 0 noAlt | 0 | 0 / 0 | none |
| `/contact` | 29 | 2/2, 0 noAlt | 0 | 0 / 0 | none |
| `/privacy` | 28 | 2/2, 0 noAlt | 0 | 0 / 0 | none |
| `/terms` | 28 | 2/2, 0 noAlt | 0 | 0 / 0 | none |

Note: the two always-loaded images on text-only pages are the header and footer logos. The affiliate CTA renders nothing until `NEXT_PUBLIC_AFFILIATE_URL` is set (env-gated in `src/components/affiliate-link.tsx`, `rel="sponsored nofollow noopener"`, opens in a new tab).

---

## 4. Content-depth classification (all 21 routes)

Classes: Strong depth · Adequate · Slightly thin · Intentionally thin & noindex · Repetitive · Requires verified research · Blocked by business information. Routes may carry a primary class plus notes. No content was padded to inflate word count.

| Route | Words | Primary classification | Notes |
|---|--:|---|---|
| `/` | 962 | Strong depth | Full overview: what/who/workflow/features/use-cases/strengths+limits/comparison/FAQ. |
| `/features` | 706 | Strong depth | Detailed, image-backed feature guide with FAQ. |
| `/use-cases` | 595 | Adequate (strong-leaning) | Problem→example→limitation framing per use case. |
| `/resources` | 486 | Adequate | Original planning guides; **requires verified authorship** (named author/date) before indexing per its own editorial note. |
| `/whiteboard-animation-software` | 477 | Adequate | Requires verified product research (firsthand testing notes). |
| `/alternatives/doodly` | 449 | Adequate | Comparison route; shared structure but sufficiently unique Doodly-specific content; no fabricated competitor pricing. |
| `/alternatives` | 419 | Adequate | Comparison hub; method + criteria table. |
| `/alternatives/animaker` | 415 | Adequate | Unique specialization-vs-breadth Animaker content. |
| `/ai-whiteboard-animation` | 405 | Adequate | Requires verified product research. |
| `/alternatives/videoscribe` | 397 | Adequate | Unique VideoScribe-specific content. |
| `/educational-video-maker` | 365 | Slightly thin | Requires verified research; part of the commercial cluster (overlap risk). |
| `/samples` | 352 | Slightly thin | Depth gated on approved sample artwork provenance. |
| `/whiteboard-animation-examples` | 348 | Slightly thin | Requires verified research; overlaps `/samples`. |
| `/whiteboard-video-maker` | 346 | Slightly thin / Repetitive | Commercial cluster overlap with software/creator pages; needs a distinct verified angle. |
| `/doodle-video-creator` | 345 | Slightly thin / Repetitive | Commercial cluster overlap; needs a distinct verified angle. |
| `/training-video-software` | 314 | Slightly thin | Requires verified research; commercial cluster. |
| `/pricing` | 248 | Intentionally thin & noindex | Blocked by business information (approved pricing). Keep noindex. |
| `/about` | 228 | Slightly thin / Blocked by business information | Needs owner/company identity + editorial contacts before it reads as complete. |
| `/contact` | 159 | Intentionally thin & noindex | Blocked by business information (approved contact channel). Keep noindex. |
| `/privacy` | 152 | Intentionally thin & noindex | Blocked by business information (approved legal text). Keep noindex. |
| `/terms` | 143 | Intentionally thin & noindex | Blocked by business information (approved legal text). Keep noindex. |

**Should remain noindex until inputs supplied:** `/pricing`, `/contact`, `/privacy`, `/terms`.
**Need more verified product research:** `/whiteboard-animation-software`, `/ai-whiteboard-animation`, `/doodle-video-creator`, `/whiteboard-video-maker`, `/educational-video-maker`, `/training-video-software`, `/whiteboard-animation-examples` (firsthand testing notes, verified specs/counts).
**Intentionally short because approved business/legal copy is missing:** `/pricing`, `/contact`, `/privacy`, `/terms`, and partially `/about` (owner identity).
**Comparison routes — shared structure, sufficiently unique competitor content:** `/alternatives/doodly`, `/alternatives/videoscribe`, `/alternatives/animaker`.
**Repetition risk (editorial):** the commercial cluster (items 6–12) intentionally overlaps in topic; each needs a distinct verified product angle before organic-search launch. No route is a spun/doorway page.

---

## 5. Findings by check

| Check | Result | Notes |
|---|:--:|---|
| HTTP 200 (all 21) | PASS | Measured via production `next start`. |
| Unique titles | PASS | 21/21 unique. |
| Meta descriptions | PASS | Present and unique on all 21. |
| Canonicals | PASS | Per-route path on `BASE`; never the vendor domain; `example.com` fallback only when `BASE` unset. |
| Robots behaviour | PASS (by design) | Fail-safe noindex/disallow when `BASE` unset; correct 17-index / 4-noindex split and `Allow: /` + sitemap when set. |
| Sitemap | PASS | Empty when unset; 17 indexable URLs when configured (excludes the 4 noindex placeholders). |
| One H1 per route | PASS | 21/21. |
| JSON-LD parses | PASS | Home: WebSite + WebPage. All others: BreadcrumbList + WebPage. No fake Product/Review/Offer/Rating/Organization. |
| Breadcrumbs | PASS | Visible `nav[aria-label="Breadcrumb"]` + BreadcrumbList JSON-LD on all sub-routes (3-level on comparison children); home has none by design. |
| Internal links / orphans | PASS | Every target resolves; shared nav + related + CTA give each route discovery paths. |
| Image loading | PASS | Zero failed image requests; below-fold assets lazy-load (confirmed rendered in autoscrolled screenshot pass). |
| Image alt text | PASS | 0 images missing alt across all routes; alt text descriptive (inventory in `official-asset-sources.md`). |
| Console | PASS | 0 errors, 0 warnings on all 21 routes. |
| Hydration | PASS | 0 mismatches / page errors on all 21 routes. |
| SSR content visibility | PASS | Content present in SSR HTML (verified via no-JS render). |
| JavaScript-disabled visibility | PASS | All routes: `<main>` populated, 0 hidden `opacity:0`, `<h1>` opacity 1. |
| Reduced motion | PASS | Key routes: 0 hidden `opacity:0`, `<h1>` opacity 1; static content shown. |
| Horizontal overflow | PASS | `overflowX = 0` for 21 routes × 6 widths. |
| Accessibility (structural) | PASS | Skip-link to `#main`, single H1, landmark `main`, `aria-label` on nav regions, `aria-current` on active nav, `aria-expanded`/`aria-controls` on the mobile menu button, keyboard Escape-to-close, `sr-only` affiliate hint, decorative glyphs `aria-hidden`. |
| Color contrast | UNVERIFIED | Not measured with an automated tool this session; text was legible in 1440/390 QA screenshots. Recommend an automated contrast/axe pass before launch. |
| Affiliate compliance | PASS | Visible independent-guide disclosure in footer; env-gated affiliate CTA with `rel="sponsored nofollow noopener"`; independent identity stated site-wide. |
| Unexplained blank sections | PASS | None post-fix; every section renders content (see `visual-qa-findings.md`). |

---

## 6. Screenshot manifest (exact paths + dimensions)

Directory: `docs/qa-screenshots/`. 22 PNG captures + `viewport-diagnostics.json`. Dimensions are exact pixel sizes (deviceScaleFactor 1). Full details and per-image visual findings: `docs/visual-qa-findings.md`.

Desktop (1440px width):
- `docs/qa-screenshots/home-1440.png` — 1440×8679
- `docs/qa-screenshots/features-1440.png` — 1440×6571
- `docs/qa-screenshots/use-cases-1440.png` — 1440×4889
- `docs/qa-screenshots/alternatives-1440.png` — 1440×3590
- `docs/qa-screenshots/comparison-doodly-1440.png` — 1440×4213
- `docs/qa-screenshots/comparison-videoscribe-1440.png` — 1440×4073
- `docs/qa-screenshots/comparison-animaker-1440.png` — 1440×4178
- `docs/qa-screenshots/samples-1440.png` — 1440×4004
- `docs/qa-screenshots/resources-1440.png` — 1440×3985
- `docs/qa-screenshots/whiteboard-animation-software-1440.png` — 1440×5267

Mobile (390px width):
- `docs/qa-screenshots/home-390.png` — 390×13130
- `docs/qa-screenshots/features-390.png` — 390×11999
- `docs/qa-screenshots/use-cases-390.png` — 390×7465
- `docs/qa-screenshots/alternatives-390.png` — 390×6171
- `docs/qa-screenshots/comparison-doodly-390.png` — 390×6821
- `docs/qa-screenshots/comparison-videoscribe-390.png` — 390×6594
- `docs/qa-screenshots/comparison-animaker-390.png` — 390×6634
- `docs/qa-screenshots/samples-390.png` — 390×6233
- `docs/qa-screenshots/resources-390.png` — 390×6853
- `docs/qa-screenshots/whiteboard-animation-software-390.png` — 390×8323

Focused / state captures:
- `docs/qa-screenshots/mobile-nav-open-390.png` — 390×844 (mobile navigation open state)
- `docs/qa-screenshots/comparison-doodly-table-390.png` — 390×1714 (focused `#summary` comparison-table reflow)

Diagnostics:
- `docs/qa-screenshots/viewport-diagnostics.json` — per-shot viewport metrics + horizontal-overflow audit (21 routes × 6 widths, all `overflowX 0`).

### Stale screenshot cleanup
- `comparison-390.png` — removed. Old/stale malformed mobile capture from an earlier design (single unqualified `comparison` name), not produced by `scripts/qa-screenshots.mjs`, unreferenced, superseded by `comparison-doodly-390.png` (full-page) and `comparison-doodly-table-390.png` (focused table). Not a launch blocker.
- `comparison-1440.png` — removed. Old/stale desktop capture, unreferenced, superseded by the three named `comparison-*-1440.png` captures. Not a launch blocker.

---

## 7. Assets

Full inventory: `docs/official-asset-sources.md`. Summary: 20 local WebP product visuals — 18 rendered, 2 defined-but-unused (`image-to-sketch-feature.webp` / `imageToSketchAlt`, and `doodle-ai-feature.webp` / `doodleAi`). The rendered `features/instadoodle-ai-image-to-sketch-panel.webp` is distinct from the unused `image-to-sketch-feature.webp`. Verified official source URLs exist for the logo, hero editor, and the two "why" illustrations (via `src/lib/assets.ts`); all other product panels are local optimizations whose exact source URL "requires owner confirmation".

**LAUNCH BLOCKER — artwork permission:** written permission from the rightsholder to reuse official InstaDoodle artwork must be confirmed by the site owner before launch.

---

## 8. Security / environment

- No tracked `.env` file; only `.env.example` (variable names + safe descriptions) is present.
- No API keys, access tokens, or private-key material found in `src`, `docs`, or `scripts`.
- No `21st.dev` reference or secret.
- Only two public env vars are read (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_AFFILIATE_URL`) — both intentionally public; no server-only secret is exposed via `NEXT_PUBLIC_`.
- Affiliate URLs remain environment-gated (component renders nothing until set).
- No secrets appear in screenshots or in the working diff.

---

## 9. Remaining launch blockers

1. **Set production `NEXT_PUBLIC_SITE_URL`** — until then the entire site is `noindex` and `robots.txt` disallows crawling (fail-safe).
2. **Artwork reuse permission** — written confirmation to reuse official InstaDoodle visuals.
3. **Approved legal text** — `/privacy` and `/terms` are placeholders; keep noindex until supplied.
4. **Approved pricing** — `/pricing` intentionally publishes no figures; keep noindex until supplied.
5. **Owner/company identity + contact channel** — required for `/about` and `/contact`.
6. **Editorial depth / verified product research** — thicken and differentiate the commercial cluster and add named authorship/dates to `/resources` before organic-search launch.
7. **Automated accessibility + color-contrast audit** — not run this session; recommended before launch.

## 10. Remaining business inputs (from the owner)

Approved HopLink / affiliate URL; current price and billing cadence; refund policy and guarantee duration; AI credit/usage limits per plan; export resolutions and commercial-use terms to verify; guide company/legal identity; support/contact email or form; privacy policy; terms and conditions; analytics IDs; approved social URLs; any approved testimonials; and written approval to reuse official screenshots. This independent guide deliberately fabricates none of these.

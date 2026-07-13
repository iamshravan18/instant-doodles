# Visual QA findings — Independent InstaDoodle Guide

- QA date: 2026-07-13
- Repository: /Users/apple/Documents/Playground/instant-doodles
- Branch: main
- Screenshot directory: docs/qa-screenshots
- Inspection method: tall full-page PNGs were inspected using safe vertical slices no taller than 1500px. Temporary slices were generated outside the repository (under /tmp/instadoodle-safe-slices; an earlier pass used /tmp/instadoodle-visual-qa). Where a screenshot was tall, one slice was inspected per image read so each read stayed within safe image limits. Slices were examined for full-page layout, hierarchy, blank areas, footer completeness, text legibility, and card/image detail.
- Original screenshots were NOT modified. All slices were temporary, lived outside the git repository, and were never committed.

Legend: PASS = no visual defects; NEEDS FIX = confirmed defect requiring a source change.

---

## ROOT-CAUSE DEFECT (found during home-1440 inspection) — FIXED

The reveal/stagger motion primitives (`src/components/motion.tsx`) baked their hidden
initial state (`opacity:0; translateY`) into the server-rendered HTML, because
`useReducedMotion()` returns `false` during SSR. Evidence: the home SSR HTML contained
53 inline `style="opacity:0;transform:translateY(16px)"` declarations, including the
wrapper around the `<h1>`. In the reduced-motion render path (and with JS disabled /
before hydration) that opacity was never restored to 1, so most page content rendered
invisible. Because the QA screenshots are captured with `reducedMotion: "reduce"`, every
full-page capture showed blank hero/body sections while background bands, the static
final CTA and the footer rendered normally.

Fix: `motion.tsx` now renders content in a plain, fully-visible element on the server and
before hydration (a `mounted && !reduced` guard). Entry animations attach only on the
client for users who have not requested reduced motion. This guarantees content is
visible with JS disabled, for reduced-motion users, and for crawlers, while preserving
the scroll-reveal effect for everyone else. Rebuilt and all screenshots recaptured after
the fix; findings below reflect the post-fix captures.

---

## home-1440.png
- Route: / · Viewport: 1440 · Original dimensions: 1440x8679 · Slices: 6
- Visual result: PASS
- Blank-area: none (post-fix); every section renders content
- Spacing: consistent section rhythm, alternating paper/card/lavender/ink bands
- Typography: hero H1 with gradient accent renders; no clipped text; balanced line breaks
- Image: hero scene-editor, scene-editor panel, image-to-sketch, voiceover/vinyl, transition cards, use-case & sample images all render with correct proportions
- Card/layout: 6-card feature grid, 3-step workflow, 2-up sound/motion, use-case cards, strengths/limitations, comparison links all well-formed
- Responsive: full-width sections, max-w-6xl content, no overflow
- Footer: complete (disclosure + 4 nav groups + copyright), clean transition from CTA band
- Animation-capture: FIXED — content fully visible under reduced-motion capture
- Observations: hero annotation "built around scenes" positioned correctly; "Verified on the official site" callout renders
- Required fix: none (root-cause motion fix already applied) · Recapture required: No (already recaptured)

## features-1440.png
- Route: /features · Viewport: 1440 · Dimensions: 1440x6571 · Slices: 5 · Visual result: PASS
- Complete: breadcrumb, hero + 2 CTAs, scene-based-editor split w/ image+checklist, "Generation, assets and editing" 6-image card grid, voiceover/music split, "Motion, format and delivery" 6-image card grid, "Confirm on official offer page" callout, "Who benefits" 4 cards, FAQ accordion, related-links band, CTA, footer. No blank/clip/overlap; cards & images proportional. Required fix: none · Recapture: No

## use-cases-1440.png
- Route: /use-cases · Viewport: 1440 · Dimensions: 1440x4889 · Slices: 4 · Visual result: PASS
- Complete: hero + 2 CTAs, "Education and online courses" split w/ image, "Training/onboarding" 4 cards, "Marketing, explainers and product" split w/ image, "Creator, social and affiliate" 4 cards, audience pills, editorial callout, related-links band, CTA, footer. Clean spacing/hierarchy. Required fix: none · Recapture: No

## alternatives-1440.png
- Route: /alternatives · Viewport: 1440 · Dimensions: 1440x3590 · Slices: 3 · Visual result: PASS
- Complete: hero + 2 CTAs, "Our comparison method" prose (intentional left-weighted column, not a blank defect), semantic comparison table (Dimension/InstaDoodle/What to check), "Read a specific comparison" 3 cards, "Confirm" callout, related-links band, CTA, footer. Required fix: none · Recapture: No

## resources-1440.png
- Route: /resources · Viewport: 1440 · Dimensions: 1440x3985 · Slices: 3 · Visual result: PASS
- Complete: hero + 2 CTAs, "Plan in the right order" 3 steps, "Preparation guides" 6 cards, reusable pre-build checklist (2-col), accessibility & captions checklist, editorial callout, related-links band, CTA, footer. Required fix: none · Recapture: No

## comparison-doodly-1440.png
- Route: /alternatives/doodly · Viewport: 1440 · Dimensions: 1440x4213 · Slices: 3 · Visual result: PASS
- 3-level breadcrumb (Home / Comparison guide / InstaDoodle vs Doodly), hero + 2 CTAs, "Confirm on official offer page" callout, "The short version" prose, semantic side-by-side table (Dimension/InstaDoodle/Doodly — uses "verify"/"plan-dependent", no fabricated competitor pricing), "Best for..." 3 cards, "Limitations to weigh" prose, FAQ, related links, CTA, footer. Required fix: none · Recapture: No

## comparison-videoscribe-1440.png
- Route: /alternatives/videoscribe · Viewport: 1440 · Dimensions: 1440x4073 · Slices: 3 · Visual result: PASS
- Same structure vs VideoScribe; table columns intact; no fabricated pricing/ratings. Required fix: none · Recapture: No

## comparison-animaker-1440.png
- Route: /alternatives/animaker · Viewport: 1440 · Dimensions: 1440x4178 · Slices: 3 · Visual result: PASS
- Same structure vs Animaker; specialization-vs-breadth framing; table intact; no fabricated pricing. Required fix: none · Recapture: No

## samples-1440.png
- Route: /samples · Viewport: 1440 · Dimensions: 1440x4004 · Slices: 3 · Visual result: PASS
- Hero + 2 CTAs, "Sample scenes by intent" 2 figures (brand-story + education), "Categories worth planning for" 6 cards, "Before you build a sample" checklist, "What to examine" prose, editorial callout stating imagery is official product artwork / no fabricated customer results, related links, CTA, footer. Required fix: none · Recapture: No

## whiteboard-animation-software-1440.png
- Route: /whiteboard-animation-software · Viewport: 1440 · Dimensions: 1440x5267 · Slices: 4 · Visual result: PASS
- Hero + 2 CTAs, "What the software actually does" split w/ scene-editor image, "How a video comes together" 3 steps, "The parts you will use most" image card grid, "Made for practical video jobs" split, "Confirm" callout, FAQ, related links, CTA, footer. Required fix: none · Recapture: No

## home-390.png
- Route: / · Viewport: 390 · Dimensions: 390x13130 · Slices: 9 · Visual result: PASS
- Text wrapping clean; hero H1/subtext/2 stacked full-width CTAs; all sections stack in order; feature cards numbered 01–06; workflow steps stacked; sound/motion cards; audience pills wrap; use-case & example cards stack; comparison teaser 3 full-width buttons; FAQ accordion; final CTA card; footer columns stack (Explore/Compare/Guides/Company). No horizontal scroll, no long empty areas. Required fix: none · Recapture: No

## features-390.png
- Route: /features · Viewport: 390 · Dimensions: 390x11999 · Slices: 8 (390x1500 each, last 390x1499; inspected one-per-read from /tmp/instadoodle-safe-slices/features-390) · Visual result: PASS
- Complete: header + "Home / InstaDoodle Features" breadcrumb; hero eyebrow + H1 ("Every feature that turns an idea into a doodle video") + intro paragraph + 2 stacked full-width CTAs ("Jump to the feature list", "View InstaDoodle examples"); "A scene-based editor, not a blank timeline" split (prose + 3-item checklist + editor illustration card); "Generation, assets and editing" stacked image cards (DoodleAI text-to-doodle, 1,000+ doodle library, AI image-to-sketch, Built-in image editor, Drawing-hand styles, Starter templates); "Voiceover, music and narration" split (prose + 3-item checklist + upload/narration/soundtrack vinyl card); "Motion, format and delivery" stacked cards (Animation types, Slide transitions, Multiple aspect ratios, AI art styles, Custom backgrounds, Cloud-based any device); "Confirm on the official offer page" disclaimer callout; "Who benefits most from each feature" cards (Educators, Marketers, Trainers, Creators); FAQ accordion (3 collapsed questions); "Keep exploring" 3 full-width link cards; "See it in context" dark CTA card with 2 buttons + independent-guide note; footer (disclosure + logo + Explore/Compare/Guides/Company columns + 2026 copyright).
- Text wrapping clean; headings and body wrap without clipping or overflow; checklist ticks and card captions legible at mobile size
- Card/layout: single-column stack throughout; image cards keep proportions; no overlap, no z-index glitches, no horizontal scroll, no long empty gaps
- Footer: complete and stacks cleanly below the dark CTA band
- Observations: the conference-room / "NEW KIDS TOY" product image is reused for both "DoodleAI text-to-doodle" and "AI art styles", and the "Blur/Opacity/White-fill" editor image appears for both "Built-in image editor" and (leading into) another card. This mirrors the features-1440 layout (also PASS) and reads as intentional reuse of the same official product artwork, not a rendering defect.
- Required fix: none · Recapture required: No

## mobile-nav-open-390.png
- Route: / (menu open) · Viewport: 390 · Dimensions: 390x844 · Visual result: PASS
- Header shows logo + close (X) control; 5 nav links (Features/Use cases/Compare/Samples/Resources) with divider rules and magenta arrows; full-width "Compare whiteboard tools" button; panel layers cleanly above hero (expanding panel, no overlap/z-index glitch); touch targets generous. Required fix: none · Recapture: No

## comparison-doodly-table-390.png
- Route: /alternatives/doodly#summary (focused) · Viewport: 390 · Dimensions: 390x1714 · Visual result: PASS
- Responsive comparison table reflows into stacked, fully-readable cards (each dimension → InstaDoodle tinted sub-card + Doodly sub-card). Text is large/legible, not shrunk. "verify"/"plan-dependent" wording; no fabricated competitor pricing. (Sticky header appears once mid-capture — expected for an element-level screenshot, not a page defect.) Required fix: none · Recapture: No


## alternatives-390.png
- Route: /alternatives · Viewport: 390 · Dimensions: 390x6171 · Slices: 5 (<=1500px each, /tmp/instadoodle-safe-slices/alternatives-390) · Visual result: PASS
- Complete: header + "Home / InstaDoodle Alternatives & Comparisons" breadcrumb; hero eyebrow + H1 ("Compare whiteboard tools by the job, not the feature count") + intro + 2 stacked CTAs; "Our comparison method" prose (states they avoid quoting competitor pricing); "The dimensions that decide it" comparison reflowed into stacked cards (Where it runs, AI-assisted creation, Asset & scene workflow, Revisions, Output formats, Commercial use), each with an InstaDoodle tinted sub-card + "What to check"; "Read a specific comparison" 3 cards (vs Doodly / vs VideoScribe / vs Animaker); "Confirm on the official offer page" callout; "Keep exploring" 3 link cards; dark CTA card ("Start with the comparison closest to your shortlist") + 2 buttons + independent note; footer (disclosure + 4 columns + 2026 copyright).
- Text wrapping clean; no clipping/overflow; single-column stack; no horizontal scroll; table→card reflow fully legible; no fabricated competitor pricing
- Required fix: none · Recapture required: No


## comparison-animaker-390.png
- Route: /alternatives/animaker · Viewport: 390 · Dimensions: 390x6634 · Slices: 5 (<=1500px each, /tmp/instadoodle-safe-slices/comparison-animaker-390) · Visual result: PASS
- Complete: 3-level breadcrumb (Home / Comparison guide / InstaDoodle vs Animaker); hero eyebrow + H1 + specialization-vs-breadth intro + 2 stacked CTAs; "Confirm on the official offer page" callout (states no competitor pricing published); "The short version" prose; "Side by side" table reflowed into stacked cards (Focus, Where it runs, AI-assisted creation, Learning curve, Output, Commercial use) each with InstaDoodle tinted sub-row + Animaker sub-row using "verify"/"plan-dependent" wording; "Best for..." 3 cards; "Limitations to weigh" prose; FAQ accordion; "Keep exploring" 3 link cards; dark CTA card ("Decide by the videos you actually make") + 2 buttons + independent note; footer (disclosure + Explore/Compare/Guides/Company + 2026 copyright).
- Text wrapping clean; single-column stack; no clipping/overflow/horizontal-scroll; no fabricated competitor pricing or ratings
- Required fix: none · Recapture required: No


## comparison-doodly-390.png
- Route: /alternatives/doodly · Viewport: 390 · Dimensions: 390x6821 · Slices: 5 (<=1500px each, /tmp/instadoodle-safe-slices/comparison-doodly-390) · Visual result: PASS
- Complete: 3-level breadcrumb (Home / Comparison guide / InstaDoodle vs Doodly); hero + 2 CTAs (See the decision summary / Explore the AI features); "Confirm on the official offer page" callout; "The short version" prose; "Side by side" table reflowed into stacked cards (Where it runs, AI-assisted creation, Assets, Editing model, Output, Commercial use) with InstaDoodle tinted sub-row + Doodly sub-row using "verify"/"plan-dependent" wording (no fabricated Doodly pricing); "Best for..." 3 cards; "Limitations to weigh" prose; FAQ accordion; "Keep exploring" 3 link cards; dark CTA card ("See the InstaDoodle workflow for yourself") + 2 buttons + independent note; footer (disclosure + Explore/Compare/Guides/Company + 2026 copyright).
- Text wrapping clean; single-column stack; no clipping/overflow/horizontal-scroll (full-page mobile counterpart to comparison-doodly-table-390.png)
- Required fix: none · Recapture required: No


## comparison-videoscribe-390.png
- Route: /alternatives/videoscribe · Viewport: 390 · Dimensions: 390x6594 · Slices: 5 (<=1500px each, /tmp/instadoodle-safe-slices/comparison-videoscribe-390) · Visual result: PASS
- Complete: 3-level breadcrumb (Home / Comparison guide / InstaDoodle vs VideoScribe); hero + 2 CTAs; "Confirm on the official offer page" callout; "The short version" prose; "Side by side" table reflowed into stacked cards (Where it runs, AI-assisted creation, Assets, Style, Output, Commercial use) with InstaDoodle tinted sub-row + VideoScribe sub-row using verify/plan-dependent wording (no fabricated pricing); "Best for..." 3 cards; "Limitations to weigh" prose; FAQ accordion; "Keep exploring" 3 link cards; dark CTA card ("Compare on your own project") + 2 buttons + independent note; footer (disclosure + columns + 2026 copyright).
- Text wrapping clean; single-column stack; no clipping/overflow/horizontal-scroll
- Required fix: none · Recapture required: No


## resources-390.png
- Route: /resources · Viewport: 390 · Dimensions: 390x6853 · Slices: 5 (<=1500px each, /tmp/instadoodle-safe-slices/resources-390) · Visual result: PASS
- Complete: header + "Home / Whiteboard Animation Resources & Planning Guides" breadcrumb; hero + 2 CTAs (Jump to the checklists / View examples first); "Plan in the right order" 3 numbered steps (Script & message, Scene & storyboard, Pacing & timing); "Preparation guides" 6 cards (Script/Scene/Storyboarding/Voiceover prep/Background music/Export planning); "Reusable pre-build checklist" 8 ticked items; "Accessibility & captions" 6 ticked items; editorial-interpretation callout; "Keep exploring" 3 link cards; dark CTA card ("Turn the plan into scenes") + 2 buttons + independent note; footer (disclosure + Explore/Compare/Guides/Company + 2026 copyright).
- Text wrapping clean; single-column stack; numbered step badges and check ticks render; no clipping/overflow/horizontal-scroll
- Required fix: none · Recapture required: No


## samples-390.png
- Route: /samples · Viewport: 390 · Dimensions: 390x6233 · Slices: 5 (<=1500px each, /tmp/instadoodle-safe-slices/samples-390) · Visual result: PASS
- Complete: header + "Home / InstaDoodle Video Samples" breadcrumb; hero + 2 CTAs (Browse the samples / See example structures); "Sample scenes by intent" 2 stacked figures (Brand story & explainer, Education & tutorial) with product artwork; "Categories worth planning for" 6 cards (Explainer/Education/Training/Marketing/Product story/Social video); "Before you build a sample" 6-item checklist; "What to examine in a sample" prose; editorial callout stating imagery is official product artwork and no fabricated customer results/testimonials; "Keep exploring" 3 link cards; dark CTA card ("Plan your own doodle video") + 2 buttons + independent note; footer (disclosure + columns + 2026 copyright).
- Text wrapping clean; single-column stack; sample images keep proportions; no clipping/overflow/horizontal-scroll
- Required fix: none · Recapture required: No


## use-cases-390.png
- Route: /use-cases · Viewport: 390 · Dimensions: 390x7465 · Slices: 5 (<=1500px each, /tmp/instadoodle-safe-slices/use-cases-390) · Visual result: PASS
- Complete: header + "Home / InstaDoodle Use Cases" breadcrumb; hero + 2 CTAs (Explore education use cases / View examples); "Education and online courses" split (prose + Best-for/Scene-shape/Watch-out checklist + education illustration image); "Training, onboarding and internal process" 4 cards (Employee training/New-hire onboarding/Process documentation/Customer support); "Marketing, explainers and product" split (prose + checklist + illustration image); "Creator, social and affiliate content" cards (YouTube content/Social media/Affiliate marketing/Podcasters & authors); "Common audiences" wrapping pills; editorial callout (examples are interpretations, not customer case studies); "Keep exploring" 3 link cards; dark CTA card ("Match the workflow to your job") + buttons + independent note; footer (disclosure + columns + 2026 copyright).
- Text wrapping clean; single-column stack; images keep proportions; pills wrap; no clipping/overflow/horizontal-scroll
- Required fix: none · Recapture required: No


## whiteboard-animation-software-390.png
- Route: /whiteboard-animation-software · Viewport: 390 · Dimensions: 390x8323 · Slices: 6 (<=1500px each, /tmp/instadoodle-safe-slices/whiteboard-animation-software-390) · Visual result: PASS
- Complete: header + "Home / Whiteboard Animation Software" breadcrumb; hero (H1 wraps to 5 lines cleanly) + 2 CTAs (See the product workflow / Compare whiteboard tools); "What the software actually does" prose + checklist + editor illustration; "How a video comes together" 3 numbered steps (Type your idea/Compose the scenes/Animate & export); "The parts you will use most" image cards (Doodle library, Drawing-hand reveals, Voiceover & music, Every aspect ratio); "Made for practical video jobs" split (prose + illustration); "Confirm on the official offer page" callout; FAQ accordion; "Keep exploring" 3 link cards; dark CTA card ("See the AI features behind the workflow") + 2 buttons + independent note; footer (disclosure + Explore/Compare/Guides/Company + 2026 copyright).
- Text wrapping clean; single-column stack; numbered badges and image cards render with correct proportions; no clipping/overflow/horizontal-scroll
- Required fix: none · Recapture required: No

---

## Mobile (390) QA summary — this session
Continued from the safe-slice workflow (originals never opened; every source sliced into <=1500px slices outside the repo under /tmp/instadoodle-safe-slices; one slice per read).
- features-390.png — PASS
- alternatives-390.png — PASS
- comparison-animaker-390.png — PASS
- comparison-doodly-390.png — PASS
- comparison-videoscribe-390.png — PASS
- resources-390.png — PASS
- samples-390.png — PASS
- use-cases-390.png — PASS
- whiteboard-animation-software-390.png — PASS
All previously recorded findings (1440 pages, home-390, mobile-nav-open-390, comparison-doodly-table-390, and the root-cause motion fix) are preserved unchanged.

---

## Stale screenshots removed
These files were leftovers from an earlier design (a single unqualified `comparison` capture name) and are not produced by the current screenshot script (`scripts/qa-screenshots.mjs`), which captures the three named comparison routes as `comparison-doodly-*`, `comparison-videoscribe-*` and `comparison-animaker-*`. They are not referenced by any tracked source or documentation and are fully superseded, so they were deleted from `docs/qa-screenshots/`. They are NOT launch blockers.
- `comparison-390.png` — old/stale malformed mobile capture (834px wide, duplicated side-by-side frame). Superseded by `comparison-doodly-390.png` (full-page mobile Doodly comparison) and `comparison-doodly-table-390.png` (focused mobile comparison-table capture). Removed.
- `comparison-1440.png` — old/stale desktop comparison capture. Superseded by `comparison-doodly-1440.png`, `comparison-videoscribe-1440.png` and `comparison-animaker-1440.png`. Removed.

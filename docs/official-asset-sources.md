# Official / product-derived asset inventory and reuse status

_Re-verified 2026-07-13 against the current build. The `public/images/instadoodle/` tree holds 20 WebP files: 18 rendered (section 1) and 2 defined-but-unused (section 2). A repository-wide reference search confirmed the rendered/unused split below is current; render probing found all rendered images load with descriptive alt text and zero failed image requests across all 21 routes._

This independent guide stores every product visual locally (all WebP) and serves it with `next/image`; it does **not** hotlink the vendor. Public availability of an image is **not** proof that an independent site may reuse it.

> **LAUNCH BLOCKER — artwork permission.** Written permission from the rightsholder (InstaDoodle / vendor) to reuse official InstaDoodle artwork must be confirmed by the site owner before launch. Every rendered visual below is official or product-derived and is blocked on that confirmation. Where the exact provenance of a locally optimized derivative is not yet verified, this is stated explicitly and requires owner confirmation.

Verification legend:
- **Verified public source** — the exact official URL the local file was derived from is known and recorded.
- **Requires owner confirmation** — the local file is product-derived/optimized, but the exact official source URL is not yet verified: `Exact official source URL requires owner confirmation.`

Classification legend: `official original` (vendor brand asset), `product screenshot` (captured product UI), `optimized local copy` (re-encoded/derived WebP of an official visual), `derivative/crop` (edited from an official visual).

---

## 1. Rendered assets (currently displayed)

### instadoodle-logo.webp
- Local path: `public/images/instadoodle/instadoodle-logo.webp`
- Used by: `src/components/header.tsx` (sticky header) and `src/components/footer.tsx` (footer) — every route
- Current alt text: `InstaDoodle logo`
- Visual purpose: identifies the product the guide reviews
- Reason for inclusion: product identification in shared chrome
- Official source URL: `https://instadoodle.com/images/logo.webp` (verified public source)
- Source-verification status: Verified public source
- Classification: official original (brand logo) → optimized local copy
- Permission/reuse warning: third-party brand logo; reuse permission must be confirmed by the owner before launch

### ai-doodle-generator-editor.webp
- Local path: `public/images/instadoodle/ai-doodle-generator-editor.webp`
- Used by: `src/app/page.tsx` home hero (`SceneFrame`); also registered as `MEDIA.heroEditor` in `src/lib/media.ts`
- Current alt text: `InstaDoodle editor showing doodle scenes, a drawing hand and a scene timeline`
- Visual purpose: hero product preview of the scene editor
- Reason for inclusion: shows the editor the guide describes
- Official source URL: `https://instadoodle.com/images/generate.webp` (verified public source)
- Source-verification status: Verified public source
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: official product screenshot; reuse permission must be confirmed before launch

### features/instadoodle-scene-editor-interface.webp
- Local path: `public/images/instadoodle/features/instadoodle-scene-editor-interface.webp`
- Used by: `MEDIA.sceneEditor` → home ("what it does"), `/features` split, `/whiteboard-animation-software` split, `/training-video-software` split
- Current alt text: `InstaDoodle scene editor interface with a doodle canvas and editing controls`
- Visual purpose: scene-editor interface callout
- Reason for inclusion: illustrates scene-based editing
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### features/instadoodle-ai-image-to-sketch-panel.webp
- Local path: `public/images/instadoodle/features/instadoodle-ai-image-to-sketch-panel.webp`
- Used by: `src/app/page.tsx` home image-to-sketch section (`SceneFrame`) and `MEDIA.imageToSketch` → `/features` grid, `/ai-whiteboard-animation` split — **confirmed rendered**
- Current alt text: `InstaDoodle AI image-to-sketch panel turning an uploaded photo into a hand-drawn doodle`
- Visual purpose: shows the AI image-to-sketch panel
- Reason for inclusion: illustrates the image-to-sketch feature
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### features/instadoodle-voiceover-and-music.webp
- Local path: `public/images/instadoodle/features/instadoodle-voiceover-and-music.webp`
- Used by: `src/app/page.tsx` home ("sound & motion") and `MEDIA.voiceover` → `/features` split, `/whiteboard-animation-software` grid, `/doodle-video-creator` grid
- Current alt text: `InstaDoodle voiceover and background music panel`
- Visual purpose: voiceover + background-music panel
- Reason for inclusion: illustrates narration/music features
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### features/instadoodle-slide-transitions.webp
- Local path: `public/images/instadoodle/features/instadoodle-slide-transitions.webp`
- Used by: `src/app/page.tsx` home ("sound & motion") and `MEDIA.transitions` → `/features` grid, `/doodle-video-creator` grid, `/training-video-software` split
- Current alt text: `InstaDoodle slide transition options between doodle scenes`
- Visual purpose: scene transition options
- Reason for inclusion: illustrates transitions
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### features/instadoodle-doodle-asset-library.webp
- Local path: `public/images/instadoodle/features/instadoodle-doodle-asset-library.webp`
- Used by: `MEDIA.library` → `/features` grid, `/whiteboard-animation-software` grid, `/doodle-video-creator` split
- Current alt text: `InstaDoodle searchable doodle library of characters, arrows and elements`
- Visual purpose: searchable doodle library
- Reason for inclusion: illustrates the 1,000+ asset library
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### features/instadoodle-drawing-hand-styles.webp
- Local path: `public/images/instadoodle/features/instadoodle-drawing-hand-styles.webp`
- Used by: `MEDIA.hands` → `/features` grid, `/whiteboard-animation-software` grid, `/doodle-video-creator` grid
- Current alt text: `InstaDoodle drawing-hand style options`
- Visual purpose: drawing-hand style options
- Reason for inclusion: illustrates drawing-hand reveals
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### features/instadoodle-animation-types.webp
- Local path: `public/images/instadoodle/features/instadoodle-animation-types.webp`
- Used by: `MEDIA.animationTypes` → `/features` grid ("Motion, format and delivery")
- Current alt text: `InstaDoodle scene reveal animation types`
- Visual purpose: scene reveal animation types
- Reason for inclusion: illustrates reveal animation options
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### features/instadoodle-aspect-ratios.webp
- Local path: `public/images/instadoodle/features/instadoodle-aspect-ratios.webp`
- Used by: `MEDIA.aspectRatios` → `/features` grid, `/whiteboard-animation-software` grid, `/whiteboard-video-maker` split
- Current alt text: `InstaDoodle aspect ratio options for landscape, portrait and square video`
- Visual purpose: export aspect-ratio options
- Reason for inclusion: illustrates multi-format export
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### features/instadoodle-ai-art-styles.webp
- Local path: `public/images/instadoodle/features/instadoodle-ai-art-styles.webp`
- Used by: `MEDIA.artStyles` → `/features` grid ("DoodleAI text-to-doodle" and "AI art styles"), `/ai-whiteboard-animation` split
- Current alt text: `InstaDoodle AI art styles including caricature, cartoon and realistic`
- Visual purpose: AI art-style options
- Reason for inclusion: illustrates AI art styles / text-to-doodle
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch
- Note: the same file legitimately illustrates two related AI features (documented as intentional reuse in `docs/visual-qa-findings.md`).

### features/instadoodle-starter-templates.webp
- Local path: `public/images/instadoodle/features/instadoodle-starter-templates.webp`
- Used by: `MEDIA.templates` → `/features` grid ("Starter templates")
- Current alt text: `InstaDoodle starter project templates`
- Visual purpose: starter templates
- Reason for inclusion: illustrates template starting points
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### features/instadoodle-advanced-adjustments.webp
- Local path: `public/images/instadoodle/features/instadoodle-advanced-adjustments.webp`
- Used by: `MEDIA.adjustments` → `/features` grid ("Built-in image editor" and "Custom backgrounds")
- Current alt text: `InstaDoodle advanced background adjustment controls`
- Visual purpose: image/background adjustment controls
- Reason for inclusion: illustrates the built-in editor / backgrounds
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### features/instadoodle-cloud-based-editor.webp
- Local path: `public/images/instadoodle/features/instadoodle-cloud-based-editor.webp`
- Used by: `MEDIA.cloud` → `/features` grid ("Cloud-based, any device"), `/whiteboard-video-maker` split
- Current alt text: `InstaDoodle cloud-based editor running in a browser across devices`
- Visual purpose: cloud/cross-device editor
- Reason for inclusion: illustrates browser/cloud access
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived optimization)
- Classification: product screenshot → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### why-whiteboard-animation.webp
- Local path: `public/images/instadoodle/why-whiteboard-animation.webp`
- Used by: `src/app/page.tsx` home use-cases and `MEDIA.whyWhiteboard` → `/use-cases` split, `/whiteboard-animation-software` split
- Current alt text: `Whiteboard video illustrations for marketing, learning and business communication`
- Visual purpose: whiteboard-use illustration
- Reason for inclusion: illustrates where whiteboard video fits
- Official source URL: `https://instadoodle.com/images/why.webp` (verified public source)
- Source-verification status: Verified public source
- Classification: official marketing illustration → optimized local copy
- Permission/reuse warning: reuse permission must be confirmed before launch

### why-doodle-animation.webp
- Local path: `public/images/instadoodle/why-doodle-animation.webp`
- Used by: `MEDIA.whyDoodle` → `/use-cases` split, `/educational-video-maker` split
- Current alt text: `Teacher using a whiteboard animation to explain a math lesson`
- Visual purpose: education/limitations illustration
- Reason for inclusion: illustrates the education use case
- Official source URL: `https://instadoodle.com/images/butwhy.webp` (verified public source)
- Source-verification status: Verified public source
- Classification: official marketing illustration → optimized local copy
- Permission/reuse warning: reuse permission must be confirmed before launch

### samples/instadoodle-sample-brand-story.webp
- Local path: `public/images/instadoodle/samples/instadoodle-sample-brand-story.webp`
- Used by: `src/app/page.tsx` home example categories and `MEDIA.sampleBrand` → `/samples` gallery, `/whiteboard-animation-examples` gallery
- Current alt text: `Brand story doodle scene created with InstaDoodle`
- Visual purpose: brand-story sample scene
- Reason for inclusion: illustrates a brand-story example (style/structure, not a customer result)
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived sample)
- Classification: product-derived sample artwork → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

### samples/instadoodle-sample-kids-lesson.webp
- Local path: `public/images/instadoodle/samples/instadoodle-sample-kids-lesson.webp`
- Used by: `src/app/page.tsx` home example categories and `MEDIA.sampleKids` → `/samples` gallery, `/whiteboard-animation-examples` gallery
- Current alt text: `Children's lesson doodle scene created with InstaDoodle`
- Visual purpose: education sample scene
- Reason for inclusion: illustrates an education example (style/structure, not a customer result)
- Official source URL: Exact official source URL requires owner confirmation.
- Source-verification status: Requires owner confirmation (local product-derived sample)
- Classification: product-derived sample artwork → optimized local copy
- Permission/reuse warning: reuse permission and exact provenance must be confirmed before launch

---

## 2. Defined but NOT rendered (present in `src/lib/media.ts`, no current render)

These files must not be described as displayed. Confirmed with a repository-wide reference search: neither is referenced by any page, component or block.

### image-to-sketch-feature.webp
- Local path: `public/images/instadoodle/image-to-sketch-feature.webp`
- Registry key: `imageToSketchAlt` (`src/lib/media.ts`)
- Status: **Unused / not rendered** (confirmed)
- Official source URL: `https://instadoodle.com/images/feature2.webp` (verified public source)
- Classification: product screenshot → optimized local copy
- Note: distinct from the rendered `features/instadoodle-ai-image-to-sketch-panel.webp`

### doodle-ai-feature.webp
- Local path: `public/images/instadoodle/doodle-ai-feature.webp`
- Registry key: `doodleAi` (`src/lib/media.ts`; also `assets.ts` `OFFICIAL_ASSET_SOURCES.doodleAi`)
- Status: **Unused / not rendered** (confirmed)
- Official source URL: `https://instadoodle.com/images/feature1.webp` (verified public source)
- Classification: product screenshot → optimized local copy

---

## 3. Verified official source URLs on record (`src/lib/assets.ts`)
`logo → https://instadoodle.com/images/logo.webp`, `editor → .../generate.webp`, `doodleAi → .../feature1.webp`, `imageToSketch → .../feature2.webp`, `whiteboardUseCases → .../why.webp`, `educationUseCase → .../butwhy.webp`. These are the confirmed public sources; all other rendered feature/sample panels are product-derived local optimizations whose exact source URLs require owner confirmation.

---

No visual in this document is a testimonial, customer photograph, rating, price, guarantee, or non-vendor third-party logo. **Do not launch** using these visuals until the owner confirms written reuse permission and the exact provenance of every local derivative/optimized file.

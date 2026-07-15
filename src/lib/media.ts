import { absoluteUrl } from "./site";

/* ============================================================
   MEDIA REGISTRY — single source of truth for every official
   image and video used across the project.

   Nothing else in the codebase should hardcode media src/urls,
   dimensions, alt text or video ids. Components consume this
   module via getImage / getRemoteImage / getVideo, and structured
   data is produced by imageObject / videoObject.

   Extend by adding a keyed entry below; TypeScript enforces shape.
   ============================================================ */

const B = "/images/instadoodle";

/** Shared editorial + strategy metadata carried by every asset. */
interface MediaUsage {
  /** Canonical placement this asset was chosen for. */
  primary: string;
  /** Approved reuse placements (with a distinct caption/context). */
  secondary?: string[];
  /** Placements this asset should not appear in. */
  avoid?: string[];
}

interface MediaMeta {
  /** What the asset depicts / why it exists. */
  purpose: string;
  /** Topic or entity the asset reinforces (for SEO/GEO grounding). */
  seoContext: string;
  usage: MediaUsage;
}

/** A locally hosted, optimized product visual (rendered with width/height). */
export interface LocalImageAsset extends MediaMeta {
  kind: "local";
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Default visible caption (not auto-rendered yet; used by future ImageObject/UI). */
  caption?: string;
  /** Loading hint; the LCP element may override to eager/priority at the call site. */
  loading: "eager" | "lazy";
  /** Default priority hint for the LCP candidate. */
  priority: boolean;
  /** Provenance URL on the official site, where confirmed. */
  officialSource?: string;
  /** License / rights note where relevant. */
  sourceNote?: string;
}

/** A remote official image from instadoodle.com (rendered with `fill` + aspectRatio). */
export interface RemoteImageAsset extends MediaMeta {
  kind: "remote";
  src: string;
  aspectRatio: string;
  alt: string;
  caption?: string;
  loading: "eager" | "lazy";
  priority: boolean;
  officialSource: string;
  sourceNote?: string;
}

/** Placeholder-supported chapter marker for future VideoObject enrichment. */
export interface VideoChapter {
  /** ISO 8601 offset from the start, e.g. "PT0S". */
  start: string;
  name: string;
}

/** An official Vimeo video. */
export interface VideoAsset extends MediaMeta {
  kind: "video";
  provider: "vimeo";
  title: string;
  description: string;
  /** Player embed URL used by the iframe. */
  embedUrl: string;
  /** Canonical watch URL for VideoObject.contentUrl. */
  contentUrl: string;
  /** Poster/thumbnail (placeholder-supported until owner supplies one). */
  thumbnailUrl?: string;
  /** Reference to a transcript resource (placeholder-supported). */
  transcriptRef?: string;
  /** ISO 8601 duration, e.g. "PT1M52S" (placeholder-supported). */
  duration?: string;
  /** ISO 8601 upload date (placeholder-supported). */
  uploadDate?: string;
  /** Chapter markers (placeholder-supported). */
  chapters?: VideoChapter[];
}

const RIGHTS_NOTE =
  "Official InstaDoodle product artwork used in an independent-review context; reuse permission pending owner confirmation.";

/* ─────────────────────────── LOCAL IMAGES ─────────────────────────── */

export const IMAGES = {
  heroEditor: {
    kind: "local",
    src: `${B}/ai-doodle-generator-editor.webp`,
    width: 1473,
    height: 631,
    alt: "InstaDoodle editor showing doodle scenes, a drawing hand and a scene timeline",
    caption: "The InstaDoodle scene editor, where an idea becomes a doodle video.",
    loading: "eager",
    priority: true,
    officialSource: "https://instadoodle.com/images/generate.webp",
    purpose: "Primary hero proof of the browser-based scene editor.",
    seoContext: "InstaDoodle · scene-based whiteboard animation editor",
    usage: { primary: "home hero", avoid: ["sub-page splits and cards (aspect ratio suits a hero band only)"] },
  },
  sceneEditor: {
    kind: "local",
    src: `${B}/features/instadoodle-scene-editor-interface.webp`,
    width: 1000,
    height: 833,
    alt: "InstaDoodle scene editor interface with a doodle canvas and editing controls",
    caption: "The scene editor interface with canvas and editing controls.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows the single-workspace scene editor UI in detail.",
    seoContext: "scene-based video creation · editor interface",
    usage: { primary: "/features scene-editor split", secondary: ["home 'what it does'", "/training-video-software (process framing)"] },
  },
  library: {
    kind: "local",
    src: `${B}/features/instadoodle-doodle-asset-library.webp`,
    width: 1000,
    height: 561,
    alt: "InstaDoodle searchable doodle library of characters, arrows and elements",
    caption: "The searchable 1,000+ doodle asset library.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows the searchable doodle asset library.",
    seoContext: "doodle asset library · characters and elements",
    usage: { primary: "/doodle-video-creator build-scenes split", secondary: ["/features grid"] },
  },
  imageToSketch: {
    kind: "local",
    src: `${B}/features/instadoodle-ai-image-to-sketch-panel.webp`,
    width: 1000,
    height: 561,
    alt: "InstaDoodle AI image-to-sketch panel turning an uploaded photo into a hand-drawn doodle",
    caption: "AI image-to-sketch redrawing a photo as a hand-drawn doodle.",
    loading: "lazy",
    priority: false,
    officialSource: "https://instadoodle.com/images/feature2.webp",
    purpose: "Shows the AI image-to-sketch capability.",
    seoContext: "AI image-to-sketch · photo-to-doodle",
    usage: { primary: "/ai-whiteboard-animation split", secondary: ["home image-to-sketch deep dive"] },
  },
  imageToSketchAlt: {
    kind: "local",
    src: `${B}/image-to-sketch-feature.webp`,
    width: 301,
    height: 226,
    alt: "Before-and-after of a photo redrawn as an InstaDoodle sketch",
    caption: "Before and after: a photo redrawn as a doodle sketch.",
    loading: "lazy",
    priority: false,
    officialSource: "https://instadoodle.com/images/feature2.webp",
    purpose: "Compact before/after proof of image-to-sketch.",
    seoContext: "AI image-to-sketch · before and after",
    usage: { primary: "/ai-whiteboard-animation before/after inline (available)" },
  },
  hands: {
    kind: "local",
    src: `${B}/features/instadoodle-drawing-hand-styles.webp`,
    width: 1000,
    height: 833,
    alt: "InstaDoodle drawing-hand style options",
    caption: "Multiple drawing-hand styles for on-screen reveals.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows the drawing-hand style options.",
    seoContext: "whiteboard animation · drawing-hand reveal",
    usage: { primary: "/features motion grid", secondary: ["/doodle-video-creator"] },
  },
  voiceover: {
    kind: "local",
    src: `${B}/features/instadoodle-voiceover-and-music.webp`,
    width: 1000,
    height: 833,
    alt: "InstaDoodle voiceover and background music panel",
    caption: "Voiceover and royalty-free background music controls.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows voiceover generation and music options.",
    seoContext: "voiceover and music · narration",
    usage: { primary: "/features voiceover split", secondary: ["home sound & motion", "/educational-video-maker (multilingual)"] },
  },
  transitions: {
    kind: "local",
    src: `${B}/features/instadoodle-slide-transitions.webp`,
    width: 1000,
    height: 833,
    alt: "InstaDoodle slide transition options between doodle scenes",
    caption: "Scene transition options for a continuous story.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows slide/scene transition options.",
    seoContext: "scene transitions · animation",
    usage: { primary: "/features motion grid", secondary: ["home sound & motion", "/doodle-video-creator"] },
  },
  animationTypes: {
    kind: "local",
    src: `${B}/features/instadoodle-animation-types.webp`,
    width: 1000,
    height: 833,
    alt: "InstaDoodle scene reveal animation types",
    caption: "Scene reveal animation types (draw, wipe, slide, fade, pop-in).",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows the reveal animation types.",
    seoContext: "reveal animation · motion",
    usage: { primary: "/features motion grid" },
  },
  aspectRatios: {
    kind: "local",
    src: `${B}/features/instadoodle-aspect-ratios.webp`,
    width: 1000,
    height: 833,
    alt: "InstaDoodle aspect ratio options for landscape, portrait and square video",
    caption: "Export aspect ratios: 16:9, 9:16, 4:5 and square.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows multi-format export options.",
    seoContext: "multi-format export · aspect ratios",
    usage: { primary: "/whiteboard-video-maker 'every format'" },
  },
  artStyles: {
    kind: "local",
    src: `${B}/features/instadoodle-ai-art-styles.webp`,
    width: 1000,
    height: 561,
    alt: "InstaDoodle AI art styles including caricature, cartoon and realistic",
    caption: "AI art styles: caricature, cartoon, realistic and charcoal.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows the selectable AI art styles.",
    seoContext: "AI art styles · doodle rendering",
    usage: { primary: "/ai-whiteboard-animation 'start from text'", secondary: ["/features grid"] },
  },
  templates: {
    kind: "local",
    src: `${B}/features/instadoodle-starter-templates.webp`,
    width: 1000,
    height: 833,
    alt: "InstaDoodle starter project templates",
    caption: "Starter project templates for a structured beginning.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows starter project templates.",
    seoContext: "starter templates · project setup",
    usage: { primary: "/features grid", secondary: ["future /templates hub"] },
  },
  adjustments: {
    kind: "local",
    src: `${B}/features/instadoodle-advanced-adjustments.webp`,
    width: 1000,
    height: 833,
    alt: "InstaDoodle advanced background adjustment controls",
    caption: "Advanced background and image adjustment controls.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows the built-in image editor / background controls.",
    seoContext: "built-in image editor · adjustments",
    usage: { primary: "/features 'built-in editor'" },
  },
  cloud: {
    kind: "local",
    src: `${B}/features/instadoodle-cloud-based-editor.webp`,
    width: 1000,
    height: 833,
    alt: "InstaDoodle cloud-based editor running in a browser across devices",
    caption: "The cloud-based editor running across devices.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Shows the browser-based, cross-device editor.",
    seoContext: "cloud-based editor · cross-device",
    usage: { primary: "/whiteboard-video-maker cross-device", secondary: ["/training-video-software"] },
  },
  doodleAi: {
    kind: "local",
    src: `${B}/doodle-ai-feature.webp`,
    width: 337,
    height: 231,
    alt: "Doodle-style character and video playback illustration from InstaDoodle",
    caption: "DoodleAI-style character and playback illustration.",
    loading: "lazy",
    priority: false,
    officialSource: "https://instadoodle.com/images/feature1.webp",
    purpose: "Small illustrative accent for the DoodleAI concept.",
    seoContext: "DoodleAI · doodle video",
    usage: { primary: "inline accent on /ai-whiteboard-animation or home (available)", avoid: ["hero (too small)"] },
  },
  whyWhiteboard: {
    kind: "local",
    src: `${B}/why-whiteboard-animation.webp`,
    width: 669,
    height: 392,
    alt: "Whiteboard video illustrations for marketing, learning and business communication",
    caption: "Where whiteboard video fits: marketing, learning and business.",
    loading: "lazy",
    priority: false,
    officialSource: "https://instadoodle.com/images/why.webp",
    purpose: "Editorial illustration for whiteboard-animation use cases.",
    seoContext: "whiteboard animation · use cases",
    usage: { primary: "/use-cases marketing split", secondary: ["home use cases"], avoid: ["feature grids"] },
  },
  whyDoodle: {
    kind: "local",
    src: `${B}/why-doodle-animation.webp`,
    width: 448,
    height: 443,
    alt: "Teacher using a whiteboard animation to explain a math lesson",
    caption: "A teacher using doodle animation to explain a lesson.",
    loading: "lazy",
    priority: false,
    officialSource: "https://instadoodle.com/images/butwhy.webp",
    purpose: "Education-specific illustration.",
    seoContext: "educational video · doodle lessons",
    usage: { primary: "/educational-video-maker teach-in-steps", avoid: ["feature grids"] },
  },
  sampleBrand: {
    kind: "local",
    src: `${B}/samples/instadoodle-sample-brand-story.webp`,
    width: 800,
    height: 450,
    alt: "Brand story doodle scene created with InstaDoodle",
    caption: "A finished brand-story doodle scene.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Finished-output sample: brand story / explainer.",
    seoContext: "whiteboard animation examples · brand story",
    usage: { primary: "/examples gallery", secondary: ["home hero 'finished video' card", "home example categories"] },
  },
  sampleKids: {
    kind: "local",
    src: `${B}/samples/instadoodle-sample-kids-lesson.webp`,
    width: 800,
    height: 450,
    alt: "Children's lesson doodle scene created with InstaDoodle",
    caption: "A finished children's-lesson doodle scene.",
    loading: "lazy",
    priority: false,
    sourceNote: RIGHTS_NOTE,
    purpose: "Finished-output sample: education / tutorial.",
    seoContext: "whiteboard animation examples · education",
    usage: { primary: "/examples gallery", secondary: ["home example categories"] },
  },
  logo: {
    kind: "local",
    src: `${B}/instadoodle-logo.webp`,
    width: 146,
    height: 32,
    alt: "InstaDoodle logo",
    loading: "eager",
    priority: false,
    officialSource: "https://instadoodle.com/images/logo.webp",
    purpose: "Brand mark used in the header and footer.",
    seoContext: "InstaDoodle · brand",
    usage: { primary: "header / footer", avoid: ["body content"] },
  },
} as const satisfies Record<string, LocalImageAsset>;

/* ─────────────────────────── REMOTE OFFICIAL IMAGES ─────────────────────────── */

export const REMOTE_IMAGES = {
  join: {
    kind: "remote",
    src: "https://instadoodle.com/images/join.webp",
    aspectRatio: "4 / 3",
    alt: "Official InstaDoodle product visual",
    loading: "lazy",
    priority: false,
    officialSource: "https://instadoodle.com/images/join.webp",
    sourceNote: RIGHTS_NOTE,
    purpose: "Official product visual for evaluation/CTA contexts.",
    seoContext: "InstaDoodle · official product visual",
    usage: { primary: "CTA / evaluation contexts", avoid: ["legal and company pages"] },
  },
  box: {
    kind: "remote",
    src: "https://instadoodle.com/images/box1.webp",
    aspectRatio: "4 / 3",
    alt: "Official InstaDoodle product visual",
    loading: "lazy",
    priority: false,
    officialSource: "https://instadoodle.com/images/box1.webp",
    sourceNote: RIGHTS_NOTE,
    purpose: "Official product visual for feature/overview contexts.",
    seoContext: "InstaDoodle · official product visual",
    usage: { primary: "/features overview, examples hub next step", avoid: ["legal and company pages"] },
  },
  option: {
    kind: "remote",
    src: "https://instadoodle.com/images/option3.webp",
    aspectRatio: "4 / 3",
    alt: "Official InstaDoodle product visual",
    loading: "lazy",
    priority: false,
    officialSource: "https://instadoodle.com/images/option3.webp",
    sourceNote: RIGHTS_NOTE,
    purpose: "Official product visual (alternate).",
    seoContext: "InstaDoodle · official product visual",
    usage: { primary: "supporting evaluation contexts", avoid: ["legal and company pages"] },
  },
} as const satisfies Record<string, RemoteImageAsset>;

/* ─────────────────────────── VIDEOS ─────────────────────────── */

export const VIDEOS = {
  sale: {
    kind: "video",
    provider: "vimeo",
    title: "InstaDoodle overview video",
    description:
      "An official overview of the InstaDoodle workflow and the kind of whiteboard videos it is designed to create.",
    embedUrl: "https://player.vimeo.com/video/1031062753?h=679763e772",
    contentUrl: "https://vimeo.com/1031062753",
    thumbnailUrl: undefined,
    transcriptRef: undefined,
    duration: undefined,
    uploadDate: undefined,
    chapters: undefined,
    purpose: "Big-picture product overview, shown after the evaluation.",
    seoContext: "InstaDoodle · product overview",
    usage: { primary: "home overview section", avoid: ["above the hero", "comparison/legal pages"] },
  },
  demo: {
    kind: "video",
    provider: "vimeo",
    title: "InstaDoodle product demo",
    description:
      "An official product demonstration that gives viewers a concrete look at the whiteboard-animation workflow.",
    embedUrl: "https://player.vimeo.com/video/965207353",
    contentUrl: "https://vimeo.com/965207353",
    thumbnailUrl: undefined,
    transcriptRef: undefined,
    duration: undefined,
    uploadDate: undefined,
    chapters: undefined,
    purpose: "Concrete demonstration of the scene workflow.",
    seoContext: "InstaDoodle · workflow demo",
    usage: { primary: "home demo section, /examples orientation", avoid: ["comparison/legal pages"] },
  },
  marketers: {
    kind: "video",
    provider: "vimeo",
    title: "InstaDoodle marketing example",
    description: "An official example for planning a marketing message as a short doodle-video sequence.",
    embedUrl: "https://player.vimeo.com/video/949816110",
    contentUrl: "https://vimeo.com/949816110",
    thumbnailUrl: undefined,
    transcriptRef: undefined,
    duration: undefined,
    uploadDate: undefined,
    chapters: undefined,
    purpose: "Audience example: marketing.",
    seoContext: "marketing video · doodle example",
    usage: { primary: "/examples/marketing" },
  },
  businessOwners: {
    kind: "video",
    provider: "vimeo",
    title: "InstaDoodle business-owner example",
    description:
      "An official example for explaining a business offer, process, or customer problem with doodle animation.",
    embedUrl: "https://player.vimeo.com/video/949817416",
    contentUrl: "https://vimeo.com/949817416",
    thumbnailUrl: undefined,
    transcriptRef: undefined,
    duration: undefined,
    uploadDate: undefined,
    chapters: undefined,
    purpose: "Audience example: business owners.",
    seoContext: "business explainer · doodle example",
    usage: { primary: "/examples/business-owners" },
  },
  contentCreators: {
    kind: "video",
    provider: "vimeo",
    title: "InstaDoodle content-creator example",
    description: "An official example for shaping a creator idea into a clear, reusable video format.",
    embedUrl: "https://player.vimeo.com/video/949816024",
    contentUrl: "https://vimeo.com/949816024",
    thumbnailUrl: undefined,
    transcriptRef: undefined,
    duration: undefined,
    uploadDate: undefined,
    chapters: undefined,
    purpose: "Audience example: content creators.",
    seoContext: "creator video · doodle example",
    usage: { primary: "/examples/content-creators" },
  },
  nonprofits: {
    kind: "video",
    provider: "vimeo",
    title: "InstaDoodle nonprofit example",
    description: "An official example for helping a nonprofit explain a mission, program, or action to supporters.",
    embedUrl: "https://player.vimeo.com/video/949816192",
    contentUrl: "https://vimeo.com/949816192",
    thumbnailUrl: undefined,
    transcriptRef: undefined,
    duration: undefined,
    uploadDate: undefined,
    chapters: undefined,
    purpose: "Audience example: nonprofits.",
    seoContext: "nonprofit video · doodle example",
    usage: { primary: "/examples/nonprofits" },
  },
} as const satisfies Record<string, VideoAsset>;

/* ─────────────────────────── KEYS + ACCESSORS ─────────────────────────── */

export type MediaKey = keyof typeof IMAGES;
export type OfficialProductImageKey = keyof typeof REMOTE_IMAGES;
export type VimeoVideoKey = keyof typeof VIDEOS;

/** Backwards-compatible alias for the local-image map. */
export const MEDIA = IMAGES;

export function getImage(key: MediaKey): LocalImageAsset {
  return IMAGES[key];
}

export function getRemoteImage(key: OfficialProductImageKey): RemoteImageAsset {
  return REMOTE_IMAGES[key];
}

export function getVideo(key: VimeoVideoKey): VideoAsset {
  return VIDEOS[key];
}

/* ─────────────────────────── STRUCTURED-DATA BUILDERS ─────────────────────────── */

type SchemaNode = Record<string, unknown>;

/** Build a schema.org ImageObject for a local image (absolute URLs). */
export function imageObject(key: MediaKey): SchemaNode {
  const img = getImage(key);
  return {
    "@type": "ImageObject",
    url: absoluteUrl(img.src),
    contentUrl: absoluteUrl(img.src),
    width: img.width,
    height: img.height,
    ...(img.caption ? { caption: img.caption } : {}),
    ...(img.officialSource ? { creditText: "InstaDoodle" } : {}),
  };
}

/** Build a schema.org VideoObject for a video. Emits a valid baseline from
 *  available fields; thumbnailUrl / uploadDate / duration enrich it when supplied. */
export function videoObject(key: VimeoVideoKey): SchemaNode {
  const v = getVideo(key);
  return {
    "@type": "VideoObject",
    name: v.title,
    description: v.description,
    embedUrl: v.embedUrl,
    contentUrl: v.contentUrl,
    ...(v.thumbnailUrl ? { thumbnailUrl: v.thumbnailUrl } : {}),
    ...(v.uploadDate ? { uploadDate: v.uploadDate } : {}),
    ...(v.duration ? { duration: v.duration } : {}),
  };
}

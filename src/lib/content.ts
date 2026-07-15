import type { OfficialProductImageKey } from "./assets";
import type { MediaKey } from "./media";
import type { VimeoVideoKey } from "./videos";

export type CalloutKind = "verified" | "editorial" | "verify";

export type Block =
  | { type: "prose"; heading?: string; body: string[]; anchor?: string }
  | { type: "split"; heading: string; body: string[]; media: MediaKey; reverse?: boolean; bullets?: string[]; anchor?: string }
  | { type: "featureGrid"; heading?: string; intro?: string; items: { title: string; body: string; media?: MediaKey }[]; anchor?: string }
  | { type: "steps"; heading?: string; intro?: string; items: { title: string; body: string }[]; anchor?: string }
  | { type: "checklist"; heading: string; intro?: string; items: string[]; anchor?: string }
  | { type: "cards"; heading?: string; intro?: string; items: { title: string; body: string; href?: string }[]; anchor?: string }
  | { type: "callout"; kind: CalloutKind; body: string }
  | { type: "pills"; heading?: string; items: string[] }
  | { type: "compare"; heading?: string; caption: string; altName: string; rows: { dimension: string; instadoodle: string; alternative: string }[]; anchor?: string }
  | { type: "faq"; heading?: string; items: [string, string][] }
  | { type: "gallery"; heading?: string; intro?: string; items: { media: MediaKey; title: string; body: string }[]; anchor?: string }
  | { type: "vimeo"; heading: string; intro?: string; video: VimeoVideoKey; ctaHref?: string; ctaLabel?: string; anchor?: string }
  | { type: "officialImage"; heading: string; body: string[]; image: OfficialProductImageKey; alt: string; reverse?: boolean; anchor?: string };

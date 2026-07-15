import Image from "next/image";
import type { ReactNode } from "react";

/* ============================================================
   Design-system primitives (server components).
   Consistent rhythm + doodle motifs, varied by intent.
   ============================================================ */

type Tone = "paper" | "card" | "lavender" | "ink" | "hero";
type Space = "tight" | "normal" | "loose";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  card: "bg-card text-ink",
  lavender: "bg-lavender text-ink",
  ink: "bg-ink text-white",
  hero: "text-ink",
};

const spaceClass: Record<Space, string> = {
  tight: "py-12 lg:py-14",
  normal: "py-16 lg:py-20",
  loose: "py-20 lg:py-28",
};

export function Section({
  children,
  tone = "paper",
  space = "normal",
  bordered = false,
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  space?: Space;
  bordered?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${toneClass[tone]} ${bordered ? "border-y border-black/10" : ""} ${className}`}
    >
      <div className={`mx-auto w-full max-w-6xl px-5 lg:px-8 ${spaceClass[space]}`}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = "violet" }: { children: ReactNode; tone?: "violet" | "magenta" | "lavender" | "muted" }) {
  const color =
    tone === "magenta" ? "text-magenta" : tone === "lavender" ? "text-lavender" : tone === "muted" ? "text-muted" : "text-violet";
  return <p className={`text-xs font-extrabold uppercase tracking-[0.18em] ${color}`}>{children}</p>;
}

/** Hand-drawn underline SVG — the design signature under key headings. */
export function SketchUnderline({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 300 12" preserveAspectRatio="none" className={`h-2.5 w-full ${className}`}>
      <path
        d="M2 8 C 60 2, 110 11, 160 6 S 258 3, 298 7"
        fill="none"
        stroke="var(--magenta)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SectionHeading({
  children,
  underline = false,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  underline?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={className}>
      <Tag className="text-[length:var(--step-3)] font-black leading-[1.02] tracking-[-0.03em] text-balance">
        {children}
      </Tag>
      {underline && <SketchUnderline className="mt-2 max-w-[14rem]" />}
    </div>
  );
}

/** Editor-window "scene frame" that wraps a product image. */
export function SceneFrame({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  label,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  label?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`scene-frame ${className}`}>
      <div className="scene-frame__bar">
        <span className="scene-frame__dot" style={{ background: "var(--rose)" }} />
        <span className="scene-frame__dot" style={{ background: "var(--marker)" }} />
        <span className="scene-frame__dot" style={{ background: "var(--violet)" }} />
        {label && <span className="ml-2 truncate text-xs font-bold text-muted">{label}</span>}
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 45vw, 100vw"}
        className="h-auto w-full"
      />
      {caption && (
        <figcaption className="border-t-2 border-ink px-4 py-3 text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

export function Card({
  children,
  className = "",
  hard = false,
}: {
  children: ReactNode;
  className?: string;
  hard?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-card p-6 ${
        hard ? "border-ink shadow-[var(--shadow-hard)]" : "border-black/10 shadow-[var(--shadow-sm)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** A labelled callout used to distinguish verified fact / editorial note / to-verify. */
export function Callout({
  kind,
  children,
}: {
  kind: "verified" | "editorial" | "verify";
  children: ReactNode;
}) {
  const map = {
    verified: { label: "Verified on the official site", cls: "border-violet/40 bg-[var(--lavender-soft)]", dot: "var(--violet)" },
    editorial: { label: "Editorial interpretation", cls: "border-black/15 bg-card", dot: "var(--muted)" },
    verify: { label: "Confirm on the official offer page", cls: "border-magenta/40 bg-[#fdeff8]", dot: "var(--magenta)" },
  } as const;
  const c = map[kind];
  return (
    <aside className={`flex gap-3 rounded-xl border ${c.cls} px-4 py-3 text-sm text-ink`}>
      <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.dot }} />
      <p>
        <span className="font-extrabold">{c.label}.</span> <span className="text-muted">{children}</span>
      </p>
    </aside>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/12 bg-card px-3 py-1 text-xs font-bold text-ink">
      {children}
    </span>
  );
}

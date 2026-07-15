import Link from "next/link";
import type { SitePage } from "@/lib/site";
import { OFFICIAL_PRODUCT_URL } from "@/lib/site";
import { pageStructuredData } from "@/lib/schema";
import { JsonLd } from "./json-ld";
import { CtaBand } from "./cta";
import { PageBlocks } from "./page-blocks";
import { Reveal } from "./motion";
import { Eyebrow, SketchUnderline } from "./ui";
import { TrackedLink } from "./tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

const labels: Record<string, string> = {
  "/features": "Features",
  "/use-cases": "Use cases",
  "/alternatives": "Comparison guide",
  "/resources": "Resources",
  "/examples": "Examples",
  "/examples/marketing": "Marketing examples",
  "/examples/business-owners": "Business-owner examples",
  "/examples/content-creators": "Content-creator examples",
  "/examples/nonprofits": "Nonprofit examples",
  "/samples": "Samples",
  "/pricing": "Plans",
  "/about": "About",
  "/contact": "Contact",
  "/privacy": "Privacy",
  "/terms": "Terms",
  "/whiteboard-animation-software": "Whiteboard animation software",
  "/ai-whiteboard-animation": "AI whiteboard animation",
  "/doodle-video-creator": "Doodle video creator",
  "/whiteboard-video-maker": "Whiteboard video maker",
  "/educational-video-maker": "Educational video maker",
  "/training-video-software": "Training video software",
  "/whiteboard-animation-examples": "Whiteboard animation examples",
  "/alternatives/doodly": "InstaDoodle vs Doodly",
  "/alternatives/videoscribe": "InstaDoodle vs VideoScribe",
  "/alternatives/animaker": "InstaDoodle vs Animaker",
};

const heroTone: Record<SitePage["kind"], string> = {
  hub: "radial-gradient(circle at 15% 0%, #f0d9ff, transparent 45%), linear-gradient(180deg,#fff,var(--paper))",
  commercial: "radial-gradient(circle at 85% 0%, #ffe0f4, transparent 45%), linear-gradient(180deg,#fff,var(--paper))",
  comparison: "radial-gradient(circle at 50% 0%, #e7d7f3, transparent 55%), linear-gradient(180deg,#fff,var(--paper))",
  company: "linear-gradient(180deg,#fff,var(--paper))",
  legal: "linear-gradient(180deg,#fff,var(--paper))",
};

export function PageTemplate({ page }: { page: SitePage }) {
  const path = `/${page.slug.join("/")}`;
  const parentHub = page.slug.length > 1 && ["alternatives", "examples"].includes(page.slug[0]);
  const parentHubPath = parentHub ? `/${page.slug[0]}` : null;
  const parentHubLabel = page.slug[0] === "alternatives" ? "Comparison guide" : "Examples";
  const schema = pageStructuredData(page);
  const ctaEvent =
    path === "/pricing"
      ? ANALYTICS_EVENTS.pricingCta
      : page.kind === "comparison"
        ? ANALYTICS_EVENTS.comparisonCta
        : ANALYTICS_EVENTS.finalCta;

  return (
    <>
      <JsonLd data={schema} />

      <nav aria-label="Breadcrumb" className="border-b border-black/10 bg-card">
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center px-5 py-3 text-sm text-muted lg:px-8">
          <li><Link href="/" className="hover:text-violet">Home</Link></li>
          {parentHub && parentHubPath && (
            <>
              <li className="mx-2" aria-hidden>/</li>
              <li><Link href={parentHubPath} className="hover:text-violet">{parentHubLabel}</Link></li>
            </>
          )}
          <li className="mx-2" aria-hidden>/</li>
          <li aria-current="page" className="font-semibold text-ink">{page.title}</li>
        </ol>
      </nav>

      <section className="relative overflow-hidden border-b border-black/10">
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: heroTone[page.kind] }} />
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <Reveal><Eyebrow tone="violet">Independent guide · {page.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 max-w-4xl text-[length:var(--step-4)] font-black leading-[0.98] tracking-[-0.035em] text-balance">{page.h1}</h1>
            <SketchUnderline className="mt-3 max-w-[16rem]" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="answer-summary mt-6 max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">Quick answer</p>
              <p className="mt-2 text-[length:var(--step-1)] leading-8 text-muted">{page.intro}</p>
            </div>
          </Reveal>
          {page.heroCtas && (
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                {page.heroCtas.map((cta, index) => (
                  <TrackedLink
                    key={cta.href}
                    href={cta.href}
                    event={index === 0 ? (page.kind === "comparison" ? ANALYTICS_EVENTS.comparisonCta : ANALYTICS_EVENTS.primaryCta) : ANALYTICS_EVENTS.navigationCta}
                    eventDetail={{ placement: "page_hero", destination: cta.href }}
                    className={index === 0 ? "rounded-full bg-violet px-6 py-3.5 font-extrabold text-white shadow-[var(--shadow-hard)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none" : "rounded-full border-2 border-ink px-6 py-3.5 font-extrabold transition hover:bg-card"}
                  >
                    {cta.label} <span aria-hidden>→</span>
                  </TrackedLink>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <PageBlocks blocks={page.blocks} />

      <section className="border-t border-black/10 bg-card">
        <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
          <aside className="source-note max-w-3xl" aria-labelledby="source-note-title">
            <p id="source-note-title" className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">Source and verification note</p>
            <p className="mt-2 text-sm text-muted">
              Product capability statements marked verified are based on the <a href={OFFICIAL_PRODUCT_URL} rel="noopener noreferrer" className="font-semibold text-violet hover:underline">official InstaDoodle website</a>. Plans, pricing, availability, guarantees, and competitor details can change; confirm them with the relevant provider before deciding.
            </p>
          </aside>
        </div>
      </section>

      {page.related.length > 0 && (
        <section className="border-t border-black/10 bg-ink text-white">
          <nav aria-label="Related guides" className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-lavender">Continue your research</p>
            <h2 className="mt-2 text-2xl font-black">Related guides for the next decision</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {page.related.map((href) => (
                <Link key={href} href={href} className="flex min-h-14 items-center justify-between rounded-xl border border-white/20 px-5 py-4 font-bold transition hover:border-magenta hover:bg-white/10">
                  {labels[href] ?? href} <span aria-hidden className="text-magenta">↗</span>
                </Link>
              ))}
            </div>
          </nav>
        </section>
      )}

      <CtaBand
        eyebrow={page.cta.eyebrow ?? "Next step"}
        title={page.cta.title}
        body={page.cta.body}
        visualImage={page.cta.visualImage}
        visualAlt={page.cta.visualAlt}
        primaryHref={page.cta.primaryHref}
        primaryLabel={page.cta.primaryLabel}
        primaryEvent={ctaEvent}
        secondaryHref={page.cta.secondaryHref}
        secondaryLabel={page.cta.secondaryLabel}
        placement={`page_${page.slug.join("_")}`}
      />
    </>
  );
}

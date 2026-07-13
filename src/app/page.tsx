import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { TrackedLink } from "@/components/tracked-link";
import { Callout, Card, Eyebrow, Pill, SceneFrame, Section, SectionHeading, SketchUnderline } from "@/components/ui";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { absoluteUrl } from "@/lib/site";

const IMG = "/images/instadoodle";

const workflow = [
  ["Type your idea", "Describe a scene, script or topic in your language. DoodleAI generates the characters, elements and backgrounds to start from.", "Text-to-doodle"],
  ["Compose the scenes", "Arrange characters, props and backgrounds into full scene layouts, then set order and timing so one idea leads to the next.", "Scene builder"],
  ["Animate & export", "Add drawing-hand reveals, slide transitions, voiceover and music, then export in the aspect ratio your channel needs.", "Finish & publish"],
] as const;

const coreFeatures = [
  ["DoodleAI™ text-to-doodle", "Type a prompt and the AI engine draws characters, elements or backgrounds to build a scene around."],
  ["1,000+ doodle library", "Searchable characters, speech bubbles, arrows, emojis and elements ready to drop into a scene."],
  ["AI image-to-sketch", "Upload a photo or logo and InstaDoodle redraws it as a hand-drawn doodle."],
  ["Voiceover & music", "Generate a voiceover, upload your own, and add royalty-free background music across 20+ voices and languages."],
  ["Animation & transitions", "Reveal scenes with draw, wipe, slide, fade or pop-in, then move between them with fade, wipe, iris or push transitions."],
  ["Cloud-based editor", "Runs in a modern browser on Mac, Windows or any device — no install, projects follow you."],
] as const;

const audiences = ["Marketers", "Teachers", "Students", "Authors", "Customer support", "Product teams", "Podcasters", "Agencies"] as const;

const useCases = [
  ["Education & courses", "Turn a lesson or module into a sequence of drawn scenes so learners meet one concept at a time.", "/educational-video-maker"],
  ["Training & onboarding", "Show a process in the order people follow it, and update a single scene when the process changes.", "/training-video-software"],
  ["Marketing explainers", "Open on the audience problem, introduce the idea, and close with a clear next step.", "/use-cases"],
  ["Product & how-to", "Give each key moment its own scene instead of crowding every feature into one frame.", "/whiteboard-animation-examples"],
] as const;

const strengths = [
  "AI-assisted starting points shorten the blank-canvas problem",
  "Doodle style gives dense topics a consistent, friendly visual language",
  "Browser-based access means no installs and cross-device projects",
  "Scene-based editing makes revisions practical without re-shooting",
] as const;

const limitations = [
  "AI output still needs review, selection and editing to stay on-message",
  "A doodle style suits explanation better than photorealistic product demos",
  "A clear script and single takeaway matter more than the tool itself",
  "Feature availability differs by plan — confirm what you need before buying",
] as const;

const faqs = [
  ["What is InstaDoodle?", "InstaDoodle is a cloud-based AI whiteboard and doodle-animation video tool. Its official site describes creating explainer videos from text prompts, images and a doodle asset library."],
  ["Do I need to install anything?", "No. The official site states InstaDoodle is a cloud-based app that runs in a modern browser on Mac, Windows or other devices."],
  ["Can AI generate the doodles?", "Yes. The DoodleAI™ engine turns a text prompt into doodle characters, elements or backgrounds, and can redraw an uploaded photo or logo as a sketch."],
  ["Does this guide publish prices or guarantees?", "No. Pricing, plan limits and guarantee terms are time-sensitive and belong on the official offer page. This independent guide does not restate them."],
] as const;

export default function Home() {
  const schema = [
    { "@context": "https://schema.org", "@type": "WebSite", name: "Independent InstaDoodle Guide", url: absoluteUrl() },
    { "@context": "https://schema.org", "@type": "WebPage", name: "Independent InstaDoodle Guide", description: "An independent guide to InstaDoodle's AI-powered whiteboard animation and doodle video creation workflow.", url: absoluteUrl() },
  ];

  return (
    <>
      <JsonLd data={schema} />

      {/* 2–4 · Hero: what it is, who it's for, the workflow + independent notice + large product preview */}
      <section className="relative overflow-hidden border-b border-black/10">
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--grad-hero)" }} />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-card px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-violet">
                <span aria-hidden className="h-2 w-2 rounded-full bg-magenta" /> Independent product guide
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 max-w-2xl text-[length:var(--step-5)] font-black leading-[0.94] tracking-[-0.045em] text-balance">
                Turn an idea into a <span className="text-brand-gradient">doodle explainer</span> video.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[length:var(--step-1)] leading-8 text-muted">
                A practical, independent guide to <strong className="font-bold text-ink">InstaDoodle</strong> — an
                AI-assisted whiteboard animation tool that turns a text prompt, script or image into scene-based doodle
                videos, right in the browser.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  href="#workflow"
                  event={ANALYTICS_EVENTS.primaryCta}
                  eventDetail={{ placement: "hero" }}
                  className="rounded-full bg-violet px-6 py-3.5 font-extrabold text-white shadow-[var(--shadow-hard)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  See how the editor works <span aria-hidden>↓</span>
                </TrackedLink>
                <TrackedLink
                  href="/features"
                  event={ANALYTICS_EVENTS.primaryCta}
                  eventDetail={{ placement: "hero_features" }}
                  className="rounded-full border-2 border-ink px-6 py-3.5 font-extrabold transition hover:bg-card"
                >
                  Explore the AI features
                </TrackedLink>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 flex items-start gap-2 text-sm text-muted">
                <span aria-hidden className="mt-0.5 font-hand text-lg leading-none text-magenta">✻</span>
                This is not the official InstaDoodle website. It publishes no unverified prices, guarantees, ratings or
                customer claims.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} y={22}>
            <div className="relative">
              <span aria-hidden className="absolute -left-3 -top-6 z-10 -rotate-6 rounded-full bg-marker px-3 py-1 font-hand text-lg text-ink shadow-sm">
                built around scenes
              </span>
              <SceneFrame
                src={`${IMG}/ai-doodle-generator-editor.webp`}
                alt="InstaDoodle editor showing doodle scenes, a drawing hand and a scene timeline"
                width={1473}
                height={631}
                priority
                label="instadoodle · scene editor"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 · What InstaDoodle does */}
      <Section tone="card" bordered>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <Eyebrow tone="magenta">What it does</Eyebrow>
            <SectionHeading underline className="mt-3">
              One browser workspace for the whole doodle video.
            </SectionHeading>
            <p className="mt-5 max-w-xl text-muted">
              Instead of stacking a script tool, a stock library and a desktop animator, InstaDoodle brings AI image
              generation, a doodle asset library, scene editing, voiceover and rendering into a single cloud editor. You
              shape a story scene by scene rather than starting from a blank illustration canvas.
            </p>
            <Callout kind="verified">
              The official site describes InstaDoodle as a cloud-based app for creating whiteboard animation explainer
              videos from text prompts, images and a 1,000+ doodle library.
            </Callout>
          </Reveal>
          <Reveal delay={0.1} y={22}>
            <SceneFrame
              src={`${IMG}/features/instadoodle-scene-editor-interface.webp`}
              alt="InstaDoodle scene editor interface with a doodle canvas and editing controls"
              width={1000}
              height={833}
              label="scene editor"
            />
          </Reveal>
        </div>
      </Section>

      {/* 7–8 · Core benefits + detailed feature grid */}
      <Section tone="paper">
        <Reveal>
          <Eyebrow>Core features</Eyebrow>
          <SectionHeading className="mt-3 max-w-3xl">
            Generate, customize and animate — without the freelancer queue.
          </SectionHeading>
        </Reveal>
        <Stagger className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map(([title, body], i) => (
            <StaggerItem key={title} as="article">
              <Card hard className="h-full">
                <p className="font-hand text-2xl leading-none text-violet">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-lg font-black tracking-[-0.02em]">{title}</h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <TrackedLink
              href="/features"
              event={ANALYTICS_EVENTS.primaryCta}
              eventDetail={{ placement: "features_grid" }}
              className="rounded-full border-2 border-ink px-5 py-3 font-bold transition hover:bg-lavender"
            >
              See every feature in detail <span aria-hidden>→</span>
            </TrackedLink>
          </div>
        </Reveal>
      </Section>

      {/* 9–10 · Three-step workflow with editor visuals */}
      <Section id="workflow" tone="lavender" bordered>
        <Reveal>
          <Eyebrow tone="violet">The workflow</Eyebrow>
          <SectionHeading className="mt-3 max-w-3xl">A whiteboard video in three clear steps.</SectionHeading>
          <p className="mt-4 max-w-xl text-muted">
            The official site frames creation as three steps. The order matters more than any single feature — each
            step sets up the next.
          </p>
        </Reveal>
        <Stagger as="ol" className="mt-10 grid gap-5 md:grid-cols-3">
          {workflow.map(([title, body, tag], i) => (
            <StaggerItem key={title} as="li">
              <div className="relative h-full rounded-2xl border-2 border-ink bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-violet text-lg font-black text-white">
                    {i + 1}
                  </span>
                  <Pill>{tag}</Pill>
                </div>
                <h3 className="mt-4 text-xl font-black tracking-[-0.02em]">{title}</h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 11 · Image-to-sketch */}
      <Section tone="card" bordered>
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal y={22}>
            <SceneFrame
              src={`${IMG}/features/instadoodle-ai-image-to-sketch-panel.webp`}
              alt="InstaDoodle AI image-to-sketch panel turning an uploaded photo into a hand-drawn doodle"
              width={1000}
              height={561}
              label="image → sketch"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow tone="magenta">Image-to-sketch</Eyebrow>
            <SectionHeading underline className="mt-3">
              Turn a photo or logo into a hand-drawn scene.
            </SectionHeading>
            <p className="mt-5 max-w-xl text-muted">
              Upload an image and InstaDoodle redraws it in a doodle style, so a recognizable product, mascot or logo
              can join the same visual world as the rest of your scenes. The built-in image editor adds crop, recolor
              and one-click background removal.
            </p>
            <Link href="/ai-whiteboard-animation" className="mt-6 inline-flex font-bold text-violet hover:underline">
              See the image-to-sketch workflow <span aria-hidden className="ml-1">→</span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* 12 · Voice, music, animation & transitions */}
      <Section tone="paper">
        <Reveal>
          <Eyebrow>Sound & motion</Eyebrow>
          <SectionHeading className="mt-3 max-w-3xl">Give each scene a voice, a pace and a transition.</SectionHeading>
        </Reveal>
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border-2 border-ink bg-card">
              <Image src={`${IMG}/features/instadoodle-voiceover-and-music.webp`} alt="InstaDoodle voiceover and background music panel" width={1000} height={833} sizes="(min-width:1024px) 45vw, 100vw" className="h-auto w-full" />
              <div className="border-t-2 border-ink p-5">
                <h3 className="text-lg font-black">Voiceover &amp; background music</h3>
                <p className="mt-2 text-sm text-muted">Generate a voiceover, upload your own narration, or add royalty-free music. The official site lists 20+ voices and languages.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border-2 border-ink bg-card">
              <Image src={`${IMG}/features/instadoodle-slide-transitions.webp`} alt="InstaDoodle slide transition options between doodle scenes" width={1000} height={833} sizes="(min-width:1024px) 45vw, 100vw" className="h-auto w-full" />
              <div className="border-t-2 border-ink p-5">
                <h3 className="text-lg font-black">Animation &amp; transitions</h3>
                <p className="mt-2 text-sm text-muted">Reveal scenes with draw, wipe, slide, fade or pop-in, then move between them with fade, wipe, iris or push transitions.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 13 · Supported content / audience categories */}
      <Section tone="ink">
        <Reveal>
          <Eyebrow tone="lavender">Used across teams</Eyebrow>
          <h2 className="mt-3 max-w-3xl text-[length:var(--step-3)] font-black leading-[1.03] tracking-[-0.03em]">
            Built for anyone who has to explain something.
          </h2>
        </Reveal>
        <Stagger className="mt-8 flex flex-wrap gap-3">
          {audiences.map((a) => (
            <StaggerItem key={a}>
              <span className="inline-flex rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-bold text-white">{a}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 14 · Use cases */}
      <Section tone="card" bordered>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <Eyebrow tone="magenta">Where it fits</Eyebrow>
            <SectionHeading underline className="mt-3">Pick the path by the job, not a feature list.</SectionHeading>
            <p className="mt-5 max-w-xl text-muted">
              Whiteboard animation earns its place when an audience needs a concept broken into clear, memorable steps.
              Start from the outcome you want, then build the scenes toward it.
            </p>
            <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
              {useCases.map(([label, body, href]) => (
                <StaggerItem key={href} as="article">
                  <Link href={href} className="group block h-full rounded-2xl border border-black/12 bg-paper p-5 transition hover:border-ink">
                    <h3 className="flex items-center justify-between font-black">
                      {label} <span aria-hidden className="text-magenta transition group-hover:translate-x-0.5">↗</span>
                    </h3>
                    <p className="mt-2 text-sm text-muted">{body}</p>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
          <Reveal delay={0.1} y={22}>
            <Image src={`${IMG}/why-whiteboard-animation.webp`} alt="Whiteboard video illustrations for marketing, learning and business communication" width={669} height={392} sizes="(min-width:1024px) 45vw, 100vw" className="h-auto w-full" />
          </Reveal>
        </div>
      </Section>

      {/* 15 · Example video categories */}
      <Section tone="paper">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Example categories</Eyebrow>
              <SectionHeading className="mt-3">What people build with it.</SectionHeading>
            </div>
            <Link href="/samples" className="font-bold text-violet hover:underline">View InstaDoodle examples <span aria-hidden>→</span></Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            [`${IMG}/samples/instadoodle-sample-brand-story.webp`, "Brand story doodle scene", "Brand stories & explainers", "A drawn narrative that introduces a product or idea and lands on one action."],
            [`${IMG}/samples/instadoodle-sample-kids-lesson.webp`, "Kids lesson doodle scene", "Education & tutorials", "Math tutorials, how-to guides and step-by-step lessons paced one concept at a time."],
          ].map(([src, alt, title, body]) => (
            <Reveal key={title}>
              <figure className="overflow-hidden rounded-2xl border-2 border-ink bg-card">
                <Image src={src} alt={alt} width={800} height={450} sizes="(min-width:768px) 45vw, 100vw" className="h-auto w-full" />
                <figcaption className="border-t-2 border-ink p-5">
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{body}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 16–17 · Strengths & practical limitations (honest assessment) */}
      <Section tone="lavender" bordered>
        <Reveal>
          <Eyebrow tone="violet">An honest read</Eyebrow>
          <SectionHeading className="mt-3 max-w-3xl">Strengths, and where it needs your judgment.</SectionHeading>
        </Reveal>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border-2 border-ink bg-card p-6">
              <h3 className="flex items-center gap-2 text-lg font-black"><span aria-hidden className="text-violet">＋</span> Where it helps</h3>
              <ul className="mt-4 space-y-3">
                {strengths.map((s) => (
                  <li key={s} className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-violet">✓</span><span>{s}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border-2 border-ink bg-card p-6">
              <h3 className="flex items-center gap-2 text-lg font-black"><span aria-hidden className="text-magenta">！</span> Practical limitations</h3>
              <ul className="mt-4 space-y-3">
                {limitations.map((s) => (
                  <li key={s} className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-magenta">•</span><span>{s}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 18 · Comparison teaser */}
      <Section tone="card" bordered>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Eyebrow tone="magenta">Weighing alternatives?</Eyebrow>
            <SectionHeading underline className="mt-3">See how it compares to Doodly, VideoScribe and Animaker.</SectionHeading>
            <p className="mt-5 max-w-xl text-muted">
              Our comparison guide focuses on workflow fit — browser vs desktop, AI-assisted creation, scene editing and
              the kind of videos you actually make — rather than a raw feature count. Competitor details change, so we
              flag what to verify directly.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Stagger className="grid gap-3">
              {[["InstaDoodle vs Doodly", "/alternatives/doodly"], ["InstaDoodle vs VideoScribe", "/alternatives/videoscribe"], ["InstaDoodle vs Animaker", "/alternatives/animaker"]].map(([label, href]) => (
                <StaggerItem key={href}>
                  <TrackedLink href={href} event={ANALYTICS_EVENTS.comparisonCta} eventDetail={{ placement: "home_compare", destination: href }} className="flex items-center justify-between rounded-xl border-2 border-ink bg-paper px-5 py-4 font-bold transition hover:bg-lavender">
                    {label} <span aria-hidden className="text-magenta">→</span>
                  </TrackedLink>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </Section>

      {/* 19 · FAQ */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>Before you evaluate</Eyebrow>
            <SectionHeading className="mt-3">Common questions.</SectionHeading>
            <SketchUnderline className="mt-3 max-w-[10rem]" />
          </Reveal>
          <Reveal delay={0.05}>
            <FaqList items={faqs} />
          </Reveal>
        </div>
      </Section>

      {/* 22 · Substantial final CTA (affiliate disclosure lives in the footer) */}
      <CtaBand
        eyebrow="Make your evaluation specific"
        title="Start with the explanation you want to create."
        body="Read the workflow guide, explore examples, or check the current offer on the official site."
        primaryHref="/whiteboard-animation-software"
        primaryLabel="Read the workflow guide"
        secondaryHref="/samples"
        secondaryLabel="View examples"
        placement="home_final"
      />
    </>
  );
}

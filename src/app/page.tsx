import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta";
import { AffiliateOfferCta } from "@/components/affiliate-link";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { TrackedLink } from "@/components/tracked-link";
import { VimeoVideo } from "@/components/vimeo-video";
import { Callout, Card, Eyebrow, Pill, SceneFrame, Section, SectionHeading, SketchUnderline } from "@/components/ui";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { getImage } from "@/lib/media";
import { homeStructuredData } from "@/lib/schema";
import { OFFICIAL_PRODUCT_URL } from "@/lib/site";

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
  const schema = homeStructuredData(
    faqs,
    ["demo", "sale"],
    ["heroEditor", "sceneEditor", "imageToSketch", "sampleBrand", "sampleKids"],
  );
  const heroEditor = getImage("heroEditor");
  const sampleBrand = getImage("sampleBrand");
  const sceneEditor = getImage("sceneEditor");
  const imageToSketch = getImage("imageToSketch");
  const voiceover = getImage("voiceover");
  const transitions = getImage("transitions");
  const whyWhiteboard = getImage("whyWhiteboard");
  const sampleKids = getImage("sampleKids");

  return (
    <>
      <JsonLd data={schema} />

      {/* 2–4 · Hero: promise + proof (workspace → finished video) + independent-guide trust signals */}
      <section className="relative overflow-hidden border-b border-black/10">
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--grad-hero)" }} />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8 lg:py-24">
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
              <p className="answer-summary mt-6 max-w-xl text-[length:var(--step-1)] leading-8 text-muted">
                A practical, independent guide to <strong className="font-bold text-ink">InstaDoodle</strong> — an
                AI-assisted whiteboard animation tool that turns a text prompt, script or image into scene-based doodle
                videos, right in the browser.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  href="/features"
                  event={ANALYTICS_EVENTS.primaryCta}
                  eventDetail={{ placement: "hero_features" }}
                  className="rounded-full bg-violet px-6 py-3.5 font-extrabold text-white shadow-[var(--shadow-hard)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  Explore the AI features <span aria-hidden>→</span>
                </TrackedLink>
                <TrackedLink
                  href="#workflow"
                  event={ANALYTICS_EVENTS.primaryCta}
                  eventDetail={{ placement: "hero_workflow" }}
                  className="rounded-full border-2 border-ink px-6 py-3.5 font-extrabold transition hover:bg-card"
                >
                  See how it works <span aria-hidden>↓</span>
                </TrackedLink>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted">
                {["Independent & unbiased", "No unverified prices or ratings", "Sourced from official product info"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span aria-hidden className="grid h-4 w-4 place-items-center rounded-full bg-violet/10 text-[0.6rem] font-black text-violet">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-3 flex items-start gap-2 text-xs text-muted">
                <span aria-hidden className="mt-0.5 font-hand text-base leading-none text-magenta">✻</span>
                Not the official InstaDoodle website — no guarantees or customer claims are restated here.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} y={22}>
            <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
              <span aria-hidden className="absolute -right-2 -top-5 z-20 rotate-3 rounded-full bg-marker px-3 py-1 font-hand text-lg text-ink shadow-sm">
                built around scenes
              </span>
              <SceneFrame
                src={heroEditor.src}
                alt={heroEditor.alt}
                width={heroEditor.width}
                height={heroEditor.height}
                priority
                label="instadoodle · scene editor"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
              <figure className="absolute -bottom-8 -left-5 z-10 hidden w-52 -rotate-3 overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-[var(--shadow-hard)] lg:block xl:w-56">
                <Image
                  src={sampleBrand.src}
                  alt="A finished doodle explainer scene created in InstaDoodle"
                  width={sampleBrand.width}
                  height={sampleBrand.height}
                  sizes="224px"
                  className="h-auto w-full"
                />
                <figcaption className="flex items-center gap-1.5 border-t-2 border-ink px-3 py-2 text-xs font-bold text-ink">
                  <span aria-hidden className="text-magenta">▸</span> the finished video
                </figcaption>
              </figure>
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
            <div className="mt-5">
              <Callout kind="verified">
                The official site describes InstaDoodle as a cloud-based app for creating whiteboard animation explainer
                videos from text prompts, images and a 1,000+ doodle library.
              </Callout>
              <p className="mt-3 text-sm text-muted">
                Source: <a href={OFFICIAL_PRODUCT_URL} rel="noopener noreferrer" className="font-semibold text-violet hover:underline">official InstaDoodle product information</a>. Confirm time-sensitive plan details before deciding.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} y={22}>
            <SceneFrame
              src={sceneEditor.src}
              alt={sceneEditor.alt}
              width={sceneEditor.width}
              height={sceneEditor.height}
              label="scene editor"
              caption={sceneEditor.caption}
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

      {/* Product demo · a guided lesson: watch the workflow run after the three-step explanation */}
      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <Reveal>
            <Eyebrow tone="magenta">Watch &amp; learn · the demo</Eyebrow>
            <SectionHeading underline className="mt-3">Watch the editor after you understand the scene sequence.</SectionHeading>
            <p className="mt-5 max-w-xl text-muted">
              You have just read the three steps. This official demo shows them running as one continuous flow, so you can
              judge how the workflow supports a scene sequence before weighing it against your own script.
            </p>
            <div className="mt-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-violet">What you&apos;ll learn</p>
              <ul className="mt-3 space-y-2">
                <li className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-violet">✓</span><span>How characters, props and backgrounds become a full scene</span></li>
                <li className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-violet">✓</span><span>How drawing-hand reveals and timing pace a single idea</span></li>
                <li className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-violet">✓</span><span>What a finished, exportable doodle video looks like</span></li>
              </ul>
            </div>
            <TrackedLink
              href="#deep-dive"
              event={ANALYTICS_EVENTS.navigationCta}
              eventDetail={{ placement: "home_demo_video" }}
              className="mt-6 inline-flex font-bold text-violet hover:underline"
            >
              Next, see what makes it different <span aria-hidden className="ml-1">↓</span>
            </TrackedLink>
          </Reveal>
          <Reveal delay={0.08} y={22}>
            <VimeoVideo
              video="demo"
              caption="Official product demo. Watch how drawing-hand reveals and scene timing pace one idea at a time — the sequencing you will plan for your own script."
            />
            <p className="mt-4 flex gap-2 text-sm text-muted">
              <span aria-hidden className="mt-0.5 font-hand text-lg leading-none text-magenta">➜</span>
              <span><strong className="font-bold text-ink">Takeaway:</strong> the editor handles sequencing and reveals, but a clear script still decides whether the finished video actually lands.</span>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 11 · Image-to-sketch · deep dive 1 of 2 (arrives after the demo) */}
      <Section id="deep-dive" tone="card" bordered>
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal y={22}>
            <SceneFrame
              src={imageToSketch.src}
              alt={imageToSketch.alt}
              width={imageToSketch.width}
              height={imageToSketch.height}
              label="image → sketch"
              caption={imageToSketch.caption}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow tone="magenta">Deep dive · what sets it apart</Eyebrow>
            <SectionHeading underline className="mt-3">
              Turn a photo or logo into a hand-drawn scene.
            </SectionHeading>
            <p className="mt-5 max-w-xl text-muted">
              Now that you have seen the whole flow, here is the first of two capabilities that most change what you can
              make. Upload an image and InstaDoodle redraws it in a doodle style, so a recognizable product, mascot or
              logo can join the same visual world as the rest of your scenes. The built-in image editor adds crop,
              recolor and one-click background removal.
            </p>
            <Link href="/ai-whiteboard-animation" className="mt-6 inline-flex font-bold text-violet hover:underline">
              See the image-to-sketch workflow <span aria-hidden className="ml-1">→</span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* 12 · Voice, music, animation & transitions · deep dive 2 of 2 */}
      <Section tone="paper">
        <Reveal>
          <Eyebrow tone="magenta">Deep dive · what sets it apart</Eyebrow>
          <SectionHeading underline className="mt-3 max-w-3xl">And the second: give each scene a voice, a pace and a transition.</SectionHeading>
          <p className="mt-4 max-w-2xl text-muted">
            Image-to-sketch changes what enters a scene; sound and motion change how it lands. Together they are what
            separates a flat slideshow from a doodle video that actually holds attention.
          </p>
        </Reveal>
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border-2 border-ink bg-card">
              <Image src={voiceover.src} alt={voiceover.alt} width={voiceover.width} height={voiceover.height} sizes="(min-width:1024px) 45vw, 100vw" className="h-auto w-full" />
              <div className="border-t-2 border-ink p-5">
                <h3 className="text-lg font-black">Voiceover &amp; background music</h3>
                <p className="mt-2 text-sm text-muted">Generate a voiceover, upload your own narration, or add royalty-free music. The official site lists 20+ voices and languages.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border-2 border-ink bg-card">
              <Image src={transitions.src} alt={transitions.alt} width={transitions.width} height={transitions.height} sizes="(min-width:1024px) 45vw, 100vw" className="h-auto w-full" />
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
          <p className="mt-4 max-w-2xl text-white/70">
            You have seen what it can do; here is who reaches for it — and, next, the jobs it fits best.
          </p>
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
            <Image src={whyWhiteboard.src} alt={whyWhiteboard.alt} width={whyWhiteboard.width} height={whyWhiteboard.height} sizes="(min-width:1024px) 45vw, 100vw" className="h-auto w-full" />
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
            <Link href="/examples" className="font-bold text-violet hover:underline">View InstaDoodle examples <span aria-hidden>→</span></Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            [sampleBrand.src, "Brand story doodle scene", "Brand stories & explainers", "A drawn narrative that introduces a product or idea and lands on one action."],
            [sampleKids.src, "Kids lesson doodle scene", "Education & tutorials", "Math tutorials, how-to guides and step-by-step lessons paced one concept at a time."],
          ].map(([src, alt, title, body]) => (
            <Reveal key={title}>
              <figure className="overflow-hidden rounded-2xl border-2 border-ink bg-card">
                <Image src={src} alt={alt} width={sampleBrand.width} height={sampleBrand.height} sizes="(min-width:768px) 45vw, 100vw" className="h-auto w-full" />
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

      {/* Official overview · a guided lesson: the big-picture overview after the honest assessment */}
      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-[1.14fr_0.86fr]">
          <Reveal>
            <VimeoVideo
              video="sale"
              caption="An official InstaDoodle overview video. Watch it after reviewing the workflow, strengths, and limitations above, then verify current offer details directly."
            />
            <p className="mt-4 flex gap-2 text-sm text-muted">
              <span aria-hidden className="mt-0.5 font-hand text-lg leading-none text-magenta">➜</span>
              <span><strong className="font-bold text-ink">Takeaway:</strong> use the overview to confirm the product matches the workflow you saw earlier — then verify current plan details on the official offer page.</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Eyebrow tone="magenta">Watch &amp; learn · the overview</Eyebrow>
            <SectionHeading underline className="mt-3">A product overview belongs after the evaluation, not before it.</SectionHeading>
            <p className="mt-5 max-w-xl text-muted">
              You watched the editor in action earlier; this is the big-picture overview. With the strengths and limits
              above in mind, use it to check the product against the kind of explanation you actually need to make.
            </p>
            <div className="mt-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-violet">What you&apos;ll learn</p>
              <ul className="mt-3 space-y-2">
                <li className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-violet">✓</span><span>How InstaDoodle frames its own value and audience</span></li>
                <li className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-violet">✓</span><span>Which time-sensitive claims to verify directly before buying</span></li>
                <li className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-violet">✓</span><span>Whether the workflow fits the videos you plan to make</span></li>
              </ul>
            </div>
            <TrackedLink
              href="#compare"
              event={ANALYTICS_EVENTS.comparisonCta}
              eventDetail={{ placement: "home_overview_video", destination: "#compare" }}
              className="mt-6 inline-flex font-bold text-violet hover:underline"
            >
              Next, see how it compares <span aria-hidden className="ml-1">↓</span>
            </TrackedLink>
          </Reveal>
        </div>
      </Section>

      {/* Post-evaluation conversion point · env-gated, renders only when an affiliate destination is set */}
      {process.env.NEXT_PUBLIC_AFFILIATE_URL && (
        <Section tone="lavender" bordered space="tight">
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-[var(--r-xl)] border-2 border-ink bg-card p-8 text-center shadow-[var(--shadow-hard-lavender)]">
              <h2 className="text-[length:var(--step-2)] font-black tracking-[-0.02em]">Evaluated the workflow? See it for yourself.</h2>
              <p className="max-w-xl text-muted">You have seen how a doodle video comes together and where it fits. If it matches the explanation you need to make, view the current product before you decide.</p>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
                <Link href="/whiteboard-animation-software" className="inline-flex min-h-12 items-center rounded-full border-2 border-ink px-6 py-3 font-extrabold transition hover:bg-lavender">
                  Read the workflow guide <span aria-hidden className="ml-1">→</span>
                </Link>
                <AffiliateOfferCta
                  tone="light"
                  label="Check the latest InstaDoodle offer"
                  placement="home_midpage_offer"
                  className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 font-extrabold text-white transition hover:bg-violet"
                />
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* 18 · Comparison teaser */}
      <Section id="compare" tone="card" bordered>
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

      {/* Plan-it bridge · connect the decision to the planning resources before the FAQ */}
      <Section tone="lavender" bordered space="tight">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <Eyebrow tone="violet">Plan before you build</Eyebrow>
            <SectionHeading underline className="mt-3 max-w-2xl">A clear script beats a fancy tool — plan the video first.</SectionHeading>
            <p className="mt-4 max-w-xl text-muted">
              Once you have decided InstaDoodle fits, the planning resources cover script, scenes, pacing, sound and
              export so your time in the editor is productive from the first scene.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <TrackedLink
              href="/resources"
              event={ANALYTICS_EVENTS.navigationCta}
              eventDetail={{ placement: "home_resources" }}
              className="inline-flex shrink-0 rounded-full bg-violet px-6 py-3.5 font-extrabold text-white shadow-[var(--shadow-hard)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              Get the planning resources <span aria-hidden className="ml-1">→</span>
            </TrackedLink>
          </Reveal>
        </div>
      </Section>

      {/* 19 · FAQ */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>Last questions</Eyebrow>
            <SectionHeading className="mt-3">Common questions before you start.</SectionHeading>
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
        secondaryHref="/examples"
        secondaryLabel="View examples"
        placement="home_final"
      />
    </>
  );
}

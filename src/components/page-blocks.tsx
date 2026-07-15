import Image from "next/image";
import Link from "next/link";
import type { Block } from "@/lib/content";
import { MEDIA } from "@/lib/media";
import { ComparisonTable } from "./comparison-table";
import { FaqList } from "./faq";
import { OfficialProductImage } from "./official-product-image";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { VimeoVideo } from "./vimeo-video";
import { Callout, Card, Eyebrow, Pill, SceneFrame, Section, SectionHeading } from "./ui";

type Tone = "paper" | "card" | "lavender";

// Alternate paper/card so adjacent sections separate cleanly; lavender/ink used intentionally per block.
function toneFor(index: number): Tone {
  return index % 2 === 0 ? "paper" : "card";
}

function Paragraphs({ body, className = "" }: { body: string[]; className?: string }) {
  return (
    <div className={`space-y-4 text-muted ${className}`}>
      {body.map((p, i) => (
        <p key={i} className="max-w-2xl">{p}</p>
      ))}
    </div>
  );
}

export function PageBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const tone = toneFor(i);
        const bordered = tone === "card";
        const key = `${block.type}-${i}`;

        switch (block.type) {
          case "prose":
            return (
              <Section key={key} tone={tone} bordered={bordered}>
                <Reveal>
                  {block.heading && <SectionHeading underline className="mb-5 max-w-3xl">{block.heading}</SectionHeading>}
                  <Paragraphs body={block.body} />
                </Reveal>
              </Section>
            );

          case "split": {
            const m = MEDIA[block.media];
            return (
              <Section key={key} id={block.anchor} tone={tone} bordered={bordered}>
                <div className={`grid items-center gap-10 lg:grid-cols-2 ${block.reverse ? "" : ""}`}>
                  <Reveal className={block.reverse ? "lg:order-2" : ""}>
                    <SectionHeading underline>{block.heading}</SectionHeading>
                    <Paragraphs body={block.body} className="mt-5" />
                    {block.bullets && (
                      <ul className="mt-5 space-y-2.5">
                        {block.bullets.map((b) => (
                          <li key={b} className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-violet">✓</span><span>{b}</span></li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                  <Reveal delay={0.1} y={22} className={block.reverse ? "lg:order-1" : ""}>
                    <SceneFrame src={m.src} alt={m.alt} width={m.width} height={m.height} label={block.heading.toLowerCase().slice(0, 26)} caption={block.caption} />
                  </Reveal>
                </div>
              </Section>
            );
          }

          case "featureGrid":
            return (
              <Section key={key} tone={tone} bordered={bordered}>
                <Reveal>
                  {block.heading && <SectionHeading className="max-w-3xl">{block.heading}</SectionHeading>}
                  {block.intro && <p className="mt-4 max-w-2xl text-muted">{block.intro}</p>}
                </Reveal>
                <Stagger className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {block.items.map((it) => {
                    const m = it.media ? MEDIA[it.media] : null;
                    return (
                      <StaggerItem key={it.title} as="article">
                        <Card hard className="flex h-full flex-col overflow-hidden !p-0">
                          {m && (
                            <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 100vw" className="h-auto w-full border-b-2 border-ink" />
                          )}
                          <div className="p-5">
                            <h3 className="text-lg font-black tracking-[-0.02em]">{it.title}</h3>
                            <p className="mt-2 text-sm text-muted">{it.body}</p>
                          </div>
                        </Card>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </Section>
            );

          case "steps":
            return (
              <Section key={key} id={block.anchor} tone={tone} bordered={bordered}>
                <Reveal>
                  {block.heading && <SectionHeading className="max-w-3xl">{block.heading}</SectionHeading>}
                  {block.intro && <p className="mt-4 max-w-2xl text-muted">{block.intro}</p>}
                </Reveal>
                <Stagger as="ol" className="mt-9 grid gap-5 md:grid-cols-3">
                  {block.items.map((it, idx) => (
                    <StaggerItem key={it.title} as="li">
                      <div className="h-full rounded-2xl border-2 border-ink bg-card p-6">
                        <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-violet text-lg font-black text-white">{idx + 1}</span>
                        <h3 className="mt-4 text-xl font-black tracking-[-0.02em]">{it.title}</h3>
                        <p className="mt-2 text-sm text-muted">{it.body}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Section>
            );

          case "checklist":
            return (
              <Section key={key} tone={tone} bordered={bordered}>
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                  <Reveal>
                    <SectionHeading underline>{block.heading}</SectionHeading>
                    {block.intro && <p className="mt-4 text-muted">{block.intro}</p>}
                  </Reveal>
                  <Reveal delay={0.05}>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {block.items.map((it) => (
                        <li key={it} className="flex gap-3 rounded-xl border border-black/12 bg-card p-4 text-sm">
                          <span aria-hidden className="mt-0.5 text-violet">✓</span><span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </Section>
            );

          case "cards":
            return (
              <Section key={key} tone={tone} bordered={bordered}>
                <Reveal>
                  {block.heading && <SectionHeading className="max-w-3xl">{block.heading}</SectionHeading>}
                  {block.intro && <p className="mt-4 max-w-2xl text-muted">{block.intro}</p>}
                </Reveal>
                <Stagger className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {block.items.map((it) => {
                    const inner = (
                      <>
                        <h3 className="flex items-center justify-between text-lg font-black tracking-[-0.02em]">
                          {it.title}
                          {it.href && <span aria-hidden className="text-magenta">↗</span>}
                        </h3>
                        <p className="mt-2 text-sm text-muted">{it.body}</p>
                      </>
                    );
                    return (
                      <StaggerItem key={it.title} as="article">
                        {it.href ? (
                          <Link href={it.href} className="block h-full rounded-2xl border border-black/12 bg-card p-6 transition hover:border-ink">{inner}</Link>
                        ) : (
                          <div className="h-full rounded-2xl border border-black/12 bg-card p-6">{inner}</div>
                        )}
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </Section>
            );

          case "callout":
            return (
              <Section key={key} tone={tone} bordered={bordered} space="tight">
                <Reveal><div className="max-w-3xl"><Callout kind={block.kind}>{block.body}</Callout></div></Reveal>
              </Section>
            );

          case "pills":
            return (
              <Section key={key} tone={tone} bordered={bordered} space="tight">
                <Reveal>
                  {block.heading && <Eyebrow>{block.heading}</Eyebrow>}
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {block.items.map((it) => <Pill key={it}>{it}</Pill>)}
                  </div>
                </Reveal>
              </Section>
            );

          case "compare":
            return (
              <Section key={key} id={block.anchor} tone={tone} bordered={bordered}>
                <Reveal>
                  {block.heading && <SectionHeading className="mb-6 max-w-3xl">{block.heading}</SectionHeading>}
                  <ComparisonTable caption={block.caption} altName={block.altName} rows={block.rows} />
                </Reveal>
              </Section>
            );

          case "vimeo":
            return (
              <Section key={key} id={block.anchor} tone={tone} bordered={bordered}>
                <div className="grid items-center gap-9 lg:grid-cols-[0.85fr_1.15fr]">
                  <Reveal>
                    <Eyebrow tone="magenta">Watch an example</Eyebrow>
                    <SectionHeading underline className="mt-3">{block.heading}</SectionHeading>
                    {block.intro && <p className="mt-5 max-w-xl text-muted">{block.intro}</p>}
                    {block.ctaHref && block.ctaLabel && (
                      <Link href={block.ctaHref} className="mt-6 inline-flex font-bold text-violet hover:underline">
                        {block.ctaLabel} <span aria-hidden className="ml-1">→</span>
                      </Link>
                    )}
                  </Reveal>
                  <Reveal delay={0.08} y={22}>
                    <VimeoVideo video={block.video} />
                  </Reveal>
                </div>
              </Section>
            );

          case "officialImage":
            return (
              <Section key={key} id={block.anchor} tone={tone} bordered={bordered}>
                <div className="grid items-center gap-10 lg:grid-cols-2">
                  <Reveal className={block.reverse ? "lg:order-2" : ""}>
                    <SectionHeading underline>{block.heading}</SectionHeading>
                    <Paragraphs body={block.body} className="mt-5" />
                  </Reveal>
                  <Reveal delay={0.08} y={22} className={block.reverse ? "lg:order-1" : ""}>
                    <OfficialProductImage image={block.image} alt={block.alt} />
                  </Reveal>
                </div>
              </Section>
            );

          case "faq":
            return (
              <Section key={key} tone={tone} bordered={bordered}>
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                  <Reveal>
                    <Eyebrow>FAQ</Eyebrow>
                    <SectionHeading className="mt-3">{block.heading ?? "Common questions."}</SectionHeading>
                  </Reveal>
                  <Reveal delay={0.05}><FaqList items={block.items} /></Reveal>
                </div>
              </Section>
            );

          case "gallery":
            return (
              <Section key={key} id={block.anchor} tone={tone} bordered={bordered}>
                <Reveal>
                  {block.heading && <SectionHeading className="max-w-3xl">{block.heading}</SectionHeading>}
                  {block.intro && <p className="mt-4 max-w-2xl text-muted">{block.intro}</p>}
                </Reveal>
                <Stagger className="mt-9 grid gap-5 md:grid-cols-2">
                  {block.items.map((it) => {
                    const m = MEDIA[it.media];
                    return (
                      <StaggerItem key={it.title}>
                        <figure className="overflow-hidden rounded-2xl border-2 border-ink bg-card">
                          <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="(min-width:768px) 45vw, 100vw" className="h-auto w-full" />
                          <figcaption className="border-t-2 border-ink p-5">
                            <h3 className="font-black">{it.title}</h3>
                            <p className="mt-1 text-sm text-muted">{it.body}</p>
                          </figcaption>
                        </figure>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </Section>
            );

          case "decision":
            return (
              <Section key={key} id={block.anchor} tone="lavender" bordered>
                <Reveal>
                  <Eyebrow tone="violet">Quick decision</Eyebrow>
                  <SectionHeading underline className="mt-3 max-w-3xl">{block.heading ?? "Which one should you choose?"}</SectionHeading>
                  <p className="answer-summary mt-5 max-w-3xl text-[length:var(--step-1)] leading-8 text-muted">{block.verdict}</p>
                </Reveal>
                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                  <Reveal>
                    <div className="flex h-full flex-col rounded-2xl border-2 border-ink bg-card p-6">
                      <h3 className="text-lg font-black tracking-[-0.02em]">Choose InstaDoodle if</h3>
                      <ul className="mt-4 space-y-3">
                        {block.instadoodle.map((point) => (
                          <li key={point} className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-violet">✓</span><span>{point}</span></li>
                        ))}
                      </ul>
                      <p className="mt-auto border-t border-black/10 pt-4 text-sm">
                        <span className="font-extrabold text-violet">Best for:</span> <span className="text-muted">{block.instadoodleBestFor}</span>
                      </p>
                    </div>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <div className="flex h-full flex-col rounded-2xl border-2 border-ink bg-card p-6">
                      <h3 className="text-lg font-black tracking-[-0.02em]">Choose {block.altName} if</h3>
                      <ul className="mt-4 space-y-3">
                        {block.alternative.map((point) => (
                          <li key={point} className="flex gap-3 text-sm"><span aria-hidden className="mt-1 text-magenta">•</span><span>{point}</span></li>
                        ))}
                      </ul>
                      <p className="mt-auto border-t border-black/10 pt-4 text-sm">
                        <span className="font-extrabold text-magenta">Best for:</span> <span className="text-muted">{block.alternativeBestFor}</span>
                      </p>
                    </div>
                  </Reveal>
                </div>
                {block.bottomLine && (
                  <Reveal delay={0.12}>
                    <div className="mt-6 max-w-3xl"><Callout kind="editorial">{block.bottomLine}</Callout></div>
                  </Reveal>
                )}
              </Section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

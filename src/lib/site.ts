import type { Metadata } from "next";
import type { Block } from "./content";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
export const IS_SITE_URL_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export type PageKind = "hub" | "commercial" | "comparison" | "legal" | "company";

export interface HeroCta {
  href: string;
  label: string;
}

export interface PageCta {
  eyebrow?: string;
  title: string;
  body?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export interface SitePage {
  slug: string[];
  kind: PageKind;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  primaryKeyword: string;
  related: string[];
  noindex?: boolean;
  heroCtas?: HeroCta[];
  blocks: Block[];
  cta: PageCta;
}

const VERIFY_NOTE =
  "Feature availability and limits differ by plan, and product details change over time. Confirm current specifics on the official offer page before you buy.";

const pages: SitePage[] = [
  /* ─────────────────────────── FEATURES (hub) ─────────────────────────── */
  {
    slug: ["features"],
    kind: "hub",
    title: "InstaDoodle Features",
    description: "A detailed guide to InstaDoodle's AI doodle generation, scene editor, image-to-sketch, voiceover, animation and export features.",
    h1: "Every feature that turns an idea into a doodle video",
    eyebrow: "Features",
    primaryKeyword: "whiteboard animation features",
    intro:
      "InstaDoodle combines AI doodle generation, a searchable asset library, scene-based editing, voiceover and cloud rendering in one browser workspace. Here is what each part does and who benefits from it.",
    heroCtas: [
      { href: "#feature-grid", label: "Jump to the feature list" },
      { href: "/samples", label: "View InstaDoodle examples" },
    ],
    blocks: [
      {
        type: "split",
        heading: "A scene-based editor, not a blank timeline",
        media: "sceneEditor",
        body: [
          "InstaDoodle is organized around scenes. You build a video one scene at a time — placing characters, elements and a background, then setting the reveal order — instead of animating on an empty canvas.",
          "Because each scene is self-contained, revising a video usually means editing a single scene rather than re-shooting or re-rendering everything. That makes updates practical when a message or process changes.",
        ],
        bullets: ["Drag-and-drop placement of characters, props and backgrounds", "Per-scene timing and reveal order", "Edit one scene without rebuilding the whole video"],
      },
      {
        type: "featureGrid",
        heading: "Generation, assets and editing",
        intro: "The features below are described on the official InstaDoodle site. Treat any plan-specific limits as things to confirm before buying.",
        items: [
          { title: "DoodleAI™ text-to-doodle", body: "Type a prompt in your language and the AI engine draws a character, element or background to start a scene from.", media: "artStyles" },
          { title: "1,000+ doodle library", body: "A searchable library of characters, speech bubbles, arrows, emojis and elements ready to drop into a scene.", media: "library" },
          { title: "AI image-to-sketch", body: "Upload a photo or logo and InstaDoodle redraws it as a hand-drawn doodle in the same visual style.", media: "imageToSketch" },
          { title: "Built-in image editor", body: "Crop, recolor, freehand-draw, fill, erase and remove backgrounds with one click — without leaving the app." , media: "adjustments" },
          { title: "Drawing-hand styles", body: "Choose from multiple drawing-hand looks so the on-screen hand matches the tone of your video.", media: "hands" },
          { title: "Starter templates", body: "14+ hand-built project templates give you a structured starting point instead of an empty project.", media: "templates" },
        ],
      },
      {
        type: "split",
        heading: "Voiceover, music and narration",
        media: "voiceover",
        reverse: true,
        body: [
          "You can generate a voiceover from text, upload your own narration, or add royalty-free background music. The official site lists 20+ voices and languages, which is useful for multilingual or accessibility-minded content.",
          "Narration is what carries a whiteboard video, so plan the script first and let the visuals support the spoken line rather than repeat it.",
        ],
        bullets: ["Generate voiceovers or upload your own", "Royalty-free background music", "20+ voices and languages (verify current list)"],
      },
      {
        type: "featureGrid",
        heading: "Motion, format and delivery",
        items: [
          { title: "Animation types", body: "Reveal scenes with draw, wipe, slide, fade or pop-in to control how each element appears.", media: "animationTypes" },
          { title: "Slide transitions", body: "Move between scenes with fade, wipe, iris or push transitions for a continuous story.", media: "transitions" },
          { title: "Multiple aspect ratios", body: "Export 16:9, 9:16, 4:5 or square from one project so a video fits the channel it plays on.", media: "aspectRatios" },
          { title: "AI art styles", body: "Switch between caricature, cartoon, realistic and charcoal looks — or mix styles in one video.", media: "artStyles" },
          { title: "Custom backgrounds", body: "Set blackboards, greenboards, math papers and other backdrops to match the subject.", media: "adjustments" },
          { title: "Cloud-based, any device", body: "Runs in a modern browser on Mac or Windows with no install, and projects follow you across devices.", media: "cloud" },
        ],
      },
      {
        type: "callout",
        kind: "verify",
        body: "Counts such as the number of voices, templates, drawing hands and library items are quoted from the official site and may change. " + VERIFY_NOTE,
      },
      {
        type: "cards",
        heading: "Who benefits most from each feature",
        items: [
          { title: "Educators", body: "Templates and voiceover speed up repeatable lesson formats; drawing-hand reveals keep attention on one idea." },
          { title: "Marketers", body: "Image-to-sketch brings a real product or logo into a doodle explainer that opens on the audience problem." },
          { title: "Trainers", body: "Scene-based editing means updating one step of a process video instead of re-recording the whole thing." },
          { title: "Creators", body: "AI styles and aspect ratios make it practical to reformat one idea for YouTube, Shorts and square social posts." },
        ],
      },
      {
        type: "faq",
        heading: "Feature questions.",
        items: [
          ["Does InstaDoodle need to be installed?", "No. The official site states it is cloud-based and runs in a modern browser on Mac, Windows or other devices."],
          ["Can I import my own images?", "Yes. You can upload images and, with image-to-sketch, have them redrawn as doodles; the built-in editor can also remove backgrounds."],
          ["Which aspect ratios are supported?", "The official site lists 16:9, 9:16, 4:5 and square, exported from a single project."],
        ],
      },
    ],
    related: ["/ai-whiteboard-animation", "/doodle-video-creator", "/samples"],
    cta: {
      eyebrow: "See it in context",
      title: "See how the features fit a real workflow.",
      body: "Follow the three-step build, then look at example categories to plan your own video.",
      primaryHref: "/whiteboard-animation-software",
      primaryLabel: "See the product workflow",
      secondaryHref: "/samples",
      secondaryLabel: "View examples",
    },
  },

  /* ─────────────────────────── USE CASES (hub) ─────────────────────────── */
  {
    slug: ["use-cases"],
    kind: "hub",
    title: "InstaDoodle Use Cases",
    description: "Practical whiteboard animation use cases for education, training, marketing, onboarding, support and social content — with realistic examples.",
    h1: "Where a doodle video actually earns its place",
    eyebrow: "Use cases",
    primaryKeyword: "whiteboard animation use cases",
    intro:
      "Whiteboard animation works when an audience needs a concept broken into clear, memorable steps. These use cases each pair a communication problem with a realistic scene structure — and an honest note on where the format has limits.",
    heroCtas: [
      { href: "#uc-education", label: "Explore education use cases" },
      { href: "/samples", label: "View examples" },
    ],
    blocks: [
      {
        type: "split",
        anchor: "uc-education",
        heading: "Education and online courses",
        media: "whyDoodle",
        body: [
          "The problem: a dense topic loses learners when it arrives all at once. A doodle workflow helps by drawing one concept into view at a time, so the pace matches how people actually absorb ideas.",
          "A realistic example: a math tutorial that states the question, draws the relationship, then recaps in a final scene. Scene structure works best as question → explanation → visual model → short recap.",
          "The limitation: animation does not replace a clear explanation. If the underlying script is muddled, a drawn version is just muddled with motion.",
        ],
        bullets: ["Best for: lessons, course modules, math tutorials", "Scene shape: question → explanation → recap", "Watch out for: cramming multiple concepts into one scene"],
      },
      {
        type: "cards",
        heading: "Training, onboarding and internal process",
        intro: "Instruction is easier to revisit when it follows the same order a learner will. Scene-based editing makes it practical to keep these videos current.",
        items: [
          { title: "Employee training", body: "Map a procedure into the order people follow it; each scene introduces a step and sets up the next." },
          { title: "New-hire onboarding", body: "Give everyone the same baseline explanation to complement live sessions and documentation." },
          { title: "Process documentation", body: "Turn a written SOP into a short visual walkthrough; update the one scene that changed." },
          { title: "Customer support", body: "Answer a recurring 'how do I…' question once as a doodle clip you can link from help articles." },
        ],
      },
      {
        type: "split",
        heading: "Marketing, explainers and product",
        media: "whyWhiteboard",
        reverse: true,
        body: [
          "The problem: prospects skip past features they do not yet understand. An explainer opens on the audience problem, introduces the idea, and closes on a single clear next step.",
          "A realistic example: a product explainer that gives each key moment its own scene instead of crowding every feature into one frame. Image-to-sketch can bring the real product or logo into the doodle world.",
          "The limitation: a doodle style suits explanation better than photorealistic demos. If buyers need to see exact UI or materials, pair the doodle video with a screen recording or photography.",
        ],
        bullets: ["Best for: explainers, launches, promos, how-to", "Scene shape: problem → idea → single next step", "Watch out for: replacing a needed product demo"],
      },
      {
        type: "cards",
        heading: "Creator, social and affiliate content",
        items: [
          { title: "YouTube content", body: "A drawn narrative can carry a long-form explainer; export 16:9 and reuse scenes for a short." },
          { title: "Social media", body: "Reformat one idea to 9:16 or square so a single build serves multiple platforms." },
          { title: "Affiliate marketing", body: "Explain what a product does and who it is for, then disclose the affiliate relationship clearly and link to the official offer." },
          { title: "Podcasters & authors", body: "Turn a chapter or episode idea into a visual summary that travels well on social." },
        ],
      },
      {
        type: "pills",
        heading: "Common audiences",
        items: ["Marketers", "Teachers", "Students", "Authors", "Customer support", "Product teams", "Podcasters", "Agencies"],
      },
      {
        type: "callout",
        kind: "editorial",
        body: "These examples are editorial interpretations of how the product's documented features map to common jobs. They are not case studies of specific customers.",
      },
    ],
    related: ["/educational-video-maker", "/training-video-software", "/whiteboard-animation-examples"],
    cta: {
      title: "Match the workflow to your job.",
      body: "Explore the education and training guides, or compare tools before you commit.",
      primaryHref: "/educational-video-maker",
      primaryLabel: "Explore education use cases",
      secondaryHref: "/alternatives",
      secondaryLabel: "Compare whiteboard tools",
    },
  },

  /* ─────────────────────────── ALTERNATIVES (comparison hub) ─────────────────────────── */
  {
    slug: ["alternatives"],
    kind: "hub",
    title: "InstaDoodle Alternatives & Comparisons",
    description: "How to compare whiteboard animation tools by workflow fit, plus balanced InstaDoodle vs Doodly, VideoScribe and Animaker guides.",
    h1: "Compare whiteboard tools by the job, not the feature count",
    eyebrow: "Comparison guide",
    primaryKeyword: "whiteboard animation software alternatives",
    intro:
      "The best video tool depends on where you work, the videos you make and how often you revise them. This guide explains the criteria that actually matter, then links to balanced, source-conscious comparisons.",
    heroCtas: [
      { href: "#dimensions", label: "See the comparison criteria" },
      { href: "/alternatives/doodly", label: "Review the comparison guide" },
    ],
    blocks: [
      {
        type: "prose",
        heading: "Our comparison method",
        body: [
          "Feature-count tables reward whoever lists the most checkboxes, not whoever fits your work. We compare on workflow: where the editor runs, how you start a scene, what assets you need, how AI assists creation, and how painful revisions are.",
          "Competitor features, plans and prices change frequently. We deliberately avoid quoting competitor pricing and instead tell you what to verify directly with each provider before you decide.",
        ],
      },
      {
        type: "compare",
        anchor: "dimensions",
        heading: "The dimensions that decide it",
        caption: "Comparison dimensions to evaluate when choosing a whiteboard animation tool.",
        altName: "What to check",
        rows: [
          { dimension: "Where it runs", instadoodle: "Cloud-based; runs in a modern browser on Mac or Windows, no install (per official site).", alternative: "Confirm whether the tool is browser-based, desktop-only, or both." },
          { dimension: "AI-assisted creation", instadoodle: "DoodleAI™ text-to-doodle and AI image-to-sketch generate scene starting points.", alternative: "Check whether AI generation is offered, and how much it actually speeds you up." },
          { dimension: "Asset & scene workflow", instadoodle: "Searchable 1,000+ doodle library with scene-based editing.", alternative: "Compare library size, search, and whether editing is scene- or timeline-based." },
          { dimension: "Revisions", instadoodle: "Edit a single scene without rebuilding the video.", alternative: "See how hard it is to change one step later." },
          { dimension: "Output formats", instadoodle: "16:9, 9:16, 4:5 and square from one project.", alternative: "Verify supported resolutions and aspect ratios." },
          { dimension: "Commercial use", instadoodle: "Commercial licensing is plan-dependent — verify on the offer page.", alternative: "Confirm commercial rights on the plan you would buy." },
        ],
      },
      {
        type: "cards",
        heading: "Read a specific comparison",
        items: [
          { title: "InstaDoodle vs Doodly", body: "Browser-based, AI-assisted creation versus a traditionally desktop doodle tool.", href: "/alternatives/doodly" },
          { title: "InstaDoodle vs VideoScribe", body: "Doodle-focused AI workflow versus an established whiteboard animation product.", href: "/alternatives/videoscribe" },
          { title: "InstaDoodle vs Animaker", body: "A focused doodle workflow versus a broad, multi-format animation suite.", href: "/alternatives/animaker" },
        ],
      },
      {
        type: "callout",
        kind: "verify",
        body: "We do not publish competitor pricing or unverified competitor features. " + VERIFY_NOTE,
      },
    ],
    related: ["/alternatives/doodly", "/alternatives/videoscribe", "/alternatives/animaker"],
    cta: {
      title: "Start with the comparison closest to your shortlist.",
      primaryHref: "/alternatives/doodly",
      primaryLabel: "Review the comparison guide",
      secondaryHref: "/features",
      secondaryLabel: "Explore the AI features",
    },
  },

  /* ─────────────────────────── RESOURCES (hub) ─────────────────────────── */
  {
    slug: ["resources"],
    kind: "hub",
    title: "Whiteboard Animation Resources & Planning Guides",
    description: "Practical planning resources for doodle videos: scripting, storyboarding, pacing, voiceover, music, timing, export and accessibility checklists.",
    h1: "Plan the video before you open the editor",
    eyebrow: "Resources",
    primaryKeyword: "whiteboard animation resources",
    intro:
      "A useful video is decided before any doodle is drawn. These planning resources cover the decisions — script, scenes, pacing, sound and delivery — that make the editor time productive.",
    heroCtas: [
      { href: "#checklists", label: "Jump to the checklists" },
      { href: "/samples", label: "View examples first" },
    ],
    blocks: [
      {
        type: "steps",
        heading: "Plan in the right order",
        intro: "Each stage narrows the next. Skipping the script is the most common reason a doodle video ends up busy but unclear.",
        items: [
          { title: "Script & message", body: "Write the single takeaway first, then the spoken lines. If a sentence does not move the viewer toward that takeaway, cut it." },
          { title: "Scene & storyboard", body: "Split the script into scenes with one idea each. Sketch the visual action that makes that idea land before choosing assets." },
          { title: "Pacing & timing", body: "Decide how long each idea needs on screen. Match reveal animation to narration so drawing and speaking finish together." },
        ],
      },
      {
        type: "cards",
        heading: "Preparation guides",
        items: [
          { title: "Script planning", body: "Define the audience, one takeaway and a call to action. Read the script aloud to catch pacing problems early." },
          { title: "Scene planning", body: "Give every scene a job. If two scenes make the same point, merge them." },
          { title: "Storyboarding", body: "Rough thumbnails beat a blank editor. Note the visual action, not just the words, for each scene." },
          { title: "Voiceover prep", body: "Choose a voice and language, mark emphasis in the script, and keep sentences short for narration." },
          { title: "Background music", body: "Pick royalty-free music that supports the tone; keep it low under narration so words stay clear." },
          { title: "Export planning", body: "Decide the aspect ratio per channel up front (16:9, 9:16, 4:5, square) so scenes are framed correctly." },
        ],
      },
      {
        type: "checklist",
        heading: "Reusable pre-build checklist",
        intro: "Run through this before you start building scenes.",
        items: [
          "One-sentence takeaway written down",
          "Audience and their question named",
          "Script read aloud and timed",
          "Scenes split, one idea each",
          "Visual action noted per scene",
          "Voice, language and music decided",
          "Aspect ratio chosen per channel",
          "Captions planned for accessibility",
        ],
      },
      {
        type: "checklist",
        heading: "Accessibility & captions",
        intro: "Make the video usable for more people and more contexts (sound-off feeds included).",
        items: [
          "Add captions or a transcript for narration",
          "Keep on-screen text large and high-contrast",
          "Do not rely on color alone to carry meaning",
          "Give each scene enough time to read",
          "Provide a text summary alongside the video",
          "Check that music never buries the voiceover",
        ],
      },
      {
        type: "callout",
        kind: "editorial",
        body: "These are original planning guides written for this independent guide. Future articles should be dated and attributed to a named author before this hub is opened to search engines.",
      },
    ],
    related: ["/whiteboard-animation-software", "/whiteboard-animation-examples", "/use-cases"],
    cta: {
      title: "Turn the plan into scenes.",
      body: "Once the script and storyboard are ready, see how the editor builds each scene.",
      primaryHref: "/whiteboard-video-maker",
      primaryLabel: "See how the editor works",
      secondaryHref: "/features",
      secondaryLabel: "Explore the features",
    },
  },

  /* ─────────────────────────── whiteboard-animation-software ─────────────────────────── */
  {
    slug: ["whiteboard-animation-software"],
    kind: "commercial",
    title: "Whiteboard Animation Software",
    description: "A practical guide to InstaDoodle as browser-based whiteboard animation software — the AI-assisted workflow, features, formats and limitations.",
    h1: "Whiteboard animation software for ideas that need to be understood",
    eyebrow: "Whiteboard animation",
    primaryKeyword: "whiteboard animation software",
    intro:
      "Whiteboard animation gives an idea a natural pace: introduce a point, draw it into view, move on. InstaDoodle is browser-based software that builds that effect scene by scene, with AI to help you start faster.",
    heroCtas: [
      { href: "#how-it-works", label: "See the product workflow" },
      { href: "/alternatives", label: "Compare whiteboard tools" },
    ],
    blocks: [
      {
        type: "split",
        anchor: "how-it-works",
        heading: "What the software actually does",
        media: "sceneEditor",
        body: [
          "InstaDoodle brings AI doodle generation, a 1,000+ element library, scene editing, voiceover and cloud rendering into one browser workspace. You assemble a story as a sequence of scenes rather than animating on a blank canvas.",
          "Because it is cloud-based, there is no install; the official site states it runs in a modern browser on Mac, Windows or other devices, and projects follow you between them.",
        ],
        bullets: ["Browser-based — no download (per official site)", "Scene-based editing with a searchable doodle library", "AI generation to start scenes from a prompt or image"],
      },
      {
        type: "steps",
        heading: "How a video comes together",
        intro: "The official site frames creation as three steps. The sequence matters more than any one feature.",
        items: [
          { title: "Type your idea", body: "Describe the scene or topic; DoodleAI generates characters, elements or backgrounds to begin from." },
          { title: "Compose the scenes", body: "Arrange assets into full scene layouts and set the order so one idea leads into the next." },
          { title: "Animate & export", body: "Add reveals, transitions, voiceover and music, then export in the aspect ratio your channel needs." },
        ],
      },
      {
        type: "featureGrid",
        heading: "The parts you will use most",
        items: [
          { title: "Doodle library", body: "Searchable characters, arrows, speech bubbles and elements to drop into scenes.", media: "library" },
          { title: "Drawing-hand reveals", body: "Multiple hand styles draw elements on screen to hold attention.", media: "hands" },
          { title: "Voiceover & music", body: "Generate or upload narration and add royalty-free background music.", media: "voiceover" },
          { title: "Every aspect ratio", body: "16:9, 9:16, 4:5 and square export from a single project.", media: "aspectRatios" },
        ],
      },
      {
        type: "split",
        heading: "Made for practical video jobs",
        media: "whyWhiteboard",
        reverse: true,
        body: [
          "Reach for whiteboard animation when you need to explain a product, teach a lesson, welcome a customer or turn a written idea into something shareable. The drawn style keeps a single idea in focus at a time.",
          "It is less suited to photorealistic demonstrations. When buyers must see exact interface or materials, pair a doodle explainer with a screen recording or product photography.",
        ],
      },
      {
        type: "callout",
        kind: "verify",
        body: VERIFY_NOTE,
      },
      {
        type: "faq",
        items: [
          ["Is whiteboard animation software hard to learn?", "InstaDoodle is built around scenes and templates to lower the starting effort, but a clear script still does most of the work."],
          ["Can I use it for commercial projects?", "Commercial licensing depends on the plan. Confirm the rights on the plan you intend to buy on the official offer page."],
          ["Do I need design skills?", "The library, templates and AI generation reduce the need for illustration skills, though editorial judgment still matters."],
        ],
      },
    ],
    related: ["/ai-whiteboard-animation", "/doodle-video-creator", "/whiteboard-animation-examples"],
    cta: {
      title: "See the AI features behind the workflow.",
      primaryHref: "/ai-whiteboard-animation",
      primaryLabel: "Explore the AI features",
      secondaryHref: "/samples",
      secondaryLabel: "View examples",
    },
  },

  /* ─────────────────────────── ai-whiteboard-animation ─────────────────────────── */
  {
    slug: ["ai-whiteboard-animation"],
    kind: "commercial",
    title: "AI Whiteboard Animation",
    description: "How InstaDoodle's DoodleAI engine and AI image-to-sketch turn prompts, scripts and images into doodle scenes — with the creative control you keep.",
    h1: "AI whiteboard animation that starts with your idea",
    eyebrow: "AI workflow",
    primaryKeyword: "AI whiteboard animation",
    intro:
      "AI can shorten the distance between a rough idea and a usable scene. InstaDoodle's DoodleAI™ engine and image-to-sketch tools generate doodle building blocks from text and images — while you keep control of the message.",
    heroCtas: [
      { href: "#image-to-sketch", label: "See the image-to-sketch workflow" },
      { href: "/features", label: "Explore the AI features" },
    ],
    blocks: [
      {
        type: "split",
        heading: "Start from text or an image",
        media: "artStyles",
        body: [
          "Type a prompt and DoodleAI draws a character, element or background to start a scene. Because you can describe the subject in your own language, the first visual direction arrives in seconds rather than after a library search.",
          "The strongest prompts name the subject, the audience and the action. From there you decide what belongs in each scene and how the story unfolds.",
        ],
        bullets: ["Text-to-doodle characters, elements and backgrounds", "Multiple AI styles: caricature, cartoon, realistic, charcoal", "Prompt in your language"],
      },
      {
        type: "split",
        anchor: "image-to-sketch",
        heading: "Turn a photo or logo into a sketch",
        media: "imageToSketch",
        reverse: true,
        body: [
          "AI image-to-sketch redraws an uploaded photo or logo as a hand-drawn doodle, so a recognizable product or brand mark joins the same visual world as the rest of your scenes.",
          "The built-in image editor supports crop, recolor and one-click background removal, which helps a sketched asset sit cleanly on any background.",
        ],
        bullets: ["Redraw photos or logos as doodles", "One-click background removal", "Keep brand assets on-style"],
      },
      {
        type: "prose",
        heading: "You keep creative control",
        body: [
          "AI helps with the first pass, but the person making the video still owns selection, scene order, pacing and the final message. Treat generated output as raw material: keep what serves the takeaway, regenerate or cut the rest.",
          "That review step is also where accuracy lives. AI images can be approximate, so check that anything representing a real product, process or fact is correct before you publish.",
        ],
      },
      {
        type: "callout",
        kind: "editorial",
        body: "AI generation speeds up starting points; it does not guarantee accuracy or on-brand results without review. Plan a human editing pass.",
      },
      {
        type: "faq",
        items: [
          ["Can the AI generate any image?", "The official site says you can type any prompt and the engine will generate a doodle for it, and that the engine is continually improved."],
          ["Does AI replace editing?", "No. AI creates starting scenes; you still arrange, time and narrate the video."],
          ["Is there an AI credit limit?", "AI usage can be plan-dependent. Verify current credit or usage limits on the official offer page."],
        ],
      },
    ],
    related: ["/whiteboard-animation-software", "/doodle-video-creator", "/resources"],
    cta: {
      title: "Put the AI features to work on a real video.",
      primaryHref: "/doodle-video-creator",
      primaryLabel: "See the doodle workflow",
      secondaryHref: "/features",
      secondaryLabel: "Explore all features",
    },
  },

  /* ─────────────────────────── doodle-video-creator ─────────────────────────── */
  {
    slug: ["doodle-video-creator"],
    kind: "commercial",
    title: "Doodle Video Creator",
    description: "Make doodle videos for explainers, education, marketing and social with InstaDoodle's scene library, drawing-hand animation and transitions.",
    h1: "A doodle video creator for turning a message into motion",
    eyebrow: "Doodle video creator",
    primaryKeyword: "doodle video creator",
    intro:
      "A doodle video gives a message one continuous visual thread. InstaDoodle is built for creators who want that thread without advanced drawing or animation skills.",
    heroCtas: [
      { href: "#build", label: "See how the editor works" },
      { href: "/samples", label: "View InstaDoodle examples" },
    ],
    blocks: [
      {
        type: "split",
        anchor: "build",
        heading: "Build scenes around the message",
        media: "library",
        body: [
          "Use a simple arc: introduce a problem, reveal the idea, close with the action you want. The doodle style gives every scene a consistent visual language, and the searchable library keeps the right character or arrow one search away.",
          "Bring in your own images where they help recognition — image-to-sketch keeps them on-style — so the goal stays explanation, not decoration.",
        ],
        bullets: ["1,000+ searchable doodle elements", "Consistent hand-drawn look across scenes", "Import and redraw your own images"],
      },
      {
        type: "featureGrid",
        heading: "Shape the finish",
        items: [
          { title: "Drawing-hand animation", body: "Pick a hand style to draw elements on screen and keep attention moving.", media: "hands" },
          { title: "Reveal & transitions", body: "Draw, wipe, slide, fade or pop-in within scenes; fade, wipe, iris or push between them.", media: "transitions" },
          { title: "Voice & music", body: "Narrate with generated or uploaded voice, and layer royalty-free music.", media: "voiceover" },
        ],
      },
      {
        type: "prose",
        heading: "Edit until it feels as clear as the message",
        body: [
          "The last 20% is editing: trimming a scene that runs long, syncing a reveal to a narration beat, or cutting a visual that repeats the words instead of adding to them. Scene-based editing makes those adjustments quick.",
          "A doodle video succeeds when a viewer could describe the takeaway afterward. If a scene does not move them toward that, it is a candidate to cut.",
        ],
      },
      {
        type: "callout",
        kind: "verify",
        body: VERIFY_NOTE,
      },
    ],
    related: ["/whiteboard-animation-software", "/whiteboard-video-maker", "/samples"],
    cta: {
      title: "Plan the story, then build the scenes.",
      primaryHref: "/resources",
      primaryLabel: "Get the planning resources",
      secondaryHref: "/whiteboard-animation-examples",
      secondaryLabel: "See example structures",
    },
  },

  /* ─────────────────────────── whiteboard-video-maker ─────────────────────────── */
  {
    slug: ["whiteboard-video-maker"],
    kind: "commercial",
    title: "Whiteboard Video Maker",
    description: "Create whiteboard videos from a script in a browser-based workflow — scene editing, doodle visuals, narration and multi-format export with InstaDoodle.",
    h1: "Make a whiteboard video without making the process complicated",
    eyebrow: "Whiteboard video maker",
    primaryKeyword: "whiteboard video maker",
    intro:
      "A whiteboard video maker should make it easier to move from message to finished sequence. InstaDoodle organizes that work around a script, scenes and a clear editing flow.",
    heroCtas: [
      { href: "#script-first", label: "See the workflow" },
      { href: "/resources", label: "Get the planning checklist" },
    ],
    blocks: [
      {
        type: "steps",
        anchor: "script-first",
        heading: "Write, match, publish",
        items: [
          { title: "Write the story first", body: "Start with a short script that says what the viewer should understand, then divide it into scenes before touching visuals." },
          { title: "Match visuals to each scene", body: "Use doodle imagery to clarify the point being made — the visual should add context, not repeat the words." },
          { title: "Publish for the right screen", body: "Frame for the channel: readable scenes that work across explainers, presentations and social formats." },
        ],
      },
      {
        type: "split",
        heading: "One project, every format",
        media: "aspectRatios",
        body: [
          "Deciding the aspect ratio up front keeps scenes framed correctly. InstaDoodle exports 16:9, 9:16, 4:5 and square from a single project, so one build can serve a landscape explainer and a vertical short.",
          "Plan framing per channel before building: text and characters that read well in 16:9 can crowd a 9:16 frame if they were not planned for it.",
        ],
        bullets: ["16:9, 9:16, 4:5 and square export", "Plan framing per channel", "Reuse scenes across formats"],
      },
      {
        type: "split",
        heading: "Cloud-based, cross-device",
        media: "cloud",
        reverse: true,
        body: [
          "Because the editor runs in the browser, you can start on one device and continue on another without installing software. The official site describes cloud rendering, so exports do not tie up your machine.",
          "That also makes light collaboration easier: a script can be reviewed anywhere before scenes are built.",
        ],
      },
      {
        type: "callout",
        kind: "verify",
        body: VERIFY_NOTE,
      },
    ],
    related: ["/doodle-video-creator", "/whiteboard-animation-examples", "/use-cases"],
    cta: {
      title: "Get the script and scene templates.",
      primaryHref: "/resources",
      primaryLabel: "Open the planning resources",
      secondaryHref: "/features",
      secondaryLabel: "Explore the features",
    },
  },

  /* ─────────────────────────── educational-video-maker ─────────────────────────── */
  {
    slug: ["educational-video-maker"],
    kind: "commercial",
    title: "Educational Video Maker",
    description: "Create educational whiteboard videos that make complex concepts easier to learn — lesson structure, reuse and pacing with InstaDoodle.",
    h1: "Create educational videos that make complex topics easier to learn",
    eyebrow: "For education",
    primaryKeyword: "educational video maker",
    intro:
      "Educational videos work best when learners can watch an idea develop. InstaDoodle helps teachers, students, trainers and course creators turn a lesson plan into an illustrated sequence.",
    heroCtas: [
      { href: "#teach", label: "Explore education use cases" },
      { href: "/samples", label: "View lesson examples" },
    ],
    blocks: [
      {
        type: "split",
        anchor: "teach",
        heading: "Teach in smaller visual steps",
        media: "whyDoodle",
        body: [
          "Break a lesson into a few scenes with one purpose each. A drawn visual can make a definition, process or relationship easier to recall than text alone, and the drawing-hand reveal paces attention.",
          "Start from the learning objective, write the spoken explanation, then add only the visuals that help a learner reach it.",
        ],
        bullets: ["One concept per scene", "Reveal paced to narration", "Visuals chosen for recall, not decoration"],
      },
      {
        type: "cards",
        heading: "Where it fits in learning",
        items: [
          { title: "Classroom lessons", body: "Introduce or review a concept with a short, replayable clip." },
          { title: "Online courses", body: "Standardize module intros so every learner gets the same clear framing." },
          { title: "Math tutorials", body: "Draw each step of a problem so the method — not just the answer — is visible." },
          { title: "Flipped classroom", body: "Assign a short video before class so live time is spent on practice." },
          { title: "Revision aids", body: "Let learners revisit a concept at their own pace." },
          { title: "Multilingual lessons", body: "Voiceover in 20+ languages (verify) widens who a lesson reaches." },
        ],
      },
      {
        type: "prose",
        heading: "Create once, teach more often",
        body: [
          "A reusable video supports a live lesson, a course module, an assignment or a learner who needs to revisit a concept. Because editing is scene-based, updating a single step is practical when curriculum changes.",
          "Keep lessons focused: a video that tries to teach everything usually teaches nothing memorably. One objective per video is a reliable rule.",
        ],
      },
      {
        type: "callout",
        kind: "verify",
        body: VERIFY_NOTE,
      },
    ],
    related: ["/use-cases", "/training-video-software", "/whiteboard-animation-examples"],
    cta: {
      title: "Plan a lesson, then build it scene by scene.",
      primaryHref: "/resources",
      primaryLabel: "Get lesson-planning resources",
      secondaryHref: "/training-video-software",
      secondaryLabel: "See training use cases",
    },
  },

  /* ─────────────────────────── training-video-software ─────────────────────────── */
  {
    slug: ["training-video-software"],
    kind: "commercial",
    title: "Training Video Software",
    description: "Create clear training and onboarding videos with a whiteboard animation workflow — process mapping, consistent onboarding and easy updates.",
    h1: "Training video software for messages people can follow",
    eyebrow: "For training",
    primaryKeyword: "training video software",
    intro:
      "Training is easier to revisit when instruction is presented as a simple visual sequence. InstaDoodle supports teams and trainers creating explainers, process overviews and onboarding videos.",
    heroCtas: [
      { href: "#process", label: "See the training workflow" },
      { href: "/use-cases", label: "Explore use cases" },
    ],
    blocks: [
      {
        type: "split",
        anchor: "process",
        heading: "Make a process visible",
        media: "sceneEditor",
        body: [
          "Map a procedure into the same order a learner will follow it. Each scene can introduce the step, show the context and set up the next action, which reduces the cognitive load of a wall-of-text SOP.",
          "Narration carries the detail while the doodle keeps the current step in focus — useful for safety, compliance and tool walkthroughs.",
        ],
        bullets: ["Steps in real-world order", "One action per scene", "Narration plus visual focus"],
      },
      {
        type: "prose",
        heading: "Support consistent onboarding",
        body: [
          "A shared training video gives every new hire the same baseline explanation, complementing documentation, live sessions and product tours. Consistency here reduces the questions that reach a manager in week one.",
          "Because it is browser-based, the same video is accessible across devices without installs — helpful for distributed or frontline teams.",
        ],
      },
      {
        type: "split",
        heading: "Update without reshooting",
        media: "transitions",
        reverse: true,
        body: [
          "When a process changes, scene-based editing lets you revise the affected scene instead of rebuilding the whole video. That keeps training current without a production crew.",
          "Version the script alongside the video so reviewers can see what changed between updates.",
        ],
      },
      {
        type: "callout",
        kind: "verify",
        body: VERIFY_NOTE,
      },
    ],
    related: ["/educational-video-maker", "/use-cases", "/whiteboard-animation-software"],
    cta: {
      title: "Turn an SOP into a clear training video.",
      primaryHref: "/resources",
      primaryLabel: "Get the planning resources",
      secondaryHref: "/use-cases",
      secondaryLabel: "See training use cases",
    },
  },

  /* ─────────────────────────── whiteboard-animation-examples ─────────────────────────── */
  {
    slug: ["whiteboard-animation-examples"],
    kind: "commercial",
    title: "Whiteboard Animation Examples",
    description: "Whiteboard animation example structures for marketing, education and product explainers — what makes each one work, with sample scenes.",
    h1: "Whiteboard animation examples for ideas worth explaining",
    eyebrow: "Examples",
    primaryKeyword: "whiteboard animation examples",
    intro:
      "The best example is one where every visual helps a viewer understand the next point. Use these structures — and real sample scenes — to plan the video you want to make.",
    heroCtas: [
      { href: "#gallery", label: "See sample scenes" },
      { href: "/samples", label: "View the full samples guide" },
    ],
    blocks: [
      {
        type: "gallery",
        anchor: "gallery",
        heading: "Sample scenes",
        intro: "Official product visuals showing the doodle style in context. These illustrate structure, not specific customer results.",
        items: [
          { media: "sampleBrand", title: "Brand story / explainer", body: "Opens on a problem, introduces the idea, ends on one clear action." },
          { media: "sampleKids", title: "Education / tutorial", body: "Paces one concept at a time — well suited to lessons and how-to guides." },
        ],
      },
      {
        type: "cards",
        heading: "Structures that tend to work",
        items: [
          { title: "Marketing explainer", body: "Audience problem → product or idea → why the next step is worth taking." },
          { title: "Lesson or tutorial", body: "Question → explanation → visual model → short recap." },
          { title: "Product walkthrough", body: "One scene per important moment, avoiding the urge to show every feature at once." },
          { title: "How-to / step-by-step", body: "Number the steps and give each its own scene so viewers can follow along." },
          { title: "Brand story", body: "Set up a relatable situation, then connect it to what you do." },
          { title: "Announcement / promo", body: "Lead with the change, then the benefit, then the call to action." },
        ],
      },
      {
        type: "prose",
        heading: "What to examine in any example",
        body: [
          "When you study an example, watch the pacing: does each scene earn its time, or does the video pause on ideas that are already clear? Notice whether the narration and the drawing finish together, and whether the final scene leaves you with a single takeaway.",
          "Then borrow the structure, not the content. The goal is to learn how a message becomes a sequence, then apply that shape to your own subject.",
        ],
      },
      {
        type: "callout",
        kind: "editorial",
        body: "Sample scenes are official product visuals used to show style and structure. They are not claims about specific outcomes.",
      },
    ],
    related: ["/samples", "/educational-video-maker", "/whiteboard-animation-software"],
    cta: {
      title: "Plan your own example next.",
      primaryHref: "/samples",
      primaryLabel: "Open the samples guide",
      secondaryHref: "/resources",
      secondaryLabel: "Get planning resources",
    },
  },

  /* ─────────────────────────── alternatives/doodly ─────────────────────────── */
  {
    slug: ["alternatives", "doodly"],
    kind: "comparison",
    title: "InstaDoodle vs Doodly",
    description: "A balanced InstaDoodle vs Doodly comparison focused on workflow: browser vs desktop, AI-assisted creation, assets, revisions and who each suits.",
    h1: "InstaDoodle vs Doodly",
    eyebrow: "Comparison",
    primaryKeyword: "Doodly alternative",
    intro:
      "Both tools make doodle-style videos. The decision usually comes down to where you want to work, how much you value AI-assisted creation, and the kind of videos you make most.",
    heroCtas: [
      { href: "#summary", label: "See the decision summary" },
      { href: "/features", label: "Explore the AI features" },
    ],
    blocks: [
      {
        type: "callout",
        kind: "verify",
        body: "Doodly's current features, distribution and pricing should be confirmed on its official site. We do not publish competitor pricing or unverified specifics.",
      },
      {
        type: "prose",
        heading: "The short version",
        body: [
          "Choose InstaDoodle if a browser-based workflow and AI-assisted doodle generation matter to you: it runs in the browser (per its official site), generates scenes from text prompts, and redraws images as sketches.",
          "Consider Doodly if you specifically prefer its long-standing doodle toolset and workflow. Doodly has historically been distributed as installable desktop software, so verify its current platform support and any web option before deciding.",
        ],
      },
      {
        type: "compare",
        anchor: "summary",
        heading: "Side by side",
        caption: "InstaDoodle compared with Doodly across workflow dimensions.",
        altName: "Doodly",
        rows: [
          { dimension: "Where it runs", instadoodle: "Cloud-based; browser on Mac/Windows, no install (per official site).", alternative: "Historically desktop software you install — verify current platform and any web version." },
          { dimension: "AI-assisted creation", instadoodle: "DoodleAI text-to-doodle and AI image-to-sketch generate scene starters.", alternative: "Verify what AI generation, if any, is offered today." },
          { dimension: "Assets", instadoodle: "1,000+ searchable doodle elements; import and redraw your own images.", alternative: "Established doodle/character libraries — verify current size and import options." },
          { dimension: "Editing model", instadoodle: "Scene-based; edit one scene without rebuilding.", alternative: "Timeline/scene editing — confirm the current approach." },
          { dimension: "Output", instadoodle: "16:9, 9:16, 4:5, square from one project.", alternative: "Verify supported resolutions and aspect ratios." },
          { dimension: "Commercial use", instadoodle: "Plan-dependent — verify on the offer page.", alternative: "Verify commercial licensing on the plan you would buy." },
        ],
      },
      {
        type: "cards",
        heading: "Best for…",
        items: [
          { title: "Choose InstaDoodle if", body: "You want browser-based access, AI-assisted scene creation, and image-to-sketch to bring real assets on-style." },
          { title: "Consider Doodly if", body: "You prefer its specific doodle toolset and are comfortable with its platform requirements after verifying them." },
          { title: "Either way", body: "Build the same short explainer in each and compare time-to-scene, narration and revising a step." },
        ],
      },
      {
        type: "prose",
        heading: "Limitations to weigh",
        body: [
          "InstaDoodle depends on a connection because it is cloud-based, and AI output needs a human editing pass to stay accurate and on-message.",
          "For Doodly, the main things to confirm are current platform support, library scope and whether the AI-assisted features you want exist today — treat older reviews as potentially out of date.",
        ],
      },
      {
        type: "faq",
        items: [
          ["Is InstaDoodle a direct Doodly alternative?", "It targets the same doodle-video job with a browser-based, AI-assisted approach. Whether it is the right alternative depends on your platform and AI preferences."],
          ["Can I try before buying?", "InstaDoodle's site describes a money-back guarantee rather than a free trial. Verify current trial and refund terms on the official offer page."],
        ],
      },
    ],
    related: ["/alternatives", "/doodle-video-creator", "/samples"],
    cta: {
      title: "See the InstaDoodle workflow for yourself.",
      primaryHref: "/features",
      primaryLabel: "Explore the AI features",
      secondaryHref: "/alternatives",
      secondaryLabel: "Back to the comparison guide",
    },
  },

  /* ─────────────────────────── alternatives/videoscribe ─────────────────────────── */
  {
    slug: ["alternatives", "videoscribe"],
    kind: "comparison",
    title: "InstaDoodle vs VideoScribe",
    description: "InstaDoodle vs VideoScribe compared by workflow — AI-assisted doodle creation, browser access, assets and the videos each is best suited to.",
    h1: "InstaDoodle vs VideoScribe",
    eyebrow: "Comparison",
    primaryKeyword: "VideoScribe alternative",
    intro:
      "InstaDoodle and VideoScribe are both relevant to whiteboard animation. Focus your evaluation on the workflow you need rather than a claim of universal superiority.",
    heroCtas: [
      { href: "#summary", label: "See the decision summary" },
      { href: "/whiteboard-animation-software", label: "See the product workflow" },
    ],
    blocks: [
      {
        type: "callout",
        kind: "verify",
        body: "VideoScribe's current platforms, library and pricing should be confirmed on its official site. We do not publish competitor pricing or unverified specifics.",
      },
      {
        type: "prose",
        heading: "The short version",
        body: [
          "InstaDoodle leans on AI: text-to-doodle generation and image-to-sketch aim to get you from an idea to a scene quickly, entirely in the browser.",
          "VideoScribe is an established whiteboard animation product with a large asset library and a long track record. Confirm its current browser/desktop options and whether it offers the AI-assisted creation you want.",
        ],
      },
      {
        type: "compare",
        anchor: "summary",
        heading: "Side by side",
        caption: "InstaDoodle compared with VideoScribe across workflow dimensions.",
        altName: "VideoScribe",
        rows: [
          { dimension: "Where it runs", instadoodle: "Cloud-based browser workflow (per official site).", alternative: "Has offered browser and desktop options — verify current availability." },
          { dimension: "AI-assisted creation", instadoodle: "Text-to-doodle and image-to-sketch generation.", alternative: "Verify current AI features." },
          { dimension: "Assets", instadoodle: "1,000+ doodle elements; import and redraw images.", alternative: "Large established image library — verify scope and licensing." },
          { dimension: "Style", instadoodle: "Doodle-focused, with caricature/cartoon/realistic/charcoal AI styles.", alternative: "Whiteboard-focused; verify current style range." },
          { dimension: "Output", instadoodle: "16:9, 9:16, 4:5, square from one project.", alternative: "Verify export formats and resolutions." },
          { dimension: "Commercial use", instadoodle: "Plan-dependent — verify on the offer page.", alternative: "Verify commercial licensing per plan." },
        ],
      },
      {
        type: "cards",
        heading: "Best for…",
        items: [
          { title: "Choose InstaDoodle if", body: "You want AI to generate scene starters and prefer a no-install, browser-based workflow." },
          { title: "Consider VideoScribe if", body: "You value its mature library and established workflow, after verifying current platform and AI support." },
          { title: "Either way", body: "Test the same lesson or explainer in both and compare setup time and revision effort." },
        ],
      },
      {
        type: "prose",
        heading: "Limitations to weigh",
        body: [
          "InstaDoodle needs connectivity and a review pass on AI output. Its doodle focus is a strength for explanation but not a fit for photorealistic demos.",
          "For VideoScribe, verify how current the toolset is against your needs, and whether AI-assisted creation is part of the plan you would choose.",
        ],
      },
      {
        type: "faq",
        items: [
          ["Which is easier to start with?", "InstaDoodle's templates and AI generation aim to reduce the blank-project problem; VideoScribe relies on its library and canvas. Trial both with one script."],
          ["Do they support voiceover?", "InstaDoodle supports generated or uploaded voiceover and music. Verify VideoScribe's current audio options."],
        ],
      },
    ],
    related: ["/alternatives", "/whiteboard-animation-software", "/educational-video-maker"],
    cta: {
      title: "Compare on your own project.",
      primaryHref: "/features",
      primaryLabel: "Explore the AI features",
      secondaryHref: "/alternatives",
      secondaryLabel: "Back to the comparison guide",
    },
  },

  /* ─────────────────────────── alternatives/animaker ─────────────────────────── */
  {
    slug: ["alternatives", "animaker"],
    kind: "comparison",
    title: "InstaDoodle vs Animaker",
    description: "InstaDoodle vs Animaker — a focused doodle workflow versus a broad multi-format animation suite, compared by the kind of video you make.",
    h1: "InstaDoodle vs Animaker",
    eyebrow: "Comparison",
    primaryKeyword: "Animaker alternative",
    intro:
      "This is a specialization-versus-breadth decision. InstaDoodle is built around doodle and whiteboard animation; Animaker is a broader animation platform. Start from the type of video you actually make.",
    heroCtas: [
      { href: "#summary", label: "See the decision summary" },
      { href: "/doodle-video-creator", label: "See the doodle workflow" },
    ],
    blocks: [
      {
        type: "callout",
        kind: "verify",
        body: "Animaker's current feature set, formats and pricing should be confirmed on its official site. We do not publish competitor pricing or unverified specifics.",
      },
      {
        type: "prose",
        heading: "The short version",
        body: [
          "If nearly all your videos are doodle or whiteboard explainers, a focused tool like InstaDoodle removes decisions and keeps the style consistent, with AI to speed up scene creation.",
          "If you produce many visual formats — 2D character animation, infographics, live-action edits — a broad suite like Animaker may consolidate more of that work. Verify its current whiteboard/doodle capabilities against your needs.",
        ],
      },
      {
        type: "compare",
        anchor: "summary",
        heading: "Side by side",
        caption: "InstaDoodle compared with Animaker across workflow dimensions.",
        altName: "Animaker",
        rows: [
          { dimension: "Focus", instadoodle: "Doodle / whiteboard animation, deeply.", alternative: "Broad animation suite across multiple formats — verify doodle depth." },
          { dimension: "Where it runs", instadoodle: "Cloud-based browser workflow (per official site).", alternative: "Cloud-based — verify current details." },
          { dimension: "AI-assisted creation", instadoodle: "Text-to-doodle and image-to-sketch.", alternative: "Verify current AI generation features." },
          { dimension: "Learning curve", instadoodle: "Narrower toolset, fewer decisions for doodle videos.", alternative: "More capable but potentially more to learn." },
          { dimension: "Output", instadoodle: "16:9, 9:16, 4:5, square from one project.", alternative: "Verify formats and resolutions." },
          { dimension: "Commercial use", instadoodle: "Plan-dependent — verify on the offer page.", alternative: "Verify commercial licensing per plan." },
        ],
      },
      {
        type: "cards",
        heading: "Best for…",
        items: [
          { title: "Choose InstaDoodle if", body: "Your work is mostly doodle explainers and you want a focused, AI-assisted workflow." },
          { title: "Consider Animaker if", body: "You need many animation styles in one place and doodle is only part of your output." },
          { title: "Either way", body: "Build the same short project in each and compare the learning curve and the result you can ship." },
        ],
      },
      {
        type: "prose",
        heading: "Limitations to weigh",
        body: [
          "A focused tool can feel limiting if your needs later broaden beyond doodle; a broad suite can feel heavy if all you make is whiteboard explainers.",
          "Match the tool to the majority of your work, not the occasional exception, and re-evaluate if your output mix changes.",
        ],
      },
      {
        type: "faq",
        items: [
          ["Is a focused tool better than a broad one?", "Not universally. A focused tool reduces decisions for one job; a broad suite covers more jobs. The right answer depends on your output mix."],
          ["Can I switch later?", "Yes — scripts and storyboards are portable even if projects are not. Keep planning documents tool-agnostic."],
        ],
      },
    ],
    related: ["/alternatives", "/doodle-video-creator", "/whiteboard-video-maker"],
    cta: {
      title: "Decide by the videos you actually make.",
      primaryHref: "/doodle-video-creator",
      primaryLabel: "See the doodle workflow",
      secondaryHref: "/alternatives",
      secondaryLabel: "Back to the comparison guide",
    },
  },

  /* ─────────────────────────── samples ─────────────────────────── */
  {
    slug: ["samples"],
    kind: "company",
    title: "InstaDoodle Video Samples",
    description: "Whiteboard animation sample scenes grouped by intent — explainer, education, training and marketing — plus a before-you-build checklist.",
    h1: "See whiteboard animation in action",
    eyebrow: "Samples",
    primaryKeyword: "whiteboard animation video samples",
    intro:
      "Examples are the fastest way to decide whether a doodle style fits your message. Explore sample scenes grouped by intent, then use the checklist to plan your own.",
    heroCtas: [
      { href: "#gallery", label: "Browse the samples" },
      { href: "/whiteboard-animation-examples", label: "See example structures" },
    ],
    blocks: [
      {
        type: "gallery",
        anchor: "gallery",
        heading: "Sample scenes by intent",
        intro: "Official product visuals used to show style and structure — not case studies of specific customers.",
        items: [
          { media: "sampleBrand", title: "Brand story & explainer", body: "A drawn narrative that opens on a problem and ends on a single action." },
          { media: "sampleKids", title: "Education & tutorial", body: "Concept-at-a-time pacing suited to lessons, math tutorials and how-to guides." },
        ],
      },
      {
        type: "cards",
        heading: "Categories worth planning for",
        items: [
          { title: "Explainer", body: "Problem → idea → next step, in under a couple of minutes." },
          { title: "Education", body: "Question → explanation → visual model → recap." },
          { title: "Training", body: "Steps in the order people follow them." },
          { title: "Marketing", body: "Frame an offer around the audience's problem." },
          { title: "Product story", body: "One scene per key moment; bring the product in via image-to-sketch." },
          { title: "Social video", body: "Vertical or square framing designed for sound-off feeds." },
        ],
      },
      {
        type: "checklist",
        heading: "Before you build a sample",
        intro: "A useful sample has a clear job. Decide these first.",
        items: [
          "The single takeaway for the viewer",
          "The audience and their question",
          "The scene sequence (3–6 scenes)",
          "The visual action for each scene",
          "Voice, language and music direction",
          "The aspect ratio for the target channel",
        ],
      },
      {
        type: "prose",
        heading: "What to examine in a sample",
        body: [
          "Watch whether each scene earns its time, whether the narration and drawing resolve together, and whether you can state the takeaway when it ends. Those three tests separate a clear doodle video from a busy one.",
          "Borrow the structure rather than the content: learn how the message becomes a sequence, then apply that shape to your subject.",
        ],
      },
      {
        type: "callout",
        kind: "editorial",
        body: "Sample imagery is official product artwork shown to illustrate style. This guide does not publish fabricated customer projects, testimonials or results.",
      },
    ],
    related: ["/whiteboard-animation-examples", "/features", "/doodle-video-creator"],
    cta: {
      title: "Plan your own doodle video.",
      primaryHref: "/resources",
      primaryLabel: "Get planning resources",
      secondaryHref: "/features",
      secondaryLabel: "Explore the features",
    },
  },

  /* ─────────────────────────── pricing (placeholder, noindex) ─────────────────────────── */
  {
    slug: ["pricing"],
    kind: "company",
    title: "InstaDoodle Plans",
    description: "What to verify when evaluating an InstaDoodle plan. This independent guide does not restate pricing until it is approved and current.",
    h1: "Choose an InstaDoodle plan with confidence",
    eyebrow: "Plans",
    primaryKeyword: "whiteboard animation software pricing",
    intro:
      "Pricing, plan limits, credits, commercial terms and guarantees are time-sensitive and belong on the official offer page. This page is structured to accept approved plan data without inventing sales claims.",
    noindex: true,
    heroCtas: [{ href: "/features", label: "Compare features instead" }],
    blocks: [
      {
        type: "prose",
        heading: "What a plan comparison should answer",
        body: [
          "A clear plan comparison shows billing period, included features, credit or usage limits, export resolutions, support level and commercial rights in one source of truth.",
          "This independent guide intentionally does not restate InstaDoodle's prices. They change, and publishing an unverified figure would mislead. Check the current numbers on the official offer page.",
        ],
      },
      {
        type: "checklist",
        heading: "Verify these before you buy",
        items: [
          "Current price and billing cadence",
          "AI credit or usage limits per plan",
          "Export resolution (HD, 2K, 4K)",
          "Commercial-use licensing",
          "Number of projects and slides",
          "Support level and response times",
          "Refund policy and guarantee duration",
          "Whether a trial exists",
        ],
      },
      {
        type: "callout",
        kind: "verify",
        body: "This guide will only display pricing once the guide owner supplies verified, approved plan data. Until then, confirm everything on the official offer page.",
      },
    ],
    related: ["/whiteboard-animation-software", "/samples", "/contact"],
    cta: {
      title: "Check current pricing on the official offer.",
      body: "This independent guide links out rather than restating prices that may be out of date.",
      primaryHref: "/features",
      primaryLabel: "Compare the features",
      secondaryHref: "/alternatives",
      secondaryLabel: "See the comparison guide",
    },
  },

  /* ─────────────────────────── about ─────────────────────────── */
  {
    slug: ["about"],
    kind: "company",
    title: "About This Independent InstaDoodle Guide",
    description: "How this independent guide researches InstaDoodle, what it will and will not publish, and how affiliate links work.",
    h1: "About this independent InstaDoodle guide",
    eyebrow: "About this guide",
    primaryKeyword: "about InstaDoodle",
    intro:
      "This is an independent guide to InstaDoodle, an AI-assisted whiteboard animation and doodle video tool. It is not the official InstaDoodle website and is not operated by the vendor.",
    heroCtas: [{ href: "/features", label: "Explore the features" }],
    blocks: [
      {
        type: "prose",
        heading: "What we publish",
        body: [
          "We describe what the product does using verified public information from the official InstaDoodle site and documented firsthand inspection, clearly separating verified facts from editorial interpretation.",
          "We do not publish invented prices, guarantees, ratings, customer numbers, testimonials or competitor claims. Where a detail is time-sensitive, we point you to the official offer page instead of restating it.",
        ],
      },
      {
        type: "cards",
        heading: "How to read this guide",
        items: [
          { title: "Verified", body: "Facts drawn from the official site or direct inspection are marked as verified." },
          { title: "Editorial", body: "Our interpretation of how features map to jobs is labelled as editorial." },
          { title: "Verify", body: "Anything that changes — pricing, limits, guarantees — is flagged to confirm on the official offer page." },
        ],
      },
      {
        type: "callout",
        kind: "editorial",
        body: "The guide owner's identity, company details and editorial contacts will be published here once supplied and approved. We do not invent them.",
      },
    ],
    related: ["/features", "/use-cases", "/contact"],
    cta: {
      title: "Start with the product workflow.",
      primaryHref: "/whiteboard-animation-software",
      primaryLabel: "See the product workflow",
      secondaryHref: "/alternatives",
      secondaryLabel: "Compare whiteboard tools",
    },
  },

  /* ─────────────────────────── contact (placeholder, noindex) ─────────────────────────── */
  {
    slug: ["contact"],
    kind: "company",
    title: "Contact This Independent Guide",
    description: "Contact details for this independent InstaDoodle guide will be published after approval. Product support is handled by the official vendor.",
    h1: "Contact this independent guide",
    eyebrow: "Contact",
    primaryKeyword: "contact InstaDoodle",
    intro:
      "An approved contact channel for this independent guide has not been supplied yet, so this page contains no placeholder form or invented address.",
    noindex: true,
    blocks: [
      {
        type: "prose",
        heading: "Product support vs guide contact",
        body: [
          "For help with an InstaDoodle account, editor or video project, use the official vendor's support channel listed on the official website. This independent guide cannot access vendor accounts.",
          "A contact route for the guide itself — for corrections or editorial questions — will be added here once the owner supplies an approved address or form.",
        ],
      },
      {
        type: "callout",
        kind: "editorial",
        body: "No email address, phone number or form is shown because none has been approved. Publishing placeholder contact details would be misleading.",
      },
    ],
    related: ["/about", "/pricing", "/samples"],
    cta: {
      title: "Meanwhile, explore the guide.",
      primaryHref: "/features",
      primaryLabel: "Explore the features",
      secondaryHref: "/samples",
      secondaryLabel: "View examples",
    },
  },

  /* ─────────────────────────── privacy (placeholder, noindex) ─────────────────────────── */
  {
    slug: ["privacy"],
    kind: "legal",
    title: "Privacy Policy",
    description: "Privacy policy for this independent InstaDoodle guide. Approved legal text is required before this page is published and indexed.",
    h1: "Privacy Policy",
    eyebrow: "Legal",
    primaryKeyword: "InstaDoodle privacy policy",
    intro:
      "The approved privacy policy for this independent guide has not been supplied. Owner-approved legal text must be published here before this route is made indexable.",
    noindex: true,
    blocks: [
      {
        type: "prose",
        heading: "Why this page is a placeholder",
        body: [
          "A privacy policy must accurately describe data collection, cookies, analytics, support, payment processing and contact rights. It cannot be reconstructed safely from an SEO audit, so nothing is invented here.",
          "Once the guide owner provides approved legal text and confirms which analytics and cookies are actually in use, it will replace this placeholder and the page can be indexed.",
        ],
      },
      {
        type: "callout",
        kind: "editorial",
        body: "This page is intentionally noindex until real, owner-approved privacy text is supplied.",
      },
    ],
    related: ["/terms", "/contact"],
    cta: {
      title: "Return to the guide.",
      primaryHref: "/features",
      primaryLabel: "Explore the features",
      secondaryHref: "/",
      secondaryLabel: "Back to home",
    },
  },

  /* ─────────────────────────── terms (placeholder, noindex) ─────────────────────────── */
  {
    slug: ["terms"],
    kind: "legal",
    title: "Terms and Conditions",
    description: "Terms and conditions for this independent InstaDoodle guide. Approved legal text is required before this page is published and indexed.",
    h1: "Terms and Conditions",
    eyebrow: "Legal",
    primaryKeyword: "InstaDoodle terms and conditions",
    intro:
      "The approved terms for this independent guide have not been supplied. The owner's current legal text must be published here before this route is made indexable.",
    noindex: true,
    blocks: [
      {
        type: "prose",
        heading: "Why this page is a placeholder",
        body: [
          "Terms need legal and commercial approval, including any usage rights, disclaimers, eligibility and, where relevant, subscription or refund conditions. Those commitments cannot be recreated or altered without an approved source.",
          "When the guide owner supplies approved terms, they will replace this placeholder and the page can be indexed.",
        ],
      },
      {
        type: "callout",
        kind: "editorial",
        body: "This page is intentionally noindex until real, owner-approved terms are supplied.",
      },
    ],
    related: ["/privacy", "/contact"],
    cta: {
      title: "Return to the guide.",
      primaryHref: "/features",
      primaryLabel: "Explore the features",
      secondaryHref: "/",
      secondaryLabel: "Back to home",
    },
  },
];

export const pageByPath = new Map(pages.map((page) => [page.slug.join("/"), page]));
export const allPages = pages;

export function pageMetadata(page: SitePage): Metadata {
  const path = `/${page.slug.join("/")}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    robots: page.noindex || !IS_SITE_URL_CONFIGURED ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title: page.title, description: page.description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
  };
}

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

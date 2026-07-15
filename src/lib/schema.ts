import type { Block } from "./content";
import { AUTHOR, EDITORIAL_LAST_UPDATED_ISO } from "./author";
import { imageObject, videoObject, type MediaKey, type VimeoVideoKey } from "./media";
import {
  absoluteUrl,
  OFFICIAL_PRODUCT_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  type SitePage,
} from "./site";

export type FaqItem = readonly [string, string];

type SchemaNode = Record<string, unknown>;

const organizationId = `${absoluteUrl()}#organization`;
const websiteId = `${absoluteUrl()}#website`;
const softwareId = `${OFFICIAL_PRODUCT_URL}#software`;
const personId = `${absoluteUrl()}#person`;

export function siteStructuredData(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        url: absoluteUrl(),
        description: SITE_DESCRIPTION,
        founder: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: AUTHOR.name,
        jobTitle: AUTHOR.role,
        description: AUTHOR.bio,
        url: absoluteUrl(AUTHOR.path),
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: absoluteUrl(),
        inLanguage: "en",
        publisher: { "@id": organizationId },
        author: { "@id": personId },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: "InstaDoodle",
        url: OFFICIAL_PRODUCT_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web browser",
        description:
          "Web-based software for creating whiteboard-animation and doodle-style videos.",
      },
    ],
  };
}

function faqPageSchema(items: readonly FaqItem[]): SchemaNode | null {
  if (items.length === 0) return null;

  return {
    "@type": "FAQPage",
    mainEntity: items.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
}

function howToSchemas(page: SitePage): SchemaNode[] {
  return page.blocks.flatMap((block) => {
    if (block.type !== "steps" || block.items.length === 0) return [];

    return [
      {
        "@type": "HowTo",
        name: block.heading ?? `${page.title}: workflow`,
        description: block.intro ?? page.intro,
        step: block.items.map((item, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: item.title,
          text: item.body,
        })),
      },
    ];
  });
}

function faqItemsFromBlocks(blocks: Block[]): FaqItem[] {
  return blocks.flatMap((block) => (block.type === "faq" ? block.items : []));
}

/** Collect the distinct media keys used by a page's visual blocks. */
function imageObjectsFromBlocks(blocks: Block[]): SchemaNode[] {
  const keys: MediaKey[] = [];
  for (const block of blocks) {
    if (block.type === "split") keys.push(block.media);
    else if (block.type === "gallery") for (const item of block.items) keys.push(item.media);
    else if (block.type === "featureGrid") for (const item of block.items) if (item.media) keys.push(item.media);
  }
  return [...new Set(keys)].map((key) => imageObject(key));
}

export function pageStructuredData(page: SitePage): SchemaNode {
  const path = `/${page.slug.join("/")}`;
  const pageUrl = absoluteUrl(path);
  const parentHub = page.slug.length > 1 && ["alternatives", "examples"].includes(page.slug[0]);
  const parentHubName = page.slug[0] === "alternatives" ? "Comparison guide" : "Examples";
  const parentHubPath = parentHub ? `/${page.slug[0]}` : null;
  const faq = faqPageSchema(faqItemsFromBlocks(page.blocks));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
          ...(parentHub && parentHubPath
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: parentHubName,
                  item: absoluteUrl(parentHubPath),
                },
              ]
            : []),
          {
            "@type": "ListItem",
            position: parentHub ? 3 : 2,
            name: page.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: page.title,
        description: page.description,
        url: pageUrl,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        publisher: { "@id": organizationId },
        about: { "@id": softwareId },
        ...(page.showAuthor
          ? { author: { "@id": personId }, dateModified: EDITORIAL_LAST_UPDATED_ISO }
          : {}),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".answer-summary"],
        },
      },
      ...howToSchemas(page),
      ...(page.kind === "comparison" ? imageObjectsFromBlocks(page.blocks) : []),
      ...(faq ? [faq] : []),
    ],
  };
}

export function homeStructuredData(
  faqItems: readonly FaqItem[],
  videoKeys: readonly VimeoVideoKey[] = [],
  imageKeys: readonly MediaKey[] = [],
): SchemaNode {
  const homeUrl = absoluteUrl();
  const faq = faqPageSchema(faqItems);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${homeUrl}#webpage`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: homeUrl,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        publisher: { "@id": organizationId },
        about: { "@id": softwareId },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".answer-summary"],
        },
      },
      {
        "@type": "HowTo",
        name: "Create a whiteboard video with InstaDoodle",
        description:
          "A three-step workflow for turning an idea into a scene-based doodle video.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Type your idea",
            text: "Describe a scene, script, or topic to create a starting point.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Compose the scenes",
            text: "Arrange characters, props, backgrounds, order, and timing around one message.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Animate and export",
            text: "Add narration, music, reveals, and transitions, then choose an export format for the target channel.",
          },
        ],
      },
      ...videoKeys.map((key) => videoObject(key)),
      ...imageKeys.map((key) => imageObject(key)),
      ...(faq ? [faq] : []),
    ],
  };
}

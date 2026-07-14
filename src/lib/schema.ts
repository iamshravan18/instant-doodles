import type { Block } from "./content";
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
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: absoluteUrl(),
        inLanguage: "en",
        publisher: { "@id": organizationId },
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

export function pageStructuredData(page: SitePage): SchemaNode {
  const path = `/${page.slug.join("/")}`;
  const pageUrl = absoluteUrl(path);
  const isComparisonChild = page.slug.length > 1 && page.slug[0] === "alternatives";
  const faq = faqPageSchema(faqItemsFromBlocks(page.blocks));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
          ...(isComparisonChild
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Comparison guide",
                  item: absoluteUrl("/alternatives"),
                },
              ]
            : []),
          {
            "@type": "ListItem",
            position: isComparisonChild ? 3 : 2,
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
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".answer-summary"],
        },
      },
      ...howToSchemas(page),
      ...(faq ? [faq] : []),
    ],
  };
}

export function homeStructuredData(faqItems: readonly FaqItem[]): SchemaNode {
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
      ...(faq ? [faq] : []),
    ],
  };
}

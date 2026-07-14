import type { MetadataRoute } from "next";
import { SITE_URL, allPages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...allPages
      .filter((page) => !page.noindex)
      .map((page) => ({
        url: `${SITE_URL}/${page.slug.join("/")}`,
        changeFrequency: "monthly" as const,
        priority: page.kind === "commercial" || page.kind === "comparison" ? 0.9 : 0.7,
      })),
  ];
}

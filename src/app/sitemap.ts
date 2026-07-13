import type { MetadataRoute } from "next";
import { IS_SITE_URL_CONFIGURED, SITE_URL, allPages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_SITE_URL_CONFIGURED) return [];
  return [{ url: SITE_URL, changeFrequency: "weekly", priority: 1 }, ...allPages.filter((page) => !page.noindex).map((page) => ({ url: `${SITE_URL}/${page.slug.join("/")}`, changeFrequency: "monthly" as const, priority: page.kind === "commercial" ? 0.9 : 0.7 }))];
}

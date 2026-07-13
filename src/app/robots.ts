import type { MetadataRoute } from "next";
import { IS_SITE_URL_CONFIGURED, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return IS_SITE_URL_CONFIGURED
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}

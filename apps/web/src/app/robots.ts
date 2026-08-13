import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/content/repository";

export const dynamic = "force-static";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://moorishlighthouse.com";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const catalog = await getCatalog();
  if (catalog.mode === "fixtures") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

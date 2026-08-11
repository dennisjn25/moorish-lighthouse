import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/content/repository";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const catalog = await getCatalog();
  if (catalog.mode === "fixtures") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://moorishlighthouse.com/sitemap.xml",
  };
}

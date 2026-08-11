import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/content/repository";

const base = "https://moorishlighthouse.com";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getCatalog();
  const published = <T extends { status: string }>(items: T[]) =>
    items.filter((item) => item.status === "published");
  const staticRoutes = [
    "",
    "/learn",
    "/articles",
    "/videos",
    "/shop",
    "/about",
    "/search",
    "/consulting",
  ];
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...published(catalog.topics).map((item) => ({
      url: `${base}/learn/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...published(catalog.lessons).map((item) => ({
      url: `${base}/learn/${item.topicSlug}/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...published(catalog.articles).map((item) => ({
      url: `${base}/articles/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...published(catalog.videos).map((item) => ({
      url: `${base}/videos/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...published(catalog.products).map((item) => ({
      url: `${base}/shop/${item.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}

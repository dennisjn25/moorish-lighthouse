import { cache } from "react";
import { previewCatalog } from "./fixtures";
import type {
  Article,
  ContentCatalog,
  Lesson,
  Product,
  SearchItem,
  Topic,
  Video,
} from "./types";

const apiVersion = "2026-08-01";

const catalogQuery = `{
  "topics": *[_type == "topic" && publicationStatus == "published" && defined(slug.current)] | order(title asc) {
    "id": _id, title, "slug": slug.current, summary, introduction,
    "source": {"kind": "official", "label": "Moorish Lighthouse Sanity Studio"},
    "status": "published"
  },
  "lessons": *[_type == "lesson" && publicationStatus == "published" && defined(slug.current)] | order(order asc, title asc) {
    "id": _id, title, "slug": slug.current, "topicSlug": topic->slug.current,
    summary, "body": body[].children[].text, level, format, minutes,
    "source": {"kind": "official", "label": "Moorish Lighthouse Sanity Studio"},
    "status": "published"
  },
  "articles": *[_type == "article" && publicationStatus == "published" && defined(slug.current)] | order(publishedAt desc) {
    "id": _id, title, "slug": slug.current, "topicSlug": topic->slug.current,
    dek, "body": body[].children[].text, "author": author->name, publishedAt,
    updatedAt, minutes, references,
    "source": {"kind": "official", "label": "Moorish Lighthouse Sanity Studio"},
    "status": "published"
  },
  "videos": *[_type == "video" && publicationStatus == "published" && defined(slug.current)] | order(title asc) {
    "id": _id, title, "slug": slug.current, "topicSlug": topic->slug.current,
    summary, takeaways, transcript, duration, level, series, youtubeUrl,
    "source": {"kind": "official", "label": "Moorish Lighthouse Sanity Studio", "url": youtubeUrl},
    "status": "published"
  },
  "products": *[_type == "product" && publicationStatus == "published" && defined(slug.current)] | order(title asc) {
    "id": _id, title, "slug": slug.current, summary, type, fulfillment,
    availability, outcomes, audience,
    "source": {"kind": "official", "label": "Moorish Lighthouse Sanity Studio"},
    "status": "published"
  }
}`;

function isCatalog(value: unknown): value is Omit<ContentCatalog, "mode"> {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return ["topics", "lessons", "articles", "videos", "products"].every((key) =>
    Array.isArray(candidate[key]),
  );
}

export const getCatalog = cache(async (): Promise<ContentCatalog> => {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const fixtureOnly = process.env.SANITY_USE_PREVIEW_FIXTURES === "true";

  if (!projectId || !dataset || fixtureOnly) return previewCatalog;

  const endpoint = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  endpoint.searchParams.set("query", catalogQuery);

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!response.ok) return previewCatalog;
    const payload = (await response.json()) as { result?: unknown };
    return isCatalog(payload.result)
      ? { ...payload.result, mode: "sanity" }
      : previewCatalog;
  } catch {
    return previewCatalog;
  }
});

export async function getTopic(slug: string): Promise<Topic | undefined> {
  return (await getCatalog()).topics.find((item) => item.slug === slug);
}

export async function getLesson(slug: string): Promise<Lesson | undefined> {
  return (await getCatalog()).lessons.find((item) => item.slug === slug);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  return (await getCatalog()).articles.find((item) => item.slug === slug);
}

export async function getVideo(slug: string): Promise<Video | undefined> {
  return (await getCatalog()).videos.find((item) => item.slug === slug);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getCatalog()).products.find((item) => item.slug === slug);
}

export async function searchCatalog(query: string): Promise<SearchItem[]> {
  const catalog = await getCatalog();
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return [];

  return [
    ...catalog.topics.map((item) => ({
      href: `/learn/${item.slug}`,
      kind: "Topic" as const,
      summary: item.summary,
      title: item.title,
    })),
    ...catalog.lessons.map((item) => ({
      href: `/learn/${item.topicSlug}/${item.slug}`,
      kind: "Lesson" as const,
      summary: item.summary,
      title: item.title,
    })),
    ...catalog.articles.map((item) => ({
      href: `/articles/${item.slug}`,
      kind: "Article" as const,
      summary: item.dek,
      title: item.title,
    })),
    ...catalog.videos.map((item) => ({
      href: `/videos/${item.slug}`,
      kind: "Video" as const,
      summary: item.summary,
      title: item.title,
    })),
    ...catalog.products.map((item) => ({
      href: `/shop/${item.slug}`,
      kind: "Product" as const,
      summary: item.summary,
      title: item.title,
    })),
  ].filter((item) =>
    `${item.title} ${item.summary} ${item.kind}`
      .toLocaleLowerCase()
      .includes(needle),
  );
}

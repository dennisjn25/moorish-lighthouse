import { describe, expect, it } from "vitest";
import { previewCatalog } from "@/lib/content/fixtures";
import { buildSanityHeaders, searchCatalog } from "@/lib/content/repository";

describe("content repository", () => {
  it("uses the official Moorish Lighthouse channels for the preview video library", () => {
    expect(previewCatalog.videos).toHaveLength(20);
    expect(previewCatalog.videos[0]).toMatchObject({
      id: "aCfayznQ7hQ",
      source: {
        kind: "official",
        url: "https://www.youtube.com/@moorishlighthouse",
      },
      title: "The Truth About The Republican Party",
      youtubeUrl: "https://www.youtube.com/watch?v=aCfayznQ7hQ",
    });
    const firstVideo = previewCatalog.videos[0];
    expect(firstVideo).toBeDefined();
    expect(firstVideo?.transcriptEvidence).toHaveLength(3);
    expect(firstVideo?.transcriptEvidence?.[0]).toEqual({
      text: expect.any(String),
      timestamp: expect.stringMatching(/^\d{1,2}:\d{2}/),
    });
    expect(previewCatalog.videos.at(-1)).toMatchObject({
      id: "_h51g_HsZHM",
      title:
        "Moorish American: How to Nationalize, operate as a National, and Fundamental Principles of Law.",
    });
    expect(
      previewCatalog.videos.every((video) => video.status === "published"),
    ).toBe(true);
  });

  it("grounds every educational fixture in an official Moorish Lighthouse video", () => {
    expect(previewCatalog.mode).toBe("fixtures");
    expect(previewCatalog.topics).toHaveLength(3);
    expect(previewCatalog.lessons).toHaveLength(3);
    expect(previewCatalog.articles).toHaveLength(3);
    expect(previewCatalog.products.map((product) => product.title)).toEqual([
      "Adverse Possession ebook Bundle",
      "Child Support Consultation",
      "Child Support Live Class",
      "Free From Birth Bundle",
    ]);
    expect(
      previewCatalog.products.every(
        (product) =>
          product.availability === "coming-soon" &&
          product.source.label.includes("site owner"),
      ),
    ).toBe(true);

    for (const item of [
      ...previewCatalog.topics,
      ...previewCatalog.lessons,
      ...previewCatalog.articles,
    ]) {
      expect(item.status).toBe("published");
      expect(item.source).toMatchObject({
        kind: "official",
        url: expect.stringMatching(
          /^https:\/\/(www\.)?youtube\.com\/watch\?v=/,
        ),
      });
    }

    for (const item of [
      ...previewCatalog.lessons,
      ...previewCatalog.articles,
    ]) {
      expect(JSON.stringify(item)).toMatch(/Moorish Lighthouse/i);
      expect(JSON.stringify(item)).not.toMatch(
        /preview slot|better question|source trail/i,
      );
    }
  });

  it("adds a server-only bearer token for private Sanity datasets", () => {
    expect(buildSanityHeaders()).toEqual({ Accept: "application/json" });
    expect(buildSanityHeaders("viewer-secret")).toEqual({
      Accept: "application/json",
      Authorization: "Bearer viewer-secret",
    });
  });

  it("organizes cross-content search results by truthful content type", async () => {
    const results = await searchCatalog("nationality");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.href.startsWith("/"))).toBe(true);
    expect(new Set(results.map((item) => item.kind)).size).toBeGreaterThan(1);
  });
});

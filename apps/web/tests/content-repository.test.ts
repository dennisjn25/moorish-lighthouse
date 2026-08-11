import { describe, expect, it } from "vitest";
import { previewCatalog } from "@/lib/content/fixtures";
import { searchCatalog } from "@/lib/content/repository";

describe("preview content repository", () => {
  it("labels every local fixture and avoids transactional product data", () => {
    expect(previewCatalog.mode).toBe("fixtures");
    expect(previewCatalog.topics.length).toBeGreaterThan(0);
    expect(previewCatalog.lessons.length).toBeGreaterThan(0);
    expect(previewCatalog.articles.length).toBeGreaterThan(0);
    expect(previewCatalog.videos.length).toBeGreaterThan(0);
    expect(previewCatalog.products.length).toBeGreaterThan(0);

    for (const item of [
      ...previewCatalog.topics,
      ...previewCatalog.lessons,
      ...previewCatalog.articles,
      ...previewCatalog.videos,
      ...previewCatalog.products,
    ]) {
      expect(item.status).toBe("preview");
    }

    for (const product of previewCatalog.products) {
      expect(product.availability).not.toBe("available");
      expect(JSON.stringify(product)).not.toMatch(
        /\$\d|priceId|paymentIntent/i,
      );
    }
  });

  it("organizes cross-content search results by truthful content type", async () => {
    const results = await searchCatalog("source");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.href.startsWith("/"))).toBe(true);
    expect(new Set(results.map((item) => item.kind)).size).toBeGreaterThan(1);
  });
});

import { describe, expect, it } from "vitest";
import {
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  getYoutubeVideoId,
} from "@/lib/content/youtube";

describe("YouTube URL helpers", () => {
  it.each([
    ["https://www.youtube.com/watch?v=aCfayznQ7hQ", "aCfayznQ7hQ"],
    ["https://youtu.be/aCfayznQ7hQ", "aCfayznQ7hQ"],
    ["https://www.youtube.com/shorts/aCfayznQ7hQ", "aCfayznQ7hQ"],
    ["https://www.youtube-nocookie.com/embed/aCfayznQ7hQ", "aCfayznQ7hQ"],
  ])("extracts the official video ID from %s", (url, expected) => {
    expect(getYoutubeVideoId(url)).toBe(expected);
  });

  it("rejects malformed and non-YouTube URLs", () => {
    expect(
      getYoutubeVideoId("https://example.com/watch?v=aCfayznQ7hQ"),
    ).toBeNull();
    expect(
      getYoutubeVideoId("https://youtube.com/watch?v=not-valid"),
    ).toBeNull();
    expect(getYoutubeVideoId(undefined)).toBeNull();
  });

  it("creates a privacy-enhanced inline embed URL", () => {
    expect(
      getYoutubeEmbedUrl("https://www.youtube.com/watch?v=aCfayznQ7hQ"),
    ).toBe("https://www.youtube-nocookie.com/embed/aCfayznQ7hQ?rel=0");
  });

  it("creates official thumbnail URLs with a universal fallback", () => {
    expect(getYoutubeThumbnailUrl("aCfayznQ7hQ")).toBe(
      "https://i.ytimg.com/vi/aCfayznQ7hQ/maxresdefault.jpg",
    );
    expect(getYoutubeThumbnailUrl("aCfayznQ7hQ", "hq")).toBe(
      "https://i.ytimg.com/vi/aCfayznQ7hQ/hqdefault.jpg",
    );
  });
});

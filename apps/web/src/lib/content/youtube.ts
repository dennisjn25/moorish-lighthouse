const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export function getYoutubeVideoId(url: string | undefined): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (!YOUTUBE_HOSTS.has(parsed.hostname.toLowerCase())) return null;

    const candidate = parsed.hostname.toLowerCase().endsWith("youtu.be")
      ? parsed.pathname.split("/").filter(Boolean)[0]
      : parsed.pathname.startsWith("/embed/") ||
          parsed.pathname.startsWith("/shorts/")
        ? parsed.pathname.split("/").filter(Boolean)[1]
        : parsed.searchParams.get("v");

    return candidate && VIDEO_ID_PATTERN.test(candidate) ? candidate : null;
  } catch {
    return null;
  }
}

export function getYoutubeEmbedUrl(url: string | undefined): string | null {
  const videoId = getYoutubeVideoId(url);
  return videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`
    : null;
}

export function getYoutubeThumbnailUrl(
  videoId: string,
  quality: "max" | "hq" = "max",
): string {
  return `https://i.ytimg.com/vi/${videoId}/${quality === "max" ? "maxresdefault" : "hqdefault"}.jpg`;
}

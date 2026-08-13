"use client";

import Image from "next/image";
import { useState } from "react";
import {
  getYoutubeThumbnailUrl,
  getYoutubeVideoId,
} from "@/lib/content/youtube";

export function VideoThumbnail({
  className,
  title,
  youtubeUrl,
}: {
  className?: string;
  title: string;
  youtubeUrl: string | undefined;
}) {
  const videoId = getYoutubeVideoId(youtubeUrl);
  const [useFallback, setUseFallback] = useState(false);

  if (!videoId) return null;

  return (
    <Image
      alt={`Thumbnail for ${title}`}
      className={className}
      fill
      onError={() => setUseFallback(true)}
      sizes="(max-width: 760px) 100vw, (max-width: 1200px) 55vw, 800px"
      src={getYoutubeThumbnailUrl(videoId, useFallback ? "hq" : "max")}
    />
  );
}

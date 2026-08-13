"use client";

import Image from "next/image";
import { useState } from "react";
import {
  getYoutubeThumbnailUrl,
  getYoutubeVideoId,
} from "@/lib/content/youtube";
import { publicAsset } from "@/lib/public-asset";

const localThumbnails = new Set(["O6y-G0E_R-E", "_h51g_HsZHM"]);

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

  const source = localThumbnails.has(videoId)
    ? publicAsset(`/video-thumbnails/${videoId}.jpg`)
    : getYoutubeThumbnailUrl(videoId, useFallback ? "hq" : "max");
  const isLocalThumbnail = localThumbnails.has(videoId);

  return (
    <Image
      alt={`Thumbnail for ${title}`}
      className={className}
      fill
      onError={() => setUseFallback(true)}
      sizes="(max-width: 760px) 100vw, (max-width: 1200px) 55vw, 800px"
      src={source}
      unoptimized={isLocalThumbnail}
    />
  );
}

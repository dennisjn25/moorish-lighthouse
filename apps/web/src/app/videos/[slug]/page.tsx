import type { Metadata } from "next";
import { VideoDetail } from "@/components/content-details";
import { getVideo } from "@/lib/content/repository";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getVideo(slug);
  return { title: item?.title ?? "Video", description: item?.summary };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VideoDetail slug={slug} />;
}

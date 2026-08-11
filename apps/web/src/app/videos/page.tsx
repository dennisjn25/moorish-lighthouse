import type { Metadata } from "next";
import { VideosLibrary } from "@/components/content-hubs";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Search Moorish Lighthouse video lessons with summaries and transcripts.",
};

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; q?: string; topic?: string }>;
}) {
  const params = await searchParams;
  return (
    <VideosLibrary
      level={params.level ?? ""}
      query={params.q ?? ""}
      topic={params.topic ?? ""}
    />
  );
}

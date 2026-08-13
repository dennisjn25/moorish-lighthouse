import type { Metadata } from "next";
import { VideosLibrary } from "@/components/content-hubs";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Search Moorish Lighthouse video lessons with summaries and transcripts.",
};

export default function VideosPage() {
  return <VideosLibrary />;
}

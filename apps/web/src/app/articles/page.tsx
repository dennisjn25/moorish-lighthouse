import type { Metadata } from "next";
import { ArticlesIndex } from "@/components/content-hubs";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest ideas, updates, and practical guidance from Moorish Lighthouse.",
};

export default function ArticlesPage() {
  return <ArticlesIndex />;
}

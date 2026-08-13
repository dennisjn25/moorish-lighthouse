import type { Metadata } from "next";
import { LearnHub } from "@/components/content-hubs";

export const metadata: Metadata = {
  title: "Learn",
  description: "Explore Moorish Lighthouse topics and guided lessons.",
};

export default function LearnPage() {
  return <LearnHub />;
}

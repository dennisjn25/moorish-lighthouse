import type { Metadata } from "next";
import { LearnHub } from "@/components/content-hubs";

export const metadata: Metadata = {
  title: "Learn",
  description: "Explore Moorish Lighthouse topics and guided lessons.",
};

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; topic?: string }>;
}) {
  const params = await searchParams;
  return <LearnHub level={params.level ?? ""} topic={params.topic ?? ""} />;
}

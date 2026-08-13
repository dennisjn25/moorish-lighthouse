import type { Metadata } from "next";
import { TopicLanding } from "@/components/content-details";
import { getCatalog, getTopic } from "@/lib/content/repository";

export async function generateStaticParams() {
  return (await getCatalog()).topics.map(({ slug }) => ({ topic: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const item = await getTopic(topic);
  return { title: item?.title ?? "Learning topic", description: item?.summary };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  return <TopicLanding slug={topic} />;
}

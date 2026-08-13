import type { Metadata } from "next";
import { LessonDetail } from "@/components/content-details";
import { getCatalog, getLesson } from "@/lib/content/repository";

export async function generateStaticParams() {
  return (await getCatalog()).lessons.map(({ slug, topicSlug }) => ({
    lesson: slug,
    topic: topicSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lesson: string; topic: string }>;
}): Promise<Metadata> {
  const { lesson } = await params;
  const item = await getLesson(lesson);
  return { title: item?.title ?? "Lesson", description: item?.summary };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lesson: string; topic: string }>;
}) {
  const { lesson } = await params;
  return <LessonDetail slug={lesson} />;
}

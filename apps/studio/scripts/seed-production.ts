import { getCliClient } from "sanity/cli";
import type { SanityDocumentStub } from "@sanity/client";
import { previewCatalog } from "../../web/src/lib/content/fixtures";

const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const client = getCliClient({ apiVersion: "2026-08-01", dataset });
const dryRun = process.argv.includes("--dry-run");

const topicId = (slug: string) => `topic-${slug}`;
const authorId = "author-moorish-lighthouse-editorial-guide";
const slug = (current: string) => ({ _type: "slug", current });
const reference = (_ref: string) => ({ _type: "reference", _ref });
const blocks = (paragraphs: string[]) =>
  paragraphs.map((text, index) => ({
    _key: `paragraph-${index + 1}`,
    _type: "block",
    children: [
      {
        _key: `span-${index + 1}`,
        _type: "span",
        marks: [],
        text,
      },
    ],
    markDefs: [],
    style: "normal",
  }));

const documents: Array<SanityDocumentStub & { _id: string }> = [
  {
    _id: authorId,
    _type: "author",
    name: "Moorish Lighthouse editorial guide",
    role: "Editorial guide",
    slug: slug("moorish-lighthouse-editorial-guide"),
  },
  ...previewCatalog.topics.map((topic, index) => ({
    _id: topicId(topic.slug),
    _type: "topic",
    introduction: topic.introduction,
    order: index,
    slug: slug(topic.slug),
    summary: topic.summary,
    title: topic.title,
  })),
  ...previewCatalog.lessons.map((lesson, index) => ({
    _id: lesson.id,
    _type: "lesson",
    body: blocks(lesson.body),
    format: lesson.format,
    level: lesson.level,
    minutes: lesson.minutes,
    order: index,
    slug: slug(lesson.slug),
    summary: lesson.summary,
    title: lesson.title,
    topic: reference(topicId(lesson.topicSlug)),
  })),
  ...previewCatalog.articles.map((article) => ({
    _id: article.id,
    _type: "article",
    author: reference(authorId),
    body: blocks(article.body),
    dek: article.dek,
    minutes: article.minutes,
    publishedAt: "2026-08-13T12:00:00.000Z",
    references: article.references.map((item, index) => ({
      _key: `source-${index + 1}`,
      checkedAt: item.checkedAt ?? "2026-08-13",
      label: item.label,
      url: item.url,
    })),
    slug: slug(article.slug),
    title: article.title,
    topic: reference(topicId(article.topicSlug)),
  })),
  ...previewCatalog.videos.map((video) => ({
    _id: `video-${video.id}`,
    _type: "video",
    duration: video.duration,
    level: video.level,
    series: video.series,
    slug: slug(video.slug),
    sourceCheckedAt: video.source.checkedAt ?? "2026-08-12",
    summary: video.summary,
    takeaways: video.takeaways,
    title: video.title,
    topic: reference(topicId(video.topicSlug)),
    transcriptEvidence: video.transcriptEvidence?.map((item, index) => ({
      _key: `excerpt-${index + 1}`,
      text: item.text,
      timestamp: item.timestamp,
    })),
    youtubeUrl: video.youtubeUrl,
  })),
  ...previewCatalog.products.map((product) => ({
    _id: product.id,
    _type: "product",
    audience: product.audience,
    availability: product.availability,
    fulfillment: product.fulfillment,
    outcomes: product.outcomes,
    slug: slug(product.slug),
    summary: product.summary,
    title: product.title,
    type: product.type,
  })),
];

const counts = documents.reduce<Record<string, number>>((result, document) => {
  result[document._type] = (result[document._type] ?? 0) + 1;
  return result;
}, {});

async function main() {
  if (dryRun) {
    console.log(
      JSON.stringify({ counts, dataset, documents: documents.length }, null, 2),
    );
    return;
  }

  let transaction = client.transaction();
  for (const document of documents) {
    transaction = transaction.createIfNotExists(document);
  }
  const result = await transaction.commit();
  console.log(
    JSON.stringify(
      {
        counts,
        dataset,
        documents: documents.length,
        transactionId: result.transactionId,
      },
      null,
      2,
    ),
  );
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

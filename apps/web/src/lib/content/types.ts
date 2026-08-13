export type ContentSource = {
  kind: "preview" | "official";
  label: string;
  url?: string;
  checkedAt?: string;
};

export type ContentStatus = "draft" | "published" | "preview";
export type LearningLevel = "Foundations" | "Developing" | "Advanced";

export type Topic = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  introduction: string;
  source: ContentSource;
  status: ContentStatus;
};

export type Lesson = {
  id: string;
  title: string;
  slug: string;
  topicSlug: string;
  summary: string;
  body: string[];
  level: LearningLevel;
  format: "Lesson" | "Guide";
  minutes: number;
  source: ContentSource;
  status: ContentStatus;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  topicSlug: string;
  dek: string;
  body: string[];
  author: string;
  publishedAt?: string;
  updatedAt?: string;
  minutes: number;
  references: ContentSource[];
  source: ContentSource;
  status: ContentStatus;
};

export type Video = {
  id: string;
  title: string;
  slug: string;
  topicSlug: string;
  summary: string;
  takeaways: string[];
  transcript?: string[];
  transcriptEvidence?: Array<{
    timestamp: string;
    text: string;
  }>;
  duration: string;
  level: LearningLevel;
  series?: string;
  youtubeUrl?: string;
  source: ContentSource;
  status: ContentStatus;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  type:
    | "Bundle"
    | "Consultation"
    | "Course"
    | "Digital guide"
    | "Physical"
    | "Workshop";
  fulfillment: string;
  availability: "unavailable" | "coming-soon";
  outcomes: string[];
  audience: string;
  source: ContentSource;
  status: ContentStatus;
};

export type ContentCatalog = {
  topics: Topic[];
  lessons: Lesson[];
  articles: Article[];
  videos: Video[];
  products: Product[];
  mode: "sanity" | "fixtures";
};

export type SearchItem = {
  href: string;
  kind: "Article" | "Lesson" | "Product" | "Topic" | "Video";
  summary: string;
  title: string;
};

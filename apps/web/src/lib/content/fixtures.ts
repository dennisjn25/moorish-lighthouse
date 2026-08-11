import type { ContentCatalog, ContentSource } from "./types";

const previewSource: ContentSource = {
  kind: "preview",
  label:
    "Deterministic local preview content. Replace in Sanity before launch.",
};

const youtubeSource: ContentSource = {
  checkedAt: "2026-08-10",
  kind: "official",
  label: "Moorish Lighthouse official YouTube channel",
  url: "https://www.youtube.com/@MoorishLighthouse",
};

export const previewCatalog: ContentCatalog = {
  mode: "fixtures",
  topics: [
    {
      id: "topic-foundations",
      introduction:
        "Build a reliable vocabulary, separate questions from assumptions, and learn how to evaluate a source before drawing a conclusion.",
      slug: "foundations",
      source: previewSource,
      status: "preview",
      summary:
        "Orientation, vocabulary, source literacy, and careful first steps.",
      title: "Foundations",
    },
    {
      id: "topic-property",
      introduction:
        "Explore how to organize property research questions, identify the public records that may matter, and know when qualified local guidance is essential.",
      slug: "property-research",
      source: previewSource,
      status: "preview",
      summary:
        "A research-first approach to property records and local processes.",
      title: "Property research",
    },
    {
      id: "topic-civic",
      introduction:
        "Read civic systems with context by tracing terms, institutions, and primary sources rather than relying on isolated claims.",
      slug: "civic-context",
      source: previewSource,
      status: "preview",
      summary: "Primary-source habits for civic and historical questions.",
      title: "Civic context",
    },
  ],
  lessons: [
    {
      body: [
        "A useful inquiry begins with a question narrow enough to investigate. Write down what you know, what you assume, and what would change your mind.",
        "Next, identify the original source behind each claim. Prefer statutes, recorded documents, public agency guidance, archival material, and qualified professional interpretation over unsourced summaries.",
        "This preview demonstrates the lesson format. It is educational information, not legal advice, and must be replaced or approved before publication.",
      ],
      format: "Lesson",
      id: "lesson-question",
      level: "Foundations",
      minutes: 7,
      slug: "begin-with-a-better-question",
      source: previewSource,
      status: "preview",
      summary:
        "A simple method for turning a broad concern into a researchable question.",
      title: "Begin with a better question",
      topicSlug: "foundations",
    },
    {
      body: [
        "Public records are created for different purposes. A deed, tax record, court filing, and parcel map may describe related facts without answering the same question.",
        "Record the office, document type, date, jurisdiction, and any identifier. These details make later verification possible.",
        "Procedures and legal effects vary by jurisdiction. Use qualified local professionals when a decision could affect rights, money, or deadlines.",
      ],
      format: "Guide",
      id: "lesson-records",
      level: "Foundations",
      minutes: 11,
      slug: "map-the-public-record",
      source: previewSource,
      status: "preview",
      summary:
        "Understand what a record can show before treating it as an answer.",
      title: "Map the public record",
      topicSlug: "property-research",
    },
    {
      body: [
        "Start by preserving the language used in the original source. Modern summaries can flatten distinctions that mattered in their own time.",
        "Compare the source with contemporary records and reputable scholarship. Note disagreement rather than forcing certainty.",
        "A strong research trail makes interpretation visible: source, context, inference, and remaining question.",
      ],
      format: "Lesson",
      id: "lesson-context",
      level: "Developing",
      minutes: 9,
      slug: "read-a-source-in-context",
      source: previewSource,
      status: "preview",
      summary:
        "Keep source, context, and interpretation in their proper places.",
      title: "Read a source in context",
      topicSlug: "civic-context",
    },
  ],
  articles: [
    {
      author: "Moorish Lighthouse editorial preview",
      body: [
        "The fastest answer is not always the most useful one. A dependable research process begins by defining the question and finding the authority that can answer it.",
        "Separate what the source states from what you infer. Then record where the source came from, when you accessed it, and whether a newer version exists.",
        "This article is local preview copy created to exercise the editorial template. It is not a published Moorish Lighthouse article.",
      ],
      dek: "A compact framework for distinguishing evidence, interpretation, and the next question.",
      id: "article-source-trail",
      minutes: 6,
      references: [previewSource],
      slug: "build-a-source-trail",
      source: previewSource,
      status: "preview",
      title: "How to build a source trail",
      topicSlug: "foundations",
    },
    {
      author: "Moorish Lighthouse editorial preview",
      body: [
        "A public record is evidence created within a particular system. Its meaning depends on the document, jurisdiction, date, and question being asked.",
        "Begin with the issuing office and document type. Preserve identifiers and request certified or complete copies when the stakes require it.",
        "This preview does not interpret any specific property record or provide legal guidance.",
      ],
      dek: "Five details to capture before relying on a record or repeating a claim.",
      id: "article-records",
      minutes: 8,
      references: [previewSource],
      slug: "before-you-rely-on-a-public-record",
      source: previewSource,
      status: "preview",
      title: "Before you rely on a public record",
      topicSlug: "property-research",
    },
    {
      author: "Moorish Lighthouse editorial preview",
      body: [
        "Historical terms can shift across institutions, places, and periods. Searching only a modern phrase may hide the language used by the people who created the record.",
        "Track alternative terms, dates, and institutional names. Keep a note of where each term appears and how its meaning changes.",
        "This is template content for local preview and requires editorial review before publication.",
      ],
      dek: "Why vocabulary, date, and institution belong beside every historical source.",
      id: "article-language",
      minutes: 7,
      references: [previewSource],
      slug: "language-changes-the-search",
      source: previewSource,
      status: "preview",
      title: "Language changes the search",
      topicSlug: "civic-context",
    },
  ],
  videos: [
    {
      duration: "Preview runtime",
      id: "video-channel-orientation",
      level: "Foundations",
      series: "Start here",
      slug: "channel-orientation",
      source: youtubeSource,
      status: "preview",
      summary:
        "A local preview entry showing how an official Moorish Lighthouse video can be presented with context, attribution, and a transcript area.",
      takeaways: [
        "Identify the central question before watching",
        "Keep linked sources beside your notes",
        "Continue with a related lesson rather than a dead end",
      ],
      title: "Channel lesson orientation",
      topicSlug: "foundations",
      transcript: [
        "Transcript placeholder. Import only an authorized caption file or an editor-approved transcript.",
      ],
      youtubeUrl: "https://www.youtube.com/@MoorishLighthouse",
    },
    {
      duration: "Preview runtime",
      id: "video-property-notes",
      level: "Developing",
      series: "Research practice",
      slug: "organize-property-research-notes",
      source: youtubeSource,
      status: "preview",
      summary:
        "A preview video record for demonstrating topic, level, series, transcript, and related-content presentation.",
      takeaways: [
        "Record jurisdiction and document identifiers",
        "Distinguish facts from interpretations",
        "Escalate rights-affecting decisions to qualified local guidance",
      ],
      title: "Organize property research notes",
      topicSlug: "property-research",
      transcript: [
        "Transcript placeholder. The production entry must use approved text tied to the selected official video.",
      ],
      youtubeUrl: "https://www.youtube.com/@MoorishLighthouse",
    },
  ],
  products: [
    {
      audience:
        "Visitors who want an editor-approved, structured starting resource.",
      availability: "coming-soon",
      fulfillment:
        "Delivery details are pending owner-approved catalog information.",
      id: "product-guide-slot",
      outcomes: [
        "Production outcomes will be supplied by the owner",
        "No price or purchase claim is shown in preview mode",
      ],
      slug: "guided-research-workbook",
      source: previewSource,
      status: "preview",
      summary:
        "Reserved catalog template for a possible digital resource. This is not a real product listing.",
      title: "Digital resource preview slot",
      type: "Digital guide",
    },
    {
      audience: "Visitors considering a future live educational session.",
      availability: "unavailable",
      fulfillment: "Schedule, access method, and terms have not been approved.",
      id: "product-workshop-slot",
      outcomes: [
        "Demonstrates workshop presentation without inventing an offer",
        "Checkout remains unavailable until an approved product exists",
      ],
      slug: "live-workshop-placeholder",
      source: previewSource,
      status: "preview",
      summary:
        "Reserved template for an owner-approved workshop. No event, seat, date, or price is implied.",
      title: "Workshop preview slot",
      type: "Workshop",
    },
  ],
};

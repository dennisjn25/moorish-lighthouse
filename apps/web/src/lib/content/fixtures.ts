import type { ContentCatalog, ContentSource } from "./types";
import { officialYoutubeVideos } from "./official-youtube";

function youtubeSource(videoId: string, title: string): ContentSource {
  return {
    checkedAt: "2026-08-12",
    kind: "official",
    label: `Moorish Lighthouse official YouTube video: ${title}`,
    url: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

const nationalitySource = youtubeSource(
  "_h51g_HsZHM",
  "Moorish American: How to Nationalize, operate as a National, and Fundamental Principles of Law.",
);
const propertySource = youtubeSource(
  "ZNAjhmZJ_BQ",
  "How To: Adverse Possession",
);
const civicSource = youtubeSource(
  "L25wfLXytYE",
  "The 14th Amendment and Modern Politics",
);

export const previewCatalog: ContentCatalog = {
  mode: "fixtures",
  topics: [
    {
      id: "topic-foundations",
      introduction:
        "Follow Moorish Lighthouse presentations about Moorish American nationality, identity, study, documentation, and applying the creator’s stated principles in civic situations.",
      slug: "foundations",
      source: nationalitySource,
      status: "published",
      summary:
        "An attributed path through the channel’s nationality and identity presentations.",
      title: "Nationality and identity",
    },
    {
      id: "topic-property",
      introduction:
        "Study Moorish Lighthouse presentations on adverse possession, abandoned-property research, public records, possession requirements, carrying costs, and jurisdiction-specific procedure.",
      slug: "property-research",
      source: propertySource,
      status: "published",
      summary:
        "The channel’s property research and adverse-possession presentations, with legal boundaries visible.",
      title: "Property and adverse possession",
    },
    {
      id: "topic-civic",
      introduction:
        "Examine Moorish Lighthouse commentary on constitutional interpretation, citizenship, rights, public institutions, taxation, records, and modern politics.",
      slug: "civic-context",
      source: civicSource,
      status: "published",
      summary:
        "Attributed civic and political commentary from the official channel.",
      title: "Civics and public systems",
    },
  ],
  lessons: [
    {
      body: [
        "Moorish Lighthouse distinguishes the creator’s claimed Moorish American nationality from U.S. citizenship and argues that inherited racial labels do not express nationality.",
        "Across the channel’s presentations, the creator repeatedly connects identity claims with study, documentation, and the ability to explain the principles being asserted.",
        "This guide summarizes the creator’s position. It does not independently validate nationality, jurisdiction, or legal-status claims; consult qualified local guidance before making rights-affecting decisions.",
      ],
      format: "Guide",
      id: "lesson-nationality",
      level: "Foundations",
      minutes: 8,
      slug: "begin-with-a-better-question",
      source: nationalitySource,
      status: "published",
      summary:
        "A transcript-grounded orientation to how Moorish Lighthouse frames nationality, identity, study, and documentation.",
      title: "How the channel frames nationality and identity",
      topicSlug: "foundations",
    },
    {
      body: [
        "Moorish Lighthouse describes adverse possession as a state-specific doctrine and directs viewers toward abandoned-property research rather than actively occupied or clearly claimed property.",
        "The presentations discuss ownership and tax records, vacancy, possession, repairs, utilities, code compliance, carrying costs, statutory periods, and possible quiet-title proceedings.",
        "The creator’s examples and testimonials are educational commentary, not a guarantee or legal instruction. Property rights and procedures vary by jurisdiction and require qualified local review.",
      ],
      format: "Guide",
      id: "lesson-property",
      level: "Foundations",
      minutes: 10,
      slug: "map-the-public-record",
      source: propertySource,
      status: "published",
      summary:
        "A study map for the records, costs, possession questions, and jurisdictional limits discussed in the official videos.",
      title: "Map the channel’s adverse-possession research process",
      topicSlug: "property-research",
    },
    {
      body: [
        "Moorish Lighthouse argues that the 14th Amendment reshaped citizenship and the balance between state and federal power, then connects that interpretation to current political disputes.",
        "The channel also distinguishes civil rights created or regulated by law from what it describes as inherent rights, applying that distinction to reproductive-rights and right-to-travel commentary.",
        "These are attributed interpretations from the creator’s presentations. Constitutional and legal conclusions should be checked against primary sources and qualified professional analysis.",
      ],
      format: "Lesson",
      id: "lesson-civics",
      level: "Developing",
      minutes: 9,
      slug: "read-a-source-in-context",
      source: civicSource,
      status: "published",
      summary:
        "An attributed guide to recurring claims about citizenship, rights, and federal-state power in the channel’s civic commentary.",
      title: "Trace the channel’s civic framework",
      topicSlug: "civic-context",
    },
  ],
  articles: [
    {
      author: "Moorish Lighthouse editorial guide",
      body: [
        "Moorish Lighthouse’s long-form nationality presentation connects identity, documentation, study, employment, and courtroom encounters. The creator argues that a nationality claim must be understood and applied rather than repeated as a label.",
        "Related channel videos critique Black and Negro as identity terms and present Moorish American nationality as the preferred framework. Those claims are the creator’s interpretation and are not independently validated here.",
        "Use the linked official presentation and reviewed timestamps as the source record. Questions involving citizenship, jurisdiction, identification, or legal status require qualified professional advice.",
      ],
      dek: "A transcript-grounded map of the creator’s recurring nationality and identity themes.",
      id: "article-nationality",
      minutes: 6,
      references: [nationalitySource],
      slug: "build-a-source-trail",
      source: nationalitySource,
      status: "published",
      title: "Nationality, identity, and application in the official catalog",
      topicSlug: "foundations",
    },
    {
      author: "Moorish Lighthouse editorial guide",
      body: [
        "Across several presentations and testimonials, Moorish Lighthouse frames adverse possession as a possible nontraditional path into property while emphasizing research into vacancy, ownership, taxes, possession, and state procedure.",
        "Guests describe stamped paperwork, maintenance, repair budgets, utilities, taxes, and competing claims. Their accounts are personal reports, not verified guarantees of title or outcomes.",
        "Before acting, compare the creator’s presentation with current statutes, court decisions, local records, and qualified advice in the property’s jurisdiction.",
      ],
      dek: "What the official videos repeatedly ask viewers to research before approaching an adverse-possession question.",
      id: "article-property",
      minutes: 8,
      references: [propertySource],
      slug: "before-you-rely-on-a-public-record",
      source: propertySource,
      status: "published",
      title: "What the channel examines before an adverse-possession claim",
      topicSlug: "property-research",
    },
    {
      author: "Moorish Lighthouse editorial guide",
      body: [
        "Moorish Lighthouse uses the 14th Amendment as a central lens for discussing citizenship, federal power, abortion politics, and presidential eligibility.",
        "Other videos extend the channel’s civic framework to property taxation, reproductive rights, and the distinction it draws between travel and commercial driving.",
        "These presentations contain disputed legal and historical interpretations. Follow the linked videos, inspect the primary authorities cited, and seek qualified analysis before relying on a conclusion.",
      ],
      dek: "A guide to the constitutional, rights, and public-system themes repeated across the official channel.",
      id: "article-civics",
      minutes: 7,
      references: [civicSource],
      slug: "language-changes-the-search",
      source: civicSource,
      status: "published",
      title: "The channel’s civic lens: citizenship, rights, and public power",
      topicSlug: "civic-context",
    },
  ],
  videos: officialYoutubeVideos,
  products: [],
};

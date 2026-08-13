import { defineArrayMember, defineField, defineType } from "sanity";

const slugField = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (Rule) => Rule.required(),
});

const seoField = defineField({
  name: "seo",
  title: "Search and sharing",
  type: "seo",
});

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "href",
      title: "Destination",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto"],
        }),
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      initialValue: "primary",
      options: { list: ["primary", "secondary", "text"] },
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Search title",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "description",
      title: "Search description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "socialImage",
      title: "Social image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "noIndex",
      title: "Exclude from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const contentBlock = defineType({
  name: "contentBlock",
  title: "Reusable content block",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.max(48),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "actions",
      title: "Actions",
      type: "array",
      of: [defineArrayMember({ type: "cta" })],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow", media: "image" },
  },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "logo",
      title: "Approved logo",
      description: "Use only owner-approved original artwork.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "educationalDisclaimer",
      title: "Educational disclaimer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Verified social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "label",
              title: "Platform",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Official URL",
              type: "url",
              validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
            }),
            defineField({
              name: "verifiedAt",
              title: "Checked on",
              type: "date",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: [
          "header",
          "footer-explore",
          "footer-connect",
          "footer-resources",
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "cta" })],
      validation: (Rule) => Rule.required().min(1).max(9),
    }),
  ],
});

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    slugField,
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({
      name: "bio",
      title: "Verified biography",
      description: "Do not publish credentials or claims without a source.",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "portrait",
      title: "Approved portrait",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "claimSources",
      title: "Biography and credential sources",
      type: "array",
      of: [defineArrayMember({ type: "url" })],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "portrait" } },
});

export const topic = defineType({
  name: "topic",
  title: "Topic",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(70),
    }),
    slugField,
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().max(420),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Navigation order",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    seoField,
  ],
});

export const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(90),
    }),
    slugField,
    defineField({
      name: "topic",
      title: "Topic",
      type: "reference",
      to: [{ type: "topic" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: "level",
      title: "Learning level",
      type: "string",
      options: { list: ["Foundations", "Developing", "Advanced"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: { list: ["Lesson", "Guide"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "minutes",
      title: "Estimated reading minutes",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1).max(180),
    }),
    defineField({
      name: "body",
      title: "Lesson body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "contentBlock" }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "references",
      title: "References",
      type: "array",
      of: [defineArrayMember({ type: "url" })],
    }),
    defineField({
      name: "order",
      title: "Sequence order",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    seoField,
  ],
});

export const article = defineType({
  name: "article",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    slugField,
    defineField({
      name: "dek",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "reference",
      to: [{ type: "topic" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption and credit",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Post content",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "contentBlock" }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "minutes",
      title: "Reading minutes",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "updatedAt",
      title: "Substantially updated at",
      type: "datetime",
    }),
    defineField({
      name: "references",
      title: "Supporting sources",
      description:
        "Optional supporting links for sourced or research-heavy posts.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "referenceItem",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({ scheme: ["http", "https"] }),
            }),
            defineField({
              name: "checkedAt",
              title: "Checked on",
              type: "date",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    seoField,
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
    },
  },
});

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    slugField,
    defineField({
      name: "topic",
      title: "Topic",
      type: "reference",
      to: [{ type: "topic" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(260),
    }),
    defineField({
      name: "level",
      title: "Learning level",
      type: "string",
      options: { list: ["Foundations", "Developing", "Advanced"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "series", title: "Series", type: "string" }),
    defineField({
      name: "duration",
      title: "Duration label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "Official YouTube URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "sourceCheckedAt",
      title: "Official source checked on",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "takeaways",
      title: "Key takeaways",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
    defineField({
      name: "transcript",
      title: "Authorized transcript",
      description: "Use only approved captions or transcript text.",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "transcriptEvidence",
      title: "Reviewed transcript excerpts",
      description:
        "Short, timestamped excerpts checked against the official transcript. Do not paste full transcripts here.",
      type: "array",
      of: [
        defineArrayMember({
          name: "transcriptExcerpt",
          type: "object",
          fields: [
            defineField({
              name: "timestamp",
              title: "Timestamp",
              type: "string",
              validation: (Rule) =>
                Rule.required().regex(/^\d{1,2}:\d{2}(?::\d{2})?$/, {
                  name: "video timestamp",
                }),
            }),
            defineField({
              name: "text",
              title: "Verbatim excerpt",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(180),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),
    seoField,
  ],
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    slugField,
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(260),
    }),
    defineField({
      name: "type",
      title: "Product type",
      type: "string",
      options: {
        list: [
          "Bundle",
          "Digital guide",
          "Physical",
          "Course",
          "Workshop",
          "Consultation",
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      options: { list: ["unavailable", "coming-soon", "available"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fulfillment",
      title: "Fulfillment description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "audience",
      title: "Intended audience",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
    defineField({
      name: "images",
      title: "Approved product images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "stripeProductId",
      title: "Stripe product ID",
      description:
        "Optional catalog link. Stripe remains authoritative for price.",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^prod_[A-Za-z0-9]+$/, {
          name: "Stripe product ID",
        }).warning("Leave blank until an approved Stripe product exists."),
    }),
    defineField({
      name: "relatedFreeContent",
      title: "Related free lessons",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "lesson" }, { type: "article" }, { type: "video" }],
        }),
      ],
    }),
    seoField,
  ],
});

export const schemaTypes = [
  cta,
  seo,
  contentBlock,
  siteSettings,
  navigation,
  author,
  topic,
  lesson,
  article,
  video,
  product,
];

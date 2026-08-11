import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string,
) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(documentId));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Moorish Lighthouse")
    .items([
      singleton(S, "Site settings", "siteSettings", "siteSettings"),
      S.divider(),
      S.listItem()
        .title("Navigation")
        .child(S.documentTypeList("navigation").title("Navigation menus")),
      S.listItem()
        .title("Learning")
        .child(
          S.list()
            .title("Learning")
            .items([
              S.documentTypeListItem("topic").title("Topics"),
              S.documentTypeListItem("lesson").title("Lessons"),
            ]),
        ),
      S.listItem()
        .title("Editorial and media")
        .child(
          S.list()
            .title("Editorial and media")
            .items([
              S.documentTypeListItem("article").title("Articles"),
              S.documentTypeListItem("video").title("Videos"),
              S.documentTypeListItem("author").title("Authors"),
            ]),
        ),
      S.documentTypeListItem("product").title("Products and resources"),
    ]);

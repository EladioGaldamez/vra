import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("VRA")
        .child(
          S.editor().id("vra.home").schemaType("vra.home").documentId("vra")
        ),

      S.listItem()
        .title("Photoshoots")
        .child(S.documentTypeList("photoshoot").title("Photoshoots")),

      S.divider(),

      // Other dynamic pages here
    ]);

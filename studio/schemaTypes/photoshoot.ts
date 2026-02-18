import { defineArrayMember, defineField, defineType } from "sanity";

export const photoshootType = defineType({
  name: "photoshoot",
  title: "Photoshoot",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "images",
      title: "Imágenes",
      type: "array",
      options: {
        layout: "grid",
      },
      of: [
        defineArrayMember({
          name: "image",
          title: "Imagen",
          type: "image",
          options: {
            hotspot: true,
            metadata: ["lqip"],
          },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      images: "images",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `${select.description} - ${select.images.length} ${select.images.length === 1 ? "foto" : "fotos"}`,
        media: select.images[0],
      };
    },
  },
});

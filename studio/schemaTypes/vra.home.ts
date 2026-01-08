import { defineArrayMember, defineField, defineType } from "sanity";

export const vraHomeType = defineType({
  name: "vra.home",
  title: "Home",
  type: "document",
  groups: [
    { name: "hero", title: "Bloque 1", default: true },
    { name: "about", title: "Acerca de" },
    { name: "portfolio", title: "Trabajo" },
    { name: "contact", title: "Contacto" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Título",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Descripción",
      type: "text",
      group: "hero",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "Imagen",
      type: "image",
      group: "hero",
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
    defineField({
      name: "heroButtonText",
      title: "Texto del botón",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroButtonLink",
      title: "Enlace del botón",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "aboutHeading",
      title: "Título (pequeño)",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutTitle",
      title: "Título (grande)",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutDescription",
      title: "Descripción",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          name: "description",
          title: "Descripción",
          type: "block",
        }),
      ],
    }),
    defineField({
      name: "aboutDetails",
      title: "Detalles",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          name: "detail",
          title: "Detalle",
          type: "text",
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: "aboutImage",
      title: "Imagen",
      type: "image",
      group: "about",
    }),
    defineField({
      name: "photoshootHeading",
      title: "Título (pequeño)",
      type: "string",
      group: "portfolio",
    }),
    defineField({
      name: "photoshootTitle",
      title: "Título (grande)",
      type: "string",
      group: "portfolio",
    }),
    defineField({
      name: "photoshoots",
      title: "Photoshoots",
      type: "array",
      group: "portfolio",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "photoshoot" }] }),
      ],
    }),
  ],
});

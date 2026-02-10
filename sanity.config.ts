// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemaTypes from "./studio/schemaTypes";
import { structure } from "./studio/structure";
import { esESLocale } from "@sanity/locale-es-es";
import { dashboardTool } from "@sanity/dashboard";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";

export default defineConfig({
  name: "vra-studio",
  title: "VRA Studio",
  projectId: "38k36woe",
  dataset: "production",
  plugins: [
    esESLocale(),

    dashboardTool({
      widgets: [
        netlifyWidget({
          title: "Valentina Rosero - Modelo Profesional",
          sites: [
            {
              title: "Valentina Rosero - Modelo Profesional",
              apiId: "f22144ee-b80a-4c07-abe7-2dfb99ab5304",
              buildHookId: "69600ba090ee1a4390d8ac8b",
              name: "tinarosero",
              url: "https://www.tinarosero.com",
            },
            {
              title: "Valentina Rosero - Preview",
              apiId: "f22144ee-b80a-4c07-abe7-2dfb99ab5304",
              buildHookId: "69600c4255907310f55d61a3",
              name: "tinarosero",
              url: "https://v2--tinarosero.netlify.app/",
            },
          ],
        }),
      ],
    }),

    structureTool({ structure: structure }),
  ],
  schema: {
    types: schemaTypes,
  },
});

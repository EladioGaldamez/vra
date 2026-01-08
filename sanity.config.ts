// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemaTypes from "./studio/schemaTypes";
import { structure } from "./studio/structure";
import { esESLocale } from "@sanity/locale-es-es";

export default defineConfig({
  name: "vra-studio",
  title: "VRA Studio",
  projectId: "38k36woe",
  dataset: "production",
  plugins: [esESLocale(), structureTool({ structure: structure })],
  schema: {
    types: schemaTypes,
  },
});

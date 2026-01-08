// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://www.tinarosero.com",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap({
    filter: (page) => !page.includes("/success"),
    namespaces: {
      news: false,
      xhtml: false,
      video: false,
      image: false,
    }
  }), sanity({
    projectId: '38k36woe',
    dataset: 'production',
    // Set useCdn to false if you're building statically.
    useCdn: false,
    // Access the Studio on your.url/admin
    studioBasePath: '/vra-studio',
  })],

  adapter: netlify(),
});
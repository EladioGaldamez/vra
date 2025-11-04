// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
// import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  // output: "server",
  // adapter: netlify(),
  site: "https://www.tinarosero.com",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes("/success"),
      namespaces: {
        news: false,
        xhtml: false,
        video: false,
        image: false,
      }
    }),
  ],
});

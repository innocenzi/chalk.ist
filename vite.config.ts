import path from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    {
      name: "html-transform",
      transformIndexHtml(html) {
        if (mode !== "production") return html;

        return html.replace(
          "<!-- %UMAMI% -->",
          `<script async defer data-website-id="74b418ca-7be5-48a9-8947-d62340be88cc" src="https://umami.kasper.io/umami.js" ></script>`
        );
      },
    },

    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue"],
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
      },
      includeAssets: ["og-image.png", "robots.txt", "favicon.ico"],
      manifest: {
        name: "Chalk",
        short_name: "Chalk",
        theme_color: "#101014",
        background_color: "#101014",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: "async",
    formatting: "minify",
    dirStyle: "nested",
  },
  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "@vueuse/core",
      "@vueuse/head",
      "@vueuse/components",
      "@vueuse/integrations/useFuse",
    ],
    exclude: ["vue-demi"],
  },
}));

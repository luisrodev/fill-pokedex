/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "node:path";
import pkg from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    {
      name: "html-transform",
      transformIndexHtml(html) {
        if (process.env.NODE_ENV === "production") {
          return html.replace(
            "</head>",
            `<script defer data-domain="fillpokedex.xyz" src="/js/script.tagged-events.js"></script>
             </head>`
          );
        }
        return html;
      },
    },
  ],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
  },
});

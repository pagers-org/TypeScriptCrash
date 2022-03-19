import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import mix from "vite-plugin-mix";
import * as path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          injectOptions: {
            data: { title: "메인" }
          },
          entry: "/src/main.ts",
          template: "index.html",
          filename: "index.html"
        },
        {
          injectOptions: {
            data: { title: "로그인" }
          },
          entry: "/src/login.ts",
          template: "login.html",
          filename: "login.html"
        }
      ]
    }),
    mix({
      handler: "../server/main.ts"
    })
  ]
});

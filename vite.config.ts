import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import mdx from "@mdx-js/rollup";

import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        exportType: "default",
      },
    }),
    mdx({
      providerImportSource: "@mdx-js/react",
      rehypePlugins: [
        rehypeKatex,
        [rehypeAutolinkHeadings, {
          behavior: "wrap",
          properties: { className: ["anchor-link"] }
        }],
        rehypeSlug,
        [rehypePrettyCode, {
          theme: {
            dark: "catppuccin-mocha",
            light: "catppuccin-latte"
          },
          keepBackground: false
        }]
      ],
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkMath,
      ],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8000,
    fs: {
      allow: ["..", "content"]
    }
  }
});

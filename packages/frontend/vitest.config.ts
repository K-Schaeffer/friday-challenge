/// <reference types="vitest" />
import path from "path";
import vue from "@vitejs/plugin-vue";
import graphql from "@rollup/plugin-graphql";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), graphql()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setupTests",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules", "tests"],
    },
    alias: {
      "~": path.resolve(__dirname, "./"),
    },
  },
});

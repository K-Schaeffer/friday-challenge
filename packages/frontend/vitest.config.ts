/// <reference types="vitest" />

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setupTests",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules", "tests"],
    },
  },
});

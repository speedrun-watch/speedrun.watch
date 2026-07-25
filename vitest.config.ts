import { defineConfig } from "vitest/config";
import path from "node:path";

// Pure-logic unit tests (no DOM needed) — Node environment keeps them fast.
export default defineConfig({
  test: {
    environment: "node", // per-file override to jsdom via `// @vitest-environment jsdom`
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});

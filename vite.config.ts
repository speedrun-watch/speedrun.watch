import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
    headers: {
      "Content-Security-Policy": "frame-ancestors 'none'",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

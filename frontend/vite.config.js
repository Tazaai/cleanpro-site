// ~/cleanpro-site/frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Clean version — only rely on VITE_* env vars from .env or .env.production
export default defineConfig({
  plugins: [react()],
});

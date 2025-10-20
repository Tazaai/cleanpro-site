// ~/cleanpro-site/frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@googlemaps/js-api-loader"],  // ✅ ensure Google Maps loads properly
    esbuildOptions: { target: "esnext" },     // ✅ fix Node 22 + esbuild syntax issue
  },
});

// ~/cleanpro-site/frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@googlemaps/js-api-loader"], // ✅ fix build error
  },
});

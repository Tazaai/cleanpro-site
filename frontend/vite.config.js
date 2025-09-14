// ~/cleanpro-site/frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    __API_BASE__: JSON.stringify(
      process.env.CLOUD_RUN_URL || "http://localhost:8080"
    ),
  },
});

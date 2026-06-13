import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.VITE_PUBLIC_BASE ?? (process.env.GITHUB_ACTIONS ? "/paretune/" : "/"),
  plugins: [react()],
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        url: "http://localhost/",
      },
    },
    setupFiles: "./src/test/setup.ts",
  },
});

import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      "@/src": resolve(__dirname, "../src"),
      "../src": resolve(__dirname, "../src"),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: "../dist-example",
    emptyOutDir: true,
  },
});

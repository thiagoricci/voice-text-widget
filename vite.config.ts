import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["retell-client-js-sdk"],
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Externalize Node.js built-in modules for production builds
        return ["crypto", "util", "events", "stream", "path", "fs"].includes(id);
      },
    },
  },
  define: {
    global: "globalThis",
  },
}));

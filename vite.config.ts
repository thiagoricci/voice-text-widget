import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        crypto: "crypto-browserify",
        process: "process/browser",
      },
    },
    optimizeDeps: {
      include: ["retell-client-js-sdk", "crypto-browserify", "process"],
    },
    define: {
      global: "globalThis",
      "process.env": {},
    },
    build: {
      rollupOptions: {
        external: (id) => {
          // Externalize modules that are NOT needed by retell-sdk in browser
          return ["fs", "path", "util", "events", "stream", "vm", "buffer"].includes(id);
        },
      },
    },
  };
});

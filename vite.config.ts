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
      },
    },
    optimizeDeps: {
      include: ["retell-client-js-sdk"],
    },
    define: {
      global: "globalThis",
    },
    build: {
      rollupOptions: {
        external: (id) => {
          // Externalize Node.js modules that are not needed in browser
          return ["fs", "path", "crypto", "util", "events", "stream", "vm", "buffer", "process"].includes(id);
        },
      },
    },
  };
});

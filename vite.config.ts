import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      nodePolyfills({
        // Include all necessary polyfills
        include: ['buffer', 'process', 'util', 'stream', 'events', 'crypto', 'vm', 'path'],
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        // Override the default excludes to ensure we include what we need
        exclude: [],
      }),
      mode === "development" && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: [
        "retell-client-js-sdk",
        "retell-sdk",
        "buffer",
        "process",
      ],
      esbuildOptions: {
        // Define global for esbuild
        define: {
          global: 'globalThis',
        },
      },
    },
    define: {
      global: "globalThis",
    },
    build: {
      rollupOptions: {
        external: (id) => {
          // Don't externalize anything - let the polyfills handle it
          return false;
        },
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});

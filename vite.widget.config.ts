import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// Widget-specific Vite configuration
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'process', 'util', 'stream', 'events', 'crypto', 'vm', 'path'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      exclude: [],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: "globalThis",
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget.tsx'),
      name: 'AIAssistantWidget',
      fileName: 'widget',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          // Ensure CSS is bundled into the JS file
          if (assetInfo.name === 'style.css') {
            return 'widget.css';
          }
          return assetInfo.name || '';
        }
      }
    },
    cssCodeSplit: false,
    minify: true,
    sourcemap: false
  },
  optimizeDeps: {
    include: [
      "retell-client-js-sdk",
      "retell-sdk",
      "buffer",
      "process",
      "react",
      "react-dom"
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});
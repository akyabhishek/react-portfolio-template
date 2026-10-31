import path from "path";
import react from "@vitejs/plugin-react";
import {defineConfig, loadEnv} from "vite";
import {nodePolyfills} from "vite-plugin-node-polyfills";
import pageViewsHandler from "./api/page-views";

export default defineConfig(({ mode }) => ({
  plugins: [
    {
      name: "local-page-views-api",
      configureServer(server) {
        const env = loadEnv(mode, process.cwd(), "GA4_");
        for (const [key, value] of Object.entries(env)) {
          if (process.env[key] === undefined) process.env[key] = value;
        }
        server.middlewares.use((req, res, next) => {
          if (req.url?.split("?")[0] === "/api/page-views") {
            void pageViewsHandler(req, res);
          } else {
            next();
          }
        });
      },
    },
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
}));

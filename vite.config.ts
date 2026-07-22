import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Only poll for file changes when we're actually inside Docker (set via
// docker-compose.yml's CHOKIDAR_USEPOLLING env var). Bind-mounted volumes,
// especially on macOS/Windows Docker Desktop, don't always propagate native
// fs events — polling works around that. But polling on a NATIVE filesystem
// (i.e. running `npm run dev` directly, no Docker) can misfire and cause an
// endless reload loop, so we keep it off unless we know we need it.
const isDocker = process.env.CHOKIDAR_USEPOLLING === "true";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // bind to all interfaces so it's reachable from outside the container
    port: 5173,
    strictPort: true,
    watch: isDocker
      ? {
          usePolling: true,
          interval: 300,
          // wait for a file to stop changing before reporting it, so a
          // single save doesn't get reported multiple times in a row
          awaitWriteFinish: {
            stabilityThreshold: 300,
            pollInterval: 100,
          },
        }
      : undefined,
    // hmr: isDocker
    //   ? {
    //       // when the dev server runs in a container, the port the browser
    //       // uses to reach it (published on the host) may differ from the
    //       // one Vite sees internally — pin it explicitly in that case
    //       clientPort: 5173,
    //     }
    //   : true, // let Vite auto-detect the HMR connection when running natively
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});

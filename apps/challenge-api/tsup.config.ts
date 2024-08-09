import { defineConfig } from "tsup";

export default defineConfig({
  target: "node20",
  entry: ["src/index.ts"],
  outDir: "dist",
  clean: true,
  format: ["cjs"],
  external: ["@hono/node-server", "hono", "dockerode"],
});

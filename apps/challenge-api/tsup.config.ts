import { copy } from "esbuild-plugin-copy";
import { defineConfig } from "tsup";

export default defineConfig({
  target: "node20",
  entry: ["src/index.ts"],
  outDir: "dist",
  clean: true,
  format: ["esm"],
  external: [
    "@hono/node-server",
    "hono",
    "dockerode",
    // "@codeconnect/validators",
  ],
  esbuildPlugins: [
    copy({
      // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
      // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
      // resolveFrom: "cwd",
      assets: {
        from: ["./src/dockerfiles/**/*"],
        to: ["./dockerfiles"],
      },
      watch: true,
    }),
  ],
});

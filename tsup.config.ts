import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.tsx"],
  format: ["cjs"],
  dts: true,
  sourcemap: true,
  clean: !options.watch,
}));

import { defineConfig } from "tsup";
import CssModulesPlugin from "esbuild-css-modules-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  injectStyle: false,
  esbuildPlugins: [
    CssModulesPlugin({
      inject: false,
    }),
  ],
});

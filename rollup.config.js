const svelte = require("rollup-plugin-svelte");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const copy = require("rollup-plugin-copy");
const postcss = require("rollup-plugin-postcss");
// wow
module.exports = [
  {
    input: "src/view/popup.ts",
    output: {
      format: "iife",
      file: "dist/popup.js",
    },
    plugins: [
      svelte(),
      postcss({
        inject: true,
      }),
      resolve({
        browser: true,
        exportConditions: ["svelte"],
        extensions: [".svelte"],
      }),
      commonjs(),
      typescript({
        tsconfig: "svelte.tsconfig.json",
      }),
    ],
  },
  {
    input: "src/content/index.ts",
    output: {
      format: "es",
      file: "dist/content.js",
    },
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
        compilerOptions: { lib: ["es6", "dom"], target: "es6" },
      }),
      resolve(),
      commonjs({ browser: true }),
      copy({
        targets: [
          { src: "src/view/popup.html", dest: "dist" },
          { src: "manifest.json", dest: "dist" },
          { src: "src/assets", dest: "dist" },
        ],
      }),
    ],
  },
];

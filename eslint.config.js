import { defineConfig } from "eslint/config";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-config-prettier";

// const { defineFlatConfig } = pkg;

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.vue"],
    languageOptions: {
      parser: vueParser, // 👈 Vue parser
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.app.json",
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      vue: vuePlugin,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Vue
      ...vuePlugin.configs["vue3-essential"]?.rules,
      // TypeScript
      ...tsPlugin.configs.recommended?.rules,

      // Custom rules
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": "warn",
      "no-debugger": "warn",
    },
  },
  {
    name: "prettier",
    rules: {
      ...prettier.rules,
    },
  },
]);

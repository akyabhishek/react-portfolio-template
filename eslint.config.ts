/* eslint-env node */

import {Linter} from "eslint";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

const isProduction = process.env.NODE_ENV === "production";

const config: Linter.Config = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: globals.browser,
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-unused-vars": isProduction
      ? "off" // Ignore in production
      : ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
  },
};

export default config;

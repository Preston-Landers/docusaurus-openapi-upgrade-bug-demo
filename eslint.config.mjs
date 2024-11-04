import react from "eslint-plugin-react"
import docusaurus from "@docusaurus/eslint-plugin"
import eslintPrettier from "eslint-plugin-prettier/recommended"
import globals from "globals"

import eslint from "@eslint/js"
import tseslint from "typescript-eslint"

export default tseslint.config(
  eslint.configs.recommended,
  eslintPrettier,
  ...tseslint.configs.recommended,
  {
    // files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        es2021: true,
        ...globals.node,
      },
    },
    plugins: {
      react,
      docusaurus,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
        defaultVersion: "",
      },
    },
    rules: {
      // Add your custom rules here

      "docusaurus/no-untranslated-text": [
        // "warn",
        "off",
        {
          ignoredStrings: [],
        },
      ],
    },
  },
  // For some reason this has to be its own object...
  // https://github.com/eslint/eslint/issues/17400#issuecomment-1863980881
  {
    ignores: ["node_modules/**", "build/**", "dist/**", ".docusaurus/**"],
  },
)

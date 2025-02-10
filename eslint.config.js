// eslint.config.js
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

const config = [
  {
    ignores: ["dist"],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: {
        node: true,
        browser: true,
      },
      parser: typescriptEslintParser,
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      "no-shadow": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "indent": ["error", 2],
      "comma-style": ["error", "last"],
      "comma-spacing": ["error"],
      "comma-dangle": ["error", "never"],
      "no-multi-spaces": ["error", {}],
      "function-paren-newline": ["error", "consistent"],
      "function-call-argument-newline": ["error", "consistent"],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-empty-interface": ["off"],
      "@typescript-eslint/no-namespace": ["off"],
      "@typescript-eslint/no-shadow": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "sort-imports": ["error", { "allowSeparatedGroups": false, "ignoreDeclarationSort": true }],
      "no-empty-interface": "off",
      "no-unused-vars": "off",
    },
  },
];

export default config;
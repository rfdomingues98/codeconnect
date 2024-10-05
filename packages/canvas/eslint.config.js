import baseConfig from "@codeconnect/eslint-config/base";
import reactConfig from "@codeconnect/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
];

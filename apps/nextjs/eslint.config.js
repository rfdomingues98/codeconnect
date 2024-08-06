import baseConfig, { restrictEnvAccess } from "@codeconnect/eslint-config/base";
import nextjsConfig from "@codeconnect/eslint-config/nextjs";
import reactConfig from "@codeconnect/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];

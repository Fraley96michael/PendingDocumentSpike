module.exports = {
  env: {
    browser: true,
    es2020: true,
    "jest/globals": true, // Add jest/globals to your env
    node: true, // Add node environment
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended", // Add this line to extend Jest configurations
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "jest"], // Add 'jest' to the plugins list
  rules: {
    "react-refresh/only-export-components": "warn",
    // Add any custom rules here
  },
};

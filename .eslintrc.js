module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "expo",
    "prettier",
  ],
  plugins: ["prettier", "simple-import-sort"],
  rules: {
    "prettier/prettier": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-console": ["warn", { allow: ["log"] }],
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
};

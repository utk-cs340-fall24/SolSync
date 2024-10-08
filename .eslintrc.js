module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "expo",
    "prettier",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
};

// /workspaces/cleanpro-site/functions/.eslintrc.js
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "max-len": "off", // ✅ allow long lines
    "require-jsdoc": "off", // ✅ don’t force JSDoc
    "object-curly-spacing": "off", // ✅ allow flexible spacing
    "indent": "off", // ✅ don’t enforce indentation
    "comma-dangle": "off", // ✅ allow no trailing commas
    "curly": "off", // ✅ don’t require braces for one-liners
    "operator-linebreak": "off", // ✅ don’t enforce line break style
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};

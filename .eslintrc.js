module.exports = {
  "extends": ["airbnb-base", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-console": "off",
    "no-new": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  }
};

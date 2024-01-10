module.exports = {
  extends: ['@jarsec/eslint-config'],
  rules: {
    "@stylistic/max-len": ["error", {"code": 100, "ignoreUrls": true}]
  }
};

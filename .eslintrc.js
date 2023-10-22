module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
  ],
  "parser": '@typescript-eslint/parser',
  "plugins": ['@typescript-eslint'],
  "root": true,
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "semi": 'off',
    "@typescript-eslint/no-explicit-any": "off",
  },
  "ignorePatterns": [
    "node_modules/",
      "*.js",
  ]
}

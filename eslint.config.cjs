const prettier = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    files: ['src/**/*.ts'],
    plugins: {
      prettier: prettier,
      import: importPlugin,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'no-debugger': 'off',
      'no-console': 0,
      'class-methods-use-this': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'prettier/prettier': 'warn',
    },
  },

  ...compat.config({
    extends: ['plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    env: {
      es6: true,
      browser: true,
      node: true,
    },
  }),
];

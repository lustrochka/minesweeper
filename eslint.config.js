const prettierEslint = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = 
  [
    eslintConfigPrettier,
    {
    files: ['src/**/*.ts'],
    plugins: {
      prettier: prettierEslint,
      import: importPlugin,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
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
  }];
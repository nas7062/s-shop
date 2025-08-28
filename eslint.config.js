// eslint.config.ts
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
  },
  js.configs.recommended, // eslint:recommended
  react.configs.recommended, // plugin:react/recommended
  ...tseslint.configs.recommended, // plugin:@typescript-eslint/recommended
  prettier, // prettier
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
    },
    settings: {
      react: { version: 'detect' },
    },
  },
);

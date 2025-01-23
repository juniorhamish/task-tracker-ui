import vitest from '@vitest/eslint-plugin';
import pluginJest from 'eslint-plugin-jest';
import { FlatCompat } from '@eslint/eslintrc';
import pluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginPromise from 'eslint-plugin-promise';
import reactHooks from 'eslint-plugin-react-hooks';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  {
    settings: { react: { version: 'detect' } },
  },
  {
    ignores: ['dist/**', 'coverage'],
  },
  // These configs contain rules also in AirBnB, so let AirBnB override but add the missing ones.
  pluginJs.configs.recommended,
  pluginEslintComments.recommended,
  pluginReact.configs.flat.recommended,
  // Add the AirBnB rules
  ...compat.extends('airbnb'),
  // Apply these rules only to typescript files
  ...compat.extends('airbnb-typescript').map((config) => ({ ...config, files: ['**/*.{ts,tsx}'] })),
  // These configs are either not included in AirBnB or are newer and should overwrite AirBnB
  pluginReact.configs.flat['jsx-runtime'],
  pluginReactRefresh.configs.vite,
  pluginPromise.configs['flat/recommended'],
  reactHooks.configs['recommended-latest'],
  // This should always be last so that it disables any rules that contradict with prettier
  ...compat.extends('prettier'),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
    },
  },
  {
    files: ['**/*.test.*'],
    plugins: {
      vitest,
      jest: pluginJest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    rules: {
      // These rules are included in the AirBnB config, but they were moved out of the @typescript-eslint library.
      '@typescript-eslint/lines-between-class-members': 0,
      '@typescript-eslint/no-throw-literal': 0,
      'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    },
  },
  {
    files: ['src/gen/client/sdk.gen.ts'],
    rules: {
      'max-classes-per-file': 0,
    },
  },
];

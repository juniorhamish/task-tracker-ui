import pluginJs from '@eslint/js';
import pluginTSESLint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPromise from 'eslint-plugin-promise';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';
import vitest from '@vitest/eslint-plugin';
import pluginJest from 'eslint-plugin-jest';

export default pluginTSESLint.config(
  {
    settings: { react: { version: 'detect' } },
  },
  {
    ignores: ['dist/**', 'coverage'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      pluginJs.configs.recommended,
      pluginTSESLint.configs.recommendedTypeChecked,
      pluginTSESLint.configs.stylisticTypeChecked,
      jsxA11y.flatConfigs.recommended,
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      pluginPromise.configs['flat/recommended'],
      pluginReactRefresh.configs.vite,
      stylistic.configs.customize({
        semi: true,
        braceStyle: '1tbs',
      }),
      reactHooks.configs['recommended-latest'],
      pluginEslintComments.recommended,
      eslintConfigPrettier,
    ],
    rules: {
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
      'prefer-template': 'error',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    extends: [pluginTSESLint.configs.disableTypeChecked],
  },
  {
    files: ['**/*.test.tsx'], // or any other pattern
    plugins: {
      vitest,
      jest: pluginJest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      '@typescript-eslint/unbound-method': 'off',
      'jest/unbound-method': ['error', { ignoreStatic: true }],
    },
  },
  { files: ['**/*.gen.ts'], rules: { '@typescript-eslint/no-extraneous-class': 'off' } },
  { files: ['src/logging/LoggingMetaData.tsx'], rules: { '@typescript-eslint/require-await': 'off' } },
);

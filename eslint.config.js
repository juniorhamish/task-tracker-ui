import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTSESLint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginEslintComments from 'eslint-plugin-eslint-comments';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginPromise from 'eslint-plugin-promise';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { settings: { react: { version: 'detect' } } },
  { ignores: ['src/vite-env.d.ts', 'dist', 'vitest.config.ts', 'vite.config.ts', 'coverage', '!.storybook'] },
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...pluginTSESLint.configs.recommended,
  pluginReact.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  {
    plugins: {
      'react-refresh': pluginReactRefresh,
      'eslint-comments': pluginEslintComments,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/require-default-props': ['off'],
    },
  },
  eslintPluginPrettierRecommended,
];

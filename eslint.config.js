import pluginJs from '@eslint/js';
import pluginTSESLint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginEslintComments from 'eslint-plugin-eslint-comments';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginPromise from 'eslint-plugin-promise';
import stylistic from '@stylistic/eslint-plugin';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { settings: { react: { version: 'detect' } } },
  { ignores: ['src/vite-env.d.ts', 'dist', 'vitest.config.ts', 'vite.config.ts', 'coverage', '!.storybook'] },
  pluginJs.configs.recommended,
  ...pluginTSESLint.configs.strict,
  ...pluginTSESLint.configs.stylistic,
  pluginReact.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  stylistic.configs.customize({
    semi: true,
    braceStyle: '1tbs',
    arrowParens: false,
  }),
  {
    plugins: {
      'react-refresh': pluginReactRefresh,
      'eslint-comments': pluginEslintComments,
    },
    rules: {
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/require-default-props': ['off'],
      '@stylistic/multiline-ternary': ['error', 'never'],
      '@stylistic/jsx-wrap-multilines': ['off'],
    },
  },
  eslintPluginPrettierRecommended,
  { files: ['**/gen'] },
  { rules: { '@typescript-eslint/no-extraneous-class': 'off' } },
];

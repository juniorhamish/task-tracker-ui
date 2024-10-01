import pluginJs from '@eslint/js';
import pluginTSESLint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginEslintComments from 'eslint-plugin-eslint-comments';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPromise from 'eslint-plugin-promise';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { settings: { react: { version: 'detect' } } },
  { ignores: ['src/vite-env.d.ts', 'dist', 'vitest.config.ts', 'vite.config.ts', 'coverage', '!.storybook'] },
  pluginJs.configs.recommended,
  ...pluginTSESLint.configs.strict,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  stylistic.configs.customize({
    semi: true,
    braceStyle: '1tbs',
  }),
  {
    plugins: {
      'react-refresh': pluginReactRefresh,
      'eslint-comments': pluginEslintComments,
      'react-hooks': reactHooks,
      typescriptEslint,
    },
    rules: {
      'no-console': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
      ...reactHooks.configs.recommended.rules,
    },
  },
  { files: ['**/gen'] },
  { rules: { '@typescript-eslint/no-extraneous-class': 'off' } },
];

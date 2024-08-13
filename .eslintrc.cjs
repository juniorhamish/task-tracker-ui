module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.app.json'],
  },
  plugins: ['react-refresh', '@typescript-eslint', 'eslint-comments', 'unicorn', 'promise'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.{ts,tsx}', '**/*.test.helpers.{ts,tsx}'],
        optionalDependencies: false,
      },
    ],
  },
};

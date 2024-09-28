// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['json', 'html', 'lcov'],
      include: ['src/**/*.@(js|jsx|mjs|ts|tsx)'],
      exclude: [
        'src/main.tsx',
        'src/gen/**/*.ts',
        'src/App.tsx',
        '**/*.@(stories|test).@(js|jsx|mjs|ts|tsx)',
        'src/logging/*',
      ],
    },
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './reports/junit-report.xml',
    },
  },
});

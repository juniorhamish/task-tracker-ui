// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest-setup.ts'],
        coverage: {
            provider: 'istanbul',
            reporter: ['json', 'html', 'lcov'],
            exclude: ["src/main.tsx"],
        },
    }
})

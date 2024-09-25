import '@testing-library/jest-dom/vitest';

vi.mock('./src/logging/Log', () => {
  return {
    log: console,
  };
});

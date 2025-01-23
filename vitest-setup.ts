import '@testing-library/jest-dom/vitest';

vi.mock('./src/logging/Log', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Plus_Jakarta_Sans: () => ({
    variable: '--font-jakarta',
    className: 'font-sans',
  }),
}));

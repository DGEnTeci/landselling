import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#061910',
          900: '#0A2619',
          850: '#0E3020',
          800: '#143D2A',
          700: '#1B4F37',
          600: '#256547',
          500: '#2E7D59',
        },
        emerald: {
          DEFAULT: '#059669',
          light: '#ECFDF5',
          dark: '#047857',
          hover: '#065F46',
          accent: '#10B981',
        },
        cream: {
          50: '#FDFCF9',
          100: '#FAF8F5',
          200: '#F3EFEA',
          300: '#E8E3DA',
        },
        gold: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
          dark: '#B45309',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(10, 38, 25, 0.06), 0 2px 6px -1px rgba(10, 38, 25, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(10, 38, 25, 0.12), 0 4px 10px -2px rgba(10, 38, 25, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;

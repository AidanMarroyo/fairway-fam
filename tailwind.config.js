import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      prefix: 'heroui',
      addCommonColors: false,
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
      layout: {
        borderRadius: '0.5rem',
        fontFamily: 'Inter, sans-serif',
      },
      themes: {
        light: {
          layout: {
            background: '#FFFFFF',
            text: '#1B1B1B',
          },
          colors: {
            primary: '#2E7D5E',
            secondary: '#A9C8A2',
            accent: '#F2ECE6',
            neutral: '#1B1B1B',
            muted: '#5E6B5E',
            white: '#FFFFFF',
            black: '#000000',
          },
        },
        dark: {
          layout: {
            background: '#1B1B1B',
            text: '#F2ECE6',
          },
          colors: {
            primary: '#A9C8A2', // flip these for contrast
            secondary: '#2E7D5E',
            accent: '#2E7D5E',
            neutral: '#F2ECE6',
            muted: '#9DAF9D',
            white: '#FFFFFF',
            black: '#000000',
          },
        },
      },
    }),
  ],
};

module.exports = config;

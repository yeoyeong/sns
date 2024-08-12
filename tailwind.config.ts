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
        blue: {
          DEFAULT: '#0057FF', // blue-main color
          200: '#1C20ED', // blue-200 color
        },
        purple: {
          100: '#6A0DAD', // default purple color
          200: '#8000FF', // purple-200 color
        },
        skyblue: {
          100: '#00ADEF', // skyblue color
        },
        yellow: {
          100: '#FFEB3B', // yellow color
        },
        error: {
          100: '#FF5722', // error color
        },
        white: {
          100: '#FFFFFF', // white color
        },
        black: {
          100: '#000000', // black color
        },
        gray: {
          400: '#4B5563', // gray-400 color
          300: '#9CA3AF', // gray-300 color
          200: '#E5E7EB', // gray-200 color
          100: '#F3F4F6', // gray-100 color
        },
      },
    },
  },
  plugins: [],
};

export default config;
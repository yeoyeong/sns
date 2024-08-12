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
        primary: {
          DEFAULT: '#1D4ED8', // 기본 primary 색상
          light: '#3B82F6', // 밝은 색상
          dark: '#1E3A8A', // 어두운 색상
        },
        secondary: {
          DEFAULT: '#D97706',
          light: '#F59E0B',
          dark: '#B45309',
        },
        // 다른 사용자 정의 색상
      },
    },
  },
  plugins: [],
};
export default config;
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // src 폴더 아래의 모든 파일을 포함
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.425rem', // 10px 크기 추가
      },
      colors: {
        blue: {
          default: '#0057FF', // blue-main color
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
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200%' },
          '100%': { backgroundPosition: '-200%' },
        },
      },
      backgroundImage: {
        'gradient-custom':
          'linear-gradient(to right, #D9D9D9 0%, #EDEEF1 50%, #D9D9D9 100%)',
      },
      backgroundSize: {
        custom: '300% 100%',
      },
    },
  },
  plugins: [],
};

export default config;
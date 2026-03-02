/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pantone: {
          blue: '#E8734A',
          ink: '#2C1810',
          slate: '#5C4033',
          snow: '#EDE8E0',
          mist: '#E6E0D6',
          border: '#D9D0C4',
        },
        cat: {
          dev: '#E8734A',
          study: '#74A892',
          book: '#C4956A',
          think: '#A3677E',
          'eng-dev': '#4B7BA6',
        },
        dark: {
          bg: '#1A1410',
          surface: '#252019',
          card: '#2E2820',
          border: '#3D3228',
          text: '#E8E0D6',
          muted: '#9A8E82',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-from-top-1': {
          '0%': { transform: 'translateY(-0.25rem)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'in': 'fade-in 0.2s ease-out, slide-in-from-top-1 0.2s ease-out',
      },
    },
  },
  plugins: [],
} 
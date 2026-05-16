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
          blue: '#CC785C',
          ink: '#141413',
          slate: '#252320',
          snow: '#FAF9F5',
          mist: '#F5F0E8',
          border: '#E6DFD8',
        },
        cat: {
          dev: '#CC785C',
          study: '#74A892',
          book: '#C4956A',
          think: '#A3677E',
          'eng-dev': '#4B7BA6',
        },
        dark: {
          bg: '#181715',
          surface: '#1F1E1B',
          card: '#252320',
          border: '#3D3228',
          text: '#FAF9F5',
          muted: '#A09D96',
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

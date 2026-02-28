/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pantone: {
          blue: '#D97757',
          ink: '#1A1A2E',
          slate: '#3D3D56',
          snow: '#FAF8F6',
          mist: '#F5F0EB',
          border: '#E8DED4',
        },
        cat: {
          dev: '#D97757',
          study: '#6B8F71',
          book: '#C2956B',
          think: '#8B5E6B',
          'eng-dev': '#5E7FA3',
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
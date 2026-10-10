/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#050b16',
          800: '#0a1220',
          700: '#101c2d',
          600: '#13263e',
          500: '#1a3557',
          400: '#3ba0ff',
          300: '#7fe7ff',
          200: '#d7f6ff',
          100: '#f5fbff'
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(59,160,255,0.45)',
        ring: '0 0 0 1px rgba(160,209,255,0.25)'
      }
    }
  },
  plugins: []
};

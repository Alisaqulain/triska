/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fefdfb',
          100: '#fdfaf5',
          200: '#faf5e8',
          300: '#f7f0db',
          400: '#f4ebce',
          500: '#f1e6c1',
        },
        beige: {
          50: '#faf9f6',
          100: '#f5f3ed',
          200: '#ebe7db',
          300: '#e1dbc9',
          400: '#d7cfb7',
          500: '#cdc3a5',
        },
        gold: {
          50: '#fef9e7',
          100: '#fef3cf',
          200: '#fde79f',
          300: '#fcdb6f',
          400: '#fbcf3f',
          500: '#fac30f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        '3d': '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        '3d-hover': '0 30px 80px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glow-gold': '0 0 30px rgba(250, 195, 15, 0.3), 0 10px 40px rgba(250, 195, 15, 0.2)',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
}


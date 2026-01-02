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
        ivory: {
          50: '#fefefc',
          100: '#fdfcf9',
          200: '#faf9f3',
          300: '#f7f6ed',
          400: '#f4f3e7',
          500: '#f1f0e1',
        },
        maroon: {
          50: '#fdf2f2',
          100: '#fce5e5',
          200: '#f9cccc',
          300: '#f5b2b2',
          400: '#f29999',
          500: '#ef7f7f',
          600: '#8b1a1a',
          700: '#6b1414',
          800: '#4c0f0f',
          900: '#2d0909',
        },
        royal: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        beige: {
          50: '#faf9f6',
          100: '#f5f3ed',
          200: '#ebe7db',
          300: '#e1dbc9',
          400: '#d7cfb7',
          500: '#cdc3a5',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Libre Baskerville', 'serif'],
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


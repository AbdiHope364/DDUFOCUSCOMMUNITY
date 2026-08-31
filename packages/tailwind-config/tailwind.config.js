/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        focus: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a6f6',
          500: '#0c8be7',
          600: '#026ec6',
          700: '#0357a0',
          800: '#074a83',
          900: '#0c3f6e',
          950: '#082849',
        },
        gold: {
          50: '#fbf9eb',
          100: '#f5f0ca',
          200: '#ede196',
          300: '#e3cd5c',
          400: '#dcb831',
          500: '#c59d1f',
          600: '#a37817',
          700: '#7d5516',
          800: '#674418',
          900: '#563819',
          950: '#311d0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto_400Regular'],
      },
      colors: {
        ihnbc: {
          orange: '#D6781E',
          black: '#111111',
          background: '#F8F8F8',
          muted: '#868686',
          lilac: '#F3E8F7',
          mint: '#EAF7F0',
          sky: '#EAF7FB',
          peach: '#FFF0E8',
        },
      },
    },
  },
  plugins: [],
};

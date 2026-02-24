import { colors, font } from './src/theme.js';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: font.sans,
      },
    },
  },
  plugins: [],
};

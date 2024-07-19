/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@repo/tailwind-config/tailwind.config.ts')],
  darkMode: ['class'],
  safelist: ['ProseMirror'],
  content: [
    // apps content
    './app/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*{.js,.ts,.jsx,.tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'maxWidth-1200': { max: '1200px' },
      },
      animation: {
        fadeAndShrink: 'fadeAndShrink 5s infinite',
        rise: 'rise 5s infinite',
        slideOutAndIn: 'slideOutAndIn 5s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

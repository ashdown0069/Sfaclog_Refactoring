/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@repo/tailwind-config/tailwind.config.ts')],
  content: [
    // apps content
    './app/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*{.js,.ts,.jsx,.tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@repo/tailwind-config/tailwind.config.ts")],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
};

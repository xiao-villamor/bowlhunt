/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {

    },
    screens: {
      'xs': '275px',
      ...defaultTheme.screens,
    },

  },
  safelist: [
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ],
  plugins: [require("daisyui")],

  daisyui : {
    themes: ["light", "dark","garden"],
  }
}


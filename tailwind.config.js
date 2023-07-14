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
    'bg-gray-500',
    'bg-red-600',
    'bg-cyan-300',
    'bg-red-500',
    "bg-amber-400",
    'bg-yellow-100',
    'bg-yellow-300',
    'bg-yellow-500',
    'bg-green-500',
    'bg-red-400',
    'bg-red-300',
    'bg-red-800',
    'bg-purple-500',
    'bg-rose-300',
    'bg-orange-500',
    'bg-emerald-500',
  ],
  plugins: [require("daisyui")],

  daisyui : {
    themes: ["light", "dark","garden"],
  }
}


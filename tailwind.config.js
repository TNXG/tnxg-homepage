/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

const twConfig = {
  darkMode: 'media',
  content: [
    "**/pages/*.{js,vue,ts}",
    "**/src/*.{js,vue,ts}",
    "**/src/**/*.{js,vue,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-green': {
          DEFAULT: 'linear-gradient(to right, #00f260, #0575e6)',
        },
      },
    },
  },
  plugins: [
    daisyui,
    require('flowbite/plugin')
  ],
};

export default twConfig;
/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

const twConfig = {
  content: [
    "**/**/*.{js,vue,ts}",
    "**/*{js,vue,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    require('flowbite/plugin')
  ],
};

export default twConfig;
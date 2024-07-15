/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

const twConfig = {
  content: [
    "**/**/*.{js,vue,ts}",
    "**/*{js,vue,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}

export default twConfig
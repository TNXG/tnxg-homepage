/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

const twConfig = {
  content: [
    "**/components/**/*.{js,vue,ts}",
    "**/layouts/**/*.vue",
    "**/pages/**/*.vue",
    "**/plugins/**/*.{js,ts}",
    "**/app.vue",
    "**/error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}

export default twConfig
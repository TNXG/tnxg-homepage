import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  icon: {
    collections: ['mdi', 'codicon'],
  },
  modules: ["nuxt-icon-tw", "@nuxtjs/tailwindcss"]
});
import { fileURLToPath } from 'url'
import { SiteConfig } from './src/config';

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon-tw", "nuxt-delay-hydration"],
  app: {
    head: {
      htmlAttrs: {
        lang: SiteConfig.Language
      },
      title: SiteConfig.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: SiteConfig.description }
      ],
    }
  },
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
  delayHydration: {
    mode: 'mount'
  }
});
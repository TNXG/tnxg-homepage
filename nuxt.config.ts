import { fileURLToPath } from 'url'
import { SiteConfig } from './src/config'

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon-tw",
    "nuxt-delay-hydration",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],
  site: {
    url: 'https://tnxg.top',
  },
  sitemap: {
    xslTips: false,
    xslColumns: [
      { label: 'URL', width: '75%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      { label: 'Change Frequency', select: 'sitemap:changefreq', width: '12.5%' },
    ],
  },
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
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js', type: 'text/javascript' }
      ]
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
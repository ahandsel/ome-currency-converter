// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-07-14',
  modules: ['@nuxtjs/i18n', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  i18n: {
    // Keep locale message files in the repo-root localization/ folder.
    restructureDir: 'localization',
    langDir: '.',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [{ code: 'en', language: 'en-US', file: 'en.json' }],
    detectBrowserLanguage: { useCookie: true },
  },
  routeRules: {
    '/': { prerender: true },
    '/api/rates/**': { swr: 3600 },
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
// Phase 5 deployment: static GitHub Pages via `pnpm generate` (Nitro `github-pages` preset).
// Project Pages URL: https://ahandsel.github.io/ome-currency-converter/
export default defineNuxtConfig({
  compatibilityDate: '2026-07-14',
  modules: ['@nuxtjs/i18n', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    // Project Pages serves under /<repo>/, not the user/org root.
    baseURL: '/ome-currency-converter/',
  },
  nitro: {
    // Extends the static preset; writes `.nojekyll` and prerenders `/404.html`.
    // Matches `.github/workflows/deploy.yml`, which publishes `.output/public`.
    preset: 'github-pages',
  },
  i18n: {
    // Keep locale message files in the repo-root localization/ folder.
    restructureDir: 'localization',
    langDir: '.',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'ja', language: 'ja-JP', file: 'ja.json' },
    ],
    detectBrowserLanguage: { useCookie: true },
  },
  routeRules: {
    '/': { prerender: true },
    '/api/rates/**': { swr: 3600 },
  },
});

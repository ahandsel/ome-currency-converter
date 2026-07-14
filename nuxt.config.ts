// https://nuxt.com/docs/api/configuration/nuxt-config
// Phase 5 deployment: static GitHub Pages via `pnpm generate` (Nitro `github-pages` preset).
// Project Pages URL: https://ahandsel.github.io/ome-currency-converter/
export default defineNuxtConfig({
  compatibilityDate: '2026-07-14',
  modules: ['@nuxt/icon', '@nuxtjs/i18n', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    // Project Pages serves under /<repo>/, not the user/org root.
    baseURL: '/ome-currency-converter/',
  },
  // Static GitHub Pages has no Nitro runtime, so icons must ship in the
  // client bundle instead of relying on `/api/_nuxt_icon` or the Iconify API.
  icon: {
    provider: 'none',
    clientBundle: {
      scan: true,
      icons: [
        'material-symbols:home',
        'material-symbols:language',
        'material-symbols:rocket-launch',
      ],
    },
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

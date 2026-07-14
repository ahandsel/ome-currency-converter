# ome-currency-converter

A web app that generates an iPhone wallpaper showing live travel exchange rates.
Rates come from the European Central Bank via the Frankfurter API.

The app is built on [Nuxt](https://nuxt.com/) 4, the full-stack Vue framework.
Phase 0 of [docs/technical-plan.md](docs/technical-plan.md), the migration from the old Vite prototype with cards-mode feature parity, is complete.
Phases 1 to 5 (photo backgrounds, increment table mode, positioning, Japanese localization, and polish) are still pending.


## Project structure

* `nuxt.config.ts` - Nuxt configuration: modules, global CSS, i18n, and route rules.
* `app/` - application source code.
  * `app/app.vue` and `app/pages/` - the root component and the single page.
  * `app/components/` - control panel, currency controls, and wallpaper preview components.
  * `app/composables/` - wallpaper state (persisted to `localStorage`) and rates fetching.
  * `app/utils/` - the pure canvas renderer.
  * `app/assets/css/` - the global stylesheet.
* `server/` - Nitro server code; `server/api/rates/[base].get.js` is a cached proxy for the Frankfurter API.
* `shared/` - code used by both the app and the server, such as the currency metadata in `shared/utils/currencies.js`.
* `public/` - static files copied verbatim into the build output (for example, `favicon.ico`).
* `localization/` - locale message files for the `@nuxtjs/i18n` module.
* `tests/` - automated tests.
* `.nuxt/` and `.output/` - build output (generated, git-ignored).

Each folder has its own `README.md` with details, and the project structure section of [docs/technical-plan.md](docs/technical-plan.md) maps the old `src/` files to this layout.


## Development

This project uses [Nuxt](https://nuxt.com/) and [pnpm](https://pnpm.io/).

* `pnpm install` - install dependencies.
* `pnpm dev` - start the Nuxt dev server with hot module replacement.
* `pnpm build` - build the server-rendered production app into `.output/`.
* `pnpm generate` - prerender the site as a static export in `.output/public/`.
* `pnpm preview` - preview the production build locally.
* `pnpm lint` - format code with Prettier and fix Markdown with markdownlint-cli2.
* `pnpm test-unit` - run the Vitest unit tests.
* `pnpm test` - run lint, the file name check, the license check, and the unit tests.

The site deploys to GitHub Pages through [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which runs `pnpm generate` and publishes `.output/public`. On a static host the rates server route does not exist, so the app falls back to calling the Frankfurter API directly from the browser.

# tests

Automated tests for the Ome Currency Converter web app.


## Layout

* `unit/` - Vitest unit tests for pure logic that runs without a browser or a Nuxt server.
  * `backgrounds.test.js` - covers the curated manifest in `app/utils/backgrounds.js`: twelve unique ids, required fields, six-digit `dominantColor` hex values for scrim tinting, Unsplash CDN and UTM shapes, and `getBackground` lookup.
  * `currencies.test.js` - covers `formatAmount` and `currencyMeta` from `shared/utils/currencies.js`: per-currency decimal places, thousands separators, and the fallback metadata for unknown currency codes.
  * `currency-selection.test.js` - covers `applyCurrencyTap` from `shared/utils/currency-selection.js`: home-only, travel-only, re-tap, and rotate-on-third-tap transitions.
  * `ladder.test.js` - covers `buildLadder` and `defaultStartAmount` from `shared/utils/ladder.js`: arithmetic series examples, yen/dollar defaults, and start/step/row-count clamps.
  * `rates-route.test.js` - covers the handler in `server/api/rates/[base].get.js` with the Nitro auto-imports stubbed as globals and a mocked Frankfurter response: base code uppercasing, the exact `{ base, date, rates }` response shape, and the 400 error for unknown or missing base currencies.
  * `wallpaper.test.js` - covers `formatWallpaperDate` from `app/utils/wallpaper.js` for English and Japanese locales. Canvas scrim helpers stay module-private and are not unit-tested here.


## Running the tests

* `pnpm test-unit` - run the Vitest unit tests once.
* `pnpm test` - run the full check suite (lint, file name check, license check, and the unit tests).

The unit tests are deterministic and make no network requests. Vitest is configured in `vitest.config.mjs` at the repository root, which sets the `node` test environment and maps the `#shared` alias to the `shared/` directory.

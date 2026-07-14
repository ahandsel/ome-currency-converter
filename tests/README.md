# tests

Automated tests for the Ome Currency Converter web app.


## Layout

* `unit/` - Vitest unit tests for pure logic that runs without a browser or a Nuxt server.
  * `currencies.test.js` - covers `formatAmount` and `currencyMeta` from `shared/utils/currencies.js`: per-currency decimal places, thousands separators, and the fallback metadata for unknown currency codes.
  * `rates-route.test.js` - covers the handler in `server/api/rates/[base].get.js` with the Nitro auto-imports stubbed as globals and a mocked Frankfurter response: base code uppercasing, the exact `{ base, date, rates }` response shape, and the 400 error for unknown or missing base currencies.


## Running the tests

* `pnpm test-unit` - run the Vitest unit tests once.
* `pnpm test` - run the full check suite (lint, file name check, license check, and the unit tests).

The unit tests are deterministic and make no network requests. Vitest is configured in `vitest.config.mjs` at the repository root, which sets the `node` test environment and maps the `#shared` alias to the `shared/` directory.

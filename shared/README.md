# shared

Code shared between the app and the server. Nuxt auto-imports modules in `shared/utils/` on both sides, and they are also importable through the `#shared` alias.


## Contents

* [utils/currencies.js](utils/currencies.js) - built-in metadata for the currencies supported by the Frankfurter API (`CURRENCIES`), plus `currencyMeta`, locale-aware `formatAmount`, and `currencyDisplayName` (`Intl.DisplayNames`). The server route validates base codes against this list, and the app uses it for the currency wall and the renderer.
* [utils/ladder.js](utils/ladder.js) - pure `buildLadder({ step, rowCount, startAmount })` and `defaultStartAmount(code)` helpers for the increment-table wallpaper.
* [utils/currency-selection.js](utils/currency-selection.js) - pure `applyCurrencyTap({ home, travel }, code)` helper for the currency-wall home and travel state machine.

# shared

Code shared between the app and the server. Nuxt auto-imports modules in `shared/utils/` on both sides, and they are also importable through the `#shared` alias.


## Contents

* [utils/currencies.js](utils/currencies.js) - built-in metadata for the currencies supported by the Frankfurter API (`CURRENCIES`), plus the `currencyMeta` and `formatAmount` helpers. The server route validates base codes against this list, and the app uses it for the currency wall and the renderer.

Phase 2 of [docs/technical-plan.md](../docs/technical-plan.md) adds `utils/ladder.js`, the pure amount ladder builder, to this folder.

# localization

Locale message files for the Ome Currency Converter web app. The app supports an English and Japanese interface.


## Contents

* [en.json](en.json) - English UI strings. English is the default locale and the source of truth for message keys.
* [ja.json](ja.json) - Japanese UI strings, translated from `en.json` following [docs/glossary.yaml](../docs/glossary.yaml) and the [Japanese general style guide](../docs/general-style-guide-japanese.md).


## Key groups

* `controls.*` - settings column labels and hints.
* `status.*` - shared status line and preview empty or error hints (`incompletePair`, `waitingRates`, `ratesUnavailable`, `backgroundFallback`, fetch and download errors).
* `preview.*` - wallpaper preview chrome, including `photoCredit` used by `attribution-note.vue` and the canvas credit.
* `wallpaper.*` - strings painted on the wallpaper (default title, updated date, rates credit).
* `footer.*` - site footer rates attribution.


## Notes

The files are wired to the `@nuxtjs/i18n` module through `restructureDir: "localization"` in [nuxt.config.ts](../nuxt.config.ts), so the locale files stay in this folder instead of the module's default `i18n/` directory. See the internationalization section of [docs/technical-plan.md](../docs/technical-plan.md) for the full setup.

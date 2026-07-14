# localization

Locale message files for the Ome Currency Converter web app. The app supports an English and Japanese interface.


## Contents

* [en.json](en.json) - English UI strings. English is the default locale and the source of truth for message keys.


## Planned contents

* `ja.json` - Japanese UI strings, translated from `en.json` following [docs/glossary.yaml](../docs/glossary.yaml) and the [Japanese general style guide](../docs/general-style-guide-japanese.md). Planned for Phase 4 of [docs/technical-plan.md](../docs/technical-plan.md).


## Notes

The files are wired to the `@nuxtjs/i18n` module through `restructureDir: "localization"` in [nuxt.config.ts](../nuxt.config.ts), so the locale files stay in this folder instead of the module's default `i18n/` directory. See the internationalization section of [docs/technical-plan.md](../docs/technical-plan.md) for the full setup.

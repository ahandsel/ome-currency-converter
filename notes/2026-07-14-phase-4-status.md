# Phase 4 status: Japanese localization

Status as of 2026-07-14.
Phase 4 of [docs/technical-plan.md](../docs/technical-plan.md) is implemented and verified, and is waiting for maintainer approval at the phase-end checkpoint.
Nothing has been committed yet for this phase.


## What was done

* Added `localization/ja.json` with full key parity to `en.json`, using glossary terms (自国通貨, 旅行先通貨, 刻み, 行数, 増分表).
* Registered the `ja` locale in `nuxt.config.ts`.
* Added `language-switcher.vue`, styles, and wiring in `control-panel.vue`.
* Localized amounts and currency display names through `Intl.NumberFormat` and `Intl.DisplayNames`.
* Passed translated wallpaper footer and photo-credit labels into the pure renderer with an active locale.


## Verification

Gate commands are recorded in the phase-end report after verification runs.
Manual checks for the maintainer: switch English/Japanese and confirm UI, wallpaper footer, photo credit, and currency aria names update; longer Japanese labels still fit the control layout.


## Open for later phases

* Phase 5 - attribution note component, responsive polish, empty/error states, deployment preset.

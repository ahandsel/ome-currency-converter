# Phase 2 status: increment-table wallpaper

Status as of 2026-07-14.
Phase 2 of [docs/technical-plan.md](../docs/technical-plan.md) is implemented and verified, and is waiting for maintainer approval at the phase-end checkpoint.
Nothing has been committed yet for this phase.


## What was done

* Added `shared/utils/ladder.js` (`buildLadder`) and Vitest coverage for plan examples and clamps.
* Added `shared/utils/currency-selection.js` (`applyCurrencyTap`) and Vitest coverage for the home/travel wall state machine.
* Migrated `use-wallpaper-state.js` to `home` / `travel` / ladder fields, with cards-era localStorage migration and key stripping.
* Replaced destination-cards drawing in `app/utils/wallpaper.js` with the centered increment-table layout (photo and gradient backgrounds kept).
* Rewrote `currency-controls.vue` as a currency wall plus step, row count, and include-one inputs.
* Removed reference-amount UI from `control-panel.vue` and added home/travel chip styles in `main.css`.
* Wired `index.vue`, `use-rates.js`, and `wallpaper-preview.vue` for home-based rates, ladder + rate render data, incomplete-pair empty state, and `wallpaper-<home>-<travel>.png` download.
* Removed obsolete cards-only English i18n keys.
* Updated folder READMEs for the new modules and component roles.


## Verification

* `pnpm test-unit` - 33 tests passed.
* `pnpm check-license` - all dependencies confirmed.
* `pnpm test-names` - fails on pre-existing `notes/background-curation-proposal.md` (missing date prefix); not introduced by Phase 2.
* `pnpm lint` - blocked: markdownlint/prettier autofix currently corrupts Markdown across the repo (for example headings becoming `*# Heading`). Phase 2 code was prettier-checked file-by-file.
* `pnpm generate` - failed with missing `esbuild` module for `@nuxtjs/i18n` (environment issue; not introduced by Phase 2 code changes).
* Manual checks remaining for the maintainer: iPhone sizes without clipping; incomplete pair never invents a partner; photo PNG export still untainted.


## Open for later phases

* Phase 3 - center or left content position and left-weighted scrim.
* Phase 4 - Japanese localization and language switcher.
* Phase 5 - attribution note component, responsive polish, empty/error states.

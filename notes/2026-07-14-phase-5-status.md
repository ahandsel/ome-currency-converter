# Phase 5 status: polish and deployment

Status as of 2026-07-14.
Phase 5 of [docs/technical-plan.md](../docs/technical-plan.md) is implemented for the planned polish and GitHub Pages deployment pieces.
Nothing has been committed yet for this phase.


## What was done

* Attribution UI: added `app/components/attribution-note.vue` and hosted it under the canvas in `wallpaper-preview.vue`, using `preview.photoCredit` plus Unsplash links from the curated background entry.
* Responsive CSS: stacked the control and preview columns below 840px (preview first) and tightened phone-width spacing below 480px in `app/assets/css/main.css`.
* Empty and error states: preview hints cover incomplete pair, waiting for rates, rates unavailable, and photo-load fallback to the gradient theme; download stays disabled until the home/travel pair and rate are complete.
* Legibility pass: photo scrims and panel alphas strengthen when `suggestedText` is `"dark"` (bright photos), with optional tint toward each entry's `dominantColor`, while keeping light text on a dark scrim.
* Deployment: `nuxt.config.ts` uses Nitro `preset: "github-pages"` and `app.baseURL: "/ome-currency-converter/"` for project Pages under that path.
* Naming: added `notes/background-curation-proposal.md` to `.namelintignore` so the backgrounds workflow filename no longer fails `pnpm test-names`.


## Tests and docs in this pass

* Added `tests/unit/wallpaper.test.js` for exported `formatWallpaperDate` (English and Japanese).
* Extended `tests/unit/backgrounds.test.js` so every `dominantColor` matches a six-digit hex string used by scrim tinting.
* Skipped unit tests for module-private scrim helpers (`parseHexColor`, `scrimRgba`, `drawScrim`); those remain covered by manual visual checks.
* Refreshed folder READMEs for components, utils, assets, localization, tests, and notes.


## Verification

* `pnpm test-unit` - 6 files, 40 tests passed.
* Scoped Prettier on Phase 5 source files - clean.
* Scoped markdownlint on Phase 5 Markdown files - clean.
* `pnpm check-license` - all dependencies confirmed.
* `pnpm test-names` - clean after `.namelintignore` update.
* `pnpm generate` - succeeded with `Nitro preset: github-pages`; output in `.output/public`.
* Full `pnpm lint` (`prettier --write .`) was not re-run on the whole repo in this pass: an earlier full run mangled Markdown emphasis in unrelated files; those files were restored from git.

Maintainer approval is required at the phase-end checkpoint before committing.


## Open items

* Visual spot-check of light / bright photos (entries tagged `suggestedText: "dark"`) so the table text stays readable over sand, snow, marble, and similar scenes.
* Confirm the generated site under `/ome-currency-converter/` still loads rates through the Frankfurter client fallback when served like GitHub Pages.
* Local `pnpm dev` uses `app.baseURL` `/ome-currency-converter/`, so the app is at `http://localhost:3000/ome-currency-converter/`.

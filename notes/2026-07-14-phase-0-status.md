# Phase 0 status: Nuxt migration with feature parity

Status as of 2026-07-14.
Phase 0 of [docs/technical-plan.md](../docs/technical-plan.md) is implemented and verified, and is waiting for maintainer approval at the phase-end checkpoint.
Nothing has been committed yet.


## What was done

* Scaffolded Nuxt 4.4.8 with `@nuxtjs/i18n@10.4.0` and `@vueuse/nuxt`; `nuxt.config.ts` wires i18n to the repo-root `localization/` folder and sets the route rules from the plan.
* Ported the pure canvas renderer to `app/utils/wallpaper.js` and the currency metadata to `shared/utils/currencies.js`, byte-identical except the import line.
* Added the cached rates proxy `server/api/rates/[base].get.js` (one-hour cache, stale-while-revalidate, 400 for unknown codes) and `app/composables/use-rates.js` with a session-sticky direct-to-Frankfurter fallback for static hosts.
* Rebuilt the cards-mode UI as components: `app/pages/index.vue`, `control-panel.vue`, `currency-controls.vue`, and the client-only `wallpaper-preview.vue` with PNG download.
* Added `app/composables/use-wallpaper-state.js` with the full 13-field state shape from the plan, persisted under the prototype `STORAGE_KEY` so saved setups carry over.
* Externalized every UI string into `localization/en.json`; English is the only registered locale until Phase 4.
* Added Vitest: `vitest.config.mjs` plus 11 unit tests for `formatAmount`, `currencyMeta`, and the rates route with a mocked Frankfurter response; `pnpm test-unit` is wired into `pnpm test`.
* Removed the legacy `index.html`, `vite.config.js`, and `src/`; switched `.github/workflows/deploy.yml` to `pnpm generate` and `.output/public`.
* Updated the docs: root `README.md`, the stale `AGENTS.md` sections, `localization/README.md`, `public/README.md`, and new READMEs across `app/`, `server/`, and `shared/`.
* Verification results: `pnpm lint`, `pnpm test`, and `pnpm generate` all pass; `pnpm dev` serves the page and the rates route correctly.


## What still needs to be done

* Maintainer approval of the Phase 0 result, then the commit (drafted with the `ai-commit` skill).
* Manual browser checks that could not run headlessly: PNG export produces a correct file, each iPhone size renders without clipping, a returning user's saved settings carry over, and the static export fetches rates through the client fallback.
* Phase 1 - backgrounds module and photo rendering, starting with the curation proposal note and its approval checkpoint.
* Phase 2 - increment table mode (`shared/utils/ladder.js`, mode toggle, and table controls), flipping the default mode to `table`.
* Phase 3 - content positioning (center or left).
* Phase 4 - Japanese localization (`localization/ja.json`, language switcher, and Intl-based currency names and number formats).
* Phase 5 - polish and deployment preset selection.
* Component tests from the testing notes (control panel by mode, background picker fallback) once those features exist in Phases 1 and 2.


## Issues that need maintainer review

* `deploy.yml` now runs `pnpm generate` and uploads `.output/public`; the plan defers the deployment choice to Phase 5, but the old workflow would have failed on the next push to main. Revert is one file if a red deploy is preferred until Phase 5.
* `license-manager.config.cjs` gained entries for four new transitive dependencies: `caniuse-lite` (CC-BY-4.0 data), `node-forge` (dual license, BSD-3-Clause elected), `tosource` (Zlib, missing `license` field upstream), and the `(MIT OR CC0-1.0)` expression for `type-fest`.
* `app/utils/wallpaper.js` imports currencies via the `#shared` alias instead of a relative path, because the relative import broke `pnpm generate`; this is the only deviation from the "port unchanged" instruction, and `docs/technical-plan.md` may deserve a one-line update after approval.
* The old prototype files were never committed to git, so their deletion is unrecoverable from history; a backup copy sits in the session scratchpad, which is temporary. Decide whether that is acceptable or whether the prototype should be preserved somewhere durable first.
* The base-currency dropdown keeps the prototype's em dash separator inside option labels for visual parity, which conflicts with the repo hyphen rule; flag if it should change.
* `public/README.md` is copied verbatim into the deployed site by Nuxt; harmless, and the same was true under Vite.
* pnpm warns that `package.json` sets both `packageManager` and `devEngines.packageManager` (pre-existing).
* Canvas-drawn strings stay hardcoded in the renderer until Phase 4 passes translated strings in; `wallpaper.defaultTitle` already sits unused in `en.json` for that purpose.


## Lessons to implement in later phases

* Include `pnpm generate` (or at least `pnpm build`) in every phase gate; the dev server resolved an import that the production build could not, so a dev-only smoke test is not enough.
* Prefer the `#shared` alias over deep relative paths for any module that crosses the `app/`, `server/`, or `shared/` boundary; the alias resolves in dev, build, and Vitest.
* Run `pnpm run check-license` immediately after adding dependencies; large dependency trees almost always introduce a license the allowlist does not cover yet.
* Framework file conventions can conflict with the repo name linter (the `[base].get.js` route); `.namelintignore` with a comment is the intended escape hatch.
* When parallel subagents share a repo, have each format only its own files; a repo-wide `prettier --write` from concurrent agents would race.
* Defining the shared contracts (state shape, exports, message keys, and API shape) before dispatching parallel subagents worked well; the only integration fixes needed were one import line and doc touch-ups.

# Phase 1 status: backgrounds module and photo rendering

Status as of 2026-07-14.
Phase 1 of [docs/technical-plan.md](../docs/technical-plan.md) is implemented and verified, and is waiting for maintainer approval at the phase-end checkpoint.
Nothing has been committed yet for this phase.


## What was done

* Curated and maintainer-approved 12 Unsplash photos in [background-curation-proposal.md](background-curation-proposal.md).
* Added `app/utils/backgrounds.js` with `BACKGROUNDS`, `getBackground`, and `loadBackgroundImage` (CORS-safe `crossOrigin`, in-memory cache, retry on failure).
* Updated `app/utils/wallpaper.js` to draw cover-fit photos, a dark legibility scrim, and a bottom photographer credit; gradient themes remain the fallback.
* Added `app/components/background-picker.vue`, wired it into the control panel, and styled the thumbnail grid in `main.css`.
* Updated `wallpaper-preview.vue` to load the selected photo asynchronously with race-safe handling and gradient fallback on load failure.
* Added English strings: `controls.background`, `controls.backgroundHint`, `controls.backgroundNone`, `preview.photoCredit`.
* Added Vitest coverage for the manifest shape and `getBackground`.


## Verification

* `pnpm lint` - pass
* `pnpm test` - pass (including new backgrounds unit tests after Wave 3)
* `pnpm generate` - pass


## Manual checks still for the maintainer

* Select a photo and confirm the preview paints the cover-fit image with scrim and credit.
* Download a PNG with a photo selected and confirm the canvas is not tainted (export succeeds).
* Confirm a failed or blocked background image falls back to the gradient theme without breaking download.


## Open for later phases

* Phase 2 replaces cards with the increment table; photo backgrounds stay.
* Phase 3 weights the scrim for left position.
* Phase 5 adds a dedicated attribution note component beside the preview; the picker already shows a credit line.

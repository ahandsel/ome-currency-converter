# Ticket 003: Unify themes into the background picker


## Overview

Merge the separate theme selector and background picker into one background control. Gradient themes become first-class background options in the same thumbnail grid as curated photos. Add solid black and solid white as background options as well.

Today the user picks a theme from a dropdown, then optionally picks a photo. Choosing "none" for the photo falls back to the selected gradient theme. That split is confusing: theme only matters when no photo is selected, yet the theme control always sits above the photo grid.


## Context

Background and theme are two separate controls in [app/components/control-panel.vue](../app/components/control-panel.vue):

* Theme: a `<select>` bound to `state.theme`, driven by `THEMES` in [app/utils/wallpaper.js](../app/utils/wallpaper.js) (midnight, sunset, ocean, forest, mono, paper).
* Background: [app/components/background-picker.vue](../app/components/background-picker.vue) sets `state.backgroundId` to a curated photo id, or `null` for "none".

The canvas renderer in `wallpaper.js` draws a photo when one is loaded; otherwise it draws `drawGradientBackground` from the selected theme. Photo selection and theme selection do not interact in the UI beyond that fallback.

[docs/product-spec.md](../docs/product-spec.md) still describes curated photos plus a gradient theme fallback. [docs/backgrounds.md](../docs/backgrounds.md) only documents photo entries. This ticket makes non-photo backgrounds selectable the same way photos are.


## Objectives

1. Remove the standalone theme dropdown from the control panel.
2. Present every former gradient theme as a selectable background option in the background picker, alongside the curated photos.
3. Add a completely black background option and a completely white background option.
4. Keep a single selection model: one chosen background at a time (photo, gradient, or solid).
5. Preserve PNG export, text legibility (light vs dark grounds), and persistence across reloads.


## Scope


### Background catalog

* Extend the background catalog so entries can be photos, gradients, or solids. Prefer one unified list (or a clear composed picker list) over keeping photos and themes as unrelated concepts in the UI.
* Move or re-home the current `THEMES` entries (midnight, sunset, ocean, forest, mono, paper) into that catalog as gradient options with thumbnail-friendly previews (CSS gradient swatches are fine; no need for image URLs).
* Add solid options, for example:
  * `solid-black` - fill `#000000`, light text.
  * `solid-white` - fill `#ffffff`, dark text.
* Keep existing photo entries and attribution behavior unchanged for Unsplash photos.


### State and renderer

* Replace the dual `theme` + `backgroundId` (null means gradient) model with a single background selection id that can identify a photo, gradient, or solid.
* Migrate persisted `localStorage` state: if a user had `backgroundId: null` and `theme: "ocean"`, restore to the ocean gradient background id. If they had a photo selected, keep that photo and ignore the old theme for the painted background.
* Update `renderWallpaper` so gradients and solids are drawn from the selected background entry. Do not draw a photo scrim or photographer credit on non-photo backgrounds.
* Decide text and panel colors from the background entry (`suggestedText` / `dark`), including solids.


### UI

* Update `background-picker.vue` so the grid shows photos, gradient swatches, and solid swatches in one place. Remove the "none" option once every former theme is a real selectable option.
* Remove the theme `<select>` from `control-panel.vue`.
* Update locale strings: drop or unused-key-clean `controls.theme` if removed; revise `controls.backgroundHint` and `controls.backgroundNone` as needed.
* Group or order options so solids and gradients are easy to find (for example, solids and gradients first, then photos), without redesigning the whole control panel.


### Docs and tests

* Update [docs/backgrounds.md](../docs/backgrounds.md), [docs/product-spec.md](../docs/product-spec.md), and [docs/technical-plan.md](../docs/technical-plan.md) so backgrounds include gradients and solids, not only photos with a separate theme fallback.
* Update unit tests for backgrounds, wallpaper rendering, and state migration.
* Run `pnpm lint` and `pnpm test`.


## Acceptance criteria

* The control panel has no separate theme dropdown.
* The background picker lets the user choose curated photos, the former gradient themes, solid black, and solid white from one grid.
* Selecting any background updates the live preview and the exported PNG.
* Solid black paints a full black canvas with light (readable) table text; solid white paints a full white canvas with dark (readable) table text.
* Gradient options match the previous `THEMES` looks (same stops and dark/light text behavior).
* Photo backgrounds still show attribution in the UI and on the wallpaper; non-photo backgrounds do not show a photo credit.
* Saved settings migrate: old `theme` + `backgroundId: null` maps to the matching gradient background; old photo selections still load.
* `pnpm lint` and `pnpm test` pass.


## Out of scope

* Adding or swapping Unsplash photos.
* New background types beyond the current themes plus black and white (no patterns, user uploads, or live Unsplash search).
* Redesigning the rest of the control panel layout (see the mobile layout ticket separately).
* Changing ladder math, currency selection, rates, or device sizes.


## Open questions

1. Should gradient and solid swatches live in `app/utils/backgrounds.js` with a `type: "photo" | "gradient" | "solid"` field, or stay defined next to the renderer and only be composed in the picker?
2. Default background after migration and for new users: keep midnight (or its new id), or choose solid black / another option?
3. Picker ordering: solids then gradients then photos, or photos first with a "Colors" subsection?


## References

* [app/components/background-picker.vue](../app/components/background-picker.vue) - photo grid and "none" fallback.
* [app/components/control-panel.vue](../app/components/control-panel.vue) - theme `<select>` and background picker placement.
* [app/utils/wallpaper.js](../app/utils/wallpaper.js) - `THEMES`, `drawGradientBackground`, and text color from `theme.dark`.
* [app/utils/backgrounds.js](../app/utils/backgrounds.js) - curated photo manifest.
* [app/composables/use-wallpaper-state.js](../app/composables/use-wallpaper-state.js) - persisted `theme` and `backgroundId`.
* [docs/backgrounds.md](../docs/backgrounds.md) - photo-only background docs today.
* [docs/product-spec.md](../docs/product-spec.md) - background and gradient fallback wording.


## Workflow

Per [tickets/README.md](README.md), create a branch named `ticket/003` and open a pull request when the work is done.

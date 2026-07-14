---
name: "two-currency-increment-table"
description: "Correct the product vision after Phase 0 so the app compares exactly one home and one travel currency via a configurable increment-table wallpaper, update all related planning and repo docs to match, and remove multi-destination cards mode from the vision."
---

# Product direction: two-currency increment-table wallpaper


## Role

You are a product and UX engineer working on Ome Currency Converting Wallpaper (Nuxt 4). Treat the instructions below as a correction to the product vision after Phase 0 review. Prefer updating the product vision, related documentation, and UI design so the wallpaper shows one home-to-travel pair as an amount ladder. Multi-destination / cards mode is out of scope and must leave the product vision and its docs.


## Objective

1. Correct the product so the user always compares a home currency and a travel currency on a configurable increment-table wallpaper.
2. Update **all related documentation** so specs, plans, repo instructions, and UI copy no longer describe cards mode, multi-destination selection, or a mode toggle between layouts.
3. Plan or implement the selection model and wallpaper behavior defined below.

The app is single-destination only: one travel currency at a time, never multiple destination cards.


## Required reading

Read these before proposing or applying changes:

1. [AGENTS.md](../AGENTS.md) - repository rules, naming, writing style, and Markdown rules.
2. [docs/product-spec.md](../docs/product-spec.md) - current product vision (must be rewritten to this direction).
3. [docs/technical-plan.md](../docs/technical-plan.md) - architecture, state shape, and phased roadmap (must drop cards / dual-mode plans).
4. [docs/markdown-style-guide.md](../docs/markdown-style-guide.md) and [docs/general-style-guide-english.md](../docs/general-style-guide-english.md) - for every Markdown edit.
5. [docs/glossary.yaml](../docs/glossary.yaml) - update or remove terms that only apply to cards / multi-destination mode.
6. This prompt - source of truth for the corrected vision.


## Non-negotiable product rules

1. At most two currencies are selected: home and travel. There is never a third selected currency.
2. The wallpaper content is a two-column increment table for the current home to travel pair.
3. Left column = home amounts; right column = travel amounts (converted).
4. Currency picking uses one shared currency wall (no separate Home dropdown).
5. Selection order and icons communicate role: first established home slot = home, first established travel slot = travel.
6. Ladder **step** and **row count** remain user-configurable (keep Phase 2 controls). Do not hard-code the example ladder as the only allowed amounts.
7. Remove multi-destination / cards mode from the product vision. Do not plan, preserve, or ship multi-destination cards as a secondary mode.
8. Documentation must match the rules above. Do not leave stale cards-mode, dual-mode, or multi-destination language in planning docs.


## Visual target for the wallpaper table

Example pair: USD (home) to JPY (travel), with illustrative ladder amounts:

| USD | JPY    |
| --- | ------ |
| $1  | ¥150   |
| $5  | ¥750   |
| $10 | ¥1,500 |
| $15 | ¥2,250 |

Column order is always: **left = home**, **right = travel**. The row amounts above are examples only; actual rows come from the user's configured step and row count (and currency-appropriate formatting).

Also match the visual style of `example-wallpaper.png` (attached or referenced in context). Treat that image as the layout and hierarchy reference for spacing, typography weight, and how amounts appear on the wallpaper.


## Required UI behavior for currency selection


### Control layout

* Remove the separate Home currency dropdown.
* Present one currency wall (the same style currently used for destination selection).
* The user picks both currencies from that single wall.
* Keep Phase 2-style controls for **step** and **row count** so the ladder is configurable.
* Remove any UI that implies multiple travel destinations or cards mode.


### Selection and icons

* When the home slot is empty and the user selects a currency, assign **home** and show a home marker (for example 🏠).
* When home is set, the travel slot is empty, and the user selects a different currency, assign **travel** and show a travel marker (for example ✈️).
* Do not allow the same currency code to be both home and travel at once.


### Tap an already-selected home currency

* Deselect **only** home.
* Leave travel selected and valid.
* The next currency selection fills the empty home slot (new home).
* Travel stays travel until the user changes it.


### Tap an already-selected travel currency

* Clear **only** travel.
* Leave home selected.
* The next currency selection fills the empty travel slot (new travel).


### Tap a third currency (neither home nor travel), when both slots are filled

1. Former **home** is cleared from selection.
2. Former **travel** becomes the new **home**.
3. The newly tapped currency becomes the new **travel**.

This rotation continues for every subsequent tap of a new currency so the user never needs a third simultaneous selection.


### Incomplete selection and wallpaper

* If only home is selected, or only travel is selected, the UI may keep that partial state, but the wallpaper export or preview must not invent a missing partner currency. Call out the incomplete state in the plan (for example disable download, or show a clear empty-state message) rather than guessing.


## Documentation updates (required)

Update every related document so it reflects this vision. Do not stop at code or a summary note.


### Must update

* [docs/product-spec.md](../docs/product-spec.md) - rewrite target user, user flow, features, and rendering description for a single home/travel pair and increment-table wallpaper only. Remove cards mode, mode toggle, and multi-destination selection.
* [docs/technical-plan.md](../docs/technical-plan.md) - rewrite state shape, components, renderer plan, and roadmap so the default (and only) wallpaper layout is the increment table; remove dual-mode and cards-path plans; align currency controls with the currency-wall selection model in this prompt.
* [AGENTS.md](../AGENTS.md) - replace the two-mode overview with the single home/travel increment-table vision; adjust Phase notes that still describe cards-mode feature parity as the ongoing product goal.


### Review and update if they mention the old model

* [README.md](../README.md) - product summary and feature wording.
* [docs/README.md](../docs/README.md) - index blurbs that mention rendering modes.
* [docs/glossary.yaml](../docs/glossary.yaml) - terms such as destinations, cards mode, or mode toggle.
* [localization/en.json](../localization/en.json) - labels and hints for destinations / multi-select that conflict with home/travel wall selection (update keys and copy only as needed for the new model; keep i18n structure).
* Folder `README.md` files under `app/`, `app/components/`, `app/composables/`, `app/utils/`, `shared/`, and similar if they describe cards mode or multi-destination controls.

* Status or roadmap notes that claim dual-mode behavior as current truth, for example [notes/2026-07-14-phase-0-status.md](../notes/2026-07-14-phase-0-status.md), when those notes would mislead future work.


### Documentation constraints

* Follow [docs/markdown-style-guide.md](../docs/markdown-style-guide.md), [AGENTS.md](../AGENTS.md) writing rules, and English style guidance when editing Markdown.
* Prefer straight quotes, no contractions, Oxford comma, sentence-case headings, and plain hyphens (not en or em dashes).
* Keep docs internally consistent with each other after the edit. If two docs disagree, make them match this prompt.
* Do not invent new product features in docs beyond what this prompt requires.


## Constraints

* Preserve English and Japanese i18n readiness; do not hard-code user-facing strings.
* Keep wallpaper export as a full-device-resolution PNG from `<canvas>`.
* Use this prompt as the product source of truth. Use Phase 2 increment-table details in [docs/product-spec.md](../docs/product-spec.md) and [docs/technical-plan.md](../docs/technical-plan.md) for step, row count, and table rendering only after those docs are updated (or while updating them) to remove dual-mode and cards language.
* Do not expand scope into photo backgrounds, positioning polish, or unrelated Phase 1/3-5 work unless required to keep the table usable.
* If current code still centers on cards / multi-destination mode, treat that as the misunderstanding to remove, not as a feature to preserve.


## Tasks

1. Restate the corrected product vision in one short paragraph and list conflicts with current Phase 0 behavior or docs (especially cards / multi-destination).
2. Specify the currency-selection state machine, including: empty, home-only, travel-only, both selected, re-tap home, re-tap travel, and tap new currency while both selected.
3. Specify control-panel / currency-wall UI changes, including removal of multi-destination UI and retention of step / row-count controls.
4. Specify wallpaper renderer requirements for the two-column increment table (left home, right travel; configurable ladder; formatting) using the USD/JPY example and `example-wallpaper.png`.
5. Update all related documentation listed in **Documentation updates (required)**, starting with [docs/product-spec.md](../docs/product-spec.md), then [docs/technical-plan.md](../docs/technical-plan.md), then [AGENTS.md](../AGENTS.md), then the review-and-update set.
6. Deliver an implementation plan or code changes according to the workspace rules in [AGENTS.md](../AGENTS.md), scoped only to this vision correction.


## Output format

Respond in this structure:

1. **Vision restatement** (3-5 sentences)
2. **Conflicts with Phase 0 / current docs** (bullets)
3. **Selection state machine** (states, transitions, icons; include re-tap home and re-tap travel)
4. **UI change list** (controls to remove, add, or change; include step and row count)
5. **Wallpaper table spec** (left = home, right = travel; configurable ladder; formatting rules; reference to `example-wallpaper.png`)
6. **Documentation updates** (file-by-file list of what changed or will change in `docs/product-spec.md`, `docs/technical-plan.md`, `AGENTS.md`, and any other related files)
7. **Removal of multi-destination / cards mode** (what to delete from product, code plans, and docs)
8. **Proposed implementation steps** (ordered; docs first, then code; file-level if coding)
9. **Open questions / assumptions** (only unresolved items)

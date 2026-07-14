# Ticket 004: UX copy review and improvement


## Overview

Review and improve the English and Japanese interface copy so control labels and hints match how travelers think about the wallpaper, not internal ladder jargon.

Known directed renames (seed examples from product review):

* **Start** → **Starting amount** (`controls.startAmount`)
* **Step** → **Pattern** (`controls.step`)

The work covers every user-facing string in the locale files, not only those two labels. Hints, status messages, wallpaper chrome, and glossary terms must stay consistent with the chosen wording.


## Context

Phases 0 to 4 shipped a localized English and Japanese interface. Ladder controls still use short technical labels:

| Key                    | Current EN | Current JA | Directed EN                      |
| ---------------------- | ---------- | ---------- | -------------------------------- |
| `controls.startAmount` | Start      | 開始額     | Starting amount                  |
| `controls.step`        | Step       | 刻み       | Pattern                          |
| `controls.rowCount`    | Rows       | 行数       | (review; no directed rename yet) |

Hints still describe the old terms (for example, "Home amount increment for each ladder row" for Step). [docs/glossary.yaml](../docs/glossary.yaml) still lists `step` / `刻み` as the product term. [docs/product-spec.md](../docs/product-spec.md) and [docs/technical-plan.md](../docs/technical-plan.md) use "start amount", "step", and "row count" in the technical sense; UI copy may diverge from those internal names once this ticket settles the traveler-facing language.

Locale sources of truth:

* [localization/en.json](../localization/en.json)
* [localization/ja.json](../localization/ja.json)


## Objectives

1. Audit every string in `localization/en.json` and `localization/ja.json` for clarity, consistency, and traveler-friendly wording.
2. Apply the directed renames (**Start** → **Starting amount**, **Step** → **Pattern**) and rewrite related hints so they explain the new labels.
3. Propose Japanese equivalents for any English label change (do not leave JA stuck on "刻み" if EN becomes "Pattern").
4. Update [docs/glossary.yaml](../docs/glossary.yaml) so product UI terms match the shipped copy.
5. Leave code identifiers (`state.step`, `buildLadder`, i18n keys such as `controls.step`) unchanged unless a rename is needed for clarity of the key itself; prefer changing message values first.


## Scope


### Audit

Walk every key under `app`, `controls`, `status`, `preview`, `footer`, and `wallpaper` in both locale files. For each string, note whether it is keep, tweak, or rewrite. Pay special attention to:

* Ladder labels and hints: `startAmount`, `startAmountHint`, `step`, `stepHint`, `rowCount`, `rowCountHint`.
* Currency-wall copy: `currenciesHint`, `homeMarker`, `travelMarker`.
* Status and empty states: incomplete pair, rate errors, background fallback.
* Wallpaper strings that appear in the exported PNG: `wallpaper.defaultTitle`, `wallpaper.updated`, `wallpaper.ratesCredit`.
* Capitalization and sentence case: control labels should match neighboring labels (for example, "Starting amount" next to "Rows" and "Pattern").


### Apply approved copy

* Update `localization/en.json` and `localization/ja.json` with the reviewed strings.
* Update [docs/glossary.yaml](../docs/glossary.yaml) entries for any term that changes in the UI (at minimum `step`; add or revise `starting amount` / `pattern` as needed).
* If a hint or status string still says "step", "ladder", or "start" in a way that conflicts with the new labels, rewrite it.
* Run `pnpm lint` and `pnpm test-unit` so formatting and tests still pass. Unit tests should not depend on UI label strings; if any snapshot or assertion does, update it.


### Docs that mention UI labels

If [docs/product-spec.md](../docs/product-spec.md) documents the control labels as shown to users (not only the internal field names), align that wording with the chosen UI copy. Keep technical field names (`startAmount`, `step`, `rowCount`) where the docs describe state or API shape.


## Deliverables

* Updated [localization/en.json](../localization/en.json) and [localization/ja.json](../localization/ja.json).
* Updated [docs/glossary.yaml](../docs/glossary.yaml) for changed product terms.
* Doc tweaks only where user-facing label language is documented (product spec and related notes as needed).
* A short note in the pull request describing every label change (old → new) for EN and JA.


## Acceptance criteria

* `controls.startAmount` English label is **Starting amount** (not **Start**).
* `controls.step` English label is **Pattern** (not **Step**).
* Matching Japanese labels and hints are updated so EN and JA stay equivalent in meaning.
* Related hints no longer describe the old short labels in a confusing way.
* [docs/glossary.yaml](../docs/glossary.yaml) reflects the traveler-facing terms used in the UI.
* `pnpm lint` and `pnpm test` pass.
* No unintended change to ladder math, defaults, clamps, or persistence keys.


## Out of scope

* Changing how the ladder is calculated (`buildLadder`, defaults, clamps).
* Renaming Vue state fields or storage keys (`step`, `startAmount`, `rowCount`).
* Redesigning control layout, typography, or component structure.
* Adding new locales beyond English and Japanese.


## Open questions

Resolve these during the review if they are not already decided:

1. Should **Pattern** stay as the short label, or should a longer label (for example, **Amount pattern**) appear for consistency with **Starting amount**?
2. Does **Rows** stay, or should it become **Number of rows** / **Row count** for clarity?
3. Japanese for **Pattern**: keep a descriptive term (for example, 増額パターン) or a short noun (パターン)? Prefer natural JA over a literal calque.


## References

* [localization/en.json](../localization/en.json) / [localization/ja.json](../localization/ja.json) - current UI strings.
* [docs/glossary.yaml](../docs/glossary.yaml) - approved EN-JA product terms.
* [docs/product-spec.md](../docs/product-spec.md) - ladder behavior and user flow wording.
* [docs/general-style-guide-english.md](../docs/general-style-guide-english.md) and [docs/general-style-guide-japanese.md](../docs/general-style-guide-japanese.md) - writing rules for copy changes.
* [app/components/currency-controls.vue](../app/components/currency-controls.vue) - where ladder labels render.


## Workflow

Per [tickets/README.md](README.md), create a branch named `ticket/004` and open a pull request when the work is done.

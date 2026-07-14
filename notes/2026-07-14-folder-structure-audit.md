# Folder structure audit

Status as of 2026-07-14.
This note is the deliverable for [tickets/1-folder-structure.md](../tickets/1-folder-structure.md).
It is research and a proposal only. No folders were moved, renamed, or deleted.


## Summary

The Nuxt product layer (`app/`, `server/`, `shared/`, `public/`, and root config) already matches Nuxt 4 best practice and should stay put.
The main gaps are a non-default i18n directory name, AI scaffold folders that sit at the root instead of tool-expected paths, and a few root-hygiene items.
The proposed follow-up is incremental: fix hygiene first, move Claude-only paths under `.claude/`, optionally align locales to the `@nuxtjs/i18n` default, and only then consider a light Codex `.agents/skills` bridge.


## Research


### Nuxt 4

Sources:

* [Nuxt 4 announcement](https://nuxt.com/blog/v4) - default `app/` source directory and cleaner separation from `node_modules/` and `.git/`.
* [Nuxt directory structure](https://nuxt.com/docs/4.x/directory-structure) - `app/` (pages, components, composables, utils, assets), `server/` (Nitro), `public/`, and `shared/`.
* [shared/ directory](https://nuxt.com/docs/4.x/directory-structure/shared) - code usable by the Vue app and the Nitro server; only `shared/utils/` and `shared/types/` are auto-imported; other files use the `#shared` alias; shared code must not import Vue or Nitro.
* [Nuxt testing guide](https://nuxt.com/docs/4.x/getting-started/testing) - recommended layout is `test/unit/` (or `tests/unit/`) for Node unit tests, `test/nuxt/` (or `tests/nuxt/`) for runtime tests, and optional `test/e2e/`. Both `test/` and `tests/` names are recognized for the Nuxt TypeScript context under `*/nuxt/`.

Finding for this repo: the Phase 0 split into `app/`, `server/`, `shared/`, and `public/` is the Nuxt 4 default. Putting composables that hold Vue state in `app/composables/` and pure drawing helpers in `app/utils/` is idiomatic. Pure currency and ladder logic belongs in `shared/utils/` because the server route and the canvas renderer both need it.


### `@nuxtjs/i18n` v10

Sources:

* [Nuxt I18n options](https://i18n.nuxtjs.org/docs/api/options) - `restructureDir` defaults to `'i18n'`; `langDir` defaults to `'locales'`; locale files resolve under `<restructureDir>/<langDir>/`.
* [Nuxt I18n usage](https://i18n.nuxtjs.org/docs/getting-started/usage) - default on-disk location is `i18n/locales/*.json`.
* [Migration guide](https://i18n.nuxtjs.org/docs/guide/migrating) - `restructureDir` can no longer be disabled in v10; leaving it unset uses `'i18n'`.
* Instantiated config in this repo: `restructureDir: "localization"` and `langDir: "."`, so messages live at `localization/en.json` instead of `i18n/locales/en.json`.

Finding: the current layout is valid and intentional, but it is a deliberate override of the module default. Aligning to `i18n/locales/` would remove special casing before Phase 4 adds Japanese.


### General web apps

Sources and norms used here:

* Framework directories at the root, plus a small set of process folders (`docs/`, `scripts/`, `tests/`), is standard for a single-package app.
* Build artifacts (`.nuxt/`, `.output/`, `dist`, `node_modules/`) belong in `.gitignore`, not in the tree of concern.
* More than about a dozen meaningful root folders usually signals that tool-specific or process folders should nest under a parent rather than live as peers of product code.
* Config files (`nuxt.config.ts`, `package.json`, `vitest.config.mjs`, lint and editor configs) correctly stay at the root so tools discover them without extra flags.

Finding: this repo currently has roughly sixteen tracked root folders plus several root instruction files. The Nuxt subset is fine; most of the extra root noise is the AI scaffold and process folders.


### AI development projects (2026)

Sources:

* [AGENTS.md](https://agents.md/) open convention (and 2026 tool write-ups such as [AGENTS.md Guide (2026)](https://vibecoding.app/blog/agents-md-guide)) - a root `AGENTS.md` is the cross-tool instruction file for Cursor, Codex, Copilot, and others.
* [Claude Code skills](https://code.claude.com/docs/en/skills) - project skills are discovered from `.claude/skills/<name>/SKILL.md`.
* [Claude Code slash commands](https://code.claude.com/docs/en/slash-commands) - project commands live in `.claude/commands/`; subagents live under `.claude/agents/`; topic rules can live under `.claude/rules/`.
* [Codex skills](https://developers.openai.com/codex/skills) - repository skills are discovered from `.agents/skills` (walking from the working directory up to the repo root). Symlinks are supported.
* In-repo decision [memory/feedback-memory-location.md](../memory/feedback-memory-location.md) - this project's durable memory stays in `./memory/` and is indexed by root `MEMORY.md`, not in `~/.claude/projects/`.

Fixed (tool-expected) paths:

| Path                | Tool                               | Notes                                                                        |
| ------------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| `AGENTS.md`         | Cursor, Codex, Copilot, and others | Cross-tool root instruction file.                                            |
| `.claude/`          | Claude Code                        | Settings, permissions, and Claude-local assets.                              |
| `.claude/skills/`   | Claude Code                        | Auto-discovered project skills.                                              |
| `.claude/commands/` | Claude Code                        | Auto-discovered slash commands.                                              |
| `.claude/agents/`   | Claude Code                        | Project subagent definitions.                                                |
| `.claude/rules/`    | Claude Code                        | Topic-scoped rules.                                                          |
| `.agents/skills/`   | Codex                              | Open-style repository skills path.                                           |
| `.cursor/rules/`    | Cursor                             | Tool-specific rules (optional when `AGENTS.md` already covers shared rules). |

Discretionary (convention only) paths:

| Path                                         | Role in this repo                                                                         |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `skills/` at the root                        | Portable skill source of truth; bridged into Claude via `.claude/skills` symlink.         |
| `commands/`, `agents/`, `rules/` at the root | Intended AI folders that are currently near-empty and are not on Claude's discovery path. |
| `prompts/`                                   | Prompt library for humans and agents; no tool auto-loads this path.                       |
| `memory/` + `MEMORY.md`                      | Versioned project memory by explicit repo choice.                                         |
| `notes/`, `tickets/`, `docs/`, `scripts/`    | Process and documentation by human convention.                                            |


## Current root inventory

Classification key: keep, move, rename, merge, or remove.


### Product (Nuxt)

| Entry                                                   | Classification | Rationale                                                                                                                                                 |
| ------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`                                                  | keep           | Nuxt 4 default source directory. Current subfolders (`assets/`, `components/`, `composables/`, `pages/`, `utils/`, `app.vue`) are idiomatic.              |
| `server/`                                               | keep           | Nitro server root. The `api/rates/[base].get.js` name is a framework convention; it is already listed in `.namelintignore`.                               |
| `shared/`                                               | keep           | Correct place for Vue-and-Nitro-safe pure modules (`utils/currencies.js` today; `utils/ladder.js` planned). `#shared` alias is required and already used. |
| `public/`                                               | keep           | Static assets served as-is.                                                                                                                               |
| `nuxt.config.ts`                                        | keep           | Root config required by Nuxt.                                                                                                                             |
| `vitest.config.mjs`                                     | keep           | Root Vitest config; `#shared` alias mirrors Nuxt.                                                                                                         |
| `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` | keep           | Package manager roots. `pnpm-workspace.yaml` here is used for pnpm security and build settings, not for a multi-package monorepo.                         |


### Locale and tests

| Entry           | Classification    | Rationale                                                                                                                                                                                                                                                      |
| --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `localization/` | rename (proposed) | Works today via `restructureDir: "localization"` and `langDir: "."`. The module default is `i18n/locales/`. Renaming before Phase 4 reduces ongoing override cost. Keeping the name is also a valid choice if the maintainers prefer the clearer English word. |
| `tests/`        | keep              | Nuxt accepts `tests/` as well as `test/`. Current `tests/unit/` matches the Node unit-test bucket. Future `@nuxt/test-utils` component tests should go in `tests/nuxt/` (not colocated by default), per the Nuxt testing guide.                                |


### Documentation and process

| Entry                  | Classification | Rationale                                                                          |
| ---------------------- | -------------- | ---------------------------------------------------------------------------------- |
| `docs/`                | keep           | Product and writing docs; conventional.                                            |
| `notes/`               | keep           | Dated audits and proposals; naming rule `YYYY-MM-DD-<slug>.md` already documented. |
| `tickets/`             | keep           | Work tickets with the `ticket/<n>` branch workflow.                                |
| `scripts/`             | keep           | Helper scripts; matches `AGENTS.md` script guidance.                               |
| `README.md`, `LICENSE` | keep           | Standard package docs.                                                             |


### AI scaffold

| Entry                   | Classification              | Rationale                                                                                                                                                                                                                                |
| ----------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AGENTS.md`             | keep                        | Fixed cross-tool path.                                                                                                                                                                                                                   |
| `.claude/`              | keep                        | Fixed Claude Code path. Already holds `CLAUDE.md` (imports `AGENTS.md`), settings, and a `skills` symlink to `../skills`.                                                                                                                |
| `skills/`               | keep (with optional bridge) | Discretionary root location that is the authored skill tree. Claude discovery works through the existing `.claude/skills` symlink. Codex discovery expects `.agents/skills`; a second symlink would close that gap without moving files. |
| `MEMORY.md` + `memory/` | keep                        | Discretionary, but intentional and documented in feedback memory. Do not move to `~/.claude/projects/`.                                                                                                                                  |
| `prompts/`              | keep                        | Discretionary prompt library; useful and not tool-bound.                                                                                                                                                                                 |
| `commands/`             | move                        | Contains `brainstorm.md`, but Claude auto-discovers `.claude/commands/`, not a root `commands/` folder.                                                                                                                                  |
| `agents/`               | move or remove              | Placeholder README only. Claude expects `.claude/agents/`. Empty root folder adds noise.                                                                                                                                                 |
| `rules/`                | move or remove              | Placeholder README only. Claude expects `.claude/rules/` (Cursor expects `.cursor/rules/` for Cursor-only rules). Empty root folder adds noise.                                                                                          |


### Generated and local hygiene

| Entry                                 | Classification      | Rationale                                                                                                                                                                                      |
| ------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.nuxt/`, `.output/`, `node_modules/` | keep ignored        | Correctly listed in `.gitignore`.                                                                                                                                                              |
| `dist` symlink                        | remove (local only) | Already gitignored. The current symlink points at an absolute machine path under `.output/public`. Prefer opening `.output/public` or using `pnpm preview` instead of a hand-made `dist` link. |
| `.DS_Store`                           | keep ignored        | Already ignored.                                                                                                                                                                               |
| `.env.repo-audit` and other `.env.*`  | keep ignored        | Matched by `.env.*` in `.gitignore`.                                                                                                                                                           |
| `localization/temp.md`                | keep ignored        | Matched by `**/temp.md`; delete locally when convenient.                                                                                                                                       |


### Naming rule status

| Path                                               | Status                                                                                                                                                          |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server/api/rates/[base].get.js`                   | Covered by `.namelintignore` with a comment. Correct use of the escape hatch described in [notes/2026-07-14-phase-0-status.md](./2026-07-14-phase-0-status.md). |
| `AGENTS.md`, `MEMORY.md`, `LICENSE`, and similar   | Allowed by the name linter's default ignore list for standard repo docs.                                                                                        |
| `notes/background-curation-proposal.md`            | Documented exception in [notes/README.md](./README.md) (name fixed by the backgrounds workflow).                                                                |
| App and shared files using `lowercase-with-dashes` | Match `AGENTS.md`.                                                                                                                                              |


## Tension points


### Locale files versus `@nuxtjs/i18n` defaults

Today: `localization/en.json` with `restructureDir: "localization"` and `langDir: "."`.

Module default: `i18n/locales/en.json` with unset `restructureDir` (`'i18n'`) and default `langDir` (`'locales'`).

[docs/technical-plan.md](../docs/technical-plan.md) still describes the intent as pointing `langDir` at the existing `localization/` folder; the live `nuxt.config.ts` implements that with `restructureDir` instead.
Both approaches work on v10. The override is the maintenance cost.
Recommendation: rename to the default layout in a follow-up before Phase 4 adds `ja.json`, unless the maintainers prefer keeping the word "localization" for clarity.


### Tests versus colocated tests

Today: root `tests/unit/` with plain Node Vitest.
Recommendation: keep centralized tests. When Phase 1 and Phase 2 add component coverage with `@nuxt/test-utils`, add `tests/nuxt/` (and later `tests/e2e/` if needed). Colocation inside `app/` is optional and not required by Nuxt; the official guide prefers the environment-based split.


### App-layer boundaries

* `app/composables/` for `use-wallpaper-state.js` and `use-rates.js` (Vue/Nuxt APIs, refs, browser fallbacks): correct.
* `app/utils/` for `wallpaper.js` and `backgrounds.js` (pure canvas and data helpers used by the client preview): correct.
* `shared/utils/` for `currencies.js` and future `ladder.js` (no Vue, no Nitro, used by app and server): correct.

No boundary change is proposed.


### AI scaffold sprawl

Root `skills/`, `prompts/`, `memory/`, and `AGENTS.md` are justified.
Root `commands/`, `agents/`, and `rules/` duplicate the Claude discovery tree under `.claude/` and currently add empty or mis-sited folders to the root.
Consolidation should move Claude-discovered assets under `.claude/`, keep the authored skill tree at `skills/` (already linked), and leave `prompts/` and `memory/` as discretionary root process folders.


### Root hygiene

Ignore rules for build outputs are correct.
The absolute `dist` symlink is local clutter and should not be recreated; `pnpm generate` already writes `.output/public`.


## Prioritized proposal

Order is lowest risk to highest risk. Each change is for a follow-up ticket after this proposal is approved. This ticket does not execute the moves.


### 1. Root hygiene (lowest risk)

* Action: stop creating a `dist` symlink; rely on `.output/public` or `pnpm preview`. Delete the local symlink at convenience.
* Fixed or discretionary: discretionary.
* Downstream references: none in git (already ignored). Optionally mention the preferred preview path in the root `README.md` if `dist` is mentioned anywhere in human docs.


### 2. Place Claude commands on the discovery path

* Action: move `commands/brainstorm.md` to `.claude/commands/brainstorm.md`. Remove the root `commands/` folder (or leave a short README redirect that points to `.claude/commands/` during a transition).
* Fixed or discretionary: destination is fixed by Claude Code; the old root path is discretionary.
* Downstream references: `commands/README.md`, any prompt or note that points at `commands/brainstorm.md`, and the root `AGENTS.md` repository structure section if it lists `commands/`.


### 3. Retire empty root `agents/` and `rules/` placeholders

* Action: either delete the empty root folders, or recreate them later only under `.claude/agents/` and `.claude/rules/` when real definitions exist.
* Fixed or discretionary: destinations are fixed by Claude Code when used; current root paths are discretionary and empty.
* Downstream references: `agents/README.md`, `rules/README.md`, and `AGENTS.md` structure bullets.


### 4. Optional Codex skills bridge

* Action: add `.agents/skills` as a symlink to `../skills` (mirror of the existing `.claude/skills` symlink), so Codex discovers the same skill tree without duplication.
* Fixed or discretionary: `.agents/skills` is fixed for Codex; keeping skills authored at `skills/` remains discretionary.
* Downstream references: `AGENTS.md` skills section, `skills/README.md`, and possibly `.gitignore` if symlink handling needs a note. Do not copy skill trees.


### 5. Align locale files to the `@nuxtjs/i18n` default (medium risk)

* Action: rename `localization/` to `i18n/`, move `en.json` (and future `ja.json`) to `i18n/locales/`, clear `restructureDir` and `langDir` overrides in `nuxt.config.ts` (or set them explicitly to the defaults), and update docs.
* Fixed or discretionary: default paths are module convention, not a hard filesystem lock; the override is discretionary and already working.
* Downstream references (non-exhaustive): `nuxt.config.ts`, `localization/README.md` (becomes `i18n/README.md`), [AGENTS.md](../AGENTS.md), [README.md](../README.md), [docs/technical-plan.md](../docs/technical-plan.md), [notes/2026-07-14-phase-0-status.md](./2026-07-14-phase-0-status.md), `prompts/build-webapp-orchestrator.prompt.md`, `prompts/two-currency-increment-table.prompt.md`, and [tickets/1-folder-structure.md](../tickets/1-folder-structure.md) historical mentions.
* Alternate (keep as-is): keep `localization/` and document the override as an approved deviation so future agents stop proposing the rename.


### 6. Extend tests for Nuxt runtime coverage (medium risk, deferred to feature phases)

* Action: when component tests land, add `tests/nuxt/` and wire a Vitest project (or environment) for `@nuxt/test-utils`. Keep `tests/unit/` for pure Node tests.
* Fixed or discretionary: `tests/nuxt/` is a Nuxt-recognized convention; colocation is discretionary.
* Downstream references: `vitest.config.mjs`, `tests/README.md`, `package.json` test scripts, and Phase 1 or Phase 2 tickets that introduce component tests.


### 7. Documentation and naming-rule follow-through (after approval)

* Action (maps to ticket objective 4, after this proposal is approved):
  * Update the repository structure section in `AGENTS.md` to match the chosen target.
  * Keep `.namelintignore` as the escape hatch for Nitro dynamic route names; add entries only for new framework-required exceptions.
  * Refresh folder `README.md` files for any moved directory via the `readme-maintainer` skill.
  * Update [docs/technical-plan.md](../docs/technical-plan.md) if the locale path decision changes the i18n snippet.
* This step is documentation of the approved structure, not a silent renames pass.


## Recommended target tree (after incremental adoption)

```text
.
├── .agents/skills -> ../skills          # optional Codex bridge
├── .claude/
│   ├── CLAUDE.md
│   ├── commands/                        # moved from root commands/
│   ├── settings.json
│   └── skills -> ../skills
├── AGENTS.md
├── MEMORY.md
├── app/
├── docs/
├── i18n/                                # if rename approved; else localization/
│   └── locales/
├── memory/
├── notes/
├── prompts/
├── public/
├── scripts/
├── server/
├── shared/
├── skills/
├── tests/
│   ├── unit/
│   └── nuxt/                            # when component tests exist
├── tickets/
├── nuxt.config.ts
└── vitest.config.mjs
```

Paths that must not move without a tool change: `AGENTS.md`, `.claude/` (and its discovery subfolders once adopted), Nuxt `app/`, `server/`, `shared/`, `public/`, and root `nuxt.config.ts`.


## Out of scope for this note

* Executing any rename, move, or delete.
* Product behavior, state shape, or roadmap changes.
* Renaming settled Nuxt files inside `app/`, `server/`, or `shared/` except where a framework collision already forced `.namelintignore`.


## Decision needed from the maintainer

1. Accept the low-risk Claude path moves (items 1 to 3) as the first follow-up ticket?
2. Prefer aligning locales to `i18n/locales/` (item 5), or keep `localization/` as an approved override?
3. Add the Codex `.agents/skills` symlink (item 4), or leave Codex users to rely on the root `skills/` tree only through explicit skill loading?

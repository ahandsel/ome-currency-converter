# Ticket 1: Folder structure audit and improvements


## Overview

This ticket is a research and audit task, not a code change. The goal is to decide whether the repository folder structure is sound and, if not, to produce an approved proposal for how to improve it. The three parts are:

* Research the 2026 best practices for folder structure in Nuxt 4 projects, general web apps, and AI development projects.
* Compare the current folder structure of this repo with those best practices.
* Identify any areas for improvement and propose changes to the folder structure.

The deliverable is an audit note with a concrete proposal. Moving, renaming, or deleting folders is out of scope for this ticket and becomes a separate follow-up once the proposal is approved.


## Context

This repository is not a single-purpose codebase.
It layers three concerns in one flat root:

* A Nuxt 4 web app (the product): `app/`, `server/`, `shared/`, `public/`, `localization/`, `tests/`, `nuxt.config.ts`, and `vitest.config.mjs`.
* An AI-agent workflow scaffold: `agents/`, `commands/`, `prompts/`, `rules/`, `skills/`, `memory/`, `MEMORY.md`, `AGENTS.md`, and `.claude/`.
* Documentation and process: `docs/`, `notes/`, and `tickets/`.

Phase 0 of [docs/technical-plan.md](../docs/technical-plan.md) (the Nuxt migration) is complete, and Phases 1 to 5 will add many new files inside the app layer (for example, `app/utils/backgrounds.js` and `shared/utils/ladder.js`).
Settling the structure now, before those files land, avoids a larger and riskier reshuffle in a future phase.

Two existing constraints shape the audit:

* The repository naming rule in [AGENTS.md](../AGENTS.md) requires `lowercase-with-dashes` for files and folders, and requires every reference to a renamed path to be updated across documentation, scripts, and code.
* [notes/2026-07-14-phase-0-status.md](../notes/2026-07-14-phase-0-status.md) records that framework file conventions can conflict with the name linter (for example, the `server/api/rates/[base].get.js` route), and that `.namelintignore` is the intended escape hatch.


## Objectives

1. Establish what current (2026) best practice looks like for each of the three concerns named here, with cited sources.
2. Classify every root-level entry against that best practice.
3. Propose a target structure with a clear rationale for each change and the downstream references each change would touch.
4. Update the folder naming rule, `.namelintignore`, and any other relevant documentation to reflect the approved proposal.


## Scope


### Research

Gather current best practices and cite the source for each finding.

* Nuxt 4: confirm the intended use of the `app/` source directory, `server/` for Nitro, `shared/` with the `#shared` alias, and `public/`. Check the recommended locations for composables, utils, components, tests, and locale files, and note where the `@nuxtjs/i18n` module (v10.x here) expects locale files by default.
* General web apps: conventions for root-level config file placement, build artifact handling, documentation folders, and how many root-level entries is reasonable before grouping is warranted.
* AI development projects: emerging 2026 conventions for agent context files and folders, such as `AGENTS.md`, `.claude/`, `skills/`, `commands/`, `prompts/`, and persistent `memory/`. Note which paths are fixed by a tool and which are a free convention.


### Audit and comparison

For every current root-level folder and notable config file, state whether it matches best practice and why. Give attention to the known tension points:

* Locale files: `localization/` at the repo root versus the `@nuxtjs/i18n` default `i18n/locales/` directory. Reconcile this with the note in [docs/technical-plan.md](../docs/technical-plan.md) about the `langDir` default restructure across module major versions.
* Tests: `tests/unit/` at the root versus colocated tests, and where component tests using `@nuxt/test-utils` should live in future phases.
* App-layer boundaries: whether the split between `app/composables/` and `app/utils/` is idiomatic, and whether `shared/` is scoped correctly.
* AI scaffold sprawl: whether the loose root folders (`agents/`, `commands/`, `prompts/`, `rules/`, and `memory/`) should be consolidated to reduce root noise, weighed against tool-expected paths that cannot move.
* Root hygiene: the `dist` symlink, generated directories (`.output/`, `.nuxt/`), and any stray files at the root, and whether each is correctly ignored.
* Naming: any path that conflicts with the `lowercase-with-dashes` rule and whether `.namelintignore` already covers it.


### Proposal

* Recommend a target structure. For each proposed change, give the rationale, the convention or tool that requires or blocks it, and every downstream reference that would need updating (READMEs, scripts, config, and docs).
* Clearly separate fixed paths that must not move (for example, paths a tool reads at a set location) from discretionary paths that are only a convention.
* Order the proposed changes from lowest to highest risk, so a follow-up ticket can adopt them incrementally.


## Deliverables

* An audit note at `notes/<YYYY-MM-DD>-folder-structure-audit.md` (dated the day it is written, matching the existing note naming), containing:
  * A research section with cited best practices for the three concerns.
  * A comparison section that classifies every current root-level entry as keep, move, rename, merge, or remove.
  * A prioritized proposal section as described earlier.
* The note follows the repository writing style and [docs/markdown-style-guide.md](../docs/markdown-style-guide.md), and `pnpm lint` passes.


## Acceptance criteria

* The audit note exists at the path given and passes `pnpm lint`.
* The research section cites current (2026) sources for the Nuxt 4, general web app, and AI development project concerns.
* Every current root-level folder is classified, and the known tension points listed in the Audit and comparison section are each addressed.
* Each proposed change records its rationale, the tool or convention that requires it, and the downstream references it would touch.
* The proposal distinguishes fixed, must-not-move paths from discretionary ones.
* No folders are moved, renamed, or deleted in this ticket.


## Out of scope

* Executing the restructure. Applying the approved proposal is a separate follow-up ticket.
* Any change to product behavior, the state shape, or the phased roadmap in [docs/technical-plan.md](../docs/technical-plan.md).
* Renaming inside already-settled Nuxt directories unless the audit finds a clear conflict with a convention or tool.


## References

* [docs/technical-plan.md](../docs/technical-plan.md) - target architecture and the project structure mapping.
* [docs/product-spec.md](../docs/product-spec.md) - product scope, increment-table layout, and currency-wall selection.
* [AGENTS.md](../AGENTS.md) - repository structure, naming rule, and skills workflow.
* [notes/2026-07-14-phase-0-status.md](../notes/2026-07-14-phase-0-status.md) - naming and linter lessons from the migration.
* Nuxt directory structure documentation and the `@nuxtjs/i18n` module documentation for the installed version.


## Workflow

Per [tickets/README.md](README.md), create a branch named `ticket/1` and open a pull request when the work is done.

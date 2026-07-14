# Skills

This folder contains local Codex skills used by this repository.


## Usage

To use a skill, enter the skill's name in the AI interface (VS Code extension, terminal prompt, or desktop app) with the appropriate prefix for AI tool.

| Tool           | Input       | Example                                       |
| -------------- | ----------- | --------------------------------------------- |
| Claude         | /skill-name | `/ai-commit --auto` or `/general-en-polisher` |
| Codex          | $skill-name | `$ai-commit --auto` or `$general-en-polisher` |
| GitHub Copilot | @skill-name | `@ai-commit --auto` or `@general-en-polisher` |

> [!TIP]
> Ask the AI `What does [skill name] do?` to get a description of the skill's functionality and usage instructions.


## Available skills


### Daily utility skills

| Skill                     | Description                                                                                                                                                                                                        | Last updated (UTC) |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| [`ai-commit`][]           | Auto-gather git changes, confirm scope with the user, and draft a commit title and message following the project commit style guide.                                                                               | 2026-06-03 13:30   |
| [`general-en-polisher`][] | Polishes Markdown files to enforce the repo core writing rules (straight quotes, no contractions, the Oxford comma, sentence case headings, plain hyphens, and more), then runs `link-polisher` on the same files. | 2026-06-03 09:37   |
| [`gh-sync-with-main`][]   | Bring the current git branch up to date with commits from the main branch (pull, rebase, or merge main).                                                                                                           | 2026-06-08 00:00   |
| [`general-ja-polisher`][] | Reviews Japanese Markdown for natural phrasing and compliance with repo Japanese style guides (general, technical, glossary, word list); edits by default, `--fix` to apply, `--report-only` for a dry run.        | 2026-06-22 00:00   |

[`ai-commit`]: ./ai-commit/SKILL.md
[`general-en-polisher`]: ./general-en-polisher/SKILL.md
[`gh-sync-with-main`]: ./gh-sync-with-main/SKILL.md
[`general-ja-polisher`]: ./general-ja-polisher/SKILL.md


### Repository maintenance skills

| Skill                         | Description                                                                                                                                                                                    | Last updated (UTC) |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [`file-folder-name-linter`][] | Lints repository file and folder names against three fixed rules (`notes/` date prefix, `.yaml` not `.yml`, kebab-case) via `pnpm lint-naming`, with style-guide pointers for the reviewer.    | 2026-06-05 00:00   |
| [`readme-maintainer`][]       | Audits the repository for missing or outdated folder `README.md` files and creates or updates them.                                                                                            | 2026-06-03 04:16   |
| [`script-auditor`][]          | Audits helper scripts in `scripts/` and `skills/*/scripts/` against the `AGENTS.md` script guidelines (no Python, prefer `.mjs` or zsh, require `--help`, a notes section, and status emojis). | 2026-06-04 01:36   |
| [`skill-allowlist-syncer`][]  | Fully syncs the `Skill(<name>)` entries in `.claude/settings.json` under `permissions.allow` with the skills in the repo `skills/` folder, adding new skills and removing deleted ones.        | 2026-06-01 09:37   |

[`file-folder-name-linter`]: ./file-folder-name-linter/SKILL.md
[`readme-maintainer`]: ./readme-maintainer/SKILL.md
[`script-auditor`]: ./script-auditor/SKILL.md
[`skill-allowlist-syncer`]: ./skill-allowlist-syncer/SKILL.md


### Other utility skills

| Skill                | Description                                                                                                                                                      | Last updated (UTC) |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [`gh-cli`][]         | Interact with GitHub repositories using the GitHub CLI (gh). Covers PRs, issues, releases, workflow runs, and branch operations.                                 | 2026-05-14 06:13   |
| [`gh-pr-reporter`][] | Fetches every comment on a GitHub PR (reviews, inline review comments, and general comments) and emits a single consolidated Markdown report.                    | 2026-06-04 14:30   |
| [`link-polisher`][]  | Rewrites raw URLs in Markdown files as Markdown links with a human-readable label fetched from the source (Figma file name, GitHub issue or pull request title). | 2026-06-03 04:16   |

[`gh-cli`]: ./gh-cli/SKILL.md
[`gh-pr-reporter`]: ./gh-pr-reporter/SKILL.md
[`link-polisher`]: ./link-polisher/SKILL.md

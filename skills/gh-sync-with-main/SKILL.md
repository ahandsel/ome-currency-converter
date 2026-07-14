---
name: gh-sync-with-main
description: Bring the current git branch up to date with commits from the main branch. Use when the user asks to pull latest main, sync/refresh the branch, rebase onto main, or merge main into a feature branch.
---

# GitHub sync with main branch skill


## Overview

Update the checked out branch from `main` with a small helper script instead of rebuilding the git sequence from scratch. Prefer rebase for a clean linear history, and switch to merge only when the user or repository workflow requires it.


## Workflow

1. Confirm the repository state first.
   * Run `git status --short`.
   * Run `git branch --show-current`.
   * Stop if the user is already on `main`.
2. Choose the update strategy.
   * Default to `rebase`.
   * Use `merge` when the user explicitly asks to merge, the branch is already shared and history should not be rewritten, or the repository conventions prefer merge commits.
3. Run the helper script.

   ```bash
   node "${CLAUDE_SKILL_DIR}/scripts/update-branch-from-main.mjs"
   ```

4. Add flags only when needed.

   ```bash
   node "${CLAUDE_SKILL_DIR}/scripts/update-branch-from-main.mjs" --strategy merge
   node "${CLAUDE_SKILL_DIR}/scripts/update-branch-from-main.mjs" --base-branch main --remote origin
   node "${CLAUDE_SKILL_DIR}/scripts/update-branch-from-main.mjs" --allow-dirty
   ```


## Conflict handling

If git reports conflicts, stop normal automation and guide the user through resolution.

* For rebase conflicts: resolve files, `git add <files>`, then `git rebase --continue`.
* For merge conflicts: resolve files, `git add <files>`, then `git commit`.
* If the user wants to cancel: `git rebase --abort` or `git merge --abort`.


## Guardrails

* Refuse to run on `main`.
* Refuse to run with a dirty working tree unless the user explicitly accepts `--allow-dirty`. Note that `--allow-dirty` pairs best with `merge`, because `git rebase` still refuses to run with unstaged changes even after the script's own clean-tree check is bypassed.
* Fetch `origin/main` before changing history.
* Prefer `origin/main` over a stale local `main`.
* Show the exact git commands before execution so the user can see the plan.


## Script behavior

The helper script:

* verifies the current branch is not the base branch
* checks whether the working tree is clean unless `--allow-dirty` is passed
* fetches the chosen base branch from the chosen remote
* rebases onto `origin/main` by default, or merges `origin/main` when requested
* exits immediately on the first git failure and leaves the repository in git's native conflict state for manual resolution

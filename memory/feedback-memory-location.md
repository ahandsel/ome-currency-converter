---
name: Project memory lives in the repo
description: Store this project's Claude memory and config inside the repo .claude/ folder, not the global ~/.claude/ path
type: feedback
---

# Project memory and config live in the repo

Store this project's Claude memory and configuration inside this repo.
Memory files go in `./memory/`, indexed by `MEMORY.md` at the repo root.

Do not store project memory in the global path
`~/.claude/projects/`.

**Why:** The repo has its own `./.claude/` folder with settings, skills, agents,
and memory. Keeping memory in the repo versions it with the project and shares
it with the team, instead of leaving it in a private global location.

**How to apply:** When creating or updating Claude memory, settings, skills, or
agents for this project, write to `./.claude/`.
For memory specifically, add the file to `./memory/` and index it in
`MEMORY.md` at the repo root.
Follow the in-repo conventions: kebab-case file names and flat frontmatter
(`name`, `description`, `type`).

---
name: feedback-skip-skill-subfolder-readmes
description: Do not create README.md files for single-file helper subfolders inside skills (scripts/, agents/).
metadata:
  type: feedback
---

# Skip skill subfolder READMEs

When running the readme-maintainer audit, do not create a `README.md` for helper subfolders inside a skill (for example `skills/<skill-name>/scripts/` or `skills/<skill-name>/agents/`) that hold a single helper file.

**Why:** The parent `SKILL.md` already documents those helpers, and `skills/README.md` indexes every skill, so a per-subfolder README would only duplicate existing documentation. This overrides the readme-maintainer skill's default treatment of `skills/<skill-name>/scripts/` as in scope.

**How to apply:** Treat these subfolders as self-documenting via the parent `SKILL.md`. Do not re-flag them as missing in future audits. The individual skill folders themselves also use `SKILL.md` instead of a `README.md` by convention; leave them as-is too. See [[feedback-kebab-case-naming]].

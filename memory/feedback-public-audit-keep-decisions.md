---
name: Public audit keep decisions
description: Items flagged by the repository public readiness audit that the user approved to keep public as-is
type: feedback
---

# Public audit keep decisions

The repository public readiness audit (`prompts/repo-public-audit.prompt.md`, run on 2026-07-13) flagged the items below, and the user decided to keep them.
Treat them as approved public content, and do not flag them again in future audits.

* `docs/general-style-guide-english.md` and `docs/general-style-guide-japanese.md` - the user confirmed the right to publish these style guides (see the sanitization change log in `docs/README.md`).
* The example person names "Genji" and "Seb" in `docs/general-style-guide-english.md` - approved as generic example names.
* `@cybozu/license-manager` in `package.json` and `license-manager.config.cjs` - a public npm package; the employer name in the package scope is approved.
* The UI terms in `docs/glossary.yaml` - generic product vocabulary, approved.
* `prompts/prd-review-terms.prompt.md` - a generic PRD review prompt with no internal names, approved.

**Why:** The user reviewed each finding during the audit and confirmed these items are safe to publish.

**How to apply:** When auditing this repository for public readiness, treat the items above as known-safe and do not flag them.
When running `prompts/repo-public-audit.prompt.md`, mirror these items into `KNOWN_SAFE_TERMS` in `.env.repo-audit` so the audit config matches this decision record.

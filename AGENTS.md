# Repository rules

These rules apply to all AI agents working in this repository. This is the canonical instructions file.


## Project overview

Ome Currency Converting Wallpaper is a web app that generates an iPhone wallpaper containing a currency exchange reference. The wallpaper itself is the product; the controls exist only to configure it. A user picks exactly one home currency and one travel currency on a shared currency wall, configures an amount ladder (step and row count), chooses a background and an iPhone size, then downloads a PNG sized to their device. The wallpaper is a two-column increment table (left = home amounts, right = travel amounts). The interface supports English and Japanese.

The app runs on [Nuxt](https://nuxt.com/) 4, the full-stack Vue framework. Phase 0 of [docs/technical-plan.md](docs/technical-plan.md), the migration from the old Vite prototype, is complete. That migration preserved a temporary cards-style UI for parity with the prototype; cards and multi-destination layouts are out of product scope. Phases 1 to 5 (photo backgrounds, increment-table wallpaper and currency-wall selection, positioning, Japanese localization, and polish) are still pending. Phase 2 replaces the cards UI with the increment table as the only wallpaper layout.

Live rates come from the keyless, CORS-enabled Frankfurter API (European Central Bank reference rates). Backgrounds are gradient themes today; Phase 1 adds a curated, bundled set of Unsplash photo links (no API key). The wallpaper is painted on a `<canvas>` at full device resolution and exported to PNG.

For the full specification, read the planning documents before making product changes:

* [docs/product-spec.md](docs/product-spec.md) - problem, user flow, currency selection, and feature list.
* [docs/technical-plan.md](docs/technical-plan.md) - architecture, state shape, per-file changes, and phased roadmap.
* [docs/backgrounds.md](docs/backgrounds.md) - curated background manifest, attribution, and how to add or swap a photo.


## Repository structure

* `nuxt.config.ts` - Nuxt configuration: modules, global CSS, i18n, and route rules.
* `app/` - the Nuxt application source directory.
  * `app/app.vue` - root component that renders the single page.
  * `app/pages/` - route pages; `index.vue` holds the whole interface.
  * `app/components/` - Vue components: `control-panel.vue`, `currency-controls.vue`, and `wallpaper-preview.vue`.
  * `app/composables/` - `use-wallpaper-state.js` (persistent settings) and `use-rates.js` (rate fetching).
  * `app/utils/` - plain JavaScript helpers; `wallpaper.js` is the pure canvas renderer.
  * `app/assets/` - bundled assets; `css/main.css` is the global stylesheet.
* `server/` - Nitro server code; `server/api/rates/[base].get.js` proxies and caches the Frankfurter API.
* `shared/` - code shared by the app and the server; `shared/utils/currencies.js` holds the built-in currency metadata.
* `public/` - static files served verbatim at the site root (for example, `favicon.ico`).
* `localization/` - locale message files for the English and Japanese interface.
* `tests/` - automated tests.
* `docs/` - planning documents plus documentation writing style guides and the EN-JA glossary.
* `agents/` - agent definitions.
* `scripts/` - development tools and automation scripts.
* `skills/` - reusable AI workflows, each with a `SKILL.md` file.

Phase 0 of [docs/technical-plan.md](docs/technical-plan.md) produced this layout. Later phases add feature modules inside it, such as `app/utils/backgrounds.js` in Phase 1 and `shared/utils/ladder.js` in Phase 2.


### README.md

* Each folder should contain a `README.md` file that describes the contents and purpose of the folder. This helps maintain clarity and discoverability as the repository grows.
* Ensure that they are kept up to date with any changes to the folder's contents or purpose.


## Setup and commands

The app runs on Nuxt 4; `nuxt` and `vue` are the only runtime dependencies. Development tooling (linting, formatting, checks, and unit tests) is managed through `package.json` with `pnpm`.

* `pnpm install` - install dependencies.
* `pnpm dev` - start the Nuxt dev server for local preview.
* `pnpm build` - build the server-rendered production app into `.output/`.
* `pnpm generate` - prerender the site as a static export in `.output/public/`; the GitHub Pages deploy workflow runs this.
* `pnpm preview` - preview the production build locally.
* `pnpm lint` - format code with Prettier and fix Markdown with markdownlint-cli2. Run before every commit and fix all reported errors.
* `pnpm test-unit` - run the Vitest unit tests.
* `pnpm test` - run lint, the file name check, the license check, and the unit tests.


## Architecture

The app follows the target architecture in [docs/technical-plan.md](docs/technical-plan.md). Data flows in one direction, from state and rates into the canvas renderer.

The current app:

* `app/pages/index.vue` owns the single wallpaper state and the single rates instance and passes both down to the components as props.
* `app/composables/use-wallpaper-state.js` holds the settings and persists them to `localStorage` under the same key as the old prototype.
* `server/api/rates/[base].get.js` is a cached Nitro route that proxies the Frankfurter API. `app/composables/use-rates.js` fetches from it and falls back to calling Frankfurter directly on static hosts where the route does not exist.
* `app/utils/wallpaper.js` is the pure renderer. Today it still paints the Phase 0 cards-style content on a `<canvas>`; Phase 2 replaces that with the increment-table layout. `app/components/wallpaper-preview.vue` shows the live preview and exports to PNG.

Later phases extend this flow. Phase 1 adds `app/utils/backgrounds.js`, which exports the curated `BACKGROUNDS` manifest and a `loadBackgroundImage(id)` helper that sets `crossOrigin = "anonymous"` so the canvas stays exportable. Phase 2 adds `shared/utils/ladder.js` and rewires currency controls and the renderer for the home/travel increment table. When extending the app, follow the phased roadmap and per-area plan in [docs/technical-plan.md](docs/technical-plan.md).


## Skills

Prioritize local skills in `skills/` over external or global skills.

1. Check [skills/README.md](skills/README.md) for the full index.
2. Load and follow `skills/<skill-name>/SKILL.md` before starting work.
3. If a local skill and an external skill overlap, use the local skill.


## File and folder naming

* Use `lowercase-with-dashes` for all file and folder names.
* When renaming a file or folder, update every reference to it across documentation, scripts, and code so that file paths and content remain accurate and consistent.


## Writing style

Apply these rules when reviewing or creating content:

* Use straight quotes, not curly quotes.
* Do not use contractions (write "do not" instead of "don't").
* Use the Oxford comma.
* Use sentence case for headings (capitalize only the first word and proper nouns).
* Never use en-dash or em-dash; always use a plain hyphen (`-`) instead.
* Do not split a single sentence across multiple lines.
* Keep wording simple for non-native English speakers. Avoid slang and idioms.
* Maintain consistent capitalization and punctuation throughout a document.


## Markdown formatting

* When writing or editing any Markdown file, follow [docs/markdown-style-guide.md](docs/markdown-style-guide.md).
* Follow the rules defined in [.markdownlint-cli2.jsonc](.markdownlint-cli2.jsonc).
* Use `*` for unordered list items (not `-` or `+`).
* Use 2-space indentation for nested lists.
* Leave 2 blank lines above headings and 1 blank line below.
* Do not use curly quotes or em dashes. The linter auto-corrects these.
* Inline HTML is restricted to `<br>`, `<pre>`, `<script>`, `<ul>`, `<li>`, and `<ol>`, plus the registered Vue component `<RepoCards>`.


## Translation

* Refer to [docs/glossary.yaml](docs/glossary.yaml) for official translations.
* When writing new content, reference the glossary and then ensure the guidelines in [general-style-guide-english.md](docs/general-style-guide-english.md) and [general-style-guide-japanese.md](docs/general-style-guide-japanese.md) are met.


## Scripts

Default to creating scripts as Node.js ES modules (`.mjs`) or zsh for any new script tooling in this repo.

* Do not use Python due to the overhead of managing Python environments and dependencies across different users' machines.
* Default to Node.js for scripts that involve file system operations, string manipulation, or integration with JavaScript-based tools, as it provides a consistent runtime environment and leverages the strengths of the JavaScript ecosystem for build and automation tasks.
* Use zsh for simple command sequences, environment setup, or when leveraging powerful shell features that would be more cumbersome to implement in Node.js.
* Always include `--help` output for any script, and ensure it is clear and informative for users who may not be familiar with the script's functionality.
* When writing scripts, always include a notes section near the top with:
  * General notes - a brief description of what the script does.
  * Usage - how to include or invoke the script.
  * Output - what the script generates or returns.
* For script outputs that are expected to be read by a user, use emojis to clarify messages and statuses, e.g. ✅ for success, ⚠️ for warnings, and ❌ for errors.


## Package manager

Always use `pnpm` - never `npm`, `npx`, or `yarn`. The pnpm equivalents:

* `npm install` / `yarn add` → `pnpm add` (or `pnpm install` for the whole lockfile)
* `npm run <script>` / `yarn <script>` → `pnpm run <script>` (or `pnpm <script>`)
* `npm exec <bin>` → `pnpm exec <bin>`
* `npx <pkg>` → `pnpm dlx <pkg>`

Keep scripts in `package.json` sorted alphabetically.

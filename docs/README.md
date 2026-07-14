# docs

Planning documents for the Ome Currency Converting Wallpaper app, plus the writing style guides, commit conventions, and glossary that apply to content in this repository.


## Change log <!-- omit in toc -->

* 2026-07-13 - Adapted for this repository: added the planning documents section and removed references to style guide files that are not included here.
* 2026-05-20 - Sanitized for public portfolio use; removed product-specific branding and internal references.


## Table of contents <!-- omit in toc -->

* [Planning documents](#planning-documents)
* [File structure](#file-structure)
* [General style guides](#general-style-guides)
* [Markdown style guide](#markdown-style-guide)
* [Commit style guide](#commit-style-guide)
* [Terminology and glossary](#terminology-and-glossary)


## Planning documents

These documents define the product and its implementation plan. Read them before making product changes.

* [Product spec](./product-spec.md) - problem, target user, increment-table layout, currency-wall selection, user flow, and feature list.
* [Technical plan](./technical-plan.md) - the Nuxt target architecture, state shape, per-area changes, and phased roadmap.
* [Curated backgrounds](./backgrounds.md) - background manifest shape, curated list, attribution, and how to add or swap a photo.


## File structure

```text
docs/
├── README.md ........................... This file
├── product-spec.md ..................... Product spec for the wallpaper app
├── technical-plan.md ................... Nuxt architecture and feature plan
├── backgrounds.md ...................... Curated background manifest and attribution
├── example-wallpaper.png ............... Visual reference for the increment-table layout
├── general-style-guide-english.md ...... Baseline writing rules (English)
├── general-style-guide-japanese.md ..... Baseline writing rules (Japanese)
├── markdown-style-guide.md ............. Markdown formatting conventions (banners and links)
├── repo-commit-style-guide.md .......... Git commit title and body conventions
├── glossary.yaml ....................... EN-JA translation glossary
└── words-to-avoid.txt .................. cspell trigger list of terms to flag
```


## General style guides

The general style guides define baseline writing rules that apply across all documentation content. They cover language, grammar, capitalization, punctuation, inclusive language, internationalization, formatting, and word usage.

* [General style guide - English](./general-style-guide-english.md) - Rules for English writing, including active voice, contractions, abbreviations, capitalization, punctuation, date and time formats, and a word list.
* [General style guide - Japanese](./general-style-guide-japanese.md) - Rules for Japanese writing, including honorifics, character usage (kanji, hiragana, katakana), punctuation, and formatting.


## Markdown style guide

* [Markdown style guide](./markdown-style-guide.md) - How Markdown documents in this repository should be formatted, including banners that highlight important notes and link styling within documents.


## Commit style guide

* [Git commit style guide](./repo-commit-style-guide.md) - Title format, body format, and emoji conventions for commits in this repository.


## Terminology and glossary

* [EN-JA translation glossary](./glossary.yaml) - English-to-Japanese term translations organized by topic. Each entry includes the English term, Japanese translation, and usage context.
* [Words to avoid](./words-to-avoid.txt) - cspell trigger list of words that should be flagged for review during spell checks.

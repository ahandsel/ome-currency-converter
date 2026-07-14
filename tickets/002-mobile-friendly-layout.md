# Ticket 002: Make the control layout mobile friendly


## Overview

Make the app usable on narrow phone viewports by stacking the page so all settings and configuration sit at the top, and the wallpaper preview sits at the bottom.

This work belongs to Phase 5 polish (responsive control layout) in [docs/technical-plan.md](../docs/technical-plan.md).


## Context

`app/pages/index.vue` already composes the control panel before the preview in document order. On wide viewports, `.layout` is a two-column grid (controls left, preview right).

At `max-width: 840px`, the layout stacks to one column, but `.preview` uses `order: -1` in `app/assets/css/main.css`, so the wallpaper preview appears first and the control panel is pushed below. Mobile users must scroll past the preview before they can change currencies, ladder settings, background, position, or device size.


## Objectives

1. On mobile (and other narrow stacked layouts), show all settings and configuration first.
2. Place the wallpaper preview (screenshot canvas) below the settings.
3. Keep the existing two-column desktop layout unchanged at wider breakpoints.
4. Keep controls fully reachable by scrolling; do not reintroduce sticky preview behavior that fights short phone viewports.


## Scope

* Update the responsive rules in `app/assets/css/main.css` so stacked layouts follow document order: controls, then preview (remove or reverse the mobile `order: -1` on `.preview`).
* Confirm `app/pages/index.vue` still composes `ControlPanel` before the preview section.
* Smoke-check phone widths (`<= 480px` and the `840px` stack breakpoint) in English and Japanese so labels and the currency wall still fit.
* Verify preview rendering, PNG download, and the incomplete-pair empty state still work after the reorder.


## Acceptance criteria

* At `max-width: 840px` (and below), the user sees settings and configuration first, then the wallpaper preview below.
* Desktop and wide layout is unchanged: controls on the left, preview on the right.
* Preview, download, and incomplete-pair empty state still work after the reorder.
* No new sticky positioning of the preview on short mobile viewports.


## Out of scope

* Redesigning individual control components or the currency wall interaction model.
* Changing wallpaper canvas rendering, rates fetching, or localization content.
* Desktop layout changes beyond leaving the existing two-column grid as-is.


## References

* [docs/technical-plan.md](../docs/technical-plan.md) - Phase 5 responsive control layout.
* [docs/product-spec.md](../docs/product-spec.md) - user flow and live preview behavior.
* `app/pages/index.vue` - page composition (controls before preview).
* `app/assets/css/main.css` - `.layout` grid and the `@media (max-width: 840px)` stack rules.


## Workflow

Per [tickets/README.md](README.md), create a branch named `ticket/002` and open a pull request when the work is done.

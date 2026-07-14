# components

Vue components for the single page. Nuxt auto-imports them, so `control-panel.vue` is used as `<ControlPanel>` without an import statement.


## Contents

* [background-picker.vue](background-picker.vue) - thumbnail grid for curated photo backgrounds, with a none option that falls back to gradient themes.
* [control-panel.vue](control-panel.vue) - the settings column: currency controls, background picker, content position, theme, iPhone size, title, the refresh button, and the shared status line.
* [position-toggle.vue](position-toggle.vue) - center or left control for anchoring the increment table on the wallpaper.
* [currency-controls.vue](currency-controls.vue) - currency wall for selecting home and travel, plus step, row count, and include-one ladder inputs.
* [wallpaper-preview.vue](wallpaper-preview.vue) - owns the `<canvas>`: redraws the wallpaper whenever the state or the rates change, shows an incomplete-pair empty state, and exports the canvas to a PNG download. Client only; the page wraps it in `<ClientOnly>`.

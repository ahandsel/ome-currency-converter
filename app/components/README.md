# components

Vue components for the single page. Nuxt auto-imports them, so `control-panel.vue` is used as `<ControlPanel>` without an import statement.


## Contents

* [background-picker.vue](background-picker.vue) - thumbnail grid for curated photo backgrounds, with a none option that falls back to gradient themes.
* [control-panel.vue](control-panel.vue) - the settings column: currency controls, background picker, theme, iPhone size, title, the refresh button, and the shared status line.
* [currency-controls.vue](currency-controls.vue) - today: home currency select and destination chip grid (Phase 0). Phase 2 replaces this with a single currency wall for home and travel plus step and row count controls.
* [wallpaper-preview.vue](wallpaper-preview.vue) - owns the `<canvas>`: redraws the wallpaper whenever the state or the rates change, and exports the canvas to a PNG download. Client only; the page wraps it in `<ClientOnly>`.

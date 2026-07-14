# components

Vue components for the single page. Nuxt auto-imports them, so `control-panel.vue` is used as `<ControlPanel>` without an import statement.


## Contents

* [attribution-note.vue](attribution-note.vue) - photographer credit for the selected photo background, shown under the wallpaper preview.
* [background-picker.vue](background-picker.vue) - thumbnail grid for curated photo backgrounds, with a none option that falls back to gradient themes.
* [control-panel.vue](control-panel.vue) - the settings column: currency controls, background picker, content position, theme, iPhone size, title, the refresh button, and the shared status line.
* [currency-controls.vue](currency-controls.vue) - currency wall for selecting home and travel, plus step, row count, and include-one ladder inputs.
* [language-switcher.vue](language-switcher.vue) - toggles the interface between English and Japanese.
* [position-toggle.vue](position-toggle.vue) - center or left control for anchoring the increment table on the wallpaper.
* [wallpaper-preview.vue](wallpaper-preview.vue) - owns the `<canvas>`: redraws the wallpaper whenever the state or the rates change, hosts `<AttributionNote>` under the preview, shows richer empty and error hints (incomplete pair, waiting for rates, rates unavailable, background load fallback), and exports the canvas to a PNG download. Client only; the page wraps it in `<ClientOnly>`.

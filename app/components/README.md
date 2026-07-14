# components

Vue components for the single page. Nuxt auto-imports them, so `control-panel.vue` is used as `<ControlPanel>` without an import statement.


## Contents

* [control-panel.vue](control-panel.vue) - the settings column: currency controls, reference amount, theme, iPhone size, title, the refresh button, and the shared status line.
* [currency-controls.vue](currency-controls.vue) - the home currency select and the destination chip grid; refines the currency code list from the Frankfurter API with the built-in list as a fallback.
* [wallpaper-preview.vue](wallpaper-preview.vue) - owns the `<canvas>`: redraws the wallpaper whenever the state or the rates change, and exports the canvas to a PNG download. Client only; the page wraps it in `<ClientOnly>`.

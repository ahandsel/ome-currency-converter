# app

The Nuxt application source directory. It holds the root component, the single page, the UI components, the composables, the canvas renderer, and the stylesheet.


## Contents

* [app.vue](app.vue) - root component; renders the single page through `<NuxtPage />`.
* [assets/](assets/) - bundled assets; `assets/css/main.css` is the global stylesheet.
* [components/](components/) - Vue components for the control panel and the wallpaper preview.
* [composables/](composables/) - shared reactive logic for the wallpaper state and the exchange rates.
* [pages/](pages/) - route pages; `pages/index.vue` is the single page.
* [utils/](utils/) - plain JavaScript helpers; `utils/wallpaper.js` is the pure canvas renderer.

The project structure section of [docs/technical-plan.md](../docs/technical-plan.md) maps the old `src/` files to this layout.

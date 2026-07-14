# composables

Auto-imported composables that hold the app's shared reactive logic.


## Contents

* [use-rates.js](use-rates.js) - fetches the latest rates for the home currency from the cached server route `/api/rates/<base>`, and falls back to calling the Frankfurter API directly on static hosts where the route does not exist. Skips fetching when home is unset.
* [use-wallpaper-state.js](use-wallpaper-state.js) - the persistent wallpaper settings (`home`, `travel`, ladder fields, theme, device, title, background, position), stored in `localStorage` under the same key as the old prototype. Migrates cards-era fields (`base`, `destinations`, `mode`, and related keys) into the home/travel shape on load.

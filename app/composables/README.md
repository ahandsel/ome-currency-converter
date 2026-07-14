# composables

Auto-imported composables that hold the app's shared reactive logic.


## Contents

* [use-rates.js](use-rates.js) - fetches the latest rates for a base currency from the cached server route `/api/rates/<base>`, and falls back to calling the Frankfurter API directly on static hosts where the route does not exist.
* [use-wallpaper-state.js](use-wallpaper-state.js) - the persistent wallpaper settings, stored in `localStorage` under the same key as the old prototype so a returning user's saved setup carries over.

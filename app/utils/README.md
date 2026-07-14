# utils

Auto-imported plain JavaScript helpers for the app.


## Contents

* [wallpaper.js](wallpaper.js) - the pure canvas renderer. It exports `DEVICE_SIZES`, `THEMES`, and `renderWallpaper`. Phase 0 still paints destination cards; Phase 2 replaces that path with the increment-table layout (left = home, right = travel).
* [backgrounds.js](backgrounds.js) - the curated Unsplash photo manifest and loader. It exports `BACKGROUNDS`, `getBackground`, and `loadBackgroundImage` for the Phase 1 background picker and renderer.

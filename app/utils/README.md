# utils

Auto-imported plain JavaScript helpers for the app.


## Contents

* [wallpaper.js](wallpaper.js) - the pure canvas renderer. It exports `DEVICE_SIZES`, `THEMES`, and `renderWallpaper`. It paints a cover-fit photo or gradient theme, then the two-column increment table (left = home amounts, right = travel amounts). Content can sit center or left; photo scrims weight toward the left when needed. Incomplete home/travel data paints the background only and does not invent amounts.
* [backgrounds.js](backgrounds.js) - the curated Unsplash photo manifest and loader. It exports `BACKGROUNDS`, `getBackground`, and `loadBackgroundImage` for the background picker and renderer.

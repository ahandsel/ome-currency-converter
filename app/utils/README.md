# utils

Auto-imported plain JavaScript helpers for the app.


## Contents

* [wallpaper.js](wallpaper.js) - the pure canvas renderer. It exports `DEVICE_SIZES`, `THEMES`, `formatWallpaperDate`, and `renderWallpaper`. It paints a cover-fit photo or gradient theme, then the two-column increment table (left = home amounts, right = travel amounts). Content can sit center or left; photo scrims weight toward the left when needed. Phase 5 strengthens legibility: scrim and panel alphas rise for photos tagged `suggestedText: "dark"` (bright scenes), and scrim color can tint toward each photo's `dominantColor`. Incomplete home/travel data paints the background only and does not invent amounts.
* [backgrounds.js](backgrounds.js) - the curated Unsplash photo manifest and loader. It exports `BACKGROUNDS`, `getBackground`, and `loadBackgroundImage` for the background picker and renderer. Each entry includes `dominantColor` and `suggestedText` for the renderer legibility pass.

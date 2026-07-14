# Curated backgrounds


## Approach

Backgrounds are a curated, bundled set rather than a live Unsplash search. This needs no API key, no rate limits, and no Unsplash integration to manage. The curated set lives in `app/utils/backgrounds.js` (see [technical-plan.md](./technical-plan.md)) as an exported array, and each entry carries everything the app needs to render the photo and credit its author.

Photos are hotlinked from `images.unsplash.com`, which returns permissive CORS headers, so the canvas stays exportable when `img.crossOrigin = "anonymous"` is set before `src`. The app does not commit image binaries to the repo.


## Manifest field shape

Each entry in `BACKGROUNDS` uses this shape:

```js
{
  id: "beach-teal",            // stable slug used in app state (backgroundId)
  label: "Teal beach",         // short human-readable name for the picker
  fullUrl: "https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=1600&q=80",
  thumbUrl: "https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=200&q=60",
  photographer: "Jane Doe",    // required for attribution
  profileUrl: "https://unsplash.com/@janedoe?utm_source=ome&utm_medium=referral",
  photoUrl: "https://unsplash.com/photos/XXXX?utm_source=ome&utm_medium=referral",
  dominantColor: "#0e7490",    // used as a placeholder and as a scrim tint hint
  suggestedText: "light"       // "light" or "dark": which text color reads best
}
```

Notes on the fields:

* `fullUrl` and `thumbUrl` point at the same Unsplash photo at different widths. Using the Unsplash image CDN parameters (`w`, `q`, `auto=format`, `fit=crop`) keeps downloads small and avoids shipping binaries.
* `dominantColor` is drawn first as a solid fill so the preview has color before the photo finishes loading, and it can tint the legibility scrim.
* `suggestedText` lets the renderer pick a legible text color per photo. A universal dark scrim also protects legibility regardless.


## Curated list

The initial set targets about 12 calm, low-detail, phone-friendly photos so a currency table stays legible on top. Sourced from [Unsplash phone wallpaper search](https://unsplash.com/s/photos/phone-wallpaper). Each slot must be filled with a real Unsplash photo before shipping; the curation workflow section below explains how.

| Slot | id             | Theme / mood          | Suggested text |
| ---- | -------------- | --------------------- | -------------- |
| 1    | dusk-gradient  | Dusk sky gradient     | light          |
| 2    | ocean-teal     | Calm teal ocean       | light          |
| 3    | mountain-fog   | Foggy mountains       | light          |
| 4    | desert-dune    | Warm desert dunes     | dark           |
| 5    | forest-dark    | Deep green forest     | light          |
| 6    | city-night     | City lights at night  | light          |
| 7    | sakura-soft    | Soft pink blossoms    | dark           |
| 8    | snow-minimal   | Minimal snow field    | dark           |
| 9    | sunset-warm    | Warm orange sunset    | light          |
| 10   | marble-light   | Light marble texture  | dark           |
| 11   | night-sky      | Stars and night sky   | light          |
| 12   | paper-neutral  | Neutral paper texture | dark           |

The slots above are placeholders describing the intended look. Each must be replaced with a concrete Unsplash photo (real `fullUrl`, `thumbUrl`, `photographer`, `profileUrl`, and `photoUrl`) during implementation.


## Curation workflow

The implementing agent is authorized to research real Unsplash photos that match each slot's theme and mood, following the criteria above (calm, low detail, and legible under a text table). Curation is a propose-then-approve flow:

1. Research candidate photos on Unsplash and collect the manifest fields for each slot.
2. Write the proposed set into a review note at `notes/background-curation-proposal.md`, listing for each slot the photo page link, the photographer, and a thumbnail link.
3. Wait for maintainer approval of the note.
4. Wire only the approved photos into `BACKGROUNDS` in `app/utils/backgrounds.js`.

Do not ship photos that have not been approved.


## Attribution and license

Unsplash photos are free to use, including commercially, and may be modified. Attribution is not legally required by the Unsplash license, but the Unsplash API guidelines strongly encourage crediting the photographer, so the app does credit them:

* Show the photographer name and a link to their Unsplash profile in the UI whenever a background is selected.
* Draw a small credit on the generated wallpaper itself (for example, "Photo: Name / Unsplash").
* Append UTM parameters (`utm_source=ome&utm_medium=referral`) to Unsplash profile and photo links, per Unsplash attribution guidance.

Because the app uses a curated set of direct image links rather than the Unsplash API, there is no API key, no hotlink-tracking download endpoint call, and no production-access approval to manage. If the app later moves to live Unsplash search, revisit the API guidelines, including the download-tracking endpoint requirement.


## How to add or swap a background

1. Find a calm, low-detail photo on [Unsplash](https://unsplash.com/s/photos/phone-wallpaper) that stays legible under a text table.
2. Copy the photo page URL and the direct image URL. Build `fullUrl` and `thumbUrl` from the `images.unsplash.com` link with `auto=format&fit=crop` and appropriate `w` and `q` values.
3. Add a new entry to `BACKGROUNDS` in `app/utils/backgrounds.js` with a stable, unique `id`, the photographer name, and their profile URL with UTM parameters.
4. Set `dominantColor` (sample the photo) and `suggestedText` (light or dark) so the preview and scrim behave well.
5. To remove a background, delete its entry. If any saved state references the removed `backgroundId`, the app falls back to the gradient theme, so no migration is needed.

# Background curation proposal

This note proposes 12 Unsplash photos for the curated wallpaper backgrounds listed in [docs/backgrounds.md](../docs/backgrounds.md). It is a propose-then-approve review only. Do not wire any photo into `app/utils/backgrounds.js` until the maintainer marks each slot keep, swap, or reject.

Criteria used for every pick:

* Calm, low-detail composition so a currency table stays legible on top
* Phone-wallpaper friendly framing where a portrait-friendly crop exists
* Free Unsplash License photos (not Unsplash+ / Getty locks)
* Stable `images.unsplash.com/photo-...` CDN ids, with `fullUrl` / `thumbUrl` params ready to copy

CDN URL pattern for every slot:

* `fullUrl`: `https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=1600&q=80`
* `thumbUrl`: `https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=200&q=60`

`suggestedText` values match the slot table exactly. `dominantColor` values are approximate placeholders for the loader fill and scrim tint.


## Slot 1: dusk-gradient

* **id**: `dusk-gradient`
* **label**: Dusk gradient
* **theme**: Dusk sky gradient
* **suggestedText**: `light`
* **photographer**: Philipp Hubert (`@philipphubert`)
* **profileUrl**: `https://unsplash.com/@philipphubert?utm_source=ome&utm_medium=referral`
* **photo page**: [Gradient of blue to orange sky at dusk](https://unsplash.com/photos/gradient-of-blue-to-orange-sky-at-dusk-_kan0MnNd4E?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1760865245994-741b5e06317e`
* **thumbnail**: ![Dusk gradient thumb](https://images.unsplash.com/photo-1760865245994-741b5e06317e?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1760865245994-741b5e06317e?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#1e3a8a`
* **why**: Smooth abstract blue-to-orange dusk with almost no subject detail; excellent under light text.


## Slot 2: ocean-teal

* **id**: `ocean-teal`
* **label**: Teal ocean
* **theme**: Calm teal ocean
* **suggestedText**: `light`
* **photographer**: Rayyu Maldives (`@rayyu`)
* **profileUrl**: `https://unsplash.com/@rayyu?utm_source=ome&utm_medium=referral`
* **photo page**: [Aerial photo of calm ocean](https://unsplash.com/photos/aerial-photo-of-calm-ocean-7_mHxdheHDA?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1575372030115-a03ee9c1a7a3`
* **thumbnail**: ![Teal ocean thumb](https://images.unsplash.com/photo-1575372030115-a03ee9c1a7a3?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1575372030115-a03ee9c1a7a3?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#0e7490`
* **why**: Uniform teal water field; calm and low-contrast enough for a table overlay.
* **alternative**: Tim Patch [`4kzrkPGtlj0`](https://unsplash.com/photos/aerial-photography-teal-body-of-water-and-shore-4kzrkPGtlj0) (`photo-1538714109418-0f07d3522c93`) if a shore line is preferred.


## Slot 3: mountain-fog

* **id**: `mountain-fog`
* **label**: Foggy mountains
* **theme**: Foggy mountains
* **suggestedText**: `light`
* **photographer**: Yuheng Ouyang (`@govizlora`)
* **profileUrl**: `https://unsplash.com/@govizlora?utm_source=ome&utm_medium=referral`
* **photo page**: [Mountains shrouded in mist](https://unsplash.com/photos/mountains-are-shrouded-in-a-misty-cloudy-atmosphere-YZ_DKKufjI0?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1746157981411-05e0b952d3ec`
* **thumbnail**: ![Foggy mountains thumb](https://images.unsplash.com/photo-1746157981411-05e0b952d3ec?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1746157981411-05e0b952d3ec?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#64748b`
* **why**: Muted, minimal mountain bands in fog; soft midtones that take a dark scrim well.


## Slot 4: desert-dune

* **id**: `desert-dune`
* **label**: Desert dunes
* **theme**: Warm desert dunes
* **suggestedText**: `dark`
* **photographer**: Jan Suchanek (`@johnny_slav`)
* **profileUrl**: `https://unsplash.com/@johnny_slav?utm_source=ome&utm_medium=referral`
* **photo page**: [Golden sand dunes at sunset](https://unsplash.com/photos/golden-sand-dunes-with-rippling-textures-at-sunset-iMOfqXZh3hY?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1770635427503-152eb094197b`
* **thumbnail**: ![Desert dunes thumb](https://images.unsplash.com/photo-1770635427503-152eb094197b?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1770635427503-152eb094197b?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#d97706`
* **why**: Warm sand texture without busy landmarks; light enough that dark text is the right default.
* **note**: Ripple detail is moderate. If the table looks busy in a preview pass, swap for a softer dune field.


## Slot 5: forest-dark

* **id**: `forest-dark`
* **label**: Deep forest
* **theme**: Deep green forest
* **suggestedText**: `light`
* **photographer**: Zoltan Komives (`@landr0ver`)
* **profileUrl**: `https://unsplash.com/@landr0ver?utm_source=ome&utm_medium=referral`
* **photo page**: [Dark moody forest](https://unsplash.com/photos/dark-moody-forest-with-faint-light-filtering-through-fkAYrP9eSxI?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1761469445230-55614d2ba5d0`
* **thumbnail**: ![Deep forest thumb](https://images.unsplash.com/photo-1761469445230-55614d2ba5d0?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1761469445230-55614d2ba5d0?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#14532d`
* **why**: Deep green canopy with soft light; dark enough for light text after the universal scrim.
* **note**: Forests are intrinsically busier than sky or water. Prefer this over high-contrast sun-ray forests for legibility.


## Slot 6: city-night

* **id**: `city-night`
* **label**: City lights
* **theme**: City lights at night
* **suggestedText**: `light`
* **photographer**: Tsuyoshi Kozu (`@tsuyoshikozu`)
* **profileUrl**: `https://unsplash.com/@tsuyoshikozu?utm_source=ome&utm_medium=referral`
* **photo page**: [Blurred city lights bokeh](https://unsplash.com/photos/blurred-city-lights-at-night-create-a-bokeh-effect-luAFESue6Ws?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1765437777365-8c20633f30a4`
* **thumbnail**: ![City lights thumb](https://images.unsplash.com/photo-1765437777365-8c20633f30a4?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1765437777365-8c20633f30a4?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#0f172a`
* **why**: Out-of-focus night lights read as "city night" without sharp window and street detail competing with the table.
* **alternative**: Saad Chaudhry [`I4RlACSpB_k`](https://unsplash.com/photos/city-skyline-during-night-time-I4RlACSpB_k) (`photo-1597083950211-c2e8bfc5dae0`) for a sharper skyline look.


## Slot 7: sakura-soft

* **id**: `sakura-soft`
* **label**: Soft sakura
* **theme**: Soft pink blossoms
* **suggestedText**: `dark`
* **photographer**: Masaaki Komori (`@gaspanik`)
* **profileUrl**: `https://unsplash.com/@gaspanik?utm_source=ome&utm_medium=referral`
* **photo page**: [Pink cherry blossom flower](https://unsplash.com/photos/pink-cherry-blossom-flower-_SbeCWYjwCQ?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1519882189396-71f93cb4714b`
* **thumbnail**: ![Soft sakura thumb](https://images.unsplash.com/photo-1519882189396-71f93cb4714b?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1519882189396-71f93cb4714b?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#f9a8d4`
* **why**: Soft pink blossom on a bright haze; a well-known, stable classic that matches dark text.
* **alternative**: Soft-focus pale blossoms [`D2UWMd4M9xs`](https://unsplash.com/photos/delicate-pale-pink-cherry-blossoms-in-soft-focus-D2UWMd4M9xs) (`photo-1747223233695-65874ef3004a`) if even less petal detail is wanted.
* **note**: Sakura photos often have sharp petal edges. This is one of the harder slots for "low detail"; preview legibility carefully.


## Slot 8: snow-minimal

* **id**: `snow-minimal`
* **label**: Snow field
* **theme**: Minimal snow field
* **suggestedText**: `dark`
* **photographer**: Lydia Gulinkina (`@madamrazor`)
* **profileUrl**: `https://unsplash.com/@madamrazor?utm_source=ome&utm_medium=referral`
* **photo page**: [White snow covered field](https://unsplash.com/photos/white-snow-covered-field-during-daytime-cpfziUYu0uE?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1610443817209-27cb6f47fd64`
* **thumbnail**: ![Snow field thumb](https://images.unsplash.com/photo-1610443817209-27cb6f47fd64?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1610443817209-27cb6f47fd64?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#e2e8f0`
* **why**: Near-empty snow and gray sky; very little mid-ground detail, strong match for dark text.


## Slot 9: sunset-warm

* **id**: `sunset-warm`
* **label**: Warm sunset
* **theme**: Warm orange sunset
* **suggestedText**: `light`
* **photographer**: Mohammad Alizade (`@mohamadaz`)
* **profileUrl**: `https://unsplash.com/@mohamadaz?utm_source=ome&utm_medium=referral`
* **photo page**: [Desert under starry sky](https://unsplash.com/photos/desert-under-starry-sky-S5uV7ro4UPY?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1504941214544-9c1c44559ab4`
* **thumbnail**: ![Warm sunset thumb](https://images.unsplash.com/photo-1504941214544-9c1c44559ab4?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1504941214544-9c1c44559ab4?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#ea580c`
* **why**: Soft warm orange-to-blue twilight gradient with a simple dune silhouette; classic and stable CDN id.
* **note**: Theme overlaps slightly with `dusk-gradient` and `night-sky`. This pick leans orange-warm; slot 1 is a smoother abstract dusk; slot 11 is star-dominant.
* **alternative**: Matteo Grando [`zQeTCCDSQoc`](https://unsplash.com/photos/orange-and-blue-cloudy-sky-zQeTCCDSQoc) (`photo-1593982591565-ed2aaa9989fa`) for a cloudier orange sunset without stars.


## Slot 10: marble-light

* **id**: `marble-light`
* **label**: Light marble
* **theme**: Light marble texture
* **suggestedText**: `dark`
* **photographer**: Akbar Nemati (`@akbarnemati`)
* **profileUrl**: `https://unsplash.com/@akbarnemati?utm_source=ome&utm_medium=referral`
* **photo page**: [White marble surface](https://unsplash.com/photos/a-close-up-of-a-white-marble-surface-ZVMlab81PFY?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1694378061128-d3df24b1ae47`
* **thumbnail**: ![Light marble thumb](https://images.unsplash.com/photo-1694378061128-d3df24b1ae47?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1694378061128-d3df24b1ae47?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#f1f5f9`
* **why**: Light white-gray marble texture; free license (not Getty / Unsplash+), good for dark text.


## Slot 11: night-sky

* **id**: `night-sky`
* **label**: Night sky
* **theme**: Stars and night sky
* **suggestedText**: `light`
* **photographer**: Greg Rakozy (`@grakozy`)
* **profileUrl**: `https://unsplash.com/@grakozy?utm_source=ome&utm_medium=referral`
* **photo page**: [Night sky filled with stars](https://unsplash.com/photos/a-night-sky-filled-with-lots-of-stars-YRwM11f8Cgo?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1491439005413-4ed9f58ef2ad`
* **thumbnail**: ![Night sky thumb](https://images.unsplash.com/photo-1491439005413-4ed9f58ef2ad?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1491439005413-4ed9f58ef2ad?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#0b1220`
* **why**: Star field with minimal foreground; a long-lived Unsplash classic with a stable CDN id.


## Slot 12: paper-neutral

* **id**: `paper-neutral`
* **label**: Neutral paper
* **theme**: Neutral paper texture
* **suggestedText**: `dark`
* **photographer**: Alexander Nedviga (`@sanches812`)
* **profileUrl**: `https://unsplash.com/@sanches812?utm_source=ome&utm_medium=referral`
* **photo page**: [Textured off-white surface](https://unsplash.com/photos/close-up-of-a-textured-off-white-surface-OvkSAWUicYM?utm_source=ome&utm_medium=referral)
* **CDN photo id**: `photo-1737276745810-ce753d468a34`
* **thumbnail**: ![Neutral paper thumb](https://images.unsplash.com/photo-1737276745810-ce753d468a34?auto=format&fit=crop&w=200&q=60)
* **fullUrl**: `https://images.unsplash.com/photo-1737276745810-ce753d468a34?auto=format&fit=crop&w=1600&q=80`
* **dominantColor**: `#f5f0e8`
* **why**: Quiet off-white paper texture with free license; avoids Unsplash+ paper packs from curated lifestyle feeds.


## Ready-to-copy manifest sketch

After approval, entries can land in `BACKGROUNDS` roughly like this (one example shown; repeat the same shape for all 12):

```js
{
  id: "dusk-gradient",
  label: "Dusk gradient",
  fullUrl: "https://images.unsplash.com/photo-1760865245994-741b5e06317e?auto=format&fit=crop&w=1600&q=80",
  thumbUrl: "https://images.unsplash.com/photo-1760865245994-741b5e06317e?auto=format&fit=crop&w=200&q=60",
  photographer: "Philipp Hubert",
  profileUrl: "https://unsplash.com/@philipphubert?utm_source=ome&utm_medium=referral",
  photoUrl: "https://unsplash.com/photos/gradient-of-blue-to-orange-sky-at-dusk-_kan0MnNd4E?utm_source=ome&utm_medium=referral",
  dominantColor: "#1e3a8a",
  suggestedText: "light",
}
```


## Approval

Please mark each slot as **keep**, **swap** (name the alternative), or **reject**.

Confirm before wiring `app/utils/backgrounds.js`:

1. Every photographer credit and UTM link above is acceptable for UI and canvas attribution.
2. `suggestedText` values stay as listed (table defaults), or say which slots should flip after a visual legibility pass.
3. Whether soft-detail risks on `desert-dune`, `forest-dark`, and `sakura-soft` are acceptable, or whether listed alternatives should replace them now.
4. Whether `sunset-warm` should stay as the warm twilight (Mohammad Alizade) or move to a cloudier orange sky to reduce overlap with `dusk-gradient` / `night-sky`.

Status: approved by the maintainer on 2026-07-14 (keep all 12 primary picks). Photos are wired into `app/utils/backgrounds.js`.

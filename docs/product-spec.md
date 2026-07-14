# Product spec: Ome Currency Converting Wallpaper


## Summary

Ome Currency Converting Wallpaper is a web app that generates an iPhone lock-screen or home-screen wallpaper containing a currency exchange reference. A traveler picks exactly one home currency and one travel currency, configures an amount ladder, chooses a photo background, and downloads a wallpaper sized for their exact iPhone model. The wallpaper shows a two-column increment table (left = home amounts, right = travel amounts). The core value of the app is the generated wallpaper itself, not an interactive converter. The interface is available in English and Japanese.


## Problem

Travelers repeatedly do mental currency math while abroad. Converter apps require opening an app, typing an amount, and reading a result. A wallpaper puts a small conversion reference on the lock screen, so a quick glance answers "roughly how much is this?" without opening anything.


## Reference

[elkapp.co](https://elkapp.co/) is a well-known travel currency converter. Ome borrows the traveler-focused framing but inverts the priority: instead of an interactive converter with an optional widget, the wallpaper is the product and the converter inputs exist only to configure that wallpaper.


## Target user

* Primary: a leisure or business traveler heading to a single destination who wants a quick, glanceable reference for the local currency.
* Secondary: a traveler who remakes the wallpaper for each trip by swapping the travel currency on the same currency wall.


## Wallpaper layout

The app has one wallpaper layout: the increment table. There is no cards layout and no mode toggle.

The table always has two columns. The left column shows home amounts; the right column shows the converted travel amounts. For example, with home USD, travel JPY, step 5, and five rows including a leading 1:

| USD | JPY    |
| --- | ------ |
| $1  | ¥150   |
| $5  | ¥750   |
| $10 | ¥1,500 |
| $15 | ¥2,250 |
| $20 | ¥3,000 |

The amounts are generated from a configurable step and row count, with an optional leading value of 1. The step is a whole number of at least 1, the row count is between 3 and 10, and duplicate amounts are skipped, so a step of 1 with the leading value of 1 produces 1, 2, 3, 4, 5.

The visual hierarchy (semi-transparent table panel, column headers with currency codes, large readable amounts, and spacing) should match the reference in [example-wallpaper.png](./example-wallpaper.png).


## Currency selection

The user picks both currencies from one shared currency wall (the same chip-grid style used today for destination selection). There is no separate Home dropdown.

At most two currencies are selected at once: home and travel. Selection order and icons communicate role:

* The first established home slot is home (home marker, for example a house icon).
* The first established travel slot is travel (travel marker, for example a plane icon).
* The same currency code cannot be both home and travel at once.


### Selection behavior

* Empty home, user taps a currency: assign home.
* Home set, empty travel, user taps a different currency: assign travel.
* Tap the current home again: clear only home; leave travel selected. The next tap fills home.
* Tap the current travel again: clear only travel; leave home selected. The next tap fills travel.
* Both set, user taps a third currency: former home is cleared, former travel becomes the new home, and the tapped currency becomes the new travel.


### Incomplete selection

The UI may keep a partial state (home only or travel only). The wallpaper preview and PNG download must not invent a missing partner currency. Disable download and show a clear empty-state message until both slots are filled.


## User flow

1. The user opens the site. The interface appears in English or Japanese based on the browser language, and the user can switch languages at any time.
2. The user picks home and travel currencies from the currency wall (at most one of each).
3. The user sets the ladder step and row count.
4. The user picks a background photo from a curated set of thumbnails.
5. The user picks an iPhone model to set the wallpaper resolution.
6. The user picks a content position: center, or left so app icons can sit on the right.
7. The canvas preview updates live whenever both currencies and a rate are available.
8. The user downloads the wallpaper as a PNG and sets it on the iPhone.


## Feature list

* Currency wall for selecting exactly one home currency and one travel currency.
* Configurable ladder step and row count (optional leading row of 1).
* Increment-table wallpaper: left column home amounts, right column travel amounts.
* Custom wallpaper title with a localized default ("Travel rates"), drawn as the wallpaper header.
* Curated photo background picker with a legibility scrim over the photo.
* Gradient theme fallback when no photo is selected or a photo fails to load.
* iPhone model selection that sets the exact output resolution.
* Content position control: center or left.
* Live canvas preview when both currencies are selected.
* PNG download sized to the selected iPhone model (disabled when the pair is incomplete).
* Photographer attribution shown in the UI for the selected background.
* Live rates from a keyless exchange-rate API, cached to limit repeat fetches.
* English and Japanese interface, with browser-language detection, a manual language switcher, and localized currency names and number formats.
* Settings persisted to localStorage so a returning user keeps their setup.


## Out of scope

* Multi-destination or cards wallpaper layouts (one home against many destinations).
* A mode toggle between wallpaper layouts.
* Selecting more than two currencies at once.
* User accounts, sign-in, or cloud sync.
* Live Unsplash search or any Unsplash API key. Backgrounds are a curated, bundled set.
* Historical rate charts or trend lines.
* Android or non-iPhone device sizing (may be considered later).
* Interface languages beyond English and Japanese (may be considered later).
* Automatic wallpaper installation. The user downloads the PNG and sets it manually.
* Trading or financial advice. Rates are a reference only.

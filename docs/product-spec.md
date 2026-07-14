# Product spec: Ome Currency Converting Wallpaper


## Summary

Ome Currency Converting Wallpaper is a web app that generates an iPhone lock-screen or home-screen wallpaper containing a currency exchange reference. A traveler picks a home currency and a travel currency, chooses a photo background, and downloads a wallpaper sized for their exact iPhone model. The core value of the app is the generated wallpaper itself, not an interactive converter. The interface is available in English and Japanese.


## Problem

Travelers repeatedly do mental currency math while abroad. Converter apps require opening an app, typing an amount, and reading a result. A wallpaper puts a small conversion reference on the lock screen, so a quick glance answers "roughly how much is this?" without opening anything.


## Reference

[elkapp.co](https://elkapp.co/) is a well-known travel currency converter. Ome borrows the traveler-focused framing but inverts the priority: instead of an interactive converter with an optional widget, the wallpaper is the product and the converter inputs exist only to configure that wallpaper.


## Target user

* Primary: a leisure or business traveler heading to a single destination who wants a quick, glanceable reference for the local currency.
* Secondary: a frequent traveler who wants several destination currencies referenced at once.


## Rendering modes

The app supports two wallpaper layouts, chosen by a mode toggle. The increment table is the default mode for a new user once it ships; a returning user keeps their saved mode.


### Cards mode (existing)

Shows one home currency against multiple destination currencies, one card per destination. Each card shows the flag, code, name, the value of one home unit, and a reference conversion. This is the layout the current prototype already renders.


### Increment table mode (new)

Shows a single home to travel pair as a ladder of amounts. For example, with home USD, travel JPY, and a step of 5:

| Home amount | Travel value |
| ----------- | ------------ |
| 1 USD       | 150 JPY      |
| 5 USD       | 750 JPY      |
| 10 USD      | 1,500 JPY    |
| 15 USD      | 2,250 JPY    |
| 20 USD      | 3,000 JPY    |

The amounts are generated from a configurable step and row count, with an optional leading value of 1. The rough idea sketch used 1, 5, 10, 15, 25, which is not a uniform step; the app uses the configurable step model instead, so the traveler can dial in the ladder they want. The step is a whole number of at least 1, the row count is between 3 and 10, and duplicate amounts are skipped, so a step of 1 with the leading value of 1 produces 1, 2, 3, 4, 5.


## User flow

1. The user opens the site. The interface appears in English or Japanese based on the browser language, and the user can switch languages at any time.
2. The user picks a rendering mode: cards or increment table.
3. The user picks a home currency.
4. Depending on mode:
   * Increment table: the user picks a single travel currency, a step, and a row count.
   * Cards: the user picks one or more destination currencies.
5. The user picks a background photo from a curated set of thumbnails.
6. The user picks an iPhone model to set the wallpaper resolution.
7. The user picks a content position: center, or left so app icons can sit on the right.
8. The canvas preview updates live with every change.
9. The user downloads the wallpaper as a PNG and sets it on the iPhone.


## Feature list

* Home currency picker.
* Mode toggle between cards and increment table.
* Cards mode: multi-destination selection (existing chip grid).
* Increment table mode: single travel currency, configurable step, and configurable row count.
* Custom wallpaper title with a localized default ("Travel rates"), drawn as the wallpaper header in both modes.
* Curated photo background picker with a legibility scrim over the photo.
* Gradient theme fallback when no photo is selected or a photo fails to load.
* iPhone model selection that sets the exact output resolution.
* Content position control: center or left.
* Live canvas preview.
* PNG download sized to the selected iPhone model.
* Photographer attribution shown in the UI for the selected background.
* Live rates from a keyless exchange-rate API, cached to limit repeat fetches.
* English and Japanese interface, with browser-language detection, a manual language switcher, and localized currency names and number formats.
* Settings persisted to localStorage so a returning user keeps their setup.


## Out of scope

* User accounts, sign-in, or cloud sync.
* Live Unsplash search or any Unsplash API key. Backgrounds are a curated, bundled set.
* Historical rate charts or trend lines.
* Android or non-iPhone device sizing (may be considered later).
* Interface languages beyond English and Japanese (may be considered later).
* Automatic wallpaper installation. The user downloads the PNG and sets it manually.
* Trading or financial advice. Rates are a reference only.

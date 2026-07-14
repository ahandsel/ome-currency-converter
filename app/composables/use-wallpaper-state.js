// Persistent wallpaper settings shared by the control panel and the preview.
// Stored in localStorage under the same key as the prototype, so a returning
// user's saved setup carries over unchanged.

export const STORAGE_KEY = "ome-currency-converter:v1";

export const defaultState = {
  base: "USD",
  destinations: ["JPY", "EUR", "THB"],
  referenceAmount: 100,
  theme: "midnight",
  device: "pro-max",
  title: "Travel rates",
  mode: "cards",
  travelCurrency: "JPY",
  step: 5,
  rowCount: 5,
  includeOne: true,
  backgroundId: null,
  position: "center",
};

// Returns the reactive state as a ref (VueUse `useLocalStorage`, auto-imported
// via `@vueuse/nuxt`). `mergeDefaults` keeps old saved prototype state
// compatible, exactly like the prototype's `loadState` merge. `initOnMounted`
// makes the server render and client hydration both use the defaults, then
// swaps in the saved state right after mount, avoiding hydration mismatches
// for returning users. The default is cloned so mutations of the live state
// never touch the exported `defaultState`.
export function useWallpaperState() {
  return useLocalStorage(STORAGE_KEY, () => structuredClone(defaultState), {
    mergeDefaults: true,
    initOnMounted: true,
  });
}

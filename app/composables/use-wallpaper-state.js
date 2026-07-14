// Persistent wallpaper settings shared by the control panel and the preview.
// Stored in localStorage under the same key as the prototype, so a returning
// user's saved setup carries over with cards-era fields migrated to home/travel.

export const STORAGE_KEY = 'ome-currency-converter:v1';

export const defaultState = {
  home: 'USD', // currency code, or null when cleared
  travel: 'JPY', // currency code, or null when cleared
  step: 5,
  rowCount: 5,
  includeOne: true,
  theme: 'midnight',
  device: 'pro-max',
  title: 'Travel rates',
  backgroundId: null,
  position: 'center',
};

const NEW_STATE_KEYS = [
  'home',
  'travel',
  'step',
  'rowCount',
  'includeOne',
  'theme',
  'device',
  'title',
  'backgroundId',
  'position',
];

const CARDS_ERA_KEYS = [
  'base',
  'destinations',
  'referenceAmount',
  'mode',
  'travelCurrency',
];

function hasCardsEraKeys(raw) {
  return CARDS_ERA_KEYS.some((key) => key in raw);
}

function pickNewShapeFields(raw) {
  const result = {};
  for (const key of NEW_STATE_KEYS) {
    result[key] = raw[key] !== undefined ? raw[key] : defaultState[key];
  }
  return result;
}

// True when `home` was saved in the new shape and should not be overwritten by `base`.
function isExplicitNewHomeValue(raw) {
  if (!('home' in raw)) {
    return false;
  }
  if (!('base' in raw)) {
    return true;
  }
  return raw.home !== defaultState.home;
}

function hasCardsEraTravelSources(raw) {
  return (
    ('travelCurrency' in raw && raw.travelCurrency) ||
    (Array.isArray(raw.destinations) && raw.destinations.length > 0)
  );
}

// True when `travel` was saved in the new shape and should not be overwritten by cards-era sources.
function isExplicitNewTravelValue(raw) {
  if (!('travel' in raw)) {
    return false;
  }
  if (!hasCardsEraTravelSources(raw)) {
    return true;
  }
  return raw.travel !== defaultState.travel;
}

function resolveTravelFromCardsEra(raw, home) {
  if ('travelCurrency' in raw && raw.travelCurrency) {
    if (isExplicitNewTravelValue(raw)) {
      return raw.travel;
    }
    return raw.travelCurrency;
  }

  if (Array.isArray(raw.destinations) && raw.destinations.length > 0) {
    if (isExplicitNewTravelValue(raw)) {
      return raw.travel;
    }
    const fromDestinations = raw.destinations.find(
      (code) => code && code !== home,
    );
    if (fromDestinations) {
      return fromDestinations;
    }
  }

  if ('travel' in raw) {
    return raw.travel;
  }

  return defaultState.travel;
}

function ensureDistinctPair(home, travel) {
  if (home && travel === home) {
    return null;
  }
  return travel;
}

/**
 * Accepts a plain object (merged defaults plus any persisted keys) and returns
 * only the Phase 2 state shape. Maps cards-era `base`, `travelCurrency`, and
 * `destinations` when those keys are still present.
 */
export function migrateWallpaperState(raw) {
  if (!raw || typeof raw !== 'object') {
    return structuredClone(defaultState);
  }

  const result = pickNewShapeFields(raw);

  if (!hasCardsEraKeys(raw)) {
    result.travel = ensureDistinctPair(result.home, result.travel);
    return result;
  }

  if ('base' in raw && raw.base) {
    result.home = isExplicitNewHomeValue(raw) ? raw.home : raw.base;
  } else if ('home' in raw) {
    result.home = raw.home;
  }

  result.travel = resolveTravelFromCardsEra(raw, result.home);
  result.travel = ensureDistinctPair(result.home, result.travel);

  return result;
}

function stateNeedsCleanup(value) {
  if (hasCardsEraKeys(value)) {
    return true;
  }
  return Object.keys(value).some((key) => !NEW_STATE_KEYS.includes(key));
}

function matchesMigratedState(value, migrated) {
  return NEW_STATE_KEYS.every((key) => value[key] === migrated[key]);
}

function replaceStateValue(state, migrated) {
  for (const key of Object.keys(state.value)) {
    delete state.value[key];
  }
  Object.assign(state.value, migrated);
}

// Returns the reactive state as a ref (VueUse `useLocalStorage`, auto-imported
// via `@vueuse/nuxt`). `mergeDefaults` keeps partial saves compatible. `initOnMounted`
// makes the server render and client hydration both use the defaults, then swaps in
// the saved state right after mount, avoiding hydration mismatches for returning users.
// The default is cloned so mutations of the live state never touch the exported
// `defaultState`. A serializer and one-time client migration strip cards-era keys.
export function useWallpaperState() {
  const state = useLocalStorage(
    STORAGE_KEY,
    () => structuredClone(defaultState),
    {
      mergeDefaults: true,
      initOnMounted: true,
      serializer: {
        read: (raw) => {
          try {
            return migrateWallpaperState(JSON.parse(raw));
          } catch {
            return structuredClone(defaultState);
          }
        },
        write: (value) => JSON.stringify(migrateWallpaperState(value)),
      },
    },
  );

  if (import.meta.client) {
    onMounted(() => {
      const migrated = migrateWallpaperState(state.value);
      if (
        stateNeedsCleanup(state.value) ||
        !matchesMigratedState(state.value, migrated)
      ) {
        replaceStateValue(state, migrated);
      }
    });
  }

  return state;
}

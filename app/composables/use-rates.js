// Rates composable backed by the cached Nitro proxy at /api/rates/<base>,
// with a direct-to-Frankfurter fallback for static hosts where the server
// route does not exist.
// Docs: https://frankfurter.dev

const FRANKFURTER_URL = 'https://api.frankfurter.dev/v1';

// Once the proxy route has failed in the browser (a static host typically
// answers it with a 404 or an HTML error page), switch to calling
// Frankfurter directly and remember that choice for the rest of the
// session, so later base changes skip the dead route. Only client-side
// code flips this flag, so SSR always goes through the proxy.
let frankfurterDirect = false;

// True when `value` looks like the { base, date, rates } payload. A static
// host can answer the proxy route with 200 plus an HTML page, which $fetch
// hands back as a string, so a shape check is needed on top of `error`.
function isRatesPayload(value) {
  return Boolean(
    value &&
    typeof value === 'object' &&
    value.rates &&
    typeof value.rates === 'object',
  );
}

// Fetch the latest rates for `base`, a ref (or getter) of the home currency
// code. Returns { rates, pending, error, refresh } where `rates` is a ref
// holding { base, date, rates } or null, and refresh() refetches.
export function useRates(base) {
  const direct = ref(frankfurterDirect);

  const baseCode = computed(() => {
    const raw = toValue(base);
    if (raw == null || String(raw).trim() === '') return null;
    return String(raw).toUpperCase();
  });

  // When home is unset, keep url null so useFetch never calls /api/rates/NULL.
  // A watcher clears stale data and only calls refresh() when a code is set.
  const url = computed(() => {
    const code = baseCode.value;
    if (!code) return null;
    return direct.value
      ? `${FRANKFURTER_URL}/latest?base=${encodeURIComponent(code)}`
      : `/api/rates/${encodeURIComponent(code)}`;
  });

  const {
    data,
    status,
    error,
    refresh: refetch,
  } = useFetch(url, {
    default: () => null,
    immediate: false,
    watch: false,
  });

  watch(
    url,
    (nextUrl) => {
      if (nextUrl) {
        refetch();
      } else {
        data.value = null;
        status.value = 'idle';
        error.value = null;
      }
    },
    { immediate: true },
  );

  const pending = computed(
    () => baseCode.value != null && status.value === 'pending',
  );

  // Normalize both response shapes to { base, date, rates }; the direct
  // Frankfurter response carries an extra `amount` field the app ignores.
  const rates = computed(() =>
    isRatesPayload(data.value)
      ? {
          base: data.value.base,
          date: data.value.date,
          rates: data.value.rates,
        }
      : null,
  );

  // Client-only fallback: when the proxy route fails, flip to direct mode
  // once. The url computed changes, so the watcher refetches from Frankfurter.
  // `immediate: true` also catches an error hydrated from the SSR payload.
  if (import.meta.client) {
    watch(
      [error, data],
      () => {
        if (direct.value || !baseCode.value) return;
        const failed =
          error.value || (data.value != null && !isRatesPayload(data.value));
        if (!failed) return;
        frankfurterDirect = true;
        direct.value = true;
      },
      { immediate: true },
    );
  }

  function refresh() {
    if (!baseCode.value) return Promise.resolve();
    return refetch();
  }

  return { rates, pending, error, refresh };
}

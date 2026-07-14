// Cached Nitro proxy for the Frankfurter exchange-rate API.
// Keyless, CORS-enabled, backed by European Central Bank reference rates.
// Docs: https://frankfurter.dev
//
// ECB reference rates update once per working day, so responses are cached
// for an hour and served stale while the next fetch revalidates. This
// replaces the in-memory Map cache of the old src/scripts/api.js client.

import { CURRENCIES } from '#shared/utils/currencies.js';

const BASE_URL = 'https://api.frankfurter.dev/v1';

export default defineCachedEventHandler(
  async (event) => {
    const base = (getRouterParam(event, 'base') || '').toUpperCase();

    // Only proxy currency codes we ship metadata for; anything else is a 400.
    if (!Object.hasOwn(CURRENCIES, base)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Unknown base currency: ${base}`,
      });
    }

    // Return exactly { base, date, rates }, the same shape Frankfurter's
    // /v1/latest endpoint uses, so the client never sees proxy internals.
    const data = await $fetch(`${BASE_URL}/latest?base=${base}`);
    return { base: data.base, date: data.date, rates: data.rates };
  },
  {
    maxAge: 3600, // fresh for one hour
    swr: true, // stale-while-revalidate: answer stale, refresh in background
    staleMaxAge: 86400, // serve a stale entry for up to a day
    // Share one cache entry per currency regardless of the URL's letter case.
    getKey: (event) => (getRouterParam(event, 'base') || '').toUpperCase(),
  },
);

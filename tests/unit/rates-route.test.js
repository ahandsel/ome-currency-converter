// Unit tests for the cached rates proxy in server/api/rates/[base].get.js.
//
// The route relies on Nitro auto-imports (defineCachedEventHandler,
// getRouterParam, createError, $fetch). The tests stub those as globals
// before dynamically importing the module, so the handler runs as a plain
// async function without booting Nitro. No network access happens: $fetch is
// mocked with a canned Frankfurter payload.

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

const getRouterParam = vi.fn();
const $fetch = vi.fn();
const createError = vi.fn((input) =>
  Object.assign(new Error(input.statusMessage), input),
);

// A Frankfurter /v1/latest payload, including the extra "amount" field the
// proxy is expected to drop.
const FRANKFURTER_PAYLOAD = {
  amount: 1,
  base: 'USD',
  date: '2026-07-13',
  rates: { EUR: 0.92, JPY: 157.35 },
};

let handler;

beforeAll(async () => {
  // defineCachedEventHandler must be stubbed before the module is imported,
  // because the route calls it at module evaluation time. Unwrapping it to
  // the raw handler skips Nitro's caching layer.
  vi.stubGlobal('defineCachedEventHandler', (eventHandler) => eventHandler);
  vi.stubGlobal('getRouterParam', getRouterParam);
  vi.stubGlobal('createError', createError);
  vi.stubGlobal('$fetch', $fetch);
  ({ default: handler } = await import('../../server/api/rates/[base].get.js'));
});

afterAll(() => {
  vi.unstubAllGlobals();
});

beforeEach(() => {
  getRouterParam.mockReset();
  $fetch.mockReset();
  createError.mockClear();
});

describe('rates route handler', () => {
  it('uppercases the base parameter and proxies it to Frankfurter', async () => {
    getRouterParam.mockReturnValue('usd');
    $fetch.mockResolvedValue(FRANKFURTER_PAYLOAD);

    await handler({});

    expect($fetch).toHaveBeenCalledTimes(1);
    expect($fetch).toHaveBeenCalledWith(
      'https://api.frankfurter.dev/v1/latest?base=USD',
    );
  });

  it('returns exactly { base, date, rates } and drops extra upstream fields', async () => {
    getRouterParam.mockReturnValue('USD');
    $fetch.mockResolvedValue(FRANKFURTER_PAYLOAD);

    const result = await handler({});

    expect(result).toEqual({
      base: 'USD',
      date: '2026-07-13',
      rates: { EUR: 0.92, JPY: 157.35 },
    });
    expect(result).not.toHaveProperty('amount');
  });

  it('rejects an unknown base currency with a 400 and never calls $fetch', async () => {
    getRouterParam.mockReturnValue('xxx');

    await expect(handler({})).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: 'Unknown base currency: XXX',
    });
    expect($fetch).not.toHaveBeenCalled();
  });

  it('rejects a missing base parameter with a 400', async () => {
    getRouterParam.mockReturnValue(undefined);

    await expect(handler({})).rejects.toMatchObject({ statusCode: 400 });
    expect($fetch).not.toHaveBeenCalled();
  });
});

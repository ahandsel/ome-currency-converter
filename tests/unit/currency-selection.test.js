// Unit tests for the currency-wall selection helper in shared/utils/currency-selection.js.

import { describe, expect, it } from 'vitest';
import { applyCurrencyTap } from '#shared/utils/currency-selection.js';

describe('applyCurrencyTap', () => {
  it('assigns home when both slots are empty', () => {
    expect(applyCurrencyTap({ home: null, travel: null }, 'USD')).toEqual({
      home: 'USD',
      travel: null,
    });
  });

  it('assigns travel when only home is set and the tap is a different code', () => {
    expect(applyCurrencyTap({ home: 'USD', travel: null }, 'JPY')).toEqual({
      home: 'USD',
      travel: 'JPY',
    });
  });

  it('assigns home when only travel is set and the tap is a different code', () => {
    expect(applyCurrencyTap({ home: null, travel: 'JPY' }, 'USD')).toEqual({
      home: 'USD',
      travel: 'JPY',
    });
  });

  it('clears home when both are set and the user taps home again', () => {
    expect(applyCurrencyTap({ home: 'USD', travel: 'JPY' }, 'USD')).toEqual({
      home: null,
      travel: 'JPY',
    });
  });

  it('clears travel when both are set and the user taps travel again', () => {
    expect(applyCurrencyTap({ home: 'USD', travel: 'JPY' }, 'JPY')).toEqual({
      home: 'USD',
      travel: null,
    });
  });

  it('rotates on a third tap when both slots are filled', () => {
    expect(applyCurrencyTap({ home: 'USD', travel: 'JPY' }, 'EUR')).toEqual({
      home: 'JPY',
      travel: 'EUR',
    });
  });

  it('clears home when only home is set and the user taps home again', () => {
    expect(applyCurrencyTap({ home: 'USD', travel: null }, 'USD')).toEqual({
      home: null,
      travel: null,
    });
  });

  it('clears travel when only travel is set and the user taps travel again', () => {
    expect(applyCurrencyTap({ home: null, travel: 'JPY' }, 'JPY')).toEqual({
      home: null,
      travel: null,
    });
  });

  it('treats empty string and undefined slots like null', () => {
    expect(applyCurrencyTap({ home: '', travel: undefined }, 'USD')).toEqual({
      home: 'USD',
      travel: null,
    });
    expect(applyCurrencyTap({ home: 'USD', travel: '' }, 'JPY')).toEqual({
      home: 'USD',
      travel: 'JPY',
    });
    expect(applyCurrencyTap({ home: '', travel: 'JPY' }, 'USD')).toEqual({
      home: 'USD',
      travel: 'JPY',
    });
  });

  it('does not mutate the input state object', () => {
    const state = { home: 'USD', travel: 'JPY' };
    const result = applyCurrencyTap(state, 'EUR');

    expect(state).toEqual({ home: 'USD', travel: 'JPY' });
    expect(result).toEqual({ home: 'JPY', travel: 'EUR' });
    expect(result).not.toBe(state);
  });

  it('never returns the same code in both slots when both are non-null', () => {
    const transitions = [
      [{ home: null, travel: null }, 'USD'],
      [{ home: 'USD', travel: null }, 'JPY'],
      [{ home: null, travel: 'JPY' }, 'USD'],
      [{ home: 'USD', travel: 'JPY' }, 'EUR'],
      [{ home: 'EUR', travel: 'GBP' }, 'USD'],
    ];

    for (const [state, code] of transitions) {
      const next = applyCurrencyTap(state, code);
      if (next.home != null && next.travel != null) {
        expect(next.home).not.toBe(next.travel);
      }
    }
  });
});

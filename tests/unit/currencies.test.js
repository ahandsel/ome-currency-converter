// Unit tests for the currency helpers in shared/utils/currencies.js.

import { describe, expect, it } from 'vitest';
import {
  CURRENCIES,
  currencyMeta,
  formatAmount,
} from '#shared/utils/currencies.js';

describe('formatAmount', () => {
  it('formats JPY with zero fraction digits', () => {
    expect(formatAmount(1234, 'JPY')).toBe('1,234');
  });

  it('rounds JPY amounts instead of showing decimals', () => {
    expect(formatAmount(157.42, 'JPY')).toBe('157');
  });

  it('formats USD with two fraction digits', () => {
    expect(formatAmount(1234.5, 'USD')).toBe('1,234.50');
  });

  it('adds thousands separators to large amounts', () => {
    expect(formatAmount(9876543.21, 'USD')).toBe('9,876,543.21');
    expect(formatAmount(1000000, 'KRW')).toBe('1,000,000');
  });

  it('falls back to two fraction digits for an unknown code', () => {
    expect(formatAmount(5, 'XXX')).toBe('5.00');
  });
});

describe('currencyMeta', () => {
  it('returns the metadata entry for a known code', () => {
    expect(currencyMeta('USD')).toBe(CURRENCIES.USD);
    expect(currencyMeta('JPY')).toEqual({
      name: 'Japanese Yen',
      flag: '🇯🇵',
      symbol: '¥',
      decimals: 0,
    });
  });

  it('returns the fallback object for an unknown code', () => {
    expect(currencyMeta('XXX')).toEqual({
      name: 'XXX',
      flag: '🏳️',
      symbol: '',
      decimals: 2,
    });
  });
});

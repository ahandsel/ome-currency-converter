// Unit tests for the currency helpers in shared/utils/currencies.js.

import { describe, expect, it } from 'vitest';
import {
  CURRENCIES,
  currencyDisplayName,
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

  it('formats amounts with a Japanese locale', () => {
    expect(formatAmount(1234, 'JPY', 'ja-JP')).toBe('1,234');
    expect(formatAmount(1234.5, 'USD', 'ja-JP')).toBe('1,234.50');
    expect(formatAmount(9876543.21, 'USD', 'ja-JP')).toBe('9,876,543.21');
  });
});

describe('currencyDisplayName', () => {
  it('returns an English display name by default', () => {
    expect(currencyDisplayName('USD')).toBe('US Dollar');
    expect(currencyDisplayName('JPY')).toBe('Japanese Yen');
  });

  it('returns Japanese display names for ja-JP', () => {
    expect(currencyDisplayName('USD', 'ja-JP')).toBe('米ドル');
    expect(currencyDisplayName('JPY', 'ja-JP')).toBe('日本円');
  });

  it('falls back to static metadata for an unknown code', () => {
    expect(currencyDisplayName('XXX')).toBe('XXX');
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

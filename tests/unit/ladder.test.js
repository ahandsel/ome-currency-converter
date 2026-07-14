// Unit tests for the ladder helper in shared/utils/ladder.js.

import { describe, expect, it } from 'vitest';
import { buildLadder, defaultStartAmount } from '#shared/utils/ladder.js';

describe('defaultStartAmount', () => {
  it('returns 100 for yen and 1 for dollars and other codes', () => {
    expect(defaultStartAmount('JPY')).toBe(100);
    expect(defaultStartAmount('USD')).toBe(1);
    expect(defaultStartAmount('AUD')).toBe(1);
    expect(defaultStartAmount(null)).toBe(1);
  });
});

describe('buildLadder', () => {
  it('builds an arithmetic series from startAmount', () => {
    expect(buildLadder({ step: 5, rowCount: 5, startAmount: 1 })).toEqual([
      1, 6, 11, 16, 21,
    ]);
    expect(buildLadder({ step: 100, rowCount: 5, startAmount: 100 })).toEqual([
      100, 200, 300, 400, 500,
    ]);
  });

  it('uses startAmount 1 and step 1 for a simple sequence', () => {
    expect(buildLadder({ step: 1, rowCount: 5, startAmount: 1 })).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  it('clamps step and startAmount to at least 1', () => {
    expect(buildLadder({ step: 0, rowCount: 5, startAmount: 0 })).toEqual([
      1, 2, 3, 4, 5,
    ]);
    expect(buildLadder({ step: -3, rowCount: 5, startAmount: -8 })).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  it('clamps rowCount to the range 3 through 30', () => {
    expect(buildLadder({ step: 5, rowCount: 2, startAmount: 5 })).toEqual([
      5, 10, 15,
    ]);
    expect(buildLadder({ step: 5, rowCount: 31, startAmount: 5 })).toHaveLength(
      30,
    );
    expect(buildLadder({ step: 5, rowCount: 31, startAmount: 5 })[0]).toBe(5);
    expect(buildLadder({ step: 5, rowCount: 31, startAmount: 5 })[29]).toBe(
      150,
    );
  });

  it('floors non-integer step, rowCount, and startAmount before clamping', () => {
    expect(buildLadder({ step: 5.9, rowCount: 5.9, startAmount: 1.9 })).toEqual(
      [1, 6, 11, 16, 21],
    );
  });

  it('uses safe defaults for missing fields', () => {
    expect(buildLadder()).toEqual([1, 2, 3]);
    expect(buildLadder({})).toEqual([1, 2, 3]);
  });
});

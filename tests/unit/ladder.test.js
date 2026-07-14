// Unit tests for the ladder helper in shared/utils/ladder.js.

import { describe, expect, it } from 'vitest';
import { buildLadder } from '#shared/utils/ladder.js';

describe('buildLadder', () => {
  it('prepends 1 and fills with step multiples when includeOne is true', () => {
    expect(buildLadder({ step: 5, rowCount: 5, includeOne: true })).toEqual([
      1, 5, 10, 15, 20,
    ]);
  });

  it('skips duplicate 1 when step is 1 and includeOne is true', () => {
    expect(buildLadder({ step: 1, rowCount: 5, includeOne: true })).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  it('starts at step when includeOne is false', () => {
    expect(buildLadder({ step: 5, rowCount: 5, includeOne: false })).toEqual([
      5, 10, 15, 20, 25,
    ]);
  });

  it('clamps step to at least 1 for zero or negative values', () => {
    expect(buildLadder({ step: 0, rowCount: 5, includeOne: false })).toEqual([
      1, 2, 3, 4, 5,
    ]);
    expect(buildLadder({ step: -3, rowCount: 5, includeOne: false })).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  it('clamps rowCount to the range 3 through 10', () => {
    expect(buildLadder({ step: 5, rowCount: 2, includeOne: false })).toEqual([
      5, 10, 15,
    ]);
    expect(buildLadder({ step: 5, rowCount: 11, includeOne: false })).toEqual([
      5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
    ]);
  });

  it('floors non-integer step and rowCount before clamping', () => {
    expect(buildLadder({ step: 5.9, rowCount: 5.9, includeOne: true })).toEqual(
      [1, 5, 10, 15, 20],
    );
  });

  it('uses safe defaults for missing fields', () => {
    expect(buildLadder()).toEqual([1, 2, 3]);
    expect(buildLadder({})).toEqual([1, 2, 3]);
  });
});

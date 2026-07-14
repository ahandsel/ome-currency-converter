// Unit tests for exported helpers in app/utils/wallpaper.js.
// Canvas drawing (scrim, table layout) needs a browser canvas context, so this
// file covers pure helpers only. Scrim parseHexColor / scrimRgba stay module-private.

import { describe, expect, it } from 'vitest';
import { formatWallpaperDate } from '../../app/utils/wallpaper.js';

describe('formatWallpaperDate', () => {
  it('formats an ISO calendar date for English', () => {
    expect(formatWallpaperDate('2026-07-14', 'en-US')).toBe('Jul 14, 2026');
  });

  it('formats an ISO calendar date for Japanese', () => {
    expect(formatWallpaperDate('2026-07-14', 'ja-JP')).toMatch(/2026/);
    expect(formatWallpaperDate('2026-07-14', 'ja-JP')).toMatch(/7/);
    expect(formatWallpaperDate('2026-07-14', 'ja-JP')).toMatch(/14/);
  });

  it('defaults to en-US when locale is omitted', () => {
    expect(formatWallpaperDate('2026-01-02')).toBe('Jan 2, 2026');
  });
});

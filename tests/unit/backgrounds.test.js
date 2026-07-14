// Unit tests for the curated backgrounds manifest in app/utils/backgrounds.js.
// loadBackgroundImage needs a browser Image constructor, so this file covers
// the static manifest helpers only.

import { describe, expect, it } from 'vitest';
import { BACKGROUNDS, getBackground } from '../../app/utils/backgrounds.js';

const REQUIRED_FIELDS = [
  'id',
  'label',
  'fullUrl',
  'thumbUrl',
  'photographer',
  'profileUrl',
  'photoUrl',
  'dominantColor',
  'suggestedText',
];

describe('BACKGROUNDS', () => {
  it('has twelve curated entries with unique ids', () => {
    expect(BACKGROUNDS).toHaveLength(12);
    const ids = BACKGROUNDS.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(12);
  });

  it('includes every required manifest field on each entry', () => {
    for (const entry of BACKGROUNDS) {
      for (const field of REQUIRED_FIELDS) {
        expect(entry[field], `${entry.id}.${field}`).toBeTruthy();
      }
      expect(['light', 'dark']).toContain(entry.suggestedText);
      // Phase 5 scrim tinting expects a six-digit hex color string.
      expect(entry.dominantColor, `${entry.id}.dominantColor`).toMatch(
        /^#[0-9a-fA-F]{6}$/,
      );
      expect(entry.fullUrl).toContain('images.unsplash.com');
      expect(entry.thumbUrl).toContain('images.unsplash.com');
      expect(entry.profileUrl).toContain('utm_source=ome');
      expect(entry.photoUrl).toContain('utm_source=ome');
    }
  });
});

describe('getBackground', () => {
  it('returns the entry for a known id', () => {
    expect(getBackground('ocean-teal')?.photographer).toBe('Rayyu Maldives');
  });

  it('returns undefined for an unknown id', () => {
    expect(getBackground('not-a-real-background')).toBeUndefined();
  });
});

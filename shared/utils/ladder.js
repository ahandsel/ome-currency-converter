// Build the home-currency amount ladder for the increment-table wallpaper.

/**
 * @param {{ step?: number, rowCount?: number, includeOne?: boolean }} options
 * @returns {number[]}
 */
export function buildLadder({ step, rowCount, includeOne } = {}) {
  const safeStep = Math.max(1, Math.floor(Number(step)) || 1);
  const safeRowCount = Math.min(
    10,
    Math.max(3, Math.floor(Number(rowCount)) || 3),
  );
  const rows = [];
  if (includeOne) rows.push(1);
  for (let i = 1; rows.length < safeRowCount; i++) {
    const value = safeStep * i;
    if (!rows.includes(value)) rows.push(value);
  }
  return rows;
}

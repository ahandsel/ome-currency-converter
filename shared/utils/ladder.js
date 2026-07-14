// Build the home-currency amount ladder for the increment-table wallpaper.

export const LADDER_MIN_ROWS = 3;
export const LADDER_MAX_ROWS = 30;

/**
 * Default first ladder amount for a home currency.
 * Yen starts at 100; dollars and other currencies start at 1.
 * @param {string | null | undefined} code
 * @returns {number}
 */
export function defaultStartAmount(code) {
  if (code === 'JPY') return 100;
  return 1;
}

/**
 * @param {{ step?: number, rowCount?: number, startAmount?: number }} options
 * @returns {number[]}
 */
export function buildLadder({ step, rowCount, startAmount } = {}) {
  const safeStep = Math.max(1, Math.floor(Number(step)) || 1);
  const safeStart = Math.max(1, Math.floor(Number(startAmount)) || 1);
  const safeRowCount = Math.min(
    LADDER_MAX_ROWS,
    Math.max(LADDER_MIN_ROWS, Math.floor(Number(rowCount)) || LADDER_MIN_ROWS),
  );
  const rows = [];
  for (let i = 0; rows.length < safeRowCount; i++) {
    rows.push(safeStart + safeStep * i);
  }
  return rows;
}

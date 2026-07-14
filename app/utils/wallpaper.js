// Renders the currency wallpaper onto a <canvas> at full iPhone resolution.
// Pure drawing logic: given a canvas and a data object, it paints the image.
// The same canvas is shown as a (CSS-scaled) live preview and exported to PNG.

import { currencyMeta, formatAmount } from '#shared/utils/currencies.js';

// Common iPhone wallpaper sizes (portrait, in physical pixels).
export const DEVICE_SIZES = {
  'pro-max': { label: 'iPhone Pro Max (6.7"+)', w: 1290, h: 2796 },
  standard: { label: 'iPhone 14/15/16', w: 1179, h: 2556 },
  mini: { label: 'iPhone 13/14 / SE-tall', w: 1170, h: 2532 },
};

// Color themes. `dark: true` means light text on a dark ground.
export const THEMES = {
  midnight: {
    label: 'Midnight',
    dark: true,
    stops: ['#1e1b4b', '#312e81', '#0f172a'],
  },
  sunset: {
    label: 'Sunset',
    dark: true,
    stops: ['#7c2d12', '#be185d', '#1e1b4b'],
  },
  ocean: {
    label: 'Ocean',
    dark: true,
    stops: ['#0c4a6e', '#0e7490', '#042f2e'],
  },
  forest: {
    label: 'Forest',
    dark: true,
    stops: ['#064e3b', '#065f46', '#1c1917'],
  },
  mono: { label: 'Mono', dark: true, stops: ['#1f2937', '#111827', '#000000'] },
  paper: {
    label: 'Paper',
    dark: false,
    stops: ['#f8fafc', '#e2e8f0', '#cbd5e1'],
  },
};

// Home-column amounts at or above this value use a compact K suffix.
const COMPACT_HOME_THRESHOLD = 1000;

function roundRect(ctx, x, y, w, h, r) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function formatDate(iso) {
  // iso is "YYYY-MM-DD" from the API.
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function isUsableBackgroundImage(img) {
  return img && img.naturalWidth > 0 && img.naturalHeight > 0;
}

function isCompleteRenderData(data) {
  if (!data.home || !data.travel) return false;
  if (!Array.isArray(data.ladder) || data.ladder.length === 0) return false;
  if (!Number.isFinite(data.rate)) return false;
  return true;
}

// Scale and center-crop like CSS object-fit: cover.
function drawCoverImage(ctx, img, w, h) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(w / iw, h / ih);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
}

// Semi-opaque vertical scrim; darker through the content band for legibility.
function drawScrim(ctx, w, h) {
  const scrim = ctx.createLinearGradient(0, 0, 0, h);
  scrim.addColorStop(0, 'rgba(0,0,0,0.25)');
  scrim.addColorStop(0.3, 'rgba(0,0,0,0.40)');
  scrim.addColorStop(0.55, 'rgba(0,0,0,0.55)');
  scrim.addColorStop(0.85, 'rgba(0,0,0,0.50)');
  scrim.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, w, h);
}

function drawGradientBackground(ctx, theme, w, h) {
  const grad = ctx.createLinearGradient(0, 0, w * 0.4, h);
  grad.addColorStop(0, theme.stops[0]);
  grad.addColorStop(0.55, theme.stops[1]);
  grad.addColorStop(1, theme.stops[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // soft radial glow near the top for depth
  const glow = ctx.createRadialGradient(
    w * 0.5,
    h * 0.12,
    0,
    w * 0.5,
    h * 0.12,
    w * 0.9,
  );
  glow.addColorStop(
    0,
    theme.dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.5)',
  );
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
}

function drawPhotoAttribution(ctx, photographer, w, h, s) {
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = `400 ${22 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  ctx.fillText(`Photo: ${photographer} / Unsplash`, w / 2, h - 28 * s);
}

function formatCompactThousands(value) {
  return `${(value / 1000).toFixed(1)}K`;
}

function formatHomeCell(amount, code) {
  const meta = currencyMeta(code);
  if (amount >= COMPACT_HOME_THRESHOLD) {
    return `${meta.symbol}${formatCompactThousands(amount)}`;
  }
  return `${meta.symbol}${formatAmount(amount, code)}`;
}

function formatTravelCell(amount, code) {
  const meta = currencyMeta(code);
  return `${meta.symbol}${formatAmount(amount, code)}`;
}

function renderIncrementTable(ctx, o) {
  const {
    x,
    y,
    w,
    maxH,
    s,
    home,
    travel,
    ladder,
    rate,
    fg,
    panelBg,
    panelLine,
    zebraBg,
    headerBg,
  } = o;

  const rowCount = ladder.length;
  const radius = 28 * s;
  const headerH = 72 * s;
  const minRowH = 56 * s;
  const maxRowH = 108 * s;
  const rowH = Math.max(
    minRowH,
    Math.min(maxRowH, (maxH - headerH) / rowCount),
  );
  const panelH = headerH + rowH * rowCount;
  const colMid = x + w / 2;
  const amountSize = Math.min(56 * s, rowH * 0.42);
  const headerSize = Math.min(34 * s, headerH * 0.45);

  ctx.save();

  // Panel surface
  ctx.fillStyle = panelBg;
  roundRect(ctx, x, y, w, panelH, radius);
  ctx.fill();
  ctx.lineWidth = 2 * s;
  ctx.strokeStyle = panelLine;
  ctx.stroke();

  // Header band
  ctx.save();
  roundRect(ctx, x, y, w, panelH, radius);
  ctx.clip();
  ctx.fillStyle = headerBg;
  ctx.fillRect(x, y, w, headerH);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = fg;
  ctx.font = `700 ${headerSize}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  ctx.fillText(home, x + w * 0.25, y + headerH / 2);
  ctx.fillText(travel, x + w * 0.75, y + headerH / 2);

  // Column divider and header underline
  ctx.strokeStyle = panelLine;
  ctx.lineWidth = 1.5 * s;
  ctx.beginPath();
  ctx.moveTo(colMid, y);
  ctx.lineTo(colMid, y + panelH);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y + headerH);
  ctx.lineTo(x + w, y + headerH);
  ctx.stroke();

  // Data rows
  for (let i = 0; i < rowCount; i++) {
    const rowY = y + headerH + rowH * i;
    if (i % 2 === 1) {
      ctx.fillStyle = zebraBg;
      ctx.fillRect(x, rowY, w, rowH);
    }

    if (i > 0) {
      ctx.strokeStyle = panelLine;
      ctx.lineWidth = 1 * s;
      ctx.beginPath();
      ctx.moveTo(x, rowY);
      ctx.lineTo(x + w, rowY);
      ctx.stroke();
    }

    const homeAmount = ladder[i];
    const travelAmount = homeAmount * rate;
    const midY = rowY + rowH / 2;

    ctx.fillStyle = fg;
    ctx.font = `600 ${amountSize}px -apple-system, "Segoe UI", system-ui, sans-serif`;
    ctx.fillText(formatHomeCell(homeAmount, home), x + w * 0.25, midY);
    ctx.fillText(formatTravelCell(travelAmount, travel), x + w * 0.75, midY);
  }

  ctx.restore();
  ctx.restore();

  return { panelH };
}

// data: {
//   home: "USD",
//   travel: "JPY",
//   ladder: [1, 5, 10, 15, 20],
//   rate: 150.2,
//   date: "2026-07-14",
//   title: "Travel rates",
//   theme: "midnight",
//   background: HTMLImageElement | null | undefined,
//   attribution: { photographer: string } | null | undefined,
//   suggestedText: "light" | "dark" | undefined,
//   dominantColor: string | undefined,
//   position: "center" | "left",
// }
// size: { w, h }
export function renderWallpaper(canvas, data, size) {
  const { w, h } = size;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const s = w / 1290; // scale factor relative to the design reference width
  const theme = THEMES[data.theme] || THEMES.midnight;
  const hasPhoto = isUsableBackgroundImage(data.background);

  if (hasPhoto) {
    if (data.dominantColor) {
      ctx.fillStyle = data.dominantColor;
      ctx.fillRect(0, 0, w, h);
    }
    drawCoverImage(ctx, data.background, w, h);
    drawScrim(ctx, w, h);
  } else {
    drawGradientBackground(ctx, theme, w, h);
  }

  if (hasPhoto && data.attribution?.photographer) {
    drawPhotoAttribution(ctx, data.attribution.photographer, w, h, s);
  }

  if (!isCompleteRenderData(data)) return;

  let fg;
  let muted;
  let panelBg;
  let panelLine;
  let zebraBg;
  let headerBg;
  if (hasPhoto) {
    fg = '#ffffff';
    muted = 'rgba(255,255,255,0.62)';
    panelBg = 'rgba(0,0,0,0.58)';
    panelLine = 'rgba(255,255,255,0.14)';
    zebraBg = 'rgba(255,255,255,0.05)';
    headerBg = 'rgba(255,255,255,0.08)';
  } else {
    fg = theme.dark ? '#ffffff' : '#0f172a';
    muted = theme.dark ? 'rgba(255,255,255,0.62)' : 'rgba(15,23,42,0.55)';
    panelBg = theme.dark ? 'rgba(0,0,0,0.50)' : 'rgba(255,255,255,0.78)';
    panelLine = theme.dark ? 'rgba(255,255,255,0.14)' : 'rgba(15,23,42,0.10)';
    zebraBg = theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.04)';
    headerBg = theme.dark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)';
  }

  const margin = 96 * s;

  // Content lives in the lower ~70% so the lock-screen clock/date (top ~26%)
  // stays clear. Phase 3 adds left anchoring; for now always center the panel.
  const contentTop = h * 0.3;
  const contentBottom = h * 0.93;
  const panelW = w - margin * 2;
  const panelX = margin;
  const footerReserve = 56 * s;
  const maxPanelH = contentBottom - contentTop - footerReserve;

  ctx.textBaseline = 'alphabetic';

  const { panelH } = renderIncrementTable(ctx, {
    x: panelX,
    y: contentTop,
    w: panelW,
    maxH: maxPanelH,
    s,
    home: data.home,
    travel: data.travel,
    ladder: data.ladder,
    rate: data.rate,
    fg,
    panelBg,
    panelLine,
    zebraBg,
    headerBg,
  });

  ctx.textAlign = 'center';
  ctx.fillStyle = muted;
  ctx.font = `500 ${26 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  const when = data.date ? `Updated ${formatDate(data.date)}` : '';
  ctx.fillText(
    `${when}  ·  rates: ECB / frankfurter.dev`,
    w / 2,
    contentTop + panelH + footerReserve,
  );
}

// Renders the currency wallpaper onto a <canvas> at full iPhone resolution.
// Pure drawing logic: given a canvas and a data object, it paints the image.
// The same canvas is shown as a (CSS-scaled) live preview and exported to PNG.

import { currencyMeta, formatAmount } from "#shared/utils/currencies.js";

// Common iPhone wallpaper sizes (portrait, in physical pixels).
export const DEVICE_SIZES = {
  "pro-max": { label: 'iPhone Pro Max (6.7"+)', w: 1290, h: 2796 },
  standard: { label: "iPhone 14/15/16", w: 1179, h: 2556 },
  mini: { label: "iPhone 13/14 / SE-tall", w: 1170, h: 2532 },
};

// Color themes. `dark: true` means light text on a dark ground.
export const THEMES = {
  midnight: { label: "Midnight", dark: true, stops: ["#1e1b4b", "#312e81", "#0f172a"] },
  sunset: { label: "Sunset", dark: true, stops: ["#7c2d12", "#be185d", "#1e1b4b"] },
  ocean: { label: "Ocean", dark: true, stops: ["#0c4a6e", "#0e7490", "#042f2e"] },
  forest: { label: "Forest", dark: true, stops: ["#064e3b", "#065f46", "#1c1917"] },
  mono: { label: "Mono", dark: true, stops: ["#1f2937", "#111827", "#000000"] },
  paper: { label: "Paper", dark: false, stops: ["#f8fafc", "#e2e8f0", "#cbd5e1"] },
};

function roundRect(ctx, x, y, w, h, r) {
  if (typeof ctx.roundRect === "function") {
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
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function isUsableBackgroundImage(img) {
  return img && img.naturalWidth > 0 && img.naturalHeight > 0;
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
  scrim.addColorStop(0, "rgba(0,0,0,0.25)");
  scrim.addColorStop(0.30, "rgba(0,0,0,0.40)");
  scrim.addColorStop(0.55, "rgba(0,0,0,0.55)");
  scrim.addColorStop(0.85, "rgba(0,0,0,0.50)");
  scrim.addColorStop(1, "rgba(0,0,0,0.35)");
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
  const glow = ctx.createRadialGradient(w * 0.5, h * 0.12, 0, w * 0.5, h * 0.12, w * 0.9);
  glow.addColorStop(0, theme.dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.5)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
}

function drawPhotoAttribution(ctx, photographer, w, h, s) {
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = `400 ${22 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  ctx.fillText(`Photo: ${photographer} / Unsplash`, w / 2, h - 28 * s);
}

// data: {
//   base: "USD",
//   date: "2026-06-29",
//   referenceAmount: 100,
//   title: "Travel Rates",
//   theme: "midnight",
//   destinations: [ { code, rate }, ... ],
//   background: HTMLImageElement | null | undefined,
//   attribution: { photographer: string } | null | undefined,
//   suggestedText: "light" | "dark" | undefined,
//   dominantColor: string | undefined,
// }
// size: { w, h }
export function renderWallpaper(canvas, data, size) {
  const { w, h } = size;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const s = w / 1290; // scale factor relative to the design reference width
  const theme = THEMES[data.theme] || THEMES.midnight;
  const hasPhoto = isUsableBackgroundImage(data.background);

  let fg;
  let muted;
  let cardBg;
  let cardLine;
  if (hasPhoto) {
    // Light text and dark-over-photo card styles for legibility over the scrim.
    fg = "#ffffff";
    muted = "rgba(255,255,255,0.62)";
    cardBg = "rgba(255,255,255,0.10)";
    cardLine = "rgba(255,255,255,0.16)";
  } else {
    fg = theme.dark ? "#ffffff" : "#0f172a";
    muted = theme.dark ? "rgba(255,255,255,0.62)" : "rgba(15,23,42,0.55)";
    cardBg = theme.dark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.70)";
    cardLine = theme.dark ? "rgba(255,255,255,0.16)" : "rgba(15,23,42,0.10)";
  }

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

  const baseMeta = currencyMeta(data.base);
  const margin = 96 * s;

  // Content lives in the lower ~70% so the lock-screen clock/date (top ~26%)
  // stays clear. We lay the block out from contentTop downward.
  const contentTop = h * 0.30;
  const contentBottom = h * 0.93;
  ctx.textBaseline = "alphabetic";

  // --- header ---
  let y = contentTop;
  ctx.textAlign = "center";
  ctx.fillStyle = muted;
  ctx.font = `600 ${34 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  const title = (data.title || "Travel exchange rates").toUpperCase();
  ctx.fillText(spaced(title), w / 2, y);

  y += 86 * s;
  ctx.fillStyle = fg;
  ctx.font = `700 ${64 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  ctx.fillText(`${baseMeta.flag}  1 ${data.base}`, w / 2, y);

  y += 44 * s;
  ctx.fillStyle = muted;
  ctx.font = `500 ${30 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  ctx.fillText(baseMeta.name, w / 2, y);

  // --- destination cards ---
  const cardsTop = y + 70 * s;
  const cardGap = 28 * s;
  const n = Math.max(data.destinations.length, 1);
  const available = contentBottom - cardsTop - 70 * s; // reserve space for footer
  let cardH = (available - cardGap * (n - 1)) / n;
  cardH = Math.max(150 * s, Math.min(cardH, 280 * s));
  const cardW = w - margin * 2;

  let cy = cardsTop;
  for (const dest of data.destinations) {
    drawCard(ctx, {
      x: margin,
      y: cy,
      w: cardW,
      h: cardH,
      s,
      fg,
      muted,
      cardBg,
      cardLine,
      base: data.base,
      baseMeta,
      dest,
      referenceAmount: data.referenceAmount,
    });
    cy += cardH + cardGap;
  }

  // --- footer ---
  ctx.textAlign = "center";
  ctx.fillStyle = muted;
  ctx.font = `500 ${26 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  const when = data.date ? `Updated ${formatDate(data.date)}` : "";
  ctx.fillText(`${when}  ·  rates: ECB / frankfurter.dev`, w / 2, contentBottom + 40 * s);

  if (hasPhoto && data.attribution?.photographer) {
    drawPhotoAttribution(ctx, data.attribution.photographer, w, h, s);
  }
}

function drawCard(ctx, o) {
  const { x, y, w, h, s, fg, muted, cardBg, cardLine, base, baseMeta, dest, referenceAmount } = o;
  const meta = currencyMeta(dest.code);

  // card surface
  ctx.fillStyle = cardBg;
  roundRect(ctx, x, y, w, h, 36 * s);
  ctx.fill();
  ctx.lineWidth = 2 * s;
  ctx.strokeStyle = cardLine;
  ctx.stroke();

  const padX = 48 * s;
  const midY = y + h / 2;

  // left: flag + code + name
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const flagSize = Math.min(96 * s, h * 0.5);
  ctx.font = `${flagSize}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  ctx.fillStyle = fg;
  ctx.fillText(meta.flag, x + padX, midY);

  const textX = x + padX + flagSize + 30 * s;
  ctx.font = `700 ${52 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  ctx.fillStyle = fg;
  ctx.fillText(dest.code, textX, midY - 26 * s);
  ctx.font = `500 ${28 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  ctx.fillStyle = muted;
  ctx.fillText(truncate(meta.name, 18), textX, midY + 26 * s);

  // right: big value for 1 base unit + small reference conversion
  ctx.textAlign = "right";
  const rightX = x + w - padX;
  ctx.font = `700 ${64 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  ctx.fillStyle = fg;
  ctx.fillText(`${meta.symbol}${formatAmount(dest.rate, dest.code)}`, rightX, midY - 26 * s);

  ctx.font = `500 ${28 * s}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  ctx.fillStyle = muted;
  const refVal = dest.rate * referenceAmount;
  const refLine = `${baseMeta.symbol}${formatAmount(referenceAmount, base)} = ${meta.symbol}${formatAmount(refVal, dest.code)}`;
  ctx.fillText(refLine, rightX, midY + 28 * s);
}

// Insert thin spaces between letters for a tracked-out label look.
function spaced(str) {
  return str.split("").join(" ");
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

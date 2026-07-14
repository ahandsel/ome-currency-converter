<script setup>
// Owns the <canvas>: redraws the wallpaper whenever the state or the rates
// change, and exports the canvas to a PNG download. Client-only; the page
// wraps this component in <ClientOnly>.

import { buildLadder } from '#shared/utils/ladder.js';
import { loadBackgroundImage, getBackground } from '~/utils/backgrounds';
import {
  formatWallpaperDate,
  renderWallpaper,
  DEVICE_SIZES,
} from '~/utils/wallpaper';

const props = defineProps({
  state: { type: Object, required: true },
  rates: { type: Object, default: null },
  pending: { type: Boolean, default: false },
  error: { type: Object, default: null },
});

const emit = defineEmits(['download-error']);

const { t, locale } = useI18n();
const intlLocale = computed(() => (locale.value === 'ja' ? 'ja-JP' : 'en-US'));

const canvasEl = ref(null);
const loadedBackgroundImage = ref(null);
const backgroundLoadFailed = ref(false);

const hasSelectionPair = computed(() => {
  const { home, travel } = props.state;
  return Boolean(home && travel && home !== travel);
});

const isPairComplete = computed(() => {
  if (!hasSelectionPair.value) return false;
  const latest = props.rates;
  if (!latest || latest.base !== props.state.home) return false;
  const rate = latest.rates?.[props.state.travel];
  return Number.isFinite(rate);
});

// Preview hint when the table cannot render. Priority: incomplete selection >
// waiting for rates > rates unavailable (fetch failed or travel rate missing).
const previewHintKey = computed(() => {
  if (!hasSelectionPair.value) return 'status.incompletePair';
  if (isPairComplete.value) return null;
  if (props.pending) return 'status.waitingRates';
  if (props.error) return 'status.ratesUnavailable';

  const latest = props.rates;
  if (latest && latest.base === props.state.home) {
    // Home rates loaded but the travel code has no finite rate.
    return 'status.ratesUnavailable';
  }

  // Pair selected; rates for this home are not present yet. Prefer waiting
  // over "select currencies". When `error` is wired from the page, failures
  // take the branch above instead.
  return 'status.waitingRates';
});

const showBackgroundFallback = computed(
  () =>
    Boolean(props.state.backgroundId) &&
    backgroundLoadFailed.value &&
    !loadedBackgroundImage.value,
);

function backgroundRenderFields() {
  const id = props.state.backgroundId;
  if (!id || !loadedBackgroundImage.value) return {};

  const entry = getBackground(id);
  const fields = { background: loadedBackgroundImage.value };
  if (entry) {
    fields.attribution = { photographer: entry.photographer };
    fields.suggestedText = entry.suggestedText;
    fields.dominantColor = entry.dominantColor;
  }
  return fields;
}

function wallpaperLabels(date, photographer) {
  return {
    footerUpdated: date
      ? t('wallpaper.updated', {
          date: formatWallpaperDate(date, intlLocale.value),
        })
      : '',
    footerRates: t('wallpaper.ratesCredit'),
    photoCredit: photographer
      ? `${t('preview.photoCredit', { name: photographer })} / Unsplash`
      : null,
  };
}

function draw() {
  const canvas = canvasEl.value;
  if (!canvas) return;
  const size = DEVICE_SIZES[props.state.device] || DEVICE_SIZES['pro-max'];
  const bgFields = backgroundRenderFields();
  const photographer = bgFields.attribution?.photographer ?? null;
  const title = props.state.title?.trim()
    ? props.state.title
    : t('wallpaper.defaultTitle');
  const baseData = {
    title,
    theme: props.state.theme,
    position: props.state.position,
    includeFooter: props.state.includeFooter !== false,
    locale: intlLocale.value,
    labels: wallpaperLabels(null, photographer),
    ...bgFields,
  };

  if (!isPairComplete.value) {
    renderWallpaper(canvas, baseData, size);
    return;
  }

  const { home, travel } = props.state;
  const ladder = buildLadder({
    step: props.state.step,
    rowCount: props.state.rowCount,
    startAmount: props.state.startAmount,
  });

  const date = props.rates.date;
  renderWallpaper(
    canvas,
    {
      ...baseData,
      home,
      travel,
      ladder,
      rate: props.rates.rates[travel],
      date,
      labels: wallpaperLabels(date, photographer),
    },
    size,
  );
}

async function loadBackgroundForId(id) {
  if (!id) {
    loadedBackgroundImage.value = null;
    backgroundLoadFailed.value = false;
    return;
  }

  const requestedId = id;
  loadedBackgroundImage.value = null;
  backgroundLoadFailed.value = false;

  try {
    const img = await loadBackgroundImage(requestedId);
    if (props.state.backgroundId !== requestedId) return;
    loadedBackgroundImage.value = img;
    backgroundLoadFailed.value = false;
  } catch {
    if (props.state.backgroundId !== requestedId) return;
    loadedBackgroundImage.value = null;
    backgroundLoadFailed.value = true;
  }
}

watch(
  [() => props.state, () => props.rates, loadedBackgroundImage, locale],
  draw,
  { deep: true },
);

watch(
  () => props.state.backgroundId,
  (id) => {
    loadBackgroundForId(id);
  },
  { immediate: true },
);

onMounted(draw);

function downloadWallpaper() {
  if (!isPairComplete.value) return;
  const canvas = canvasEl.value;
  if (!canvas) return;
  const { home, travel } = props.state;
  const name = `wallpaper-${home}-${travel}.png`;
  canvas.toBlob((blob) => {
    if (!blob) {
      emit('download-error');
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, 'image/png');
}
</script>

<template>
  <div class="canvas-frame">
    <canvas
      ref="canvasEl"
      class="preview-canvas"
      width="1290"
      height="2796"
    ></canvas>
  </div>
  <AttributionNote :background-id="state.backgroundId" />
  <p v-if="previewHintKey" class="hint" role="status" aria-live="polite">
    {{ $t(previewHintKey) }}
  </p>
  <p
    v-if="showBackgroundFallback"
    class="hint"
    role="status"
    aria-live="polite"
  >
    {{ $t('status.backgroundFallback') }}
  </p>
  <button
    type="button"
    class="btn primary"
    :disabled="!isPairComplete"
    @click="downloadWallpaper"
  >
    ⬇ {{ $t('preview.download') }}
  </button>
  <p class="save-hint">{{ $t('preview.saveHint') }}</p>
</template>

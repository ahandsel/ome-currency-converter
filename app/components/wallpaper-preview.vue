<script setup>
// Owns the <canvas>: redraws the wallpaper whenever the state or the rates
// change, and exports the canvas to a PNG download. Client-only; the page
// wraps this component in <ClientOnly>.

import { buildLadder } from '#shared/utils/ladder.js';
import { loadBackgroundImage, getBackground } from '~/utils/backgrounds';
import { renderWallpaper, DEVICE_SIZES } from '~/utils/wallpaper';

const props = defineProps({
  state: { type: Object, required: true },
  rates: { type: Object, default: null },
});

const emit = defineEmits(['download-error']);

const canvasEl = ref(null);
const loadedBackgroundImage = ref(null);

const isPairComplete = computed(() => {
  const { home, travel } = props.state;
  if (!home || !travel || home === travel) return false;
  const latest = props.rates;
  if (!latest || latest.base !== home) return false;
  const rate = latest.rates?.[travel];
  return Number.isFinite(rate);
});

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

function draw() {
  const canvas = canvasEl.value;
  if (!canvas) return;
  const size = DEVICE_SIZES[props.state.device] || DEVICE_SIZES['pro-max'];
  const baseData = {
    title: props.state.title,
    theme: props.state.theme,
    position: props.state.position,
    ...backgroundRenderFields(),
  };

  if (!isPairComplete.value) {
    renderWallpaper(canvas, baseData, size);
    return;
  }

  const { home, travel } = props.state;
  const ladder = buildLadder({
    step: props.state.step,
    rowCount: props.state.rowCount,
    includeOne: props.state.includeOne,
  });

  renderWallpaper(
    canvas,
    {
      ...baseData,
      home,
      travel,
      ladder,
      rate: props.rates.rates[travel],
      date: props.rates.date,
    },
    size,
  );
}

async function loadBackgroundForId(id) {
  if (!id) {
    loadedBackgroundImage.value = null;
    return;
  }

  const requestedId = id;
  loadedBackgroundImage.value = null;

  try {
    const img = await loadBackgroundImage(requestedId);
    if (props.state.backgroundId !== requestedId) return;
    loadedBackgroundImage.value = img;
  } catch {
    if (props.state.backgroundId !== requestedId) return;
    loadedBackgroundImage.value = null;
  }
}

watch([() => props.state, () => props.rates, loadedBackgroundImage], draw, {
  deep: true,
});

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
  <p v-if="!isPairComplete" class="hint" role="status">
    {{ $t('status.incompletePair') }}
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

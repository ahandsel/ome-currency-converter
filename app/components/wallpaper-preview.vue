<script setup>
// Owns the <canvas>: redraws the wallpaper whenever the state or the rates
// change, and exports the canvas to a PNG download. Client-only; the page
// wraps this component in <ClientOnly>.

import { loadBackgroundImage, getBackground } from '~/utils/backgrounds';
import { renderWallpaper, DEVICE_SIZES } from '~/utils/wallpaper';

const props = defineProps({
  state: { type: Object, required: true },
  rates: { type: Object, default: null },
});

const emit = defineEmits(['download-error']);

const canvasEl = ref(null);
const loadedBackgroundImage = ref(null);

// Keep only destinations the current base has a rate for, excluding the base.
const activeDestinations = computed(() => {
  if (!props.rates) return [];
  return props.state.destinations
    .filter(
      (code) => code !== props.state.base && props.rates.rates[code] != null,
    )
    .map((code) => ({ code, rate: props.rates.rates[code] }));
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
  const latest = props.rates;
  if (!canvas || !latest || latest.base !== props.state.base) return;
  const size = DEVICE_SIZES[props.state.device] || DEVICE_SIZES['pro-max'];
  renderWallpaper(
    canvas,
    {
      base: props.state.base,
      date: latest.date,
      referenceAmount: Number(props.state.referenceAmount) || 1,
      title: props.state.title,
      theme: props.state.theme,
      destinations: activeDestinations.value,
      ...backgroundRenderFields(),
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
  const canvas = canvasEl.value;
  if (!canvas) return;
  const dests = props.state.destinations
    .filter((c) => c !== props.state.base)
    .join('-');
  const name = `wallpaper-${props.state.base}-${dests || 'rates'}.png`;
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
  <button type="button" class="btn primary" @click="downloadWallpaper">
    ⬇ {{ $t('preview.download') }}
  </button>
  <p class="save-hint">{{ $t('preview.saveHint') }}</p>
</template>

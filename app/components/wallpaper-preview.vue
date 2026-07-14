<script setup>
// Owns the <canvas>: redraws the wallpaper whenever the state or the rates
// change, and exports the canvas to a PNG download. Client-only; the page
// wraps this component in <ClientOnly>.

import { renderWallpaper, DEVICE_SIZES } from "~/utils/wallpaper";

const props = defineProps({
  state: { type: Object, required: true },
  rates: { type: Object, default: null },
});

const emit = defineEmits(["download-error"]);

const canvasEl = ref(null);

// Keep only destinations the current base has a rate for, excluding the base.
const activeDestinations = computed(() => {
  if (!props.rates) return [];
  return props.state.destinations
    .filter((code) => code !== props.state.base && props.rates.rates[code] != null)
    .map((code) => ({ code, rate: props.rates.rates[code] }));
});

function draw() {
  const canvas = canvasEl.value;
  const latest = props.rates;
  if (!canvas || !latest || latest.base !== props.state.base) return;
  const size = DEVICE_SIZES[props.state.device] || DEVICE_SIZES["pro-max"];
  renderWallpaper(
    canvas,
    {
      base: props.state.base,
      date: latest.date,
      referenceAmount: Number(props.state.referenceAmount) || 1,
      title: props.state.title,
      theme: props.state.theme,
      destinations: activeDestinations.value,
    },
    size,
  );
}

watch([() => props.state, () => props.rates], draw, { deep: true });
onMounted(draw);

function downloadWallpaper() {
  const canvas = canvasEl.value;
  if (!canvas) return;
  const dests = props.state.destinations.filter((c) => c !== props.state.base).join("-");
  const name = `wallpaper-${props.state.base}-${dests || "rates"}.png`;
  canvas.toBlob((blob) => {
    if (!blob) {
      emit("download-error");
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}
</script>

<template>
  <div class="canvas-frame">
    <canvas ref="canvasEl" class="preview-canvas" width="1290" height="2796"></canvas>
  </div>
  <button type="button" class="btn primary" @click="downloadWallpaper">
    ⬇ {{ $t("preview.download") }}
  </button>
  <p class="save-hint">{{ $t("preview.saveHint") }}</p>
</template>

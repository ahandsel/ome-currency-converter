<script setup>
// The settings column: currency controls, reference amount, theme, device,
// title, the refresh button, and the shared status line.

import { THEMES, DEVICE_SIZES } from "~/utils/wallpaper";

const props = defineProps({
  state: { type: Object, required: true },
  rates: { type: Object, default: null },
  pending: { type: Boolean, default: false },
  error: { type: Object, default: null },
  downloadError: { type: Boolean, default: false },
});

defineEmits(["refresh"]);

const { t } = useI18n();

// One status line, mirroring the prototype's setStatus calls: fetching wins
// while a request is in flight, then the most recent failure, then the
// rate date.
const status = computed(() => {
  if (props.pending) return { text: t("status.fetching"), isError: false };
  if (props.downloadError) return { text: t("status.downloadError"), isError: true };
  if (props.error) return { text: t("status.fetchError"), isError: true };
  if (props.rates) return { text: t("status.updated", { date: props.rates.date }), isError: false };
  return { text: "", isError: false };
});
</script>

<template>
  <section class="controls" :aria-label="$t('controls.ariaLabel')">
    <CurrencyControls :state="state" />

    <div class="field-row">
      <div class="field">
        <label for="ref">{{ $t("controls.referenceAmount") }}</label>
        <input
          id="ref"
          v-model="state.referenceAmount"
          type="number"
          min="1"
          step="1"
          inputmode="numeric"
        />
        <p class="hint">{{ $t("controls.referenceAmountHint") }}</p>
      </div>
      <div class="field">
        <label for="theme">{{ $t("controls.theme") }}</label>
        <select id="theme" v-model="state.theme">
          <option v-for="(themeOption, key) in THEMES" :key="key" :value="key">
            {{ themeOption.label }}
          </option>
        </select>
      </div>
    </div>

    <BackgroundPicker :state="state" />

    <div class="field-row">
      <div class="field">
        <label for="device">{{ $t("controls.device") }}</label>
        <select id="device" v-model="state.device">
          <option v-for="(deviceOption, key) in DEVICE_SIZES" :key="key" :value="key">
            {{ deviceOption.label }}
          </option>
        </select>
      </div>
      <div class="field">
        <label for="title">{{ $t("controls.title") }}</label>
        <input id="title" v-model="state.title" type="text" maxlength="32" />
      </div>
    </div>

    <div class="actions">
      <button type="button" class="btn ghost" @click="$emit('refresh')">
        ↻ {{ $t("controls.refresh") }}
      </button>
    </div>

    <p class="status" :class="{ error: status.isError }" role="status" aria-live="polite">
      {{ status.text }}
    </p>
  </section>
</template>

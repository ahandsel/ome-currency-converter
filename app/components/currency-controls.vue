<script setup>
// Currency wall (home/travel chips) plus ladder step, row count, and include-one.
// Mutates the shared wallpaper state object passed down from the page.

import {
  CURRENCIES,
  currencyDisplayName,
  currencyMeta,
} from '#shared/utils/currencies';
import { applyCurrencyTap } from '#shared/utils/currency-selection';

const props = defineProps({
  state: { type: Object, required: true },
});

const { t, locale } = useI18n();
const intlLocale = computed(() => (locale.value === 'ja' ? 'ja-JP' : 'en-US'));

// Render with the built-in list immediately, then refine from the API once
// on the client. Falls back silently to the static list on failure.
const codes = ref(Object.keys(CURRENCIES).sort());

onMounted(async () => {
  try {
    const res = await fetch('https://api.frankfurter.dev/v1/currencies');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const fetched = Object.keys(data).sort();
    if (fetched.length) codes.value = fetched;
  } catch {
    /* keep the built-in list (offline, blocked, etc.) */
  }
});

function chipRole(code) {
  if (props.state.home === code) return 'home';
  if (props.state.travel === code) return 'travel';
  return null;
}

function chipAriaLabel(code) {
  const name = currencyDisplayName(code, intlLocale.value);
  const role = chipRole(code);
  const base = `${code} ${name}`;
  if (role === 'home') return `${base}, ${t('controls.homeMarker')}`;
  if (role === 'travel') return `${base}, ${t('controls.travelMarker')}`;
  return base;
}

function onChipClick(code) {
  const next = applyCurrencyTap(
    { home: props.state.home, travel: props.state.travel },
    code,
  );
  props.state.home = next.home;
  props.state.travel = next.travel;
}

function clampStep() {
  const value = Math.floor(Number(props.state.step));
  props.state.step = Math.max(1, Number.isFinite(value) ? value : 1);
}

function clampRowCount() {
  const value = Math.floor(Number(props.state.rowCount));
  props.state.rowCount = Math.min(
    10,
    Math.max(3, Number.isFinite(value) ? value : 3),
  );
}
</script>

<template>
  <div class="field">
    <span class="field-label">{{ $t('controls.currencies') }}</span>
    <p class="hint">{{ $t('controls.currenciesHint') }}</p>
    <div class="chip-grid">
      <button
        v-for="code in codes"
        :key="code"
        type="button"
        class="chip"
        :class="{
          selected: chipRole(code) != null,
          home: state.home === code,
          travel: state.travel === code,
        }"
        :aria-pressed="chipRole(code) != null"
        :aria-label="chipAriaLabel(code)"
        @click="onChipClick(code)"
      >
        <span class="flag">{{ currencyMeta(code).flag }}</span>
        <span>{{ code }}</span>
        <span v-if="state.home === code" class="chip-marker">{{
          $t('controls.homeMarker')
        }}</span>
        <span v-else-if="state.travel === code" class="chip-marker">{{
          $t('controls.travelMarker')
        }}</span>
      </button>
    </div>
  </div>

  <div class="field-row">
    <div class="field">
      <label for="step">{{ $t('controls.step') }}</label>
      <input
        id="step"
        v-model.number="state.step"
        type="number"
        min="1"
        step="1"
        inputmode="numeric"
        @change="clampStep"
        @blur="clampStep"
      />
      <p class="hint">{{ $t('controls.stepHint') }}</p>
    </div>
    <div class="field">
      <label for="row-count">{{ $t('controls.rowCount') }}</label>
      <input
        id="row-count"
        v-model.number="state.rowCount"
        type="number"
        min="3"
        max="10"
        step="1"
        inputmode="numeric"
        @change="clampRowCount"
        @blur="clampRowCount"
      />
      <p class="hint">{{ $t('controls.rowCountHint') }}</p>
    </div>
  </div>

  <div class="field">
    <label class="checkbox-field" for="include-one">
      <input id="include-one" v-model="state.includeOne" type="checkbox" />
      <span>{{ $t('controls.includeOne') }}</span>
    </label>
    <p class="hint">{{ $t('controls.includeOneHint') }}</p>
  </div>
</template>

<style scoped>
.chip-marker {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.checkbox-field {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
}

.checkbox-field input {
  width: auto;
  margin: 0;
}
</style>

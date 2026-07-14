<script setup>
// Currency wall (home/travel chips) plus ladder start, step, and row count.
// Mutates the shared wallpaper state object passed down from the page.

import {
  CURRENCIES,
  currencyDisplayName,
  currencyMeta,
} from '#shared/utils/currencies';
import { applyCurrencyTap } from '#shared/utils/currency-selection';
import {
  defaultStartAmount,
  LADDER_MAX_ROWS,
  LADDER_MIN_ROWS,
} from '#shared/utils/ladder';

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
  const previousHome = props.state.home;
  const previousDefault = defaultStartAmount(previousHome);
  const next = applyCurrencyTap(
    { home: props.state.home, travel: props.state.travel },
    code,
  );
  props.state.home = next.home;
  props.state.travel = next.travel;

  // Refresh the start amount when home changes and the user is still on the
  // previous currency default (1 for dollars, 100 for yen).
  if (
    next.home !== previousHome &&
    props.state.startAmount === previousDefault
  ) {
    props.state.startAmount = defaultStartAmount(next.home);
  }
}

function clampStep() {
  const value = Math.floor(Number(props.state.step));
  props.state.step = Math.max(1, Number.isFinite(value) ? value : 1);
}

function clampStartAmount() {
  const value = Math.floor(Number(props.state.startAmount));
  props.state.startAmount = Math.max(1, Number.isFinite(value) ? value : 1);
}

function clampRowCount() {
  const value = Math.floor(Number(props.state.rowCount));
  props.state.rowCount = Math.min(
    LADDER_MAX_ROWS,
    Math.max(LADDER_MIN_ROWS, Number.isFinite(value) ? value : LADDER_MIN_ROWS),
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
        <Icon
          v-if="state.home === code"
          class="chip-marker"
          name="material-symbols:home"
          size="1.1em"
          aria-hidden="true"
        />
        <Icon
          v-else-if="state.travel === code"
          class="chip-marker"
          name="material-symbols:rocket-launch"
          size="1.1em"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>

  <div class="field-row">
    <div class="field">
      <label for="start-amount">{{ $t('controls.startAmount') }}</label>
      <input
        id="start-amount"
        v-model.number="state.startAmount"
        type="number"
        min="1"
        step="1"
        inputmode="numeric"
        @change="clampStartAmount"
        @blur="clampStartAmount"
      />
      <p class="hint">{{ $t('controls.startAmountHint') }}</p>
    </div>
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
  </div>

  <div class="field">
    <label for="row-count">{{ $t('controls.rowCount') }}</label>
    <input
      id="row-count"
      v-model.number="state.rowCount"
      type="number"
      :min="LADDER_MIN_ROWS"
      :max="LADDER_MAX_ROWS"
      step="1"
      inputmode="numeric"
      @change="clampRowCount"
      @blur="clampRowCount"
    />
    <p class="hint">{{ $t('controls.rowCountHint') }}</p>
  </div>

  <div class="field">
    <label class="checkbox-field" for="include-footer">
      <input
        id="include-footer"
        v-model="state.includeFooter"
        type="checkbox"
      />
      <span>{{ $t('controls.includeFooter') }}</span>
    </label>
    <p class="hint">{{ $t('controls.includeFooterHint') }}</p>
  </div>
</template>

<style scoped>
.chip-marker {
  margin-left: auto;
  flex-shrink: 0;
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

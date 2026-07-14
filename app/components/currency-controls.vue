<script setup>
// Base currency select plus the destination chip grid.
// Mutates the shared wallpaper state object passed down from the page.

import { CURRENCIES, currencyMeta } from "#shared/utils/currencies";

const props = defineProps({
  state: { type: Object, required: true },
});

// Render with the built-in list immediately, then refine from the API once
// on the client. Falls back silently to the static list on failure.
const codes = ref(Object.keys(CURRENCIES).sort());

onMounted(async () => {
  try {
    const res = await fetch("https://api.frankfurter.dev/v1/currencies");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const fetched = Object.keys(data).sort();
    if (fetched.length) codes.value = fetched;
  } catch {
    /* keep the built-in list (offline, blocked, etc.) */
  }
});

// The saved base may not exist in the current code list (stale saved state).
watch(
  codes,
  (list) => {
    if (!list.includes(props.state.base)) props.state.base = list[0];
  },
  { immediate: true },
);

// The base cannot also be a destination.
watch(
  () => props.state.base,
  (base) => {
    if (props.state.destinations.includes(base)) {
      props.state.destinations = props.state.destinations.filter((c) => c !== base);
    }
  },
);

function toggleDestination(code) {
  if (code === props.state.base) return;
  const i = props.state.destinations.indexOf(code);
  if (i >= 0) {
    props.state.destinations.splice(i, 1);
  } else {
    props.state.destinations.push(code);
  }
}
</script>

<template>
  <div class="field">
    <label for="base">{{ $t("controls.homeCurrency") }}</label>
    <select id="base" v-model="state.base">
      <option v-for="code in codes" :key="code" :value="code">
        {{ currencyMeta(code).flag }} {{ code }} — {{ currencyMeta(code).name }}
      </option>
    </select>
  </div>

  <div class="field">
    <span class="field-label">{{ $t("controls.destinations") }}</span>
    <p class="hint">{{ $t("controls.destinationsHint") }}</p>
    <div class="chip-grid">
      <button
        v-for="code in codes"
        :key="code"
        type="button"
        class="chip"
        :class="{ selected: state.destinations.includes(code) && code !== state.base }"
        :aria-disabled="code === state.base"
        :aria-pressed="state.destinations.includes(code)"
        @click="toggleDestination(code)"
      >
        <span class="flag">{{ currencyMeta(code).flag }}</span><span>{{ code }}</span>
      </button>
    </div>
  </div>
</template>

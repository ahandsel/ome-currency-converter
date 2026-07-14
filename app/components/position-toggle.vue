<script setup>
// Content position: center or left for the increment table on the wallpaper.

const props = defineProps({
  state: { type: Object, required: true },
});

const VALID_POSITIONS = ['center', 'left'];

function normalizePosition(value) {
  return VALID_POSITIONS.includes(value) ? value : 'center';
}

function setPosition(value) {
  props.state.position = normalizePosition(value);
}

onMounted(() => {
  props.state.position = normalizePosition(props.state.position);
});
</script>

<template>
  <div class="field">
    <span class="field-label">{{ $t('controls.position') }}</span>
    <p class="hint">{{ $t('controls.positionHint') }}</p>

    <div
      class="position-toggle"
      role="group"
      :aria-label="$t('controls.position')"
    >
      <button
        type="button"
        class="position-toggle__option"
        :class="{ selected: state.position === 'center' }"
        :aria-pressed="state.position === 'center'"
        @click="setPosition('center')"
      >
        {{ $t('controls.positionCenter') }}
      </button>
      <button
        type="button"
        class="position-toggle__option"
        :class="{ selected: state.position === 'left' }"
        :aria-pressed="state.position === 'left'"
        @click="setPosition('left')"
      >
        {{ $t('controls.positionLeft') }}
      </button>
    </div>
  </div>
</template>

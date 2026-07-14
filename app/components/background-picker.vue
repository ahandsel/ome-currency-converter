<script setup>
// Photo background picker: sets state.backgroundId to a curated photo id or null.

import { BACKGROUNDS, getBackground } from '~/utils/backgrounds';

const props = defineProps({
  state: { type: Object, required: true },
});

const selectedBackground = computed(() =>
  props.state.backgroundId ? getBackground(props.state.backgroundId) : null,
);

function selectNone() {
  props.state.backgroundId = null;
}

function selectBackground(id) {
  props.state.backgroundId = id;
}
</script>

<template>
  <div class="field">
    <span class="field-label">{{ $t('controls.background') }}</span>
    <p class="hint">{{ $t('controls.backgroundHint') }}</p>

    <div
      class="background-grid"
      role="group"
      :aria-label="$t('controls.background')"
    >
      <button
        type="button"
        class="background-none"
        :class="{ selected: state.backgroundId === null }"
        :aria-pressed="state.backgroundId === null"
        @click="selectNone"
      >
        {{ $t('controls.backgroundNone') }}
      </button>

      <button
        v-for="entry in BACKGROUNDS"
        :key="entry.id"
        type="button"
        class="background-thumb"
        :class="{ selected: state.backgroundId === entry.id }"
        :aria-label="entry.label"
        :title="entry.label"
        :aria-pressed="state.backgroundId === entry.id"
        @click="selectBackground(entry.id)"
      >
        <img :src="entry.thumbUrl" :alt="entry.label" loading="lazy" />
      </button>
    </div>

    <p v-if="selectedBackground" class="background-credit">
      <i18n-t keypath="preview.photoCredit" scope="global">
        <template #name>
          <a
            :href="selectedBackground.profileUrl"
            target="_blank"
            rel="noopener"
            >{{ selectedBackground.photographer }}</a
          >
        </template>
      </i18n-t>
    </p>
  </div>
</template>

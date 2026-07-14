<script setup>
// Photographer credit for the selected photo background, shown next to the preview.

import { getBackground } from '~/utils/backgrounds';

const props = defineProps({
  backgroundId: { type: String, default: null },
});

const entry = computed(() =>
  props.backgroundId ? getBackground(props.backgroundId) : null,
);
</script>

<template>
  <p v-if="entry" class="background-credit">
    <i18n-t keypath="preview.photoCredit" scope="global">
      <template #name>
        <a :href="entry.profileUrl" target="_blank" rel="noopener">{{
          entry.photographer
        }}</a>
      </template>
    </i18n-t>
    /
    <a :href="entry.photoUrl" target="_blank" rel="noopener">Unsplash</a>
  </p>
</template>

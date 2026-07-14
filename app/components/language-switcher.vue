<script setup>
// Interface language: English or Japanese via @nuxtjs/i18n.

const VALID_LOCALES = ['en', 'ja'];

const { locale, setLocale } = useI18n();

const activeLocale = computed(() =>
  VALID_LOCALES.includes(locale.value) ? locale.value : 'en',
);

async function selectLocale(code) {
  if (!VALID_LOCALES.includes(code) || activeLocale.value === code) {
    return;
  }

  await setLocale(code);
}
</script>

<template>
  <div class="field">
    <span class="field-label">{{ $t('controls.language') }}</span>

    <div
      class="language-switcher"
      role="group"
      :aria-label="$t('controls.language')"
    >
      <button
        type="button"
        class="language-switcher__option"
        :class="{ selected: activeLocale === 'en' }"
        :aria-pressed="activeLocale === 'en'"
        @click="selectLocale('en')"
      >
        {{ $t('controls.languageEn') }}
      </button>
      <button
        type="button"
        class="language-switcher__option"
        :class="{ selected: activeLocale === 'ja' }"
        :aria-pressed="activeLocale === 'ja'"
        @click="selectLocale('ja')"
      >
        {{ $t('controls.languageJa') }}
      </button>
    </div>
  </div>
</template>

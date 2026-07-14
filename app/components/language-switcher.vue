<script setup>
// Compact language toggle for the topbar (English <-> Japanese).

const VALID_LOCALES = ['en', 'ja'];

const { locale, setLocale, t } = useI18n();

const activeLocale = computed(() =>
  VALID_LOCALES.includes(locale.value) ? locale.value : 'en',
);

const nextLocale = computed(() => (activeLocale.value === 'en' ? 'ja' : 'en'));

const currentLabel = computed(() =>
  activeLocale.value === 'ja'
    ? t('controls.languageJa')
    : t('controls.languageEn'),
);

const switchLabel = computed(() =>
  nextLocale.value === 'ja'
    ? t('controls.languageJa')
    : t('controls.languageEn'),
);

const toggleAriaLabel = computed(
  () => `${t('controls.language')}: ${switchLabel.value}`,
);

async function toggleLocale() {
  await setLocale(nextLocale.value);
}
</script>

<template>
  <button
    type="button"
    class="language-switcher"
    :aria-label="toggleAriaLabel"
    :title="toggleAriaLabel"
    @click="toggleLocale"
  >
    <Icon name="material-symbols:language" size="1.25em" aria-hidden="true" />
    <span class="language-switcher__code">{{
      activeLocale === 'ja' ? 'JA' : 'EN'
    }}</span>
    <span class="visually-hidden">{{ currentLabel }}</span>
  </button>
</template>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel-2);
  color: var(--text);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    border-color 0.12s,
    background 0.12s;
}

.language-switcher:hover {
  border-color: var(--accent);
  background: rgba(99, 102, 241, 0.12);
}

.language-switcher:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.language-switcher__code {
  line-height: 1;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

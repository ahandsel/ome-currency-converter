<script setup>
// The single page: topbar, controls column, preview column, and footer.
// Owns the one wallpaper-state and one rates instance and passes both down
// via props, so there is a single source of truth.

const { t } = useI18n();

const state = useWallpaperState();
const { rates, pending, error, refresh } = useRates(() => state.value.base);

// The preview raises download failures here so the control panel's status
// line can show them, mirroring the prototype's shared status element.
// A new fetch clears the message, exactly as setStatus overwrote it.
const downloadError = ref(false);

watch(pending, (isPending) => {
  if (isPending) downloadError.value = false;
});

useSeoMeta({
  title: () => t('app.metaTitle'),
  description: () => t('app.metaDescription'),
});
</script>

<template>
  <div>
    <header class="topbar">
      <h1>💱 {{ $t('app.title') }}</h1>
      <p class="tagline">{{ $t('app.tagline') }}</p>
    </header>

    <main class="layout">
      <ControlPanel
        :state="state"
        :rates="rates"
        :pending="pending"
        :error="error"
        :download-error="downloadError"
        @refresh="refresh"
      />

      <section class="preview" :aria-label="$t('preview.ariaLabel')">
        <ClientOnly>
          <WallpaperPreview
            :state="state"
            :rates="rates"
            @download-error="downloadError = true"
          />
        </ClientOnly>
      </section>
    </main>

    <footer class="sitefoot">
      <p>
        <i18n-t keypath="footer.credit" scope="global">
          <template #link>
            <a href="https://frankfurter.dev" target="_blank" rel="noopener"
              >frankfurter.dev</a
            >
          </template>
        </i18n-t>
      </p>
    </footer>
  </div>
</template>

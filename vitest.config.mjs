// Vitest configuration for the unit tests in tests/unit/.
//
// General notes - Runs plain Node-environment unit tests without booting
// Nuxt or Nitro. The #shared alias mirrors Nuxt's built-in alias so server
// modules that import from #shared resolve under plain Vitest.
// Usage - pnpm test-unit (wired to "vitest run" in package.json).
// Output - test results on stdout; non-zero exit code on failure.

import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
});

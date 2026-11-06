import { defineConfig } from 'vitest/config'

export default defineConfig({ test: {
  environment: 'jsdom',
  setupFiles: ['./test-setup.ts'],
  // Preserve this raw source import for layout contracts; other CSS stays stubbed.
  css: { include: [/operation-sidebar\.css\?raw(?:&|$)/] },
} })

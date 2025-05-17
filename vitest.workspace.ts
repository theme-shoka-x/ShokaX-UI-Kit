import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vitest.config.ts",
  "./packages/shokax-uikit/vite.config.ts",
  "./packages/nyx-player/vitest.config.ts",
  "./packages/shokax-toolkit-lib/vite.config.ts"
])

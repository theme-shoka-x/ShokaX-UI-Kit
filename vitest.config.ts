import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: ['packages/*'],
    coverage: {
      thresholds: {
        functions: 90,
        lines: 90,
        branches: 80,
        statements: 90,
      },
    },
  }
})

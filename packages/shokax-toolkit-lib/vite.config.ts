import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'shokax-toolkit',
      fileName: 'shokax-toolkit',
      formats: ['es', 'umd', 'cjs'],
    },
  },
})

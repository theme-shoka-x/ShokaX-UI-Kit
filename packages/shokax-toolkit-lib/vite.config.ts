import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ tsconfigPath: './tsconfig.json' })],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'shokax-toolkit',
      fileName: 'shokax-toolkit',
      formats: ['es'],
    },
  },
})

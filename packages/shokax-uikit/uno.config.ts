import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      collections: {
        ri: () => import('@iconify-json/ri/icons.json').then(i => i.default),
      },
    }),
  ],
})

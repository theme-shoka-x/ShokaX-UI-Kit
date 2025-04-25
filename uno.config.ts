import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind3(),
    presetIcons({
      collections: {
        ri: () => import('@iconify-json/ri/icons.json').then(i => i.default),
      },
    }),
  ],
})

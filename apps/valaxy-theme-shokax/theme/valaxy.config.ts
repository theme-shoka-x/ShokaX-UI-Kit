import type { ThemeConfig } from './types'
import { resolve } from 'node:path'
import { defineTheme } from 'valaxy'
import { defaultThemeConfig, generateSafelist, themePlugin } from './node'

export default defineTheme<ThemeConfig>((options) => {
  return {
    themeConfig: defaultThemeConfig,
    vite: {
      plugins: [themePlugin(options)],
      resolve: {
        alias: {
          '@uikit': resolve(__dirname, '../../../packages/shokax-uikit/src'),
        },
      },
    },
    unocss: {
      safelist: generateSafelist(options.config.themeConfig as ThemeConfig),
    },
  }
})

import type { ThemeConfig } from './types'
import { resolve } from 'node:path'
import { defineTheme } from 'valaxy'
import { defaultThemeConfig, generateSafelist, themePlugin } from './node'

export default defineTheme<ThemeConfig>((options) => {
  const repoRoot = resolve(__dirname, '../../..')
  const uikitSrc = resolve(repoRoot, 'packages/shokax-uikit/src')

  return {
    themeConfig: defaultThemeConfig,
    vite: {
      optimizeDeps: {
        include: ['dayjs'],
      },
      plugins: [themePlugin(options)],
      resolve: {
        alias: {
          '@uikit': uikitSrc,
          'shokax-uikit/src': uikitSrc,
        },
      },
    },
    unocss: {
      safelist: generateSafelist(options.config.themeConfig as ThemeConfig),
    },
  }
})

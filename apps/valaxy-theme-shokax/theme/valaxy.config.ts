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
      build: {
        minify: false,
        sourcemap: true,
      },
      optimizeDeps: {
        include: ['dayjs'],
      },
      plugins: [themePlugin(options)],
      resolve: {
        alias: {
          // 'dayjs': 'dayjs/esm/index.js',
          '@uikit': uikitSrc,
          'shokax-uikit/src': uikitSrc,
          'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
        },
      },
    },
    unocss: {
      safelist: generateSafelist(options.config.themeConfig as ThemeConfig),
    },
  }
})

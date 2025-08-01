import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), UnoCSS(), dts({ tsconfigPath: './tsconfig.app.json' }) as PluginOption, cssInjectedByJsPlugin() as PluginOption],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      '__VUE_PROD_DEVTOOLS__': false,
    },
    build: {
      outDir: 'dist/pagefind',
      lib: {
        entry: [
          'src/entries/pagefind.ts',
        ],
        name: 'ShokaxUIKit-Pagefind',
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})

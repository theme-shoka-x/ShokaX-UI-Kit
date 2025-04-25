import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), UnoCSS()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      '__VUE_PROD_DEVTOOLS__': false,
    },
  }
})

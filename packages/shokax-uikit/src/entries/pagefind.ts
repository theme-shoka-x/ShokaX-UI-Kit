import PagefindSearch from '@uikit/components/search/SearchPage.vue'
import { createApp } from 'vue'
import 'virtual:uno.css'

export function initializePagefindSearch(selector: string) {
  if (!selector) {
    throw new Error('Selector is required')
  }

  const app = createApp(PagefindSearch, { selector })
  app.mount('#pagefind_mount')
}

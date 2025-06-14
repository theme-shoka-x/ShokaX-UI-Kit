import { createApp } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

import 'virtual:uno.css'

function replaceTargetsWithCodeBlockComponent(selector: string) {
  const targets = document.querySelectorAll(selector)

  targets.forEach((target) => {
    const html = target.innerHTML
    const mountPoint = document.createElement('div')

    target.replaceWith(mountPoint)

    const app = createApp(CodeBlock, {
      content: html,
    })

    app.mount(mountPoint)
  })
}

export function initializeCodeBlock(selector: string) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      replaceTargetsWithCodeBlockComponent(selector)
    })
  }
  else {
    replaceTargetsWithCodeBlockComponent(selector)
  }
}

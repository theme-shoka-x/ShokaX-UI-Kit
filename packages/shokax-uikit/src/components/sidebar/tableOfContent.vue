<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

interface TocItem {
  id: string
  text: string
  level: number
  element?: HTMLElement
}

const props = defineProps<{
  selector?: string // 用于扫描标题的容器选择器，默认为文档
  headingSelector?: string // 标题选择器，默认为 'h1,h2,h3,h4,h5,h6'
  rootMargin?: string // Intersection Observer 的 rootMargin
  threshold?: number // Intersection Observer 的 threshold
}>()

const tocItems = ref<TocItem[]>([])
const activeId = ref<string>('')
const observer = ref<IntersectionObserver>()

const { y } = useWindowScroll({ behavior: 'smooth' })

// 生成目录数据
function generateTocItems() {
  const container = props.selector
    ? document.querySelector(props.selector) || document
    : document

  const headings = container.querySelectorAll(props.headingSelector || 'h1,h2,h3,h4,h5,h6')

  tocItems.value = Array.from(headings).map((heading, index) => {
    const element = heading as HTMLElement
    let id = element.id

    // 如果没有id，自动生成一个
    if (!id) {
      id = `heading-${index}-${element.textContent?.replace(/\s+/g, '-').toLowerCase()}`
      element.id = id
    }

    return {
      id,
      text: element.textContent || '',
      level: Number.parseInt(element.tagName.charAt(1)),
      element,
    }
  })
}

// 设置 Intersection Observer
function setupObserver() {
  if (observer.value) {
    observer.value.disconnect()
  }

  observer.value = new IntersectionObserver(
    (entries) => {
      // 找到当前视窗中的标题
      const visibleEntries = entries.filter(entry => entry.isIntersecting)

      if (visibleEntries.length > 0) {
        // 如果有多个可见标题，选择最上方的那个
        const topEntry = visibleEntries.reduce((prev, current) => {
          return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
        })

        activeId.value = topEntry.target.id
      }
      else {
        // 如果没有标题在视窗中，找到最接近顶部的那个
        const allEntries = entries.filter(entry => entry.target.id)
        if (allEntries.length > 0) {
          const closestEntry = allEntries.reduce((prev, current) => {
            const prevDistance = Math.abs(prev.boundingClientRect.top)
            const currentDistance = Math.abs(current.boundingClientRect.top)
            return prevDistance < currentDistance ? prev : current
          })

          // 只有当标题在视窗上方时才设置为活跃
          if (closestEntry.boundingClientRect.top <= 0) {
            activeId.value = closestEntry.target.id
          }
        }
      }
    },
    {
      rootMargin: props.rootMargin || '-10% 0% -70% 0%',
      threshold: props.threshold || 0.1,
    },
  )

  // 观察所有标题元素
  tocItems.value.forEach((item) => {
    if (item.element) {
      observer.value!.observe(item.element)
    }
  })
}

// 点击目录项时滚动到对应标题
function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const offsetTop = element.offsetTop - 80 // 留出导航栏的空间
    y.value = offsetTop
    activeId.value = id
  }
}

// 获取目录项的样式类
function getTocItemClass(item: TocItem) {
  const baseClass = 'toc-item'
  const levelClass = `toc-level-${item.level}`
  const activeClass = activeId.value === item.id ? 'toc-active' : ''

  return [baseClass, levelClass, activeClass].filter(Boolean).join(' ')
}

onMounted(async () => {
  await nextTick()
  generateTocItems()

  if (tocItems.value.length > 0) {
    setupObserver()
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})

// 暴露重新生成目录的方法，用于动态内容更新
defineExpose({
  regenerate: () => {
    generateTocItems()
    setupObserver()
  },
})
</script>

<template>
  <div v-if="tocItems.length > 0" class="table-of-contents">
    <div class="toc-header">
      <div class="i-ri-list-ordered mr-2" />
      <span class="font-semibold">目录</span>
    </div>

    <nav class="toc-nav">
      <ul class="toc-list">
        <li
          v-for="item in tocItems"
          :key="item.id"
          :class="getTocItemClass(item)"
        >
          <a
            :href="`#${item.id}`"
            class="toc-link"
            @click.prevent="scrollToHeading(item.id)"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="css" scoped>
.table-of-contents {
  font-size: 0.875rem;
  line-height: 1.6;
}

.toc-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--grey-4);
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.toc-nav {
  max-height: 60vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--grey-5) transparent;
}

.toc-nav::-webkit-scrollbar {
  width: 4px;
}

.toc-nav::-webkit-scrollbar-track {
  background: transparent;
}

.toc-nav::-webkit-scrollbar-thumb {
  background-color: var(--grey-5);
  border-radius: 2px;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-item {
  margin: 0;
  padding: 0;
}

.toc-link {
  display: block;
  padding: 0.25rem 0;
  color: var(--grey-6);
  text-decoration: none;
  border-left: 2px solid transparent;
  padding-left: 0.75rem;
  transition: all 0.2s ease-in-out;
  word-break: break-word;
  hyphens: auto;
}

.toc-link:hover {
  color: var(--primary-color);
  border-left-color: var(--primary-color);
  background-color: var(--grey-3);
}

/* 不同级别标题的缩进 */
.toc-level-1 .toc-link {
  padding-left: 0.75rem;
  font-weight: 600;
}

.toc-level-2 .toc-link {
  padding-left: 1.5rem;
}

.toc-level-3 .toc-link {
  padding-left: 2.25rem;
}

.toc-level-4 .toc-link {
  padding-left: 3rem;
}

.toc-level-5 .toc-link {
  padding-left: 3.75rem;
}

.toc-level-6 .toc-link {
  padding-left: 4.5rem;
}

/* 活跃状态 */
.toc-active .toc-link {
  color: var(--primary-color);
  border-left-color: var(--primary-color);
  background-color: var(--color-pink-light-a3);
  font-weight: 600;
}

/* 暗色主题适配 */
html[data-theme='dark'] .toc-header {
  border-bottom-color: var(--grey-6);
}

html[data-theme='dark'] .toc-link:hover {
  background-color: var(--grey-7);
}

html[data-theme='dark'] .toc-active .toc-link {
  background-color: var(--grey-7);
}
</style>

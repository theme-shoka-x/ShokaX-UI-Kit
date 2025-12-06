<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

const { y } = useWindowScroll({
  behavior: 'smooth',
})

const percent = computed(() => {
  if (typeof document === 'undefined')
    return 0

  const doc = document.documentElement
  const scrollHeight = doc.scrollHeight - doc.clientHeight
  if (scrollHeight <= 0)
    return 0

  return Math.min(100, Math.max(0, (y.value / scrollHeight) * 100))
})

const percentStyle = computed(() => ({
  width: `${percent.value}%`,
}))

function scrollToTop() {
  y.value = 0
}

function scrollToBottom() {
  if (typeof document === 'undefined')
    return

  const doc = document.documentElement
  y.value = doc.scrollHeight || 0
}
</script>

<template>
  <ul id="quick">
    <li class="percent" :style="percentStyle" aria-hidden="true" />
    <li class="back-left" aria-disabled="true">
      <i class="i-ri-arrow-left-s-line" />
    </li>
    <li class="back-top" @click="scrollToTop">
      <i class="i-ri-arrow-up-line" />
    </li>
    <li class="back-bottom" @click="scrollToBottom">
      <i class="i-ri-arrow-down-line" />
    </li>
    <li class="back-right" aria-disabled="true">
      <i class="i-ri-arrow-right-s-line" />
    </li>
  </ul>
</template>

<style scoped>
#quick {
  display: none;
  align-items: center;
  flex-wrap: wrap;
  width: 15rem;
  margin: 0;
  padding: 0;
  position: sticky;
  bottom: 0.125rem;
  list-style: none;
}

#quick li {
  width: 25%;
  min-height: 1.875rem;
  text-align: center;
  transition: all 0.2s ease-in-out;
}

#quick li i {
  cursor: pointer;
}

#quick li:hover {
  color: var(--primary-color);
}

#quick li.percent {
  display: block;
  background: var(--primary-color);
  width: 0;
  min-height: 0.125rem;
  flex-basis: 100%;
  height: 0.125rem;
}
</style>

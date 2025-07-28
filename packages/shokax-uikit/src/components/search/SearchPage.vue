<script setup lang="ts">
// @ts-expect-error no types for PagefindUI
import { PagefindUI } from '@pagefind/default-ui'
import { onMounted } from 'vue'

import { useDarkMode } from '@/composables/useDarkMode'
import '@pagefind/default-ui/css/ui.css'

defineProps<{
  visible: boolean
}>()

onMounted(() => {
  // eslint-disable-next-line no-new
  new PagefindUI({ element: '#pagefind', showSubResults: true })
})

const { isDark } = useDarkMode()
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-down">
      <div
        v-show="visible"
        class="pagefind fixed top-12 m-12 max-h-80% max-w-100vw min-h-70% w-[calc(100vw_-_7rem)] overflow-x-hidden overflow-y-scroll rounded-lg bg-[var(--grey-1-a7)] p-2 opacity-90 backdrop-blur-xl"
        :class="{ dark: isDark }"
      >
        <div id="pagefind" />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="css">
.pagefind-ui__results-aream,
.pagefind-ui__result-link,
.pagefind-ui__result-excerpt,
.pagefind-ui__message {
  color: var(--grey-9) !important;
}
</style>

<style lang="css" scoped>
.pagefind {
  scrollbar-width: thin;
  scrollbar-color: var(--grey-5) transparent;

  border: 2px solid var(--grey-3);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translateY(0);
  opacity: 0.9;
}

.slide-down-leave-from {
  transform: translateY(0);
  opacity: 0.9;
}
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>

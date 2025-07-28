<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'
import SearchPage from './SearchPage.vue'

const props = defineProps<{
  selector?: string | HTMLElement | Ref<HTMLElement | null>
  showSearch?: boolean
}>()

const visible = ref(false)

function toggleVisibility() {
  visible.value = !visible.value
}

if (props.selector) {
  onMounted(() => {
    if (typeof props.selector === 'string') {
      const element = document.querySelector(props.selector)
      if (element) {
        element.addEventListener('click', toggleVisibility)
      }
    }
    else if (props.selector instanceof HTMLElement) {
      props.selector.addEventListener('click', toggleVisibility)
    }
    else if (props.selector?.value instanceof HTMLElement) {
      props.selector.value.addEventListener('click', toggleVisibility)
    }
    else {
      console.warn('Invalid selector provided for PagefindSearch component.')
    }
  })
} else {
  watch(() => props.showSearch, (newValue) => {
    visible.value = newValue
  }, { immediate: true })
}
</script>

<template>
  <SearchPage :visible="visible" />
</template>

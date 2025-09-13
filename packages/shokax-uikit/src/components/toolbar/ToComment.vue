<script setup lang="ts">
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

const commentOffset = ref(0)
const { width, height } = useWindowSize()

onMounted(() => {
  function updateCommentOffset() {
    commentOffset.value = document.getElementById('comment')?.offsetTop ?? 0
  }

  watch([width, height], () => {
    updateCommentOffset()
  }, { immediate: true })
})

const { y } = useWindowScroll({ behavior: 'smooth' })
</script>

<template>
  <div
    v-if="commentOffset !== 0"
    class="transition-btn h-auto w-7.5 flex flex-col cursor-pointer items-center justify-center bg-[var(--grey-1)] pt-1.25 color-[var(--primary-color)] opacity-80"
    @click="y = commentOffset"
  >
    <div class="i-ri-discuss-fill h-5 w-5" />
  </div>
</template>

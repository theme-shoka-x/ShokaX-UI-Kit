<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import TableOfContents from './tableOfContent.vue'

defineProps<{
  isVisible?: boolean
  position?: 'left' | 'right'
}>()

defineEmits<{
  close: []
}>()

const { width } = useWindowSize()
const tocRef = ref<InstanceType<typeof TableOfContents>>()

// 暴露重新生成目录的方法
defineExpose({
  regenerate: () => tocRef.value?.regenerate(),
})
</script>

<template>
  <Transition name="slide-in">
    <div
      v-if="isVisible && width <= 991"
      class="toc-sidebar fixed top-0 z-50 h-full w-80 bg-[var(--grey-1)] shadow-xl backdrop-blur-lg"
      :class="{ 'right-0': position === 'right', 'left-0': position === 'left' }"
    >
      <div class="h-full flex flex-col">
        <!-- 头部 -->
        <div class="flex items-center justify-between border-b border-[var(--grey-4)] p-4">
          <h3 class="text-lg font-semibold">
            文章目录
          </h3>
          <button
            class="cursor-pointer text-xl hover:text-[var(--primary-color)]"
            @click="$emit('close')"
          >
            <div class="i-ri-close-line" />
          </button>
        </div>

        <!-- 目录内容 -->
        <div class="flex-1 overflow-y-auto p-4">
          <TableOfContents ref="tocRef" />
        </div>
      </div>
    </div>
  </Transition>

  <!-- 遮罩层 -->
  <Transition name="fade">
    <div
      v-if="isVisible && width <= 991"
      class="fixed inset-0 z-40 bg-black bg-opacity-50"
      @click="$emit('close')"
    />
  </Transition>
</template>

<style lang="css" scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-in-enter-from {
  transform: translateX(100%);
}

.slide-in-leave-to {
  transform: translateX(100%);
}

.slide-in-enter-from.left-0 {
  transform: translateX(-100%);
}

.slide-in-leave-to.left-0 {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

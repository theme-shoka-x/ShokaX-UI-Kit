<script setup lang="ts">
import type { SegmentPost } from './segmentsPostsShared'
import { computed } from 'vue'
import { gradientForPost } from './segmentsPostsShared'

interface Props {
  post: SegmentPost
  lazy?: boolean
  useGradient?: boolean
  even?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lazy: true,
  useGradient: false,
  even: false,
})

// 仅在非渐变模式下展示真实封面图。
const showImage = computed(() => !props.useGradient)
// 根据 post id 生成稳定的渐变背景。
const gradientStyle = computed(() => {
  if (props.useGradient)
    return { background: gradientForPost(props.post) }
  return undefined
})
// 控制懒加载模式，默认为 lazy。
const loadingMode = computed(() => (props.lazy ? 'lazy' : 'eager'))
</script>

<template>
  <div
    class="cover relative overflow-hidden"
    :class="even ? 'cover-even' : 'cover-odd'"
    :style="gradientStyle"
  >
    <img
      v-if="showImage"
      :src="post.cover"
      :alt="post.title"
      :loading="loadingMode"
      decoding="async"
    >
  </div>
</template>

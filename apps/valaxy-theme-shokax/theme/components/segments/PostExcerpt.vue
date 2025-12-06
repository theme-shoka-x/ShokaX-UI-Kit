<script setup lang="ts">
import type { SegmentPost } from './segmentsPostsShared'
import { computed } from 'vue'

const props = defineProps<{ post: SegmentPost }>()

const stripHtml = (input?: string) => input?.replace(/<[^>]*>/g, '') ?? ''
function truncate(input: string, limit = 300) {
  return input.length > limit ? `${input.slice(0, limit)}…` : input
}

// 选择描述、摘要或正文截取后的内容作为展示文本。
const excerpt = computed(() => {
  if (props.post.description)
    return props.post.description
  if (props.post.excerpt)
    return props.post.excerpt
  return truncate(stripHtml(props.post.content ?? ''), 300)
})
</script>

<template>
  <div class="excerpt" v-html="excerpt" />
</template>

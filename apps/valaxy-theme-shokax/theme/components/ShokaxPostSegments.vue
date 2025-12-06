<script setup lang="ts">
import type { PostFrontMatter } from 'valaxy'
import SegmentsPosts from './segments/SegmentsPosts.vue'

defineProps<{
  postList: Partial<PostFrontMatter>[]
}>()
</script>

<template>
  <SegmentsPosts :posts="postList" />
</template>

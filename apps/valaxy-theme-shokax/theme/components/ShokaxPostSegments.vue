<script setup lang="ts">
import type { PostFrontMatter } from 'valaxy'
import ShokaxIndexPostCard from './ShokaxIndexPostCard.vue'

defineProps<{
  postList: Partial<PostFrontMatter>[]
}>()
</script>

<template>
  <div class="segments posts">
    <template v-for="post in postList" :key="post?.abbrlink">
      <ShokaxIndexPostCard
        v-if="post"
        :date="new Date(post.date ?? '1970-01-01')"
        :title="typeof post.title === 'string' ? post.title : post.title?.[post.lang || ''] || ''"
        :excerpt="post.excerpt || post.description || ''"
        :cover="post.cover || ''"
        :href="post.path || post.abbrlink || ''"
        :words-count="post.wordCount"
        :reading-time="post.readingTime"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PostFrontMatter } from 'valaxy'
import IndexPostCard from './IndexPostCard.vue'

defineProps<{
  postList: Partial<PostFrontMatter[]>
}>()
</script>

<template>
  <div class="segments posts">
    <template v-for="post in postList" :key="post?.abbrlink">
      <IndexPostCard
        v-if="post"
        :date="new Date(post.date)"
        :title="typeof post.title === 'string' ? post.title : post.title[post.lang]"
        :excerpt="post.excerpt"
        :cover="post.cover"
        :href="post.path || post.abbrlink"
        :words-count="post.wordCount"
        :reading-time="post.readingTime"
      />
    </template>
  </div>
</template>

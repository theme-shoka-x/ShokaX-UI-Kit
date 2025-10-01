<script setup lang="ts">
defineProps<{
  title: string
  excerpt: string
  date: Date
  cover: string
  href: string
  wordsCount?: string
  readingTime?: number
}>()
</script>

<template>
  <article>
    <div class="cover">
      <AppLink :to="href" :title="title">
        <img :src="cover">
      </AppLink>
    </div>
    <div class="info">
      <div class="meta">
        <span>
          <i class="i-ri-calendar-2-line" />
          <time :datetime="date.toISOString()">{{ `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` }}</time>
        </span>
        <span v-if="wordsCount">
          <i class="i-ri-pen-nib-line" />
          <span>{{ wordsCount }}</span>
        </span>
        <span v-if="readingTime">
          <i class="i-ri-time-line" />
          <span>{{ readingTime }}</span>
        </span>
      </div>
    </div>
    <div class="excerpt">
      {{ excerpt }}
    </div>
    <AppLink :to="href">
      more...
    </AppLink>
  </article>
</template>

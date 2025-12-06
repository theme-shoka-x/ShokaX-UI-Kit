<script setup lang="ts">
import type { SegmentPost } from './segmentsPostsShared'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ post: SegmentPost }>()
const { t, locale } = useI18n()

// 构造悬浮提示：创建时间完整格式。
const createdTitle = computed(
  () => `${t('segments.created')}${t('segments.colon')}${fullDate(props.post.date)}`,
)

// ISO 日期用于机器可读的 time 标记。
const isoDate = computed(() => props.post.date.toISOString())

// 本地化的短日期展示。
const shortDate = computed(() =>
  props.post.date.toLocaleDateString(locale.value as string | undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
)

const wordCount = computed(() => props.post.wordCount)
const minutes = computed(() => props.post.minutes)

function fullDate(value: Date) {
  return value.toLocaleString(locale.value as string | undefined)
}
</script>

<template>
  <div class="meta" aria-label="post meta">
    <span class="item" :title="createdTitle">
      <span class="icon"><i class="i-ri-calendar-2-line" aria-hidden="true" /></span>
      <time itemprop="dateCreated datePublished" :datetime="isoDate">
        {{ shortDate }}
      </time>
    </span>
    <span v-if="wordCount" class="item" :title="t('segments.words')">
      <span class="icon"><i class="i-ri-pen-nib-line" aria-hidden="true" /></span>
      <span class="text">{{ wordCount }}</span>
      <span class="unit">{{ t('segments.word') }}</span>
    </span>
    <span class="item" :title="t('segments.time')">
      <span class="icon"><i class="i-ri-time-line" aria-hidden="true" /></span>
      <span class="text">{{ minutes }}</span>
      <span class="unit">{{ t('segments.minute') }}</span>
    </span>
  </div>
</template>

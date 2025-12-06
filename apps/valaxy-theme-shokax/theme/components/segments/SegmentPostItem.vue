<script setup lang="ts">
import type { SegmentPost } from './segmentsPostsShared'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PostCover from './PostCover.vue'
import PostExcerpt from './PostExcerpt.vue'
import PostMeta from './PostMeta.vue'

interface Props {
  post: SegmentPost
  lazy?: boolean
  useGradient?: boolean
  animationsDisabled?: boolean
  even?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lazy: true,
  useGradient: false,
  animationsDisabled: false,
  even: false,
})

const { t } = useI18n()

// 跳转链接：优先使用 frontmatter 链接，缺省为占位符。
const link = computed(() => props.post.link || '#')
// 文章标题：为空时使用 i18n 未命名文案。
const title = computed(() => props.post.title || t('segments.untitled'))
// 标题附带链接图标，用于可点击提示。
const titleHtml = computed(() => {
  if (props.post.link)
    return `${title.value}<i class="i-ri-link" aria-hidden="true"></i>`
  return title.value
})
// 末尾分类，用于底部 meta 展示。
const lastCategory = computed(() => {
  if (props.post.categories?.length)
    return props.post.categories[props.post.categories.length - 1]
  return null
})
// “更多” 按钮文本。
const moreLabel = computed(() => t('segments.more'))
</script>

<template>
  <article
    class="item relative flex transition-all duration-300"
    :class="[
      animationsDisabled ? 'show no-anim' : 'show',
      even ? 'even' : '',
    ]"
  >
    <PostCover :post="post" :lazy="lazy" :use-gradient="useGradient" :even="even" />
    <div class="info relative flex flex-col gap-2">
      <PostMeta :post="post" />
      <h3 class="my-2.5 truncate text-[1.1rem] text-[var(--primary-color)]">
        <AppLink :to="link" :title="title" itemprop="url">
          <span v-html="titleHtml" />
        </AppLink>
      </h3>
      <PostExcerpt :post="post" />
      <div v-if="lastCategory" class="meta footer flex items-center text-sm text-[var(--grey-5)]">
        <span>
          <AppLink :to="lastCategory.path" :title="lastCategory.name" itemprop="url">
            <i class="i-ri-flag-line" aria-hidden="true" />
            {{ lastCategory.name }}
          </AppLink>
        </span>
      </div>
      <AppLink
        class="btn"
        :class="even ? 'btn-even' : ''"
        :to="link"
        :title="title"
        itemprop="url"
      >
        {{ moreLabel }}
      </AppLink>
    </div>
  </article>
</template>

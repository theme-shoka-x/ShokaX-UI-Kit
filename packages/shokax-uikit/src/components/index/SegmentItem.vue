<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import LinkElement from '../LinkElement.vue'
import MoreBtn from './MoreBtn.vue'
import PostMeta from './PostMeta.vue'
import PostMetaFooter from './PostMetaFooter.vue'

defineProps<{
  postUrl: string
  coverSrc: string
  postTitle: string
  postExcerpt: string
  postDate: string
  postWords: number
  postReadTime: string
  catHref: string
  catName: string
  isEvenItem: boolean
}>()

const segmentItem = useTemplateRef('index-segment')
const itemVisible = useElementVisibility(segmentItem, { threshold: 0.5 })
</script>

<template>
  <article ref="index-segment" class="index-segment relative m-4 flex rounded-lg color-inherit even:flex-row-reverse" :class="{ 'opacity-0': !itemVisible, 'opacity-1': itemVisible }">
    <div class="cover odd:[clip-path:_polygon(0_0,_92%_0%,_100%_100%,_0%_100%)]">
      <LinkElement :href="postUrl" itemprop="url" :title="postTitle">
        <img class="h-full w-full object-cover transition-02" :src="coverSrc" loading="lazy" decoding="async">
      </LinkElement>
    </div>
    <div>
      <PostMeta :date="postDate" :words="postWords" :read-time="postReadTime" />
      <h3>
        <LinkElement :href="postUrl" itemprop="url" :title="postTitle">
          {{ postTitle }}
        </LinkElement>
      </h3>
      <div class="excerpt">
        {{ postExcerpt }}
      </div>
      <PostMetaFooter :cat-href="catHref" :cat-name="catName" />
      <MoreBtn :post-url="postUrl" :post-title="postTitle" />
    </div>
  </article>
</template>

<style lang="css" scoped>
.transition-02 {
  transition: all 0.2s ease-in-out;
}

.index-segment {
  box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
  width: calc(100% - 2rem);
  min-width: calc(100% - 2rem);
  transition: all 0.2s ease-in-out;
  height: 14rem;
  animation: 0.5s slideUpBigIn;
}

.cover {
  border-radius: 0.625rem 0 0 0.625rem;
  width: 50%;
  margin-right: 1.5rem;
  overflow: hidden;
}

.index-segment:nth-child(2n) .cover {
  clip-path: polygon(0 0%, 100% 0%, 100% 100%, 8% 100%);
  border-radius: 0 0.625rem 0.625rem 0;
  margin-left: 1.5rem;
  margin-right: auto;
}

.index-segment:nth-child(2n) .info {
  padding: 1rem 0 3rem 1.5rem;
}

.index-segment:nth-child(2n) .info .meta {
  justify-content: flex-start;
}

.index-segment:nth-child(2n) .meta.footer {
  justify-content: flex-start;
  right: 0.5rem;
}

.index-segment:nth-child(2n) .btn {
  background-image: linear-gradient(to right, var(--color-orange) 0, var(--color-pink) 100%);
  border-radius: 0 1rem;
  left: 0;
  right: auto;
}

@keyframes slideBigUpIn {
  0% {
    opacity: 0;
    transform: translateY(80px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

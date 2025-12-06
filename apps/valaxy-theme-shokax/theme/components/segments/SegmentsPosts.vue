<script setup lang="ts">
import type { PostFrontMatter } from 'valaxy'
import { usePreferredReducedMotion } from '@vueuse/core'
import { usePostList } from 'valaxy'
import { computed } from 'vue'
import SegmentPostItem from './SegmentPostItem.vue'
import { normalizePosts } from './segmentsPostsShared'

const props = withDefaults(
  defineProps<{
    posts?: Partial<PostFrontMatter>[]
    useLazyLoading?: boolean
    useGradientBackground?: boolean
  }>(),
  {
    posts: undefined,
    useLazyLoading: true,
    useGradientBackground: false,
  },
)

const sitePosts = usePostList()
// 优先使用传入的 posts；否则回落到站点全量文章列表。
const resolvedPosts = computed(() => {
  const source = props.posts ?? sitePosts.value
  return normalizePosts(source)
})

const prefersReducedMotion = usePreferredReducedMotion()
// 若系统开启“减少动态效果”，禁用入场动画。
const animationsDisabled = computed(() => Boolean(prefersReducedMotion.value))
</script>

<template>
  <section class="segments posts flex flex-col items-center justify-center" aria-label="Latest posts">
    <SegmentPostItem
      v-for="(post, index) in resolvedPosts"
      :key="post.id"
      :post="post"
      :lazy="useLazyLoading"
      :use-gradient="useGradientBackground"
      :animations-disabled="animationsDisabled"
      :even="(index + 1) % 2 === 0"
    />
  </section>
</template>

<style lang="css">
/* 基于旧版 hexo-theme-shokax 的 Segments 布局与动效 */
.segments {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.segments > .item {
  position: relative;
  color: inherit;
  width: calc(100% - 2rem);
  min-width: calc(100% - 2rem);
  height: 14rem;
  margin: 1rem;
  opacity: 0;
  display: flex;
  border-radius: 0.625rem;
  box-shadow: 0 0 1.875rem -0.9375rem var(--box-bg-shadow);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.segments > .item.show {
  opacity: 1;
  animation: slideUpBigIn 0.5s ease;
}

.segments > .item.no-anim {
  animation: none;
}

.segments > .item:hover {
  box-shadow: 0 0 2rem var(--box-bg-shadow);
}

.segments .cover {
  position: relative;
  width: 50%;
  margin-right: 1.5rem;
  clip-path: polygon(0 0, 92% 0%, 100% 100%, 0% 100%);
  border-radius: 0.625rem 0 0 0.625rem;
  overflow: hidden;
  min-height: 14rem;
}

.segments .cover-even {
  margin-right: auto;
  margin-left: 1.5rem;
  clip-path: polygon(0 0%, 100% 0%, 100% 100%, 8% 100%);
  border-radius: 0 0.625rem 0.625rem 0;
}

.segments .cover img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  display: block;
}

.segments > .item:hover .cover img {
  transform: scale(1.05) rotate(1deg);
}

.segments > .item.even:hover .cover img {
  transform: scale(1.05) rotate(-1deg);
}

.segments .info {
  position: relative;
  width: 50%;
  padding: 1rem 1.5rem 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;
  min-height: 14rem;
}

.segments .info .meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  color: var(--grey-5);
  font-size: 0.875rem;
  flex-wrap: wrap;
}

.segments .info .meta .icon {
  margin-right: 0.0625rem;
  display: inline-flex;
  align-items: center;
}

.segments .info .meta .item + .item {
  margin-left: 0.625rem;
}

.segments .info h3 {
  margin: 0.625rem 0;
  color: var(--primary-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.1rem;
}

.segments .info h3 a {
  color: inherit;
}

.segments .info .excerpt {
  overflow: hidden;
  font-size: 0.9375rem;
  max-height: 5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  color: var(--grey-7);
}

.segments .info .meta.footer {
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  max-width: calc(100% - 7rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: flex-start;
  align-items: center;
}

.segments .info .meta.footer span {
  margin-right: 0.5rem;
}

.segments .info .btn {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.3rem 1rem;
  border-radius: 1rem 0;
  color: var(--grey-0);
  background-image: linear-gradient(to right, var(--color-pink) 0, var(--color-orange) 100%);
  box-shadow: 0 0 0.75rem var(--color-pink-a3);
  transform: translateZ(2rem);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.segments .info .btn::before {
  position: absolute;
  display: block;
  content: '';
  height: calc(100% - 1rem);
  width: calc(100% - 1rem);
  transform: translateZ(-2rem);
  border-radius: 5rem;
  left: 0.5rem;
  top: 0.8rem;
  box-shadow: 0 0 0.6rem 0.6rem var(--color-pink-a3);
  background-color: var(--color-pink-a3);
  z-index: -1;
}

.segments .info .btn:hover {
  transform: translateZ(2.5rem);
  box-shadow: 0 10px 30px -10px var(--color-pink-a3);
}

.segments .info .btn.btn-even {
  left: 0;
  right: auto;
  border-radius: 0 1rem;
  background-image: linear-gradient(to right, var(--color-orange) 0, var(--color-pink) 100%);
}

.segments > .item.even {
  flex-direction: row-reverse;
}

.segments > .item.even .info {
  padding: 1rem 0 3rem 1.5rem;
}

.segments > .item.even .info .meta {
  justify-content: flex-start;
}

.segments > .item.even .info .meta.footer {
  left: auto;
  right: 0.5rem;
  justify-content: flex-start;
}

@keyframes slideUpBigIn {
  0% {
    opacity: 0;
    transform: translateY(80px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 991px) {
  .segments > .item {
    flex-direction: column;
    height: auto;
    min-height: auto;
    max-height: none;
  }

  .segments .cover {
    width: 100%;
    height: 14rem;
    margin: auto;
    clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
    border-radius: 0.625rem 0.625rem 0 0;
  }

  .segments .cover-even {
    width: 100%;
    margin: auto;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 92%);
    border-radius: 0.625rem 0.625rem 0 0;
  }

  .segments .info {
    width: 100%;
    height: auto;
    padding: 0 1rem 3rem;
  }

  .segments .info .meta .item:not(:first-child) {
    display: none;
  }

  .segments > .item.even {
    flex-direction: column;
  }

  .segments > .item.even .info {
    padding: 0 1rem 3rem;
  }
}
</style>

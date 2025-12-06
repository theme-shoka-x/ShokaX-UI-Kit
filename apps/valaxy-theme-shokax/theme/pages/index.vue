<script setup lang="ts">
import { chunk } from 'es-toolkit'
import DividerLine from 'shokax-uikit/src/components/DividerLine.vue'

import { usePagination, usePostList, useSiteConfig } from 'valaxy'
import ShokaxPostSegments from '../components/ShokaxPostSegments.vue'

const posts = usePostList()
const siteConfig = useSiteConfig()

const topPosts = posts.value.filter(post => post.top)

const paginatedPosts = chunk(posts.value, siteConfig.value.pageSize)

const { curPage, showPage, getTo, totalPages, prevTo, showPrev, nextTo, showNext, surLen } = usePagination({ total: posts.value.length, pageSize: siteConfig.value.pageSize })
</script>

<template>
  <div class="index wrap">
    <DividerLine content="置顶文章" />
    <ShokaxPostSegments :post-list="topPosts" />
    <DividerLine content="文章列表" />
    <ShokaxPostSegments :post-list="paginatedPosts[curPage - 1]" />
  </div>
  <nav class="pagination" aria-label="分页导航">
    <div class="inner">
      <RouterLink v-if="showPrev" class="prev page-number" :to="prevTo" aria-label="上一页">
        <span class="i-ri-arrow-left-s-line" aria-hidden="true" />
      </RouterLink>
      <template v-for="i in totalPages" :key="i">
        <RouterLink
          v-if="showPage(i)"
          :key="`page-${i}`"
          class="page-number"
          :class="{ active: curPage === i }"
          :to="getTo(i)"
        >
          {{ i }}
        </RouterLink>
        <span v-else-if="i === curPage - surLen" :key="`prev-space-${i}`" class="space" aria-hidden="true">
          ...
        </span>
        <span v-else-if="i === curPage + surLen" :key="`next-space-${i}`" class="space" aria-hidden="true">
          ...
        </span>
      </template>
      <RouterLink v-if="showNext" class="next page-number" :to="nextTo" aria-label="下一页">
        <span class="i-ri-arrow-right-s-line" aria-hidden="true" />
      </RouterLink>
    </div>
  </nav>
</template>

<route lang="yaml">
# default is home
meta:
  layout: home
</route>

<style scoped>
.pagination {
  width: 100%;
  padding: 1.25rem 3.125rem;
  text-align: center;
  display: inline-block;
  color: var(--grey-5);
}

.pagination .inner {
  display: inline-block;
  width: auto;
  border-radius: 0.9375rem;
}

.pagination .page-number,
.pagination .prev,
.pagination .next {
  display: inline-block;
  margin: 0 0.5rem;
  padding: 0 0.75rem;
  position: relative;
  border-radius: 0.3125rem;
  transition: all 0.2s ease-in-out;
  color: inherit;
}

.pagination .page-number:hover,
.pagination .prev:hover,
.pagination .next:hover {
  color: var(--grey-0);
  background-image: linear-gradient(to right, var(--color-pink) 0, var(--color-orange) 100%);
  box-shadow: 0 0 0.75rem var(--color-pink-a3);
}

.pagination .space {
  display: inline-block;
  margin: 0;
  padding: 0;
  position: relative;
}

.pagination .prev {
  margin-left: 0;
}

.pagination .next {
  margin-right: 0;
}

.pagination .page-number.active {
  color: var(--grey-0);
  background-image: linear-gradient(to right, var(--color-pink) 0, var(--color-orange) 100%);
  box-shadow: 0 0 0.75rem var(--color-pink-a3);
}

.pagination .page-number.active:hover {
  box-shadow: 0 0 0.3125rem var(--primary-color);
}

.pagination .page-number span,
.pagination .prev span,
.pagination .next span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .pagination {
    padding: 1.25rem 0.625rem;
  }

  .pagination .page-number,
  .pagination .prev,
  .pagination .next {
    margin: 0 0.3125rem;
  }
}
</style>

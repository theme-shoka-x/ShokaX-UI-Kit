<script setup lang="ts">
import { chunk } from 'es-toolkit'
import DividerLine from 'shokax-uikit/src/components/DividerLine.vue'
import SitePanel from 'shokax-uikit/src/components/sidebar/SitePanel.vue'
import { usePagination, usePostList, useSiteConfig } from 'valaxy'
import PostSegments from '../components/PostSegments.vue'

import { useThemeConfig } from '../composables/config'

const posts = usePostList()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const topPosts = posts.value.filter(post => post.top)

const paginatedPosts = chunk(posts.value, siteConfig.value.pageSize)

const { curPage, showPage, getTo, totalPages, prevTo, showPrev, nextTo, showNext, surLen } = usePagination({ total: posts.value.length, pageSize: siteConfig.value.pageSize })
</script>

<template>
  <SitePanel
    :sidebar-config="{
      author: {
        name: siteConfig.author.name,
        avatar: siteConfig.author.avatar,
        description: siteConfig.author.intro || '',
      },
      socialLinks: siteConfig.social,
      navbar: themeConfig.nav,
    }"
  />
  <div class="index wrap">
    <DividerLine content="置顶文章" />
    <PostSegments :post-list="topPosts" />
    <DividerLine content="文章列表" />
    <PostSegments :post-list="paginatedPosts[curPage - 1]" />
  </div>
  <div class="pagination">
    <RouterLink v-if="showPrev" :to="prevTo">
      <div class="i-ri-arrow-left-s-line" />
    </RouterLink>
    <template v-for="i in totalPages">
      <RouterLink
        v-if="showPage(i)" :key="i" class="page-number"
        :class="curPage === i && 'active'"
        :to="getTo(i)"
      >
        {{ i }}
      </RouterLink>
      <span v-else-if="i === curPage - surLen" :key="`prev-space-${i}`" class="space" disabled>
        ...
      </span>
      <span v-else-if="i === curPage + surLen" :key="`next-space-${i}`" class="space" disabled>
        ...
      </span>
    </template>
    <RouterLink v-if="showNext" :to="nextTo">
      <div class="i-ri-arrow-right-s-line" />
    </RouterLink>
  </div>
</template>

<route lang="yaml">
# default is home
meta:
  layout: home
</route>

<script lang="ts" setup>
import Brand from 'shokax-uikit/src/components/header/Brand.vue'
import Cover from 'shokax-uikit/src/components/header/Cover.vue'
import NavBar from 'shokax-uikit/src/components/navbar/NavBar.vue'
import Sidebar from 'shokax-uikit/src/components/sidebar/Sidebar.vue'
import ToolBar from 'shokax-uikit/src/components/toolbar/ToolBar.vue'
import Waves from 'shokax-uikit/src/components/waves/Waves.vue'
import { _PAGE_WAVES_ELEMENT } from 'shokax-uikit/src/symbols.js'
import { usePostList, useSiteConfig } from 'valaxy'
import { computed, provide, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeConfig } from '../composables'
import ShokaxFooter from './ShokaxFooter.vue'

const themeConfig = useThemeConfig()
const siteConfig = useSiteConfig()
const posts = usePostList()
const waves = useTemplateRef('waves')
const { t } = useI18n()

function normalizeTextList(entry: unknown): string[] {
  if (!entry)
    return []
  if (Array.isArray(entry))
    return entry.flatMap(normalizeTextList)
  if (typeof entry === 'string')
    return [entry]
  if (typeof entry === 'object' && 'name' in (entry as Record<string, any>))
    return [(entry as { name: string }).name]
  return []
}

const sidebarState = computed(() => {
  const categorySet = new Set<string>()
  const tagSet = new Set<string>()

  posts.value?.forEach((post: Record<string, unknown>) => {
    normalizeTextList(post.categories).forEach(cat => categorySet.add(cat))
    normalizeTextList(post.tags).forEach(tag => tagSet.add(tag))
  })

  return {
    posts: {
      count: posts.value?.length ?? 0,
      title: t('state.posts', 'Posts'),
      href: '/archives/',
    },
    categories: {
      count: categorySet.size,
      title: t('state.categories', 'Categories'),
      href: '/categories/',
    },
    tags: {
      count: tagSet.size,
      title: t('state.tags', 'Tags'),
      href: '/tags/',
    },
  }
})

provide('linkElName', 'a')
provide(_PAGE_WAVES_ELEMENT, waves)
</script>

<template>
  <div class="antialiased">
    <Brand :is-home="true" art-board-content="111" headline-content="222" />

    <NavBar :click-toggle-callback="() => void 0" :name="siteConfig.title" :nav-links="themeConfig.nav" />
    <div class="h-100" />
    <Cover :src="themeConfig.cover" />
    <Waves ref="waves" />
    <div class="m-a w-90vw flex flex-row">
      <Sidebar
        :author="{
          name: siteConfig.author.name,
          avatar: siteConfig.author.avatar,
          description: siteConfig.author.intro || '',
        }"
        :state="sidebarState"
        :navbar="themeConfig.nav"
        :social-links="siteConfig.social"
      />

      <main style="width: 72.5rem;">
        <slot>
          <RouterView v-slot="{ Component }">
            <component :is="Component">
              <template #main-header>
                <slot name="main-header" />
              </template>

              <template #main-header-after>
                <slot name="main-header-after" />
              </template>
              <template #main>
                <slot name="main" />
              </template>
              <template #main-content>
                <slot name="main-content" />
              </template>
              <template #main-content-after>
                <slot name="main-content-after" />
              </template>
              <template #main-nav-before>
                <slot name="main-nav-before" />
              </template>
              <template #main-nav-after>
                <slot name="main-nav-after" />
              </template>
              <template #aside-custom>
                <slot name="aside-custom" />
              </template>
              <template #footer>
                <slot name="footer" />
              </template>
            </component>
          </RouterView>
        </slot>
      </main>
    </div>

    <ToolBar :show-contents-click-callback="() => void 0" />

    <ShokaxFooter />
  </div>
</template>

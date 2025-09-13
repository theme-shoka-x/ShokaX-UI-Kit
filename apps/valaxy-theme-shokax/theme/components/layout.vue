<script lang="ts" setup>
import Brand from 'shokax-uikit/src/components/header/Brand.vue'
import Cover from 'shokax-uikit/src/components/header/Cover.vue'
import NavBar from 'shokax-uikit/src/components/navbar/NavBar.vue'
import Sidebar from 'shokax-uikit/src/components/sidebar/Sidebar.vue'
import ToolBar from 'shokax-uikit/src/components/toolbar/ToolBar.vue'
import Waves from 'shokax-uikit/src/components/waves/Waves.vue'
import { _PAGE_WAVES_ELEMENT } from 'shokax-uikit/src/symbols.js'
import { useSiteConfig } from 'valaxy'
import { provide, useTemplateRef } from 'vue'
import { useThemeConfig } from '../composables/config'

const themeConfig = useThemeConfig()
const siteConfig = useSiteConfig()
const waves = useTemplateRef('waves')

provide('linkElName', 'a')
provide(_PAGE_WAVES_ELEMENT, waves)
</script>

<template>
  <div class="antialiased">
    <Brand :is-home="true" art-board-content="111" headline-content="222" />

    <NavBar :nav-links="themeConfig.nav" :click-toggle-callback="() => void 0" :name="siteConfig.title" />
    <div class="h-100" />
    <Cover :src="themeConfig.cover" />
    <Waves ref="waves" />
    <div class="m-a w-80vw flex flex-row">
      <Sidebar
        class="w-72 flex-shrink-0 overflow-x-hidden overflow-y-auto p-2"
        :author="{
          name: siteConfig.author.name,
          avatar: siteConfig.author.avatar,
          description: siteConfig.author.intro || '',
        }"
        :social-links="siteConfig.social"
        :navbar="themeConfig.nav"
      />

      <main>
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

    <!-- <StarterFooter>
      <slot name="footer" />
    </StarterFooter> -->
  </div>
</template>

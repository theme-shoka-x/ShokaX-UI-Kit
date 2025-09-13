<script lang="ts" setup>
import Cover from 'shokax-uikit/src/components/header/Cover.vue'
import NavBar from 'shokax-uikit/src/components/navbar/NavBar.vue'
import ToolBar from 'shokax-uikit/src/components/toolbar/ToolBar.vue'
import Waves from 'shokax-uikit/src/components/waves/Waves.vue'
import { useSiteConfig } from 'valaxy'
import { provide } from 'vue'
import { useThemeConfig } from '../composables/config'

const themeConfig = useThemeConfig()
const siteConfig = useSiteConfig()

provide('linkElName', 'a')
console.log(themeConfig.value.nav)
</script>

<template>
  <div class="antialiased">
    <NavBar :nav-links="themeConfig.nav" :click-toggle-callback="() => void 0" :name="siteConfig.title" />

    <Cover :src="themeConfig.cover" />
    <Waves />

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

    <ToolBar :show-contents-click-callback="() => void 0" />

    <!-- <StarterFooter>
      <slot name="footer" />
    </StarterFooter> -->
  </div>
</template>

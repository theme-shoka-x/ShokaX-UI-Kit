<script lang="ts" setup>
import NavBar from 'shokax-uikit/src/components/navbar/NavBar.vue';
import Cover from 'shokax-uikit/src/components/header/Cover.vue';
import Waves from 'shokax-uikit/src/components/waves/Waves.vue';
import ToolBar from 'shokax-uikit/src/components/toolbar/ToolBar.vue';
import { useThemeConfig,useSiteConfig } from '../composables/config';
import { provide } from 'vue';

const themeConfig = useThemeConfig()
const siteConfig = useSiteConfig()

provide("linkElName", "AppLink")
</script>

<template>
  <div class="antialiased">
    <NavBar :nav-links="themeConfig.nav" :click-toggle-callback="()=>void 0" :name="siteConfig.title"></NavBar>

    <Cover :src="themeConfig.cover"></Cover>
    <Waves></Waves>

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

    <ToolBar :show-contents-click-callback="()=>void 0"></ToolBar>

    <StarterFooter>
      <slot name="footer" />
    </StarterFooter>
  </div>
</template>

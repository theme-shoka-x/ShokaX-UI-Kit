<script setup lang="ts">
import type { SidebarConfig } from './types'
import Author from './Author.vue'
import NavBar from './NavBar.vue'
import QuickBtns from './QuickBtns.vue'
import SocialLinks from './SocialLinks.vue'
import State from './State.vue'

defineProps<{
  sidebarConfig: SidebarConfig
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4 space-y-4">
    <Author :src="sidebarConfig.author.avatar" :name="sidebarConfig.author.name" :desc="sidebarConfig.author.description" />
    <State v-if="sidebarConfig.state" :state="sidebarConfig.state" />
    <SocialLinks :social-links="sidebarConfig.socialLinks" />
    <NavBar :nav-links="sidebarConfig.navbar" />
  </div>

  <QuickBtns />
</template>

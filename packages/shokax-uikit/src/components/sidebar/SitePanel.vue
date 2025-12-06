<script setup lang="ts">
import type { SidebarConfig } from './types'
import Author from './Author.vue'
import NavBar from './NavBar.vue'
import SocialLinks from './SocialLinks.vue'
import State from './State.vue'

defineProps<{
  sidebarConfig: SidebarConfig
}>()
</script>

<template>
  <div class="panel overview">
    <Author :src="sidebarConfig.author.avatar" :name="sidebarConfig.author.name" :desc="sidebarConfig.author.description" />
    <State v-if="sidebarConfig.state" :state="sidebarConfig.state" />
    <SocialLinks :social-links="sidebarConfig.socialLinks" />
    <NavBar :nav-links="sidebarConfig.navbar" />
  </div>
</template>

<style lang="css" scoped>
.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}
</style>

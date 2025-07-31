<script setup lang="ts">
import Author from './Author.vue';
import NavBar from './NavBar.vue';
import QuickBtns from './QuickBtns.vue';
import SocialLinks from './SocialLinks.vue';
import State from './State.vue';
import type { SidebarConfig } from './types';

defineProps<{
  sidebarConfig: SidebarConfig
}>()
</script>

<template>
  <Author :src="sidebarConfig.author.avatar" :name="sidebarConfig.author.name" :desc="sidebarConfig.author.description"></Author>
  <State :state="sidebarConfig.state"></State>
  <SocialLinks :socialLinks="sidebarConfig.socialLinks"></SocialLinks>
  <NavBar :nav-links="sidebarConfig.navbar"></NavBar>
  <QuickBtns></QuickBtns>
</template>
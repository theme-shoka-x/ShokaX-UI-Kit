<script setup lang="ts">
import type { SocialLink } from './types'
import LinkElement from '../LinkElement.vue'

defineProps<{
  socialLinks: SocialLink[]
}>()
</script>

<template>
  <div class="mt-[0.9375rem] flex flex-row flex-wrap justify-center gap-2 text-center">
    <template v-for="socialLink in socialLinks" :key="socialLink.name">
      <LinkElement :href="socialLink.link">
        <div class="relative inline-block h-[1.5rem] w-[1.5rem] overflow-hidden rounded-[38%] text-center leading-[1.875rem]">
          <div :class="`${socialLink.icon}`" :style="{ color: socialLink.color }" />
        </div>
      </LinkElement>
    </template>
  </div>
</template>

<style scoped>

</style>

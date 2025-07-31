<script setup lang="ts">
import type { SidebarState } from './types'
import LinkElement from '../LinkElement.vue'

defineProps<{state: SidebarState}>()
</script>

<template>
  <div class="state mt-2.5 flex justify-center overflow-hidden whitespace-nowrap text-center leading-[1.4]">
    <LinkElement :href="state.posts.href" class="border-b-0 px-[0.9375rem]">
      <span class="block text-center text-xl font-semibold">
        {{ state.posts.count }}
      </span>
      <span class="text-sm">
        {{ state.posts.title }}
      </span>
    </LinkElement>
    <LinkElement :href="state.tags.href" class="border-b-0 px-[0.9375rem]">
      <span class="block text-center text-xl font-semibold">
        {{ state.categories.count }}
      </span>
      <span class="text-sm">
        {{ state.categories.title }}
      </span>
    </LinkElement>
    <LinkElement :href="state.tags.href" class="border-b-0 px-[0.9375rem]">
      <span class="block text-center text-xl font-semibold">
        {{ state.tags.count }}
      </span>
      <span class="text-sm">
        {{ state.tags.title }}
      </span>
    </LinkElement>
  </div>
</template>

<style scoped>
.state > *:not(:first-child) {
  border-left: 0.0625rem solid var(--grey-4);
}
</style>

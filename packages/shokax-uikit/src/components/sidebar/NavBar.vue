<script lang="ts" setup>
import type { NavItemType } from '../navbar/NavTypes'
import { useBrowserLocation } from '@vueuse/core'
import DropboxItem from './navbar/DropboxItem.vue'
import NavItem from './navbar/NavItem.vue'

defineProps<{
  navLinks: NavItemType[]
}>()

const location = useBrowserLocation()

function isActive(href: string) {
  return location.value.pathname === href
}
</script>

<template>
  <ul class="m-0 w-full list-none bg-transparent p-5">
    <template v-for="item in navLinks" :key="item.href">
      <li class="mb-2.5 block w-full rounded-3.75 color-[var(--grey-5)] line-height-12">
        <NavItem v-if="!item.dropbox" :class="{ active: isActive(item.href) }" :item="item" />
        <DropboxItem v-else :item="item" />
      </li>
    </template>
  </ul>
</template>

<style scoped>
.active {
  color: var(--grey-0);
  background-image: linear-gradient(to right, var(--color-pink) 0, var(--color-orange) 100%);
  box-shadow: 0 0 0.75rem var(--color-pink-a3);
  transition: all 0.3s ease-in-out;
}

.active:hover {
  box-shadow: 0 0 0.75rem var(--color-pink);
  color: var(--grey-0);
}

:deep(.icon-nav) {
  margin-right: 0.625rem;
}
</style>

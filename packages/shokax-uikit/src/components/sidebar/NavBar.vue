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

function isSubItemsActive(item: NavItemType) {
  return Boolean(item.dropboxItems?.some(subItem => location.value.pathname === subItem.href))
}
</script>

<template>
  <div class="menu">
    <ul>
      <template v-for="item in navLinks" :key="item.href">
        <NavItem
          v-if="!item.dropbox"
          :item="item"
          :active="isActive(item.href)"
        />
        <DropboxItem v-else :item="item" :active="isActive(item.href)" :expand="isSubItemsActive(item)" />
      </template>
    </ul>
  </div>
</template>

<style scoped>
.menu {
  padding: 1.25rem;
  margin: 0;
  background-color: transparent;
  width: 100%;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu :deep(.item) {
  border-radius: 0.9375rem;
  margin-bottom: 0.625rem;
  display: block;
  color: var(--grey-5);
  transition: all 0.2s ease-in-out;
}

.menu :deep(.item a) {
  color: inherit;
  display: block;
  line-height: 3;
}

.menu :deep(.item .submenu) {
  display: none;
  padding: 0;
}

.menu :deep(.item:hover) {
  background-color: rgba(0, 0, 0, 0.1);
  color: inherit;
}

.menu :deep(.item.dropdown:hover .submenu),
.menu :deep(.item.expand .submenu) {
  display: block;
}

.menu :deep(.item .ic) {
  margin-right: 0.625rem;
}

.menu :deep(.item.active) {
  color: var(--grey-0);
  background-image: linear-gradient(to right, var(--color-pink) 0, var(--color-orange) 100%);
  box-shadow: 0 0 0.75rem var(--color-pink-a3);
}

.menu :deep(.item.active:hover) {
  box-shadow: 0 0 0.75rem var(--color-pink);
  color: var(--grey-0);
}

.menu :deep(.item.expand) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>

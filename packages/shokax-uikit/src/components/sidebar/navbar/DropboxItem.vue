<script lang="ts" setup>
import type { NavItemType } from '@uikit/components/navbar/NavTypes'
import LinkElement from '@uikit/components/LinkElement.vue'
import { useBrowserLocation, useElementHover } from '@vueuse/core'
import { useTemplateRef } from 'vue'

defineProps<{
  item: NavItemType
}>()

const linkEl = useTemplateRef<HTMLAnchorElement>('linkEl')
const hovering = useElementHover(linkEl)

const location = useBrowserLocation()

function isActive(href: string) {
  return location.value.pathname === href
}

function isSubItemsActive(item: NavItemType) {
  let flag = false
  item.dropboxItems?.forEach((subItem) => {
    if (location.value.pathname === subItem.href) {
      flag = true
    }
  })
  return flag
}
</script>

<template>
  <LinkElement ref="linkEl" :href="item.href">
    <div v-if="item.icon" :class="item.icon" class="inline-block align-text-bottom" />
    {{ item.text }}
  </LinkElement>
  <Transition name="slide-down">
    <ul v-show="hovering || isSubItemsActive(item)">
      <li v-for="subItem in item.dropboxItems" :key="subItem.href">
        <LinkElement :class="{ active: isActive(subItem.href) }" :href="subItem.href">
          <div v-if="subItem.icon" :class="subItem.icon" class="inline-block align-text-bottom" />
          {{ subItem.text }}
        </LinkElement>
      </li>
    </ul>
  </Transition>
</template>

<style lang="css" scoped>
@keyframes slideDownIn {
  0% {
    opacity: 0;
    transform: translateY(-18px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-down-enter-active {
  animation: slideDownIn 0.3s ease-out forwards;
}

.slide-down-leave-active {
  animation: slideDownIn 0.3s ease-out reverse forwards;
}
</style>

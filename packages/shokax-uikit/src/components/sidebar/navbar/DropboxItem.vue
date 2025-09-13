<script setup lang="ts">
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
    <i v-if="item.icon" :class="item.icon" />
    {{ item.text }}
  </LinkElement>
  <Transition>
    <ul v-show="hovering || isSubItemsActive(item)">
      <li v-for="subItem in item.dropboxItems" :key="subItem.href">
        <LinkElement :href="subItem.href" :class="{ active: isActive(subItem.href) }">
          <i v-if="subItem.icon" :class="subItem.icon" />
          {{ subItem.text }}
        </LinkElement>
      </li>
    </ul>
  </Transition>
</template>

<style lang="css" scoped>

</style>

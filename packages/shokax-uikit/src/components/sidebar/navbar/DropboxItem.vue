<script lang="ts" setup>
import type { NavItemType } from '@uikit/components/navbar/NavTypes'
import LinkElement from '@uikit/components/LinkElement.vue'
import { useBrowserLocation, useElementHover } from '@vueuse/core'
import { useTemplateRef } from 'vue'

defineProps<{
  item: NavItemType
  active?: boolean
  expand?: boolean
}>()

const itemEl = useTemplateRef<HTMLLIElement>('itemEl')
const hovering = useElementHover(itemEl)

const location = useBrowserLocation()

function isActive(href: string) {
  return location.value.pathname === href
}
</script>

<template>
  <li
    ref="itemEl"
    class="item dropdown"
    :class="{ expand: hovering || expand, active }"
  >
    <LinkElement :href="item.href">
      <i v-if="item.icon" :class="item.icon" />
      {{ item.text }}
    </LinkElement>
    <Transition name="slide-down">
      <ul v-show="hovering || expand" class="submenu">
        <li v-for="subItem in item.dropboxItems" :key="subItem.href" class="item" :class="{ active: isActive(subItem.href) }">
          <LinkElement :href="subItem.href">
            <i v-if="subItem.icon" :class="subItem.icon" />
            {{ subItem.text }}
          </LinkElement>
        </li>
      </ul>
    </Transition>
  </li>
</template>

<style lang="css" scoped>
i {
  display: inline-block;
}

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

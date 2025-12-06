<script lang="ts" setup>
import type { NavItemType } from '@uikit/components/navbar/NavTypes'
import LinkElement from '@uikit/components/LinkElement.vue'

defineProps<{
  item: NavItemType
  active?: boolean
}>()
</script>

<template>
  <li class="item" :class="{ active }">
    <LinkElement :href="item.href">
      <i v-if="item.icon" class="ic" :class="item.icon" />
      {{ item.text }}
    </LinkElement>
  </li>
</template>

<script setup lang="ts">
import type { NavItemType } from '@uikit/components/navbar/NavTypes'
import LinkElement from '@uikit/components/LinkElement.vue'

defineProps<{
  item: NavItemType
}>()
</script>

<template>
  <LinkElement :href="item.href">
    <i :class="item.icon" />
    {{ item.text }}
  </LinkElement>
</template>

<script lang="ts" setup>
import type { NavItemType } from '@uikit/components/navbar/NavTypes'
import LinkElement from '@uikit/components/LinkElement.vue'

defineProps<{
  item: NavItemType
}>()
</script>

<template>
  <LinkElement :href="item.href" class="rounded-3.75">
    <div :class="item.icon" class="inline-block align-text-bottom" />
    {{ item.text }}
  </LinkElement>
</template>

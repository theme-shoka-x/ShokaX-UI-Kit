<script setup lang="ts">
import type { NavItemType } from '@/components/navbar/NavTypes';
import LinkElement from '@/components/LinkElement.vue';

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
<script setup lang="ts">
import LinkElement from '../linkElement.vue'
import NavItem from './NavItem.vue'

const props = defineProps<{
  href?: string
  text?: string
  icon?: string
}>()

const linkHref = props.href || '#'
</script>

<template>
  <NavItem>
    <LinkElement :href="linkHref">
      <div v-if="icon" :class="icon" class="inline-block vertical-text-bottom text-xl" />
      {{ text }}
    </LinkElement>
  </NavItem>
</template>

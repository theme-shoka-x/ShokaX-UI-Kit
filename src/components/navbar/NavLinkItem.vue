<script setup lang="ts">
import NavItem from './NavItem.vue'

const props = defineProps<{
  href?: string
  text?: string
  icon?: string
  linkComponent?: string
}>()

const linkComponent = props.linkComponent || 'a'
const linkHref = props.href || '#'
</script>

<template>
  <NavItem>
    <component
      :is="linkComponent" :href="linkHref" :to="linkHref"
      class="cursor-pointer break-words border-none color-[currentColor] decoration-none outline-0"
    >
      <div v-if="icon" :class="icon" class="inline-block vertical-text-bottom text-xl" />
      {{ text }}
    </component>
  </NavItem>
</template>

<script setup lang="ts">
import { inject } from 'vue'

defineProps<{
  href: string
}>()
</script>

<template>
  <component
    :is="inject('linkElName', 'a')" class="block cursor-pointer break-words border-none color-[currentColor] decoration-none outline-0"
    :href="href" :to="href"
  >
    <slot />
  </component>
</template>

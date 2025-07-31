<script setup lang="ts">
import { useWindowScroll, useWindowSize } from '@vueuse/core'

const { y } = useWindowScroll({
  behavior: 'smooth',
})

const { height } = useWindowSize()
</script>

<template>
  <ul>
    <li v-show="false">
      <i class="i-ri-arrow-left-s-line" />
    </li>
    <li @click="y = 0">
      <i class="i-ri-arrow-up-line" />
    </li>
    <li @click="y = height">
      <i class="i-ri-arrow-down-line" />
    </li>
    <li v-show="false">
      <i class="i-ri-arrow-right-s-line" />
    </li>
  </ul>
</template>

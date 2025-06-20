<script setup lang="ts">
import { usePlayingStore } from '@/stores/usePlayingStore'

const playingStore = usePlayingStore()

function changeMode() {
  if (playingStore.mode === 'order') {
    playingStore.mode = 'random'
  }
  else if (playingStore.mode === 'random') {
    playingStore.mode = 'loop'
  }
  else {
    playingStore.mode = 'order'
  }
}
</script>

<template>
  <div
    class="w-18% text-xl"
    :class="{ 'i-ri:order-play-line': playingStore.mode === 'order',
              'i-ri:shuffle-line': playingStore.mode === 'random',
              'i-ri:loop-right-line': playingStore.mode === 'loop' }"
    @click="changeMode"
  />
</template>

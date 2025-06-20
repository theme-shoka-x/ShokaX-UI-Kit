<script setup lang="ts">
import { useRefreshPlayStateTrigger } from '@/composables/useRefreshPlayStateTrigger'
import { usePlayingStore } from '@/stores/usePlayingStore'

const playingStore = usePlayingStore()
const { trigger } = useRefreshPlayStateTrigger()

function playPause() {
  playingStore.toggle()
  trigger()
}
</script>

<template>
  <div
    class="w-18% text-4xl"
    :class="{ 'i-ri:play-circle-fill': !playingStore.playing, 'i-ri:pause-circle-fill': playingStore.playing }"
    @click="playPause"
  />
</template>

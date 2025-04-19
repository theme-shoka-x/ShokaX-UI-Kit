<script setup lang="ts">
import { computed } from 'vue'
import { usePlayingStore } from '../playingStore'
import MusicLRC from './info/MusicLRC.vue'

const playingStore = usePlayingStore()
const title = computed(() => {
  const currentPlaylist = playingStore.getCurrentPlaylist()
  if (currentPlaylist && currentPlaylist.getCurrentSong()) {
    return currentPlaylist.getCurrentSong().name
  }
  return ''
})
const artist = computed(() => {
  const currentPlaylist = playingStore.getCurrentPlaylist()
  if (currentPlaylist && currentPlaylist.getCurrentSong()) {
    return currentPlaylist.getCurrentSong().artist
  }
  return ''
})
</script>

<template>
  <div class="info ml-2.5 w-full flex flex-col overflow-hidden text-ellipsis p-2.5">
    <h4 class="m-0 max-h-12 overflow-hidden text-ellipsis p-0">
      {{ title }}
    </h4>
    <span class="text-3"> {{ artist }} </span>
    <Suspense>
      <MusicLRC />
    </Suspense>
  </div>
</template>

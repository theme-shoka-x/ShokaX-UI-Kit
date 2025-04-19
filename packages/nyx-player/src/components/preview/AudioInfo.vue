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
  <div class="w-full flex flex-col overflow-hidden text-ellipsis">
    <Transition name="fade" mode="out-in">
      <h4 :key="title" class="m-0 max-h-12 flex justify-center overflow-hidden text-ellipsis p-0">
        {{ title }}
      </h4>
    </Transition>
    <Transition name="fade" mode="out-in">
      <span :key="artist" class="flex justify-center text-3"> {{ artist }} </span>
    </Transition>
    <Suspense>
      <MusicLRC />
    </Suspense>
  </div>
</template>

<style lang="css" scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.fade-enter-active {
  animation: fadeIn 1s;
}
</style>

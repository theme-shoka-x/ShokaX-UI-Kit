<script setup lang="ts">
import { usePlayingStore } from '../playingStore'

const playingStore = usePlayingStore()

async function backward() {
  playingStore.currentTime = 0
  if (playingStore.mode === 'order') {
    playingStore.getCurrentPlaylist().getPrevSong()
  }
  else {
    const plist = playingStore.getCurrentPlaylist()
    if (plist.index === plist.lastIdx) {
      playingStore.getCurrentPlaylist().getPrevSong()
    }
    else {
      plist.index = plist.lastIdx
    }
  }
}
</script>

<template>
  <div class="i-ri:skip-back-line w-18% text-xl" @click="backward" />
</template>

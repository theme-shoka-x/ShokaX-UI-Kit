<script setup lang="ts">
import type { PlayList } from '@/utils/metingapi/playlist'
import { usePlayingStore } from '@/stores/usePlayingStore'

const playingStore = usePlayingStore()

async function backward() {
  playingStore.currentTime = 0
  if (playingStore.mode === 'order') {
    playingStore.currentPlaylist?.getPrevSong()
  }
  else {
    const plist = playingStore.currentPlaylist as PlayList
    if (plist.index === plist.lastIdx) {
      playingStore.currentPlaylist?.getPrevSong()
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

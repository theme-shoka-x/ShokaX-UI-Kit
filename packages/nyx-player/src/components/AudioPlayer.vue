<script setup lang="ts">
import type { Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { throttle } from 'es-toolkit'
import { computed, inject, onMounted, useTemplateRef } from 'vue'
import { useRefreshPlayStateTrigger } from '@/composables/useRefreshPlayStateTrigger'
import { usePlayingStore } from '@/stores/usePlayingStore'
import { PlayList } from '@/utils/metingapi/playlist'
import { ConcurrencyPool } from '@/utils/concurrency-pool'
import AudioController from './controller/AudioController.vue'
import PlayListTabs from './playlist/PlayListTabs.vue'
import AudioPreview from './preview/AudioPreview.vue'

const pool = new ConcurrencyPool(3) // 限制并发请求数为3

const props = defineProps<{
  showPlayer: boolean
  playlistURLs: { url: string, name: string }[]
}>()

const playingStore = usePlayingStore()
const audioPlayer = useTemplateRef<HTMLAudioElement>('audio')
const { trigger, onTrigger } = useRefreshPlayStateTrigger()

onMounted(() => {
  onTrigger(async () => {
    if (audioPlayer.value !== null) {
      if (playingStore.playing) {
        if (playingStore.mode === 'loop') {
          audioPlayer.value.loop = true
        }
        await audioPlayer.value.play()
      }
      else {
        audioPlayer.value.pause()
      }
    }
  })
})

if (playingStore.playlists.length === 0) {
  const initPlaylist = async (url: { url: string; name: string }, index: number) => {
    const playlist = new PlayList(url.url, url.name, index)
    try {
      playlist.parserURL()
      await playlist.fetchPlaylist()
      playingStore.playlists[index] = playlist
    } catch (error) {
      console.error(`Failed to initialize playlist ${url.name}:`, error)
      // Create a placeholder playlist that can be retried later
      playingStore.playlists[index] = playlist
    }
  }

  // Pre-allocate array to maintain order
  playingStore.playlists = new Array(props.playlistURLs.length)
  
  // Queue all playlists for initialization through the concurrency pool
  await Promise.allSettled(
    props.playlistURLs.map((url, index) =>
      pool.add(() => initPlaylist(url, index))
    )
  )
}

const updateCurrentTime = throttle((event: Event) => {
  const currentTime = (event.target as HTMLAudioElement).currentTime
  if (playingStore.lastPage === window.location.pathname) {
    playingStore.setCurrentTime(currentTime)
  }
  else {
    (event.target as HTMLAudioElement).currentTime = playingStore.currentTime
    playingStore.lastPage = window.location.pathname
  }
  playingStore.songDuration = (event.target as HTMLAudioElement).duration || playingStore.songDuration
}, 250)

const src = computed(() => {
  return playingStore.currentSong?.url ?? ''
})

const target = useTemplateRef('target')

// 注入元素 Ref
const showBtnEl = inject<Ref<HTMLElement | null>>('showBtnEl')
const playBtnEl = inject<Ref<HTMLElement | null>>('playBtnEl')

// 在 onClickOutside 的 ignore 中使用注入的 Ref
onClickOutside(target, () => playingStore.showPlayer = false, { ignore: [showBtnEl, playBtnEl] })
</script>

<template>
  <Transition name="slideRight">
    <div v-show="playingStore.showPlayer" ref="target" class="player-info border-radius-0.8rem fixed z-9 overflow-hidden rounded-xl">
      <AudioPreview />
      <AudioController />
      <audio ref="audio" :src="src" :muted="!playingStore.enableVolume" @timeupdate="updateCurrentTime" @canplay="trigger()" />
      <PlayListTabs />
      <div class="absolute right-4 top-3 cursor-pointer text-3.25 hover:color-[var(--hover-btn)]" @click="playingStore.showPlayer = false">
        <div class="i-ri-close-line text-5" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes slideRightIn {
  0% {
    opacity: 0;
    transform: translateX(50%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideRightOut {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(50%);
  }
}

.slideRight-enter-active {
  animation: slideRightIn 0.5s;
}

.slideRight-leave-active {
  animation: slideRightOut 0.5s;
}

.close {
  color: var(--close-btn);
}

.player-info {
  box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
  background: var(--player-background);
  -webkit-backdrop-filter: blur(0.625rem);
  backdrop-filter: blur(0.625rem);
  width: 50vw;
  max-width: 25rem;
  right: 3.5rem;
  padding-bottom: 1rem;
  bottom: 1rem;
}
</style>

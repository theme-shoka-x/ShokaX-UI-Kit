<script setup lang="ts">
import type { Preset } from './presets'
import { useStyleTag } from '@vueuse/core'
import { onMounted, provide, watch } from 'vue'
import AudioPlayer from './components/AudioPlayer.vue'
import { usePlayingStore } from './components/playingStore'
import { presets } from './presets'

const props = defineProps<{
  urls: { url: string, name: string }[]
  showBtn: string
  playBtn?: string
  darkModeTarget?: string
  preset?: string
  styles?: Preset
}>()
const playingStore = usePlayingStore()
provide('showBtn', props.showBtn)
provide('playBtn', props.playBtn)

onMounted(() => {
  const showBtnEl = document.querySelector(props.showBtn) as HTMLElement

  if (showBtnEl) {
    showBtnEl.addEventListener('click', () => {
      playingStore.showPlayer = !playingStore.showPlayer
    })

    watch(() => playingStore.showPlayer, () => {
      showBtnEl.dataset.show = playingStore.showPlayer ? 'true' : 'false'
    }, { immediate: true })
  }
  else {
    throw new Error('showBtn not found')
  }

  if (props.playBtn) {
    const playBtnEl = document.querySelector(props.playBtn) as HTMLElement
    if (playBtnEl) {
      playBtnEl.addEventListener('click', () => {
        playingStore.playing = !playingStore.playing
        playingStore.currentId++
        playBtnEl.dataset.play = playingStore.playing ? 'true' : 'false'
      })

      watch(() => playingStore.playing, () => {
        playBtnEl.dataset.play = playingStore.playing ? 'true' : 'false'
      }, { immediate: true })
    }
    else {
      throw new Error('playBtn not found')
    }
  }
})

const stylesPresent = props.styles || presets.nyx

if (props.preset) {
  const preset = presets[props.preset]
  if (preset) {
    Object.assign(stylesPresent, preset)
  }
  else {
    throw new Error(`preset ${props.preset} not found in official presets`)
  }
}

const colorsLight
= `{
  --player-border: ${stylesPresent.styles.light.playerBorder};
  --close-btn: ${stylesPresent.styles.light.closeBtn};
  --secondary-text: ${stylesPresent.styles.light.secondaryText};
  --primary-text: ${stylesPresent.styles.light.primaryText};
  --player-background: ${stylesPresent.styles.light.playerBackground};
  --playlist-line: ${stylesPresent.styles.light.playListLine};
  --hover-btn: ${stylesPresent.styles.light.hoverBtn};
  --box-bg-shadow: ${stylesPresent.styles.light.boxBackgroundShadow};
  --primary-color: rgb(${stylesPresent.styles.light.primaryColor});
  --primary-color-a: rgba(${stylesPresent.styles.light.primaryColor},0.3);
}`

const colorsDark
= `{
  --player-border: ${stylesPresent.styles.dark.playerBorder}; 
  --close-btn: ${stylesPresent.styles.dark.closeBtn};
  --secondary-text: ${stylesPresent.styles.dark.secondaryText};
  --primary-text: ${stylesPresent.styles.dark.primaryText};
  --player-background: ${stylesPresent.styles.dark.playerBackground};
  --playlist-line: ${stylesPresent.styles.dark.playListLine};
  --hover-btn: ${stylesPresent.styles.dark.hoverBtn};
  --box-bg-shadow: ${stylesPresent.styles.dark.boxBackgroundShadow};
  --primary-color: rgb(${stylesPresent.styles.dark.primaryColor});
  --primary-color-a: rgba(${stylesPresent.styles.dark.primaryColor},0.3);
}`

if (props.darkModeTarget) {
  if (props.darkModeTarget === 'auto') {
    useStyleTag(`@media(prefers-color-scheme:light){html${colorsLight}}`)
    useStyleTag(`@media(prefers-color-scheme:dark){html${colorsDark}}`)
  }
  else {
    useStyleTag(`html${colorsLight}`)
    useStyleTag(`${props.darkModeTarget}${colorsDark}`)
  }
}
</script>

<template>
  <Suspense>
    <AudioPlayer id="MusicPlayerRoot" :playlist-u-r-ls="urls" :show-player="playingStore.showPlayer" />
  </Suspense>
</template>

<style>
</style>

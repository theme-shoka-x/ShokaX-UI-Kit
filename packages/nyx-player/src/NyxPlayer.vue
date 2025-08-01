<script setup lang="ts">
import type { Ref } from 'vue'
import type { Preset, RequiredColorsConfig } from './presets'
import { onMounted, provide, ref, useCssVars, watch } from 'vue'
import { usePlayingStore } from '@/stores/usePlayingStore'
import AudioPlayer from './components/AudioPlayer.vue'
import { useRefreshPlayStateTrigger } from './composables/useRefreshPlayStateTrigger'
import { nyxPreset, presets } from './presets'

const props = defineProps<{
  urls: { url: string, name: string }[]
  showBtn: string | Ref | HTMLElement | null
  playBtn?: string | Ref | HTMLElement | null
  darkModeTarget?: string
  preset?: string
  styles?: Preset
}>()
const playingStore = usePlayingStore()
const { trigger } = useRefreshPlayStateTrigger()

// 创建 Ref 来存储元素
const showBtnEl = ref<HTMLElement | null>(null)
const playBtnEl = ref<HTMLElement | null>(null)

// 提供 Ref
provide('showBtnEl', showBtnEl)
provide('playBtnEl', playBtnEl)

function setupShowBtn(el: HTMLElement) {
  showBtnEl.value = el // 更新 Ref
  el.addEventListener('click', () => {
    playingStore.showPlayer = !playingStore.showPlayer
  })
  watch(() => playingStore.showPlayer, () => {
    el.dataset.show = playingStore.showPlayer ? 'true' : 'false'
  }, { immediate: true })
}

function setupPlayBtn(el: HTMLElement) {
  playBtnEl.value = el // 更新 Ref
  el.addEventListener('click', () => {
    playingStore.playing = !playingStore.playing
    trigger()
    el.dataset.play = playingStore.playing ? 'true' : 'false'
  })
  watch(() => playingStore.playing, () => {
    el.dataset.play = playingStore.playing ? 'true' : 'false'
  }, { immediate: true })
}

onMounted(() => {
  // 初始化showBtn
  if (typeof props.showBtn === 'string') {
    const el = document.querySelector(props.showBtn) as HTMLElement
    if (el) {
      setupShowBtn(el)
    }
    else {
      throw new Error('showBtn not found')
    }
  }
  else if (props.showBtn && 'value' in props.showBtn && props.showBtn.value instanceof HTMLElement) {
    // 如果是 Ref<HTMLElement>
    watch(props.showBtn, (el) => {
      if (el)
        setupShowBtn(el)
    }, { immediate: true })
  }
  else if (props.showBtn instanceof HTMLElement) {
    // 如果直接是 HTMLElement
    setupShowBtn(props.showBtn)
  }
  else {
    // 兼容旧的 Ref<any> 或其他情况，尝试监听
    watch(() => props.showBtn, (el) => {
      if (el instanceof HTMLElement) {
        setupShowBtn(el)
      }
    }, { once: true })
  }
},
)

onMounted(() => {
  // 初始化playBtn
  if (typeof props.playBtn === 'string') {
    const el = document.querySelector(props.playBtn) as HTMLElement
    if (el) {
      setupPlayBtn(el)
    }
    else {
      throw new Error('playBtn not found')
    }
  }
  else if (props.playBtn && 'value' in props.playBtn && props.playBtn.value instanceof HTMLElement) {
    // 如果是 Ref<HTMLElement>
    watch(props.playBtn, (el) => {
      if (el)
        setupPlayBtn(el)
    }, { immediate: true })
  }
  else if (props.playBtn instanceof HTMLElement) {
    // 如果直接是 HTMLElement
    setupPlayBtn(props.playBtn)
  }
  else {
    // 兼容旧的 Ref<any> 或其他情况，尝试监听
    watch(() => props.playBtn, (el) => {
      if (el instanceof HTMLElement) {
        setupPlayBtn(el)
      }
    }, { once: true })
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

const currentMode = ref<'light' | 'dark'>('light')

if (props.darkModeTarget === 'auto') {
  const media = globalThis.matchMedia('(prefers-color-scheme: dark)')
  currentMode.value = media.matches ? 'dark' : 'light'
  media.addEventListener('change', (e) => {
    currentMode.value = e.matches ? 'dark' : 'light'
  })
}
else {
  currentMode.value = 'light'
}

useCssVars(() => {
  const theme = stylesPresent.styles[currentMode.value] as RequiredColorsConfig
  const defaultTheme = nyxPreset.styles[currentMode.value]

  Object.assign(theme, defaultTheme)

  return {
    'player-border': theme.playerBorder,
    'close-btn': theme.closeBtn,
    'secondary-text': theme.secondaryText,
    'primary-text': theme.primaryText,
    'player-background': theme.playerBackground,
    'playlist-line': theme.playListLine,
    'hover-btn': theme.hoverBtn,
    'box-bg-shadow': theme.boxBackgroundShadow,
    'primary-color': `rgb(${theme.primaryColor})`,
    'primary-color-a': `rgba(${theme.primaryColor}, 0.3)`,
  }
})
</script>

<template>
  <Teleport to="body">
    <Suspense>
      <AudioPlayer id="MusicPlayerRoot" :playlist-u-r-ls="urls" :show-player="playingStore.showPlayer" />
    </Suspense>
  </Teleport>
</template>

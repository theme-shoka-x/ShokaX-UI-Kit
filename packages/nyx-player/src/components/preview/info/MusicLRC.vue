<script setup lang="ts">
import type { LyricLine } from '../../metingapi/lrc'
import { computed, ref, watch } from 'vue'
import { Lyric } from '../../metingapi/lrc'
import { usePlayingStore } from '../../playingStore'

const lrcIdx = ref(0)
const lrcRes = ref([] as LyricLine[])

const playingStore = usePlayingStore()
const currentTime = computed(() => playingStore.currentTime)

const lrcUrl = computed(() => {
  const currentPlaylist = playingStore.getCurrentPlaylist()
  if (currentPlaylist && currentPlaylist.getCurrentSong()) {
    return currentPlaylist.getCurrentSong().lrc
  }
  return ''
})

watch(lrcUrl, async (url) => {
  if (url) {
    const lrc = new Lyric(url)
    await lrc.fetchLyric()
    lrc.parseLyric()
    lrcRes.value = lrc.lyrics
  }
}, { immediate: true })
</script>

<template>
  <div class="lrc">
    <div class="inner" :style="{ transform: `translateY(-${lrcIdx}rem)` }">
      <template v-for="(lyric, index) in lrcRes" :key="index">
        <p :class="{ current: currentTime >= lyric.start && currentTime <= lyric.end }" :data-index="index" @transitionstart="lrcIdx = index">
          {{ lyric.text }}
        </p>
      </template>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.lrc {
      max-height: 4rem;
      margin-top: .3125rem;
      font-size: $font-size-smallest;
      position: relative;
      text-align: center;
      overflow: hidden;

      .inner {
        width: 100%;
        transition: all .5s ease-out;
      }

      p {
        font-size: .75rem;
        color: var(--primary-text);
        line-height: 1rem!important;
        height: 1rem!important;
        padding: 0!important;
        margin: 0!important;
        transition: all .5s ease-out;
        opacity: .3;
        overflow: hidden;

        &.current {
          opacity: 1;
          overflow: visible;
          height: auto!important;
          min-height: 1rem;
        }
      }
    }
</style>

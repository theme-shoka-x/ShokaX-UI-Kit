<script setup lang="ts">
import type { LyricLine } from '../../metingapi/lrc'
import { computed, ref, watch } from 'vue'
import { Lyric } from '../../metingapi/lrc'
import { usePlayingStore } from '../../playingStore'

const lrcIdx = ref(0)
const lrcRes = ref([] as LyricLine[])

const playingStore = usePlayingStore()

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

const showLyric = ref<LyricLine[]>([])
let idx = 0

watch(() => playingStore.currentTime, (time) => {
  // 寻找当前播放所在的歌词索引
  const currentIdx = lrcRes.value.findIndex(line => time >= line.start && time <= line.end)

  // 若找到并且与上一次不同，更新 idx 和窗口
  if (currentIdx !== -1 && currentIdx !== idx) {
    idx = currentIdx

    // 从当前行开始取接下来的 4 行歌词（包括当前行）
    showLyric.value = lrcRes.value.slice(idx, idx + 4)
  }
})

watch(() => playingStore.getCurrentPlaylist().getCurrentSong(), () => {
  showLyric.value = []
  lrcIdx.value = 0
})
</script>

<template>
  <div class="lrc">
    <div class="inner">
      <TransitionGroup name="list" tag="ul" class="p-0">
        <li class="list-none">
          <p
            v-for="(lyric, index) in showLyric"
            :key="lyric.start"
            :class="{ current: index === lrcIdx }"
          >
            {{ lyric.text }}
          </p>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

.lrc {
  max-height: 4rem;
  margin-top: 0.3125rem;
  font-size: var(--font-size-smallest);
  position: relative;
  text-align: center;
  overflow: hidden;
}

.lrc .inner {
  width: 100%;
  transition: all 0.5s ease-out;
}

.lrc p {
  font-size: 0.75rem;
  color: var(--primary-text);
  line-height: 1rem !important;
  height: 1rem !important;
  padding: 0 !important;
  margin: 0 !important;
  transition: all 0.5s ease-out;
  opacity: 0.3;
  overflow: hidden;
}

.lrc p.current {
  opacity: 1;
  overflow: visible;
  height: auto !important;
  min-height: 1rem;
}
</style>

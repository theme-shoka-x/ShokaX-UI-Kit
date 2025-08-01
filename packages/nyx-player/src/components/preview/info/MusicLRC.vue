<script setup lang="ts">
import type { LyricLine } from '@/utils/metingapi/lrc'
import { useFetch } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { usePlayingStore } from '@/stores/usePlayingStore'
import { MaximumMap, parseLyric } from '@/utils/metingapi/lrc'

const lrcIdx = ref(0)

const playingStore = usePlayingStore()

const lrcCache = new MaximumMap<string, LyricLine[]>(100)

const lrcUrl = computed(() => playingStore.currentSong?.lrc ?? '')

const { data } = useFetch(lrcUrl, { refetch: true, async beforeFetch({ url, cancel }) {
  if (lrcCache.has(url)) {
    cancel()
  }
} }).get().text()

const lrcRes = ref<LyricLine[]>([])

watch(data, () => {
  if (lrcCache.has(playingStore.currentSong?.lrc ?? '')) {
    lrcRes.value = lrcCache.get(playingStore.currentSong?.lrc ?? '') ?? []
  }
  else {
    const res = parseLyric(data.value ?? '')
    lrcCache.set(playingStore.currentSong?.lrc ?? '', res)
    lrcRes.value = res
  }
})

const showLyric = ref<LyricLine[]>([])
let idx = 0

watch(() => playingStore.currentTime, (time) => {
  // 寻找当前播放所在的歌词索引
  const currentIdx = lrcRes.value.findIndex(line => time >= line.start && time <= line.end)

  // 若找到并且与上一次不同，更新 idx 和窗口
  if (currentIdx !== -1 && currentIdx !== idx) {
    idx = currentIdx

    // 从当前行开始取接下来的 4 行歌词（包括当前行）
    showLyric.value = lrcRes.value.slice(idx, Math.min(idx + 4, lrcRes.value.length))
  }
})

watch(() => playingStore.currentSong?.lrc, () => {
  showLyric.value = []
  lrcIdx.value = 0
})
</script>

<template>
  <div class="lrc relative mt-1.25 max-h-16 overflow-hidden text-center text-3">
    <div class="inner w-full transition-all duration-500 transition-ease-out">
      <TransitionGroup name="list" tag="ul" class="p-0">
        <li
          v-for="(lyric, index) in showLyric" :key="lyric.start"
          class="list-none"
        >
          <p :class="{ current: index === lrcIdx }">
            {{ lyric.text }}
          </p>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease;
}

.list-move {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: first;
  width: 100%;
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

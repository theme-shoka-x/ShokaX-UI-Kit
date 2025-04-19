<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { usePlayingStore } from '../playingStore'

const playingStore = usePlayingStore()

const playlists = playingStore.playlists
const viewPlaylistFlag = ref(playingStore.currentPlaylist)
const viewPlaylist = computed(() => viewPlaylistFlag)
const percentage = ref(0)

const navTitles = ref([] as string[])
onMounted(() => {
  playingStore.playlists.forEach((playlist) => {
    navTitles.value.push(playlist.name)
  })
})

function playSong(playlistIdx: number, songIdx: number) {
  playingStore.currentTime = 0
  playingStore.currentPlaylist = playlistIdx
  playingStore.getCurrentPlaylist().index = songIdx
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const songDTime = computed(() => {
  return formatTime(playingStore.songDuration)
})

const songPTime = computed(() => {
  return formatTime(playingStore.currentTime)
})

watch(() => playingStore.currentTime, () => {
  percentage.value = (playingStore.currentTime / playingStore.songDuration) * 100
})
</script>

<template>
  <div class="tabs relative block">
    <div class="nav h-8.75 text-3">
      <ul class="flex overflow-x-auto whitespace-nowrap p-0">
        <li
          v-for="(title, index) in navTitles"
          :key="title" class="relative m-0 inline-block cursor-pointer border-none"
          :data-index="index" :class="{ active: index === viewPlaylist.value }"
          @click="viewPlaylistFlag = index"
        >
          {{ title }}
        </li>
      </ul>
    </div>
    <TransitionGroup name="fade">
      <div v-for="playlist in playlists" :key="playlist.name">
        <ol v-if="playlist.sIndex === viewPlaylist.value">
          <li
            v-for="(song, sIndex) in playlist.playlist" :key="song.name" :class="{ current: playlist.index === sIndex && playingStore.currentPlaylist === viewPlaylist.value }"
            @click="playSong(playlist.sIndex, sIndex)"
          >
            <span class="info">
              <span class="name">{{ song.name }}</span>
              <span class="artist">{{ song.artist }}</span>
            </span>
            <div class="progress" :data-dtime="songDTime" :data-ptime="songPTime">
              <div class="bar" :style="{ width: `${percentage}%` }" />
            </div>
          </li>
        </ol>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="stylus" scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.fade-enter-active {
  animation: fadeIn 0.75s;
}

.tabs {

  .nav {
    border-bottom: .0625rem solid var(--player-background);
    height: 2.6875rem;

    li {
      padding: .3125rem 1.25rem;

      &::before {
        content: "";
        position: absolute;
        left: 50%;
        right: 50%;
        top: 2em;
        bottom: 0;
        transition: all .2s ease-in-out;
        width: auto;
        height: auto;
        background: none;
        border-radius: 0;
        border-bottom: .125rem solid transparent;
      }

      &.active::before {
        border-bottom-color: var(--primary-color);
        left: 0;
        right: 0;
      }
    }
  }
}

ol {
    font-size: 0.8125em;
    padding: .3125rem 0;
    margin: .625rem 0 0;
    height: 12.5rem;
    overflow-x: scroll;
    counter-reset: counter;
    position: relative;

    &::-webkit-scrollbar {
      width: .1875rem;
      height: .1875rem;
    }

    >li {
      display: flex;
      padding: .3125rem .9375rem .3125rem 1.5625rem;
      cursor: pointer;
      height: 2rem;
      overflow: hidden;

      &.error {
        opacity: .5;
        text-decoration-line: line-through;
      }

      &::before {
        height: auto;
        background: 0 0!important;
        border: none!important;
        position: relative;
        top: 0!important;
        left: 0!important;
        font-size: inherit;
        line-height: inherit;
        margin-left: -1.25rem;
        width: 1.875rem;
        counter-increment: counter;
        content: counter(counter);
        text-align: right;
        padding-right: .3125rem;
        color: var(--secondary-text);
      }

      .info {
        display: block;
        width: 100%;

        span {
          &:nth-child(1) {
            float: left;
          }
          &:nth-child(2) {
            float: right;
            margin-left: .625rem;
            color: var(--secondary-text);
          }
        }
      }

      &.current {
        color: var(--primary-color);
        position: relative;

        &::before {
          color: currentColor;
        }

        .progress {
          .bar {
            position: absolute;
            height: 100%;
            background-color: var(--primary-color-a);
            top: 0;
            left: 0;
            border-radius: 0.8125em;
            transition: width 0.25s;
          }

          &::before {
            content: attr(data-ptime) " / " attr(data-dtime);
            color: var(--secondary-text);
            position: absolute;
            right: 0;
            padding: 0 .3rem;
          }
        }

        .info {
          padding-right: 5rem;
          user-select: none;

          span {
            &:nth-child(2) {
              display: none;
            }
          }
        }
      }

      &:hover {
        background-color: var(--player-background);
        &::before {
          color: var(--primary-color);
        }
      }
    }
  }
</style>

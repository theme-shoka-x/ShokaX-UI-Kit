<script setup lang="ts">
import linkElement from '../linkElement.vue'
import Headline from './Headline.vue'

defineProps<{
  isHome: boolean
  artBoardContent?: string
  headlineContent: string
  descriptionContent?: string
  date?: string
  words?: number
  readTime?: string
}>()
</script>

<template>
  <div id="brand" class="fixed h-50vh min-h-40 w-full flex flex-col items-center justify-center pl-15 pr-15 pt-12 text-center">
    <template v-if="isHome">
      <linkElement v-once href="/" rel="start">
        <p class="text-14 line-height-4.8">
          {{ artBoardContent }}
        </p>
        <Headline :content="headlineContent" />
      </linkElement>
      <p v-once class="meta m-0 flex text-3.5" itemprop="description">
        {{ descriptionContent }}
      </p>
    </template>
    <template v-else>
      <Headline :content="headlineContent" />
      <div v-once class="meta m-0 flex text-3.5">
        <div class="i-ri-calendar-2-line" />
        <span> {{ date }} </span>
        <div class="i-ri-quill-pen-line ml-2.5" />
        <span> {{ words }} </span>
        <div class="i-ri-time-line ml-2.5" />
        <span> {{ readTime }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="css" scoped>
@media (width <= 820px) {
  #brand .meta {
    font-size: 0.75em;
  }
}

@media (width <= 820px) {
  #brand h1 {
    font-size: 1.5em;
  }
}

@media (width <= 820px) {
  #brand {
    padding: 3rem 0.5rem 0;
    padding-top: 3rem;
    padding-right: 0.5rem;
    padding-bottom: 0px;
    padding-left: 0.5rem;
  }
}
</style>

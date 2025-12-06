<script setup lang="ts">
import type { SidebarState } from './types'
import LinkElement from '../LinkElement.vue'

defineProps<{ state: SidebarState }>()
</script>

<template>
  <div class="state">
    <div class="item posts">
      <LinkElement :href="state.posts.href">
        <span class="count">{{ state.posts.count }}</span>
        <span class="name">{{ state.posts.title }}</span>
      </LinkElement>
    </div>
    <div class="item categories">
      <LinkElement :href="state.categories.href">
        <span class="count">{{ state.categories.count }}</span>
        <span class="name">{{ state.categories.title }}</span>
      </LinkElement>
    </div>
    <div class="item tags">
      <LinkElement :href="state.tags.href">
        <span class="count">{{ state.tags.count }}</span>
        <span class="name">{{ state.tags.title }}</span>
      </LinkElement>
    </div>
  </div>
</template>

<style scoped>
.state {
  display: flex;
  justify-content: center;
  line-height: 1.4;
  margin-top: 0.625rem;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
}

.item {
  padding: 0 0.9375rem;
}

.item:not(:first-child) {
  border-left: 0.0625rem solid var(--grey-4);
}

.count {
  display: block;
  font-size: 1.25em;
  font-weight: 600;
  text-align: center;
}

.name {
  color: inherit;
  font-size: 0.875em;
}

.item :deep(a) {
  border-bottom: none;
}
</style>

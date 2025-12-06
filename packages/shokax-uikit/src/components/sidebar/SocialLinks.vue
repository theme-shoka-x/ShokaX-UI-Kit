<script setup lang="ts">
import type { SocialLink } from './types'
import LinkElement from '../LinkElement.vue'

defineProps<{
  socialLinks: SocialLink[]
}>()
</script>

<template>
  <div class="social">
    <template v-for="socialLink in socialLinks" :key="socialLink.name">
      <LinkElement
        :href="socialLink.link"
        class="item"
        :class="socialLink.name"
        :style="{ '--social-color': socialLink.color || 'var(--primary-color)' }"
        :title="socialLink.link"
      >
        <i :class="socialLink.icon" />
      </LinkElement>
    </template>
  </div>
</template>

<style scoped>
.social {
  margin-top: 0.9375rem;
  text-align: center;
}

.item {
  display: inline-block !important;
  width: 1.875rem;
  height: 1.875rem;
  line-height: 1.875rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 38%;
  transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
}

.item i {
  font-size: 1.4em;
  vertical-align: middle;
  transform: scale(0.8);
  color: var(--social-color, var(--primary-color));
  transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
}

.item::before {
  top: 90%;
  left: -110%;
  content: '';
  width: 120%;
  height: 120%;
  position: absolute;
  transform: rotate(45deg);
  background-color: var(--social-color, var(--primary-color));
  transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
}

.item:focus::before,
.item:hover::before {
  top: -10%;
  left: -10%;
}

.item:focus i,
.item:hover i {
  color: var(--grey-0);
  transform: scale(1);
}

.item :deep(a) {
  color: inherit;
}
</style>

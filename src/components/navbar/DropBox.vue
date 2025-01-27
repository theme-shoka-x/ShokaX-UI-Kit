<script setup lang="ts">
import type { NavItemType } from './NavTypes'
import { useElementHover } from '@vueuse/core'
import { computed, ref } from 'vue'
import DropBoxItem from './DropBoxItem.vue'
import NavItem from './NavItem.vue'

const props = defineProps<{
  icon?: string
  navLinks: NavItemType[]
  rootText: string
}>()

const linkEl = ref<HTMLElement | null>(null)
const submenuEl = ref<HTMLElement | null>(null)
const hoveringLink = useElementHover(linkEl, { delayLeave: 300 })
const hoveringSubMenu = useElementHover(submenuEl, { delayLeave: 100 })

const hovering = computed(() => hoveringLink.value || hoveringSubMenu.value)
</script>

<template>
  <NavItem>
    <a
      ref="linkEl" href="javascript:void 0"
      class="block cursor-pointer break-words border-none color-[currentColor] decoration-none outline-0"
      @click="void 0"
    >
      <div v-if="icon" :class="icon" class="inline-block vertical-text-bottom text-xl" />
      {{ rootText }}
      <div class="i-ri-arrow-drop-down-fill inline-block vertical-text-bottom text-xl" />
    </a>
    <Transition name="slideUpIn">
      <DropBoxItem v-show="hovering" ref="submenuEl" :nav-links="props.navLinks" :show-sub-menu="false" />
    </Transition>
  </NavItem>
</template>

<style lang="css" scoped>
@keyframes slideUpIn {
  0% {
    transform: translateY(0.75rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideDownOut {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(0.75rem);
    opacity: 0;
  }
}

.slideUpIn-enter-active {
  animation: 0.3s slideUpIn;
}

.slideUpIn-leave-active {
  animation: 0.3s slideDownOut;
}
</style>

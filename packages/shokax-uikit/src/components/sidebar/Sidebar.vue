<script lang="ts" setup>
import type { SidebarConfig } from './types'
import { useElementVisibility, useWindowScroll } from '@vueuse/core'
import { computed, inject } from 'vue'
import { _PAGE_WAVES_ELEMENT } from '../../symbols'
import QuickBtns from './QuickBtns.vue'
import SitePanel from './SitePanel.vue'

const props = defineProps<SidebarConfig>()

const isWaveVisible = useElementVisibility(inject(_PAGE_WAVES_ELEMENT))
const { y } = useWindowScroll({
  behavior: 'smooth',
})

const affix = computed(() => !isWaveVisible.value && y.value > 500)
</script>

<template>
  <div
    id="sidebar"
    :class="{ affix }"
  >
    <div class="inner">
      <div class="panels">
        <div class="inner">
          <SitePanel :sidebar-config="props" />
        </div>
      </div>

      <QuickBtns />
    </div>
  </div>
</template>

<style lang="css">
#sidebar {
  position: static;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 25rem;
  top: 0;
  bottom: 0;
  transition: all 0.2s ease-in-out;
}

@media (max-width: 1024px) {
  #sidebar {
    display: none;
    position: fixed;
    right: 0;
    background: var(--grey-1);
    box-shadow: 0 0.375rem 0.9375rem 0.3125rem rgba(0, 0, 0, 0.2);
    z-index: 99;
  }
}

#sidebar.affix > .inner {
  position: fixed;
  top: 0;
}

#sidebar.affix .panels {
  padding-top: 3.625rem;
  height: 100vh;
}

#sidebar > .inner {
  position: relative;
  width: 15rem;
  color: var(--grey-6);
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  z-index: 1;
}

.panels {
  padding: 4.6875rem 0 2rem;
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
}

.panels > .inner {
  margin-top: 2.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  width: auto;
  height: 100%;
}

.panels .panel {
  display: block;
  padding: 0.875rem 0.9375rem 2rem;
}

/* Hide scrollbar inside panels */
.panels > .inner::-webkit-scrollbar {
  display: none;
}

/* Quick buttons visibility */
#quick {
  display: none;
}

#sidebar.affix #quick,
#sidebar.on #quick {
  display: flex;
}
</style>

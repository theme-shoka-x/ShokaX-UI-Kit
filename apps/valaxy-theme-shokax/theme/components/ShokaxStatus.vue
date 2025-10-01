<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
const siteConfig = useSiteConfig()

const { t } = useI18n()
</script>

<template>
  <div class="w-full flex flex-col text-align-center">
    <div class="flex flex-row items-center justify-center gap-2">
      <span>©️ {{ themeConfig.footer.since }}-{{ new Date().getFullYear() }}</span>
      <i :class="themeConfig.footer.icon" />
      <span>{{ siteConfig.author.name }} @ {{ siteConfig.title }} </span>
    </div>
    <div class="flex flex-row items-center justify-center gap-2">
      {{ }}
    </div>
    <span> {{ t("footer.status.base") }}<a href="https://valaxy.site/"> Valaxy </a> & ShokaX Non-Production-Pre-Alpha version</span>
    <div v-if="themeConfig.footer.beian?.icp">
      <a href="https://beian.miit.gov.cn/" rel="nofollow noopener noreferrer" target="_blank">
        {{ themeConfig.footer.beian?.icp }}
      </a>
    </div>
    <div v-if="themeConfig.footer.beian?.mps">
      <a
        href="https://beian.mps.gov.cn/#/query/webSearch?code={{ themeConfig.footer.beian?.mps.slice(6,-1) }}"
        rel="nofollow noopener noreferrer" target="_blank"
      >
        {{ themeConfig.footer.beian?.mps }}
      </a>
    </div>
  </div>
</template>

<style lang="css" scoped>

</style>

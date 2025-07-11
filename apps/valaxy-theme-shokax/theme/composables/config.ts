import type { ThemeConfig } from '../types'
import { useConfig, useValaxyConfig } from 'valaxy'
import { computed } from 'vue'

/**
 * getThemeConfig
 */
export function useThemeConfig<T = ThemeConfig>() {
  const config = useConfig<T>()
  return computed(() => config!.value.themeConfig)
}

// 原因未知，但若不进行二次包装，则VScode无法正确在template中提示，会要求添加不需要添加的dot value
export function useSiteConfig<T = ThemeConfig>() {
  const config = useValaxyConfig<T>()
  return computed(() => config!.value.siteConfig)
}
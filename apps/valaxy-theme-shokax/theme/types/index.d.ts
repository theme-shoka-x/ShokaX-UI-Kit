import type { NavItemType } from 'shokax-uikit/src/components/navbar/NavTypes.ts'
import type { DefaultTheme } from 'valaxy'

export namespace StarterTheme {
  export type Config = ThemeConfig
  export type Sidebar = any
}

/**
 * Theme Config
 */
export interface ThemeConfig extends DefaultTheme.Config {
  /**
   * footer
   */
  footer: Partial<{
    /**
     * 建站于
     */
    since: number

    /**
     * Icon between year and copyright info.
     */
    icon: {
      /**
       * icon name, i-xxx
       */
      name: string
      animated: boolean
      color: string
      url: string
      title: string
    }

    /**
     * Powered by valaxy & valaxy-theme-${name}, default is yun
     */
    powered: boolean

    /**
     * Chinese Users | 中国用户
     * 备案 ICP & 公网安备 MPS
     * 国内用户需要在网站页脚展示备案 ICP 号和公网安备 MPS 号
     * https://beian.miit.gov.cn/ & https://beian.mps.gov.cn/
     */
    beian: {
      enable: boolean
      /**
       * 苏ICP备xxxxxxxx号
       */
      icp: string
      /**
       * 苏公网安备 xxxxxxxxx 号
       */
      mps: string
    }
  }>

  /**
   * navbar
   */
  nav: NavItemType[]

  cover: string
}

export type ThemeUserConfig = Partial<ThemeConfig>

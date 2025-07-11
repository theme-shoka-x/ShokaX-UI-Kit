import type { ResolvedValaxyOptions } from 'valaxy'
import type { Plugin } from 'vite'
import type { ThemeConfig } from '../types'

/**
 * Default Config
 */
export const defaultThemeConfig: ThemeConfig = {
  valaxyDarkOptions: {
    circleTransition: true,
  },

  footer: {
    since: 2022,
    icon: {
      name: 'i-ri-cloud-line',
      animated: true,
      color: 'var(--va-c-primary)',
      url: 'https://sponsors.yunyoujun.cn',
      title: 'Sponsor YunYouJun',
    },

    powered: true,

    beian: {
      enable: false,
      icp: '',
    },
  },

  nav: [
    {
      href: '/',
      text: 'Home',
      icon: 'i-ri-home-line',
    },
    {
      href: '/about',
      text: 'About',
      icon: 'i-ri-user-6-line',
    },
    {
      href: '/contact',
      text: 'Contact',
      icon: 'i-ri-mail-line',
    },
    {
      dropbox: true,
      text: 'Account',
      icon: 'i-ri-account-circle-line',
      dropboxItems: [
        {
          href: '/login',
          text: 'Login',
          icon: 'i-ri-login-circle-line',
        },
        {
          href: '/register',
          text: 'Register',
          icon: 'i-ri-survey-line',
        },
      ],
    },
  ],
  cover: '' 
}

// write a vite plugin
// https://vitejs.dev/guide/api-plugin.html
export function themePlugin(options: ResolvedValaxyOptions<ThemeConfig>): Plugin {
  return {
    name: 'valaxy-theme-shokax',

    config(config, env) {
      return {
        // valaxy: {}
      }
    },
  }
}

/**
 * generateSafelist by config
 * @param themeConfig
 */
export function generateSafelist(themeConfig: ThemeConfig) {
  const safelist: string[] = []

  const footerIcon = themeConfig.footer?.icon?.name
  if (footerIcon)
    safelist.push(footerIcon)

  return safelist
}

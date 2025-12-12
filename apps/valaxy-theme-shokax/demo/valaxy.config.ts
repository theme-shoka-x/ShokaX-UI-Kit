import type { ThemeConfig } from 'valaxy-theme-shokax'
import { defineConfig } from 'valaxy'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineConfig<ThemeConfig>({
  theme: 'shokax',

  themeConfig: {
    // colors: {
    //   primary: 'red',
    // },

    footer: {
      since: 2016,
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
        href: '/account',
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
    cover: './1.png',
  },
})

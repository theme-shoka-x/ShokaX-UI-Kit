<script setup lang="ts">
import type { NavItemType } from './components/navbar/NavTypes'
import { provide } from 'vue'
import CodeBlock from './components/CodeBlock.vue'
import DividerLine from './components/DividerLine.vue'
import NavBar from './components/navbar/NavBar.vue'
import ToolBar from './components/toolbar/ToolBar.vue'
import Waves from './components/waves/Waves.vue'

const navlinks: NavItemType[] = [
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
]

provide('linkElName', 'a')
</script>

<template>
  <!-- <Brand :is-home="true" art-board-content="111" headline-content="222" /> -->
  <NavBar :nav-links="navlinks" name="website" :click-toggle-callback="() => void 0" />
  <ToolBar :show-contents-click-callback="() => void 0" />
  <Waves />

  <DividerLine content="111" />
  <CodeBlock>
    <pre class="shiki shiki-themes vitesse-light vitesse-dark" style="background-color:#ffffff;--shiki-dark-bg:#121212;color:#393a34;--shiki-dark:#dbd7caee" tabindex="0"><code class="language-shell">
  <span class="line"><span style="color:#59873A;--shiki-dark:#80A665">apt</span><span style="color:#B56959;--shiki-dark:#C98A7D"> install</span><span style="color:#B56959;--shiki-dark:#C98A7D"> build-essential</span><span style="color:#B56959;--shiki-dark:#C98A7D"> ca-certificates</span><span style="color:#B56959;--shiki-dark:#C98A7D"> zlib1g-dev</span><span style="color:#B56959;--shiki-dark:#C98A7D"> libpcre3</span><span style="color:#B56959;--shiki-dark:#C98A7D"> libpcre3-dev</span><span style="color:#B56959;--shiki-dark:#C98A7D"> tar</span><span style="color:#B56959;--shiki-dark:#C98A7D"> unzip</span><span style="color:#B56959;--shiki-dark:#C98A7D"> libssl-dev</span><span style="color:#B56959;--shiki-dark:#C98A7D"> wget</span><span style="color:#B56959;--shiki-dark:#C98A7D"> curl</span><span style="color:#B56959;--shiki-dark:#C98A7D"> git</span><span style="color:#B56959;--shiki-dark:#C98A7D"> cmake</span><span style="color:#B56959;--shiki-dark:#C98A7D"> ninja-build</span><span style="color:#B56959;--shiki-dark:#C98A7D"> golang</span></span>
  <span class="line"><span style="color:#A0ADA0;--shiki-dark:#758575DD"># 需要启用源代码软件源(deb-src)</span></span>
  <span class="line"><span style="color:#59873A;--shiki-dark:#80A665">apt-get</span><span style="color:#B56959;--shiki-dark:#C98A7D"> build-dep</span><span style="color:#B56959;--shiki-dark:#C98A7D"> nginx</span></span></code></pre>
  </CodeBlock>
  <div id="comment">
    111
  </div>
  <div id="toc" />
</template>

<style>
@import url('./styles/style.css');
@import url('./styles/palette.css');
</style>

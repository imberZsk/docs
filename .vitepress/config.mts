import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'imber',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Next', link: '/next/next-project' },
      { text: 'Editor', link: '/editor/tiptap' },
      { text: 'Web Animation', link: '/animation/fm-codesandbox' },
      { text: 'Web 3D', link: '/three/three-1' }
    ],

    sidebar: {
      '/next/': { base: '/next/', items: sidebarNext() },
      '/editor/': { base: '/editor/', items: sidebarEditor() },
      '/animation/': { base: '/animation/', items: sidebarAnimate() },
      '/three/': { base: '/three/', items: sidebarThree() }
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/imberZsk' }]
  }
})

function sidebarNext(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Nextjs',
      collapsed: true,
      items: [
        { text: '工程化配置', link: 'next-project' },
        { text: '图片配置', link: 'image' },
        { text: '配置代理', link: 'next-proxy' },
        { text: 'Sitemap', link: 'next-sitemap' },
        { text: 'CSP', link: 'next-csp' },
        { text: '国际化', link: 'next-i18n' },
        { text: '服务端组件和客户端组件', link: 'next-server-client' },
        { text: 'SSR/SSG/ISR', link: 'next-ssr' },
        { text: 'Server Action', link: 'next-server-action' },
        { text: 'APP 路由', link: 'next-app-router' },
        { text: '3个路由 Hook', link: 'next-router-hook' },
        { text: '状态管理', link: 'context' },
        { text: 'TurboRepo', link: 'turborepo' },
        { text: '缓存问题', link: 'next-cache' },
        { text: '服务端客户端渲染不一致', link: 'next-render-different' },
        { text: '部署相关', link: 'next-deploy' },
        { text: '日志', link: 'next-log' },
        { text: '性能', link: 'next-performance' }
      ]
    },
    {
      text: 'Tailwind',
      collapsed: true,
      items: [{ text: '优雅的使用Tailwind', link: 'tw-config' }]
    },
    {
      text: 'Typescript',
      collapsed: true,
      items: [{ text: 'Typescript规则问题', link: 'ts-qaq' }]
    }
    // zustand
    // {
    //   text: 'Strapi',
    //   collapsed: true,
    //   items: [
    //     { text: 'Strapi', link: 'strapi' }
    //     // { text: 'Strapi部署', link: 'strapi-deploy' }
    //   ]
    // },
    // {
    //   text: 'NextAuth',
    //   collapsed: true,
    //   items: [{ text: 'NextAuth', link: 'nextAuth' }]
    // }
  ]
}

function sidebarEditor(): DefaultTheme.SidebarItem[] {
  return [
    { text: '编辑器技术选型', link: 'select' },
    { text: 'tiptap简介', link: 'tiptap' },
    { text: 'tiptap-nextjs初始化', link: 'project-standard' },
    { text: 'tiptap mvp版本（快速使用）🔥', link: 'mvp' },
    { text: 'tiptap 插件开发', link: 'tiptap-plugin' },
    { text: '定制化 AI 功能 ', link: 'ai' },
    { text: '相关功能', link: 'other' },
    {
      text: '所有功能（持续更新）',
      link: '/editor-all/editor-all'
    }
  ]
}

function sidebarAnimate(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Framer Motion',
      collapsed: false,
      items: [
        { text: 'pin效果', link: 'fm-pin-1' },
        { text: 'Codesanbox视差效果', link: 'fm-codesandbox' },
        { text: 'tab切换效果', link: 'fm-tab' }
      ]
    },
    {
      text: 'GSAP',
      collapsed: false,
      items: [
        { text: 'useGSAP', link: 'useGSAP' },
        { text: 'gsap的各种包', link: 'gsap-core' },
        { text: 'scrollTrigger', link: 'scrollTrigger' },
        { text: 'pin效果', link: 'gsap-pin-1' }
      ]
    }
    // {
    //   text: 'FramerMotion',
    //   collapsed: false,
    //   items: [{ text: 'tab切换效果', link: 'fm-1' }]
    // },
    // {
    //   text: 'CSS',
    //   collapsed: false,
    //   items: [{ text: '全屏滚动效果', link: 'css-1' }]
    // },
    // {
    //   text: 'Three',
    //   collapsed: false,
    //   items: [{ text: '3D模型', link: 'three-1' }]
    // }
  ]
}

function sidebarThree(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '1',
      collapsed: false,
      items: [{ text: '1', link: 'three-1' }]
    }
  ]
}

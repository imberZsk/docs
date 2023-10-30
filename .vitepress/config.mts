import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'imber的文档',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Next', link: '/next/turborepo' },
      { text: 'React', link: '/react/design' },
      { text: 'Vue', link: '/vue/design' },
      { text: 'Nest', link: '/nest/design' },
      { text: 'Write', link: '/write/write' }
    ],

    sidebar: {
      '/next/': { base: '/next/', items: sidebarNext() },
      '/react/': { base: '/react/', items: sidebarReact() },
      '/vue/': { base: '/vue/', items: sidebarVue() },
      '/nest/': { base: '/nest/', items: sidebarNest() },
      '/write/': { base: '/write/', items: sidebarWrite() }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

/* prettier-ignore */
function sidebarNext(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Turbo',
      collapsed: false,
      items: [
        { text: 'Turborepo', link: 'turborepo' },
        { text: 'Turbopack', link: 'turbopack' },
      ]
    },
    {
      text: 'Nextjs',
      collapsed: true,
      items: [
        { text: '路由系统', link: 'router' },
        { text: '数据fetch', link: 'fetch' },
        { text: '渲染', link: 'rendering' },
        { text: '缓存', link: 'caching' },
        { text: '样式', link: 'styling' },
        { text: '优化', link: 'styling' },
        { text: '配置', link: 'styling' },
        { text: 'deploying', link: 'styling' },
        { text: '升级', link: 'styling' }
      ]
    },
    {
      text: 'SWR',
      collapsed: false,
      items: [
        { text: 'Using a Custom Theme', link: 'custom-theme' },
      ]
    },
    {
      text: 'Commerce',
      collapsed: false,
      items: [
        { text: 'MPA Mode', link: 'mpa-mode' },
      ]
    }
  ]
}

/* prettier-ignore */
function sidebarVue(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Vue设计与实现',
      collapsed: false,
      items: [
        { text: '第一篇 框架设计概览', link: 'design' },
        { text: '第二篇 响应系统', link: 'turbopack' },
        { text: '第三篇 渲染器', link: 'turbopack' },
        { text: '第四篇 组件化', link: 'turbopack' },
        { text: '第五篇 编译器', link: 'parser' },
        { text: '第六篇 服务端渲染', link: 'turbopack' }
      ]
    }
  ]
}

/* prettier-ignore */
function sidebarReact(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'React设计原理',
      collapsed: false,
      items: [
        { text: 'Turborepo', link: 'turborepo' },
        { text: 'Turbopack', link: 'turbopack' },
      ]
    },
  ]
}

/* prettier-ignore */
function sidebarNest(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Nest',
      collapsed: false,
      items: [
        { text: '1', link: 'turborepo' },
        { text: '2', link: 'turbopack' },
      ]
    },
  ]
}

/* prettier-ignore */
function sidebarWrite(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Write',
      collapsed: false,
      items: [
        { text: '手写', link: 'write' },
        { text: '算法', link: 'code' },
      ]
    },
    {
      text: '数组',
      collapsed: false,
      items: [
        { text: '二分查找', link: 'write' },
        { text: '移除元素', link: 'code' },
      ]
    },
    {
      text: '链表',
      collapsed: false,
      items: [
        { text: '移除链表元素', link: 'write' },
        { text: '设计链表', link: 'code' },
      ]
    },
  ]
}

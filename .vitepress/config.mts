import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'imber',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue', link: '/vue/design' },
      { text: 'React', link: '/react/idea' },
      { text: 'Next', link: '/next/practice' },
      { text: 'Nest', link: '/nest/design' },
      { text: 'DB', link: '/db/mongodb' },
      { text: 'Write', link: '/write/write' },
      { text: 'Other', link: '/other/next14' }
    ],

    sidebar: {
      '/vue/': { base: '/vue/', items: sidebarVue() },
      '/react/': { base: '/react/', items: sidebarReact() },
      '/next/': { base: '/next/', items: sidebarNext() },
      '/nest/': { base: '/nest/', items: sidebarNest() },
      '/write/': { base: '/write/', items: sidebarWrite() },
      '/db/': { base: '/db/', items: sidebarDB() },
      '/other/': { base: '/other/', items: sidebarOther() }
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/imberZsk' }]
  }
})

function sidebarNext(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Turbo',
      collapsed: true,
      items: [
        { text: 'Turborepo', link: 'turborepo' },
        { text: 'Turbopack', link: 'turbopack' }
      ]
    },
    {
      text: 'Nextjs',
      // collapsed: true,
      items: [
        { text: '项目实战', link: 'practice' },
        { text: 'app 路由', link: 'router' },
        { text: '数据fetch', link: 'fetch' },
        { text: '渲染', link: 'rendering' },
        { text: '缓存', link: 'caching' },
        { text: '优化', link: 'styling' },
        { text: '配置', link: 'styling' },
        { text: 'deploying', link: 'styling' },
        { text: '升级', link: 'styling' }
      ]
    },
    {
      text: 'SWR',
      collapsed: false,
      items: [{ text: 'Using a Custom Theme', link: 'custom-theme' }]
    },
    {
      text: 'Commerce',
      collapsed: false,
      items: [{ text: 'MPA Mode', link: 'mpa-mode' }]
    },
    {
      text: 'Animation',
      collapsed: true,
      items: [
        { text: '全屏滚动效果', link: 'video' },
        { text: '图片渐进式加载', link: 'video' },
        { text: 'loading加载效果', link: 'video' }
      ]
    }
  ]
}

function sidebarVue(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'vue源码调试', link: 'debug' },
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

function sidebarReact(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'React源码调试', link: 'debug' },
    {
      text: 'React技术揭秘',
      collapsed: false,
      items: [
        { text: '第一章React理念（理念篇）', link: 'idea' },
        { text: '第二章前置知识（理念篇）', link: 'pre' },
        { text: '第三章render阶段（架构篇）', link: 'render' },
        { text: '第四章commit阶段（架构篇）', link: 'commit' },
        { text: '第五章Diff算法（实现篇）', link: 'turbopack' },
        { text: '第六章状态更新（实现篇）', link: 'turbopack' },
        { text: '第七章Hooks（实现篇）', link: 'turbopack' },
        { text: '第八章ConcurrentMode', link: 'turbopack' }
      ]
    }
  ]
}

function sidebarNest(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Nest',
      collapsed: false,
      items: [
        { text: '1', link: 'turborepo' },
        { text: '2', link: 'turbopack' }
      ]
    }
  ]
}

function sidebarWrite(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Write',
      collapsed: false,
      items: [
        { text: '手写', link: 'write' },
        { text: '算法', link: 'code' }
      ]
    },
    {
      text: '数组',
      collapsed: false,
      items: [
        { text: '二分查找', link: 'write' },
        { text: '移除元素', link: 'code' }
      ]
    },
    {
      text: '链表',
      collapsed: false,
      items: [
        { text: '移除链表元素', link: 'write' },
        { text: '设计链表', link: 'code' }
      ]
    }
  ]
}

function sidebarDB(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Prisma',
      collapsed: false,
      items: [
        { text: '动画效果总结', link: 'animate' },
        { text: 'Next14项目总结', link: 'project' }
      ]
    },
    {
      text: 'Mongodb',
      collapsed: false,
      items: [
        { text: '动画效果总结', link: 'animate' },
        { text: 'Next14项目总结', link: 'project' }
      ]
    },
    {
      text: 'Mysql',
      collapsed: false,
      items: [
        { text: '全屏滚动效果', link: 'video' },
        { text: '图片渐进式加载', link: 'video' },
        { text: 'loading加载效果', link: 'video' }
      ]
    }
  ]
}

function sidebarOther(): DefaultTheme.SidebarItem[] {
  return [
    { text: '聊聊 Next14', link: 'next14' },
    { text: 'Next13 项目总结', link: 'next13' },
    { text: '统一公司的项目规范', link: 'standard' },
    { text: '思考vue3和react18的区别', link: 'compare' }
  ]
}

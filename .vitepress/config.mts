import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'imber',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue', link: '/vue/book-1' },
      { text: 'React', link: '/react/book-1' },
      { text: 'Next', link: '/next/next-1' },
      { text: 'animate', link: '/animate/gsap-1' },
      { text: 'editor', link: '/editor/slate' },
      { text: 'ai', link: '/ai/openAi' },
      { text: 'Nest', link: '/nest/nest-1' },
      { text: 'DB', link: '/db/mysql' },
      { text: 'Write', link: '/write/write' },
      { text: 'Juejin', link: '/juejin/article-1' },
      { text: 'Blog', link: 'https://imber-blog.netlify.app/' }
    ],

    sidebar: {
      '/vue/': { base: '/vue/', items: sidebarVue() },
      '/react/': { base: '/react/', items: sidebarReact() },
      '/next/': { base: '/next/', items: sidebarNext() },
      '/animate/': { base: '/animate/', items: sidebarAnimate() },
      '/editor/': { base: '/editor/', items: sidebarEditor() },
      '/ai/': { base: '/ai/', items: sidebarAi() },
      '/nest/': { base: '/nest/', items: sidebarNest() },
      '/db/': { base: '/db/', items: sidebarDB() },
      '/write/': { base: '/write/', items: sidebarWrite() },
      '/juejin/': { base: '/juejin/', items: sidebarJuejin() }
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/imberZsk' }]
  }
})

function sidebarVue(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'vue源码调试', link: 'debug' },
    {
      text: 'Vue设计与实现',
      collapsed: false,
      items: [
        { text: '第一篇 框架设计概览', link: 'book-1' },
        { text: '第二篇 响应系统', link: 'book-2' },
        { text: '第三篇 渲染器', link: 'book-3' },
        { text: '第四篇 组件化', link: 'book-4' },
        { text: '第五篇 编译器', link: 'book-5' },
        { text: '第六篇 服务端渲染', link: 'book-6' }
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
        { text: '第一章React理念（理念篇）', link: 'book-1' },
        { text: '第二章前置知识（理念篇）', link: 'book-2' },
        { text: '第三章render阶段（架构篇）', link: 'book-3' },
        { text: '第四章commit阶段（架构篇）', link: 'book-4' },
        { text: '第五章Diff算法（实现篇）', link: 'book-5' },
        { text: '第六章状态更新（实现篇）', link: 'book-6' },
        { text: '第七章Hooks（实现篇）', link: 'book-7' },
        { text: '第八章ConcurrentMode', link: 'book-8' }
      ]
    },
    { text: 'React Hooks', link: 'hooks' },
    { text: 'Formik', link: 'formik' },
    { text: 'Immer', link: 'immer' },
    { text: 'amap', link: 'amap' },
    { text: 'components', link: 'components' }
  ]
}

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
      text: 'SWR',
      link: 'swr'
    },
    {
      text: 'Nextjs',
      collapsed: false,
      items: [
        { text: '项目实战', link: 'next-1' },
        { text: 'app 路由', link: 'next-2' },
        { text: '数据fetch', link: 'next-3' },
        { text: '渲染', link: 'next-4' },
        { text: '缓存', link: 'next-5' },
        { text: '优化', link: 'next-6' },
        { text: '配置', link: 'next-7' },
        { text: '部署', link: 'next-8' },
        { text: '升级', link: 'next-9' }
      ]
    }
  ]
}

function sidebarAnimate(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Gsap',
      collapsed: false,
      items: [{ text: '线条跟随视差效果', link: 'gsap-1' }]
    },
    {
      text: 'FramerMotion',
      collapsed: false,
      items: [{ text: 'tab切换效果', link: 'fm-1' }]
    },
    {
      text: 'CSS',
      collapsed: false,
      items: [{ text: '全屏滚动效果', link: 'css-1' }]
    },
    {
      text: 'Three',
      collapsed: false,
      items: [{ text: '3D模型', link: 'three-1' }]
    }
  ]
}

function sidebarEditor(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'slate', link: 'slate' },
    { text: 'tiptap', link: 'tiptap' }
  ]
}

function sidebarAi(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'openAi', link: 'openAi' },
    { text: '通义千问', link: 'tongyi' }
  ]
}

function sidebarNest(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Nest',
      collapsed: false,
      items: [{ text: 'nest1', link: 'nest-1' }]
    }
  ]
}

function sidebarDB(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Mysql',
      collapsed: false,
      items: [{ text: 'mysql + prisma', link: 'mysql' }]
    }
  ]
}

function sidebarWrite(): DefaultTheme.SidebarItem[] {
  return [
    { text: '手写', link: 'write' },
    { text: '算法', link: 'code' }
  ]
}

function sidebarJuejin(): DefaultTheme.SidebarItem[] {
  return [
    { text: '聊聊 Next14', link: 'article-4' },
    { text: 'Next13 项目总结', link: 'article-3' },
    { text: '统一公司的项目规范', link: 'article-2' },
    { text: '思考vue3和react18的区别', link: 'article-1' }
  ]
}

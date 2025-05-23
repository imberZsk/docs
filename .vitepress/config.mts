import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'imber',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '小记', link: '/note/next-note1' },
      { text: 'React', link: '/react/base' },
      { text: 'Nextjs', link: '/next/next-project' },
      { text: 'Editor', link: '/editor/selection' },
      { text: 'Web Animation', link: '/animation/gsap/useGSAP' },
      { text: 'Web 3D', link: 'https://imber-3d.netlify.app/' }
      // { text: 'Cli', link: '/cli/cli/intro' }
    ],

    sidebar: {
      '/note/': { base: '/note/', items: sidebarNote() },
      '/react/': { base: '/react/', items: sidebarReact() },
      '/next/': { base: '/next/', items: sidebarNext() },
      '/editor/': { base: '/editor/', items: sidebarEditor() },
      '/animation/': { base: '/animation/', items: sidebarAnimate() },
      '/cli/': { base: '/cli/', items: sidebarCli() }
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/imberZsk' }]
  }
})

function sidebarNote(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'next小技巧',
      link: 'next-note1'
    },
    {
      text: 'react源码学习',
      link: 'react-note1'
    },
    {
      text: 'react排他思想',
      link: 'react-note2'
    },
    {
      text: '编辑器tiptap小记',
      link: 'editor-note1'
    },
    {
      text: '浏览器指纹',
      link: 'browser'
    },
    {
      text: 'shadcn小记',
      link: 'shadcn'
    },
    {
      text: 'ps & 蓝湖',
      link: 'ps'
    },
    {
      text: '网站字体',
      link: 'font'
    },
    {
      text: 'AI工具小记',
      link: 'ai'
    },
    {
      text: '抽奖逻辑',
      link: 'lottery'
    },
    {
      text: '封装fetch',
      link: 'fetch'
    },
    {
      text: 'github图床&jsdelivr cdn',
      link: 'github-image'
    }
    // {
    //   text: '优雅的使用Nextjs',
    //   link: 'nextjs'
    // }
    // {
    //   text: 'react官网学习',
    //   link: 'editor-note1'
    // }
  ]
}

function sidebarReact(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'base',
      link: 'base'
    },
    {
      text: 'createElement',
      link: 'createElement'
    },
    {
      text: 'render',
      link: 'render'
    },
    {
      text: 'concurrent mode',
      link: 'concurrentMode'
    },
    {
      text: 'fiber',
      link: 'fiber'
    },
    {
      text: 'render & commit',
      link: 'render_commit'
    },
    {
      text: 'reconciliation',
      link: 'reconciliation'
    },
    {
      text: 'function components',
      link: 'function_components'
    },
    {
      text: 'hooks',
      link: 'hooks'
    }
  ]
}

function sidebarNext(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Nextjs',
      collapsed: false,
      items: [
        { text: '搭建Next15项目🔥', link: 'next-project-new' },
        { text: '工程化配置', link: 'next-project' },
        { text: 'Image', link: 'next-image' },
        { text: '代理&环境变量', link: 'next-proxy' },
        { text: 'SEO', link: 'next-sitemap' },
        { text: 'CSP', link: 'next-csp' },
        { text: '国际化', link: 'next-i18n' },
        { text: '服务端组件和客户端组件', link: 'next-server-client' },
        { text: 'SSR/SSG/ISR', link: 'next-ssr' },
        { text: 'Server Action', link: 'next-server-action' },
        { text: 'APP 路由', link: 'next-app-router' },
        { text: 'middleware(中间件)', link: 'next-middleware' },
        { text: '4个路由 Hook', link: 'next-router-hook' },
        { text: '2个表单 Hook', link: 'next-form-hook' },
        { text: '水合不一致问题', link: 'next-render-different' },
        { text: '部署相关', link: 'next-deploy' },
        { text: '性能指标', link: 'next-performance' },
        { text: '其它', link: 'next-other' },
        { text: 'Nextjs模拟XSS和CSRF', link: 'next-safe' }
      ]
    },
    {
      text: 'Zustand',
      collapsed: true,
      items: [
        { text: 'Context', link: 'zustand/context' },
        { text: 'Zustand', link: 'zustand/zustand' }
      ]
    },
    {
      text: 'SWR',
      collapsed: true,
      items: [
        { text: '基础', link: 'swr/swr-base' },
        { text: '复用请求', link: 'swr/swr-reuse' },
        { text: '拒绝状态提升', link: 'swr/swr-status' },
        { text: '串型请求', link: 'swr/swr-serial' },
        { text: '延迟加载数据', link: 'swr/swr-click' },
        { text: 'with-nextjs', link: 'swr/swr-nextjs' }
      ]
    },
    {
      text: 'Tailwind',
      collapsed: true,
      items: [
        { text: '优雅的使用Tailwind', link: 'tailwind/tw-config' },
        { text: 'Tailwind实用的类名', link: 'tailwind/tw-class' }
      ]
    },
    {
      text: 'Prisma',
      collapsed: true,
      items: [{ text: 'Prisma', link: 'prisma/prisma' }]
    },
    {
      text: 'NextAuth',
      collapsed: true,
      items: [{ text: 'NextAuth', link: 'next-auth/nextAuth' }]
    },
    {
      text: 'Strapi',
      collapsed: true,
      items: [
        { text: 'Strapi', link: 'strapi/strapi' }
        // { text: 'Strapi部署', link: 'strapi/strapi-deploy' }
      ]
    },
    {
      text: 'Docker',
      collapsed: true,
      items: [{ text: 'Docker', link: 'docker/docker' }]
    },
    {
      text: 'TurboRepo',
      collapsed: true,
      items: [
        { text: 'TurboRepo', link: 'turboRepo/turboRepo' },
        { text: 'TurboPack', link: 'turboRepo/turboPack' }
      ]
    }
  ]
}

function sidebarEditor(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'selection和range',
      link: 'selection'
    },
    { text: '编辑器技术选型', link: 'select' },
    { text: 'tiptap简介', link: 'tiptap' },
    { text: 'tiptap mvp版本（快速使用）🔥', link: 'mvp' },
    { text: 'tiptap 插件开发', link: 'plugin' },
    { text: '定制化 AI 功能 ', link: 'ai' },
    {
      text: '所有功能（持续更新）',
      link: 'editor-all/editor-all'
    }
  ]
}

function sidebarAnimate(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'GSAP',
      collapsed: false,
      items: [
        { text: 'GSAP 动画从性能到核心概念', link: 'gsap/gsap-smooth' },
        { text: 'useGSAP', link: 'gsap/useGSAP' },
        { text: 'gsap的各种包', link: 'gsap/gsap-core' },
        { text: 'gsap动画开发小记', link: 'gsap/gsap-note' },
        { text: '渐入效果', link: 'gsap/gsap-fade-in-1' },
        { text: '渐入与滚动动画效果', link: 'gsap/gsap-fade-in-2' },
        { text: '滚动钉住动画效果', link: 'gsap/gsap-pin-1' },
        { text: '动态叠层滚动效果', link: 'gsap/gsap-pin-2' }
      ]
    },
    {
      text: 'Framer Motion',
      collapsed: false,
      items: [{ text: 'Codesanbox视差效果', link: 'fm/fm-codesandbox' }]
    }
  ]
}

function sidebarCli(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '项目模版',
      collapsed: false,
      items: [
        { text: '介绍', link: 'project/intro' },
        { text: '功能', link: 'project/features' }
      ]
    },
    {
      text: '脚手架',
      collapsed: false,
      items: [{ text: '介绍', link: 'cli/intro' }]
    }
  ]
}

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
      { text: 'Editor', link: '/editor/selection' },
      { text: 'Web Animation', link: '/animation/useGSAP' },
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
        { text: 'Sitemap(SEO)', link: 'next-sitemap' },
        { text: 'CSP', link: 'next-csp' },
        { text: '国际化', link: 'next-i18n' },
        { text: '服务端组件和客户端组件', link: 'next-server-client' },
        { text: 'SSR/SSG/ISR', link: 'next-ssr' },
        { text: 'Server Action', link: 'next-server-action' },
        { text: 'APP 路由', link: 'next-app-router' },
        { text: '4个路由 Hook', link: 'next-router-hook' },
        { text: '缓存问题', link: 'next-cache' },
        { text: '水合不一致问题', link: 'next-render-different' },
        { text: '状态管理', link: 'context' },
        { text: '部署相关', link: 'next-deploy' },
        { text: '日志', link: 'next-log' },
        { text: '性能', link: 'next-performance' },
        { text: '其它', link: 'other' }
      ]
    },
    {
      text: 'Tailwind',
      collapsed: true,
      items: [{ text: '优雅的使用Tailwind', link: 'tw-config' }]
    },
    {
      text: 'TurboRepo',
      collapsed: true,
      items: [{ text: 'TurboRepo', link: 'turboRepo' }]
    },
    {
      text: 'Prisma',
      collapsed: true,
      items: [{ text: 'Prisma', link: 'prisma' }]
    },
    {
      text: 'Supabase',
      collapsed: true,
      items: [{ text: 'Supabase', link: 'supabase' }]
    },
    {
      text: 'Postgresql',
      collapsed: true,
      items: [{ text: 'Postgresql', link: 'postgresql' }]
    },
    {
      text: 'NextAuth',
      collapsed: true,
      items: [{ text: 'NextAuth', link: 'nextAuth' }]
    },
    {
      text: 'Strapi',
      collapsed: true,
      items: [
        { text: 'Strapi', link: 'strapi' }
        // { text: 'Strapi部署', link: 'strapi-deploy' }
      ]
    },
    {
      text: 'Docker',
      collapsed: true,
      items: [
        { text: 'Strapi', link: 'strapi' }
        // { text: 'Strapi部署', link: 'strapi-deploy' }
      ]
    }

    // {
    //   text: 'Typescript',
    //   collapsed: true,
    //   items: [{ text: 'Typescript规则问题', link: 'ts-qaq' }]
    // }
    // zustand
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
    { text: 'tiptap-nextjs初始化', link: 'project-standard' },
    { text: 'tiptap mvp版本（快速使用）🔥', link: 'mvp' },
    { text: 'tiptap 插件开发', link: 'tiptap-plugin' },
    { text: '定制化 AI 功能 ', link: 'ai' },
    { text: '相关功能', link: 'other' },
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
        { text: 'useGSAP', link: 'useGSAP' },
        { text: 'gsap的各种包', link: 'gsap-core' },
        { text: 'scrollTrigger', link: 'scrollTrigger' },
        { text: '渐入效果', link: 'gsap-fade-in-1' },
        { text: '渐入与滚动动画效果', link: 'gsap-fade-in-2' },
        { text: '滚动钉住动画效果', link: 'gsap-pin-1' },
        { text: '动态叠层滚动效果', link: 'gsap-pin-2' }
      ]
    },
    {
      text: 'Framer Motion',
      collapsed: false,
      items: [
        { text: 'pin效果', link: 'fm-pin-1' },
        { text: 'Codesanbox视差效果', link: 'fm-codesandbox' },
        { text: 'tab切换效果', link: 'fm-tab' }
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
    // {
    //   text: '1',
    //   collapsed: false,
    //   items: [{ text: '1', link: 'three-1' }]
    // }
  ]
}

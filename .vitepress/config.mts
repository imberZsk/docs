import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'imber的文档',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vercel', link: '/vercel/turborepo' },
      { text: 'React', link: '/react/turborepo' },
      { text: 'Vue', link: '/vue/turborepo' },
      { text: 'Nest', link: '/nest/turborepo' }
    ],

    sidebar: {
      '/vercel/': { base: '/vercel/', items: sidebarGuide() },
      '/react/': { base: '/react/', items: sidebarGuide() },
      '/vue/': { base: '/vue/', items: sidebarGuide() }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

/* prettier-ignore */
function sidebarGuide(): DefaultTheme.SidebarItem[] {
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
      collapsed: false,
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
        { text: 'Extending the Default Theme', link: 'extending-default-theme' },
        { text: 'Build-Time Data Loading', link: 'data-loading' },
        { text: 'SSR Compatibility', link: 'ssr-compat' },
        { text: 'Connecting to a CMS', link: 'cms' }
      ]
    },
    {
      text: 'Commerce',
      collapsed: false,
      items: [
        { text: 'MPA Mode', link: 'mpa-mode' },
        { text: 'Sitemap Generation', link: 'sitemap-generation' }
      ]
    },
    { text: 'Config & API Reference', base: '/reference/', link: 'site-config' }
  ]
}

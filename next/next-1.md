## 项目基建

`eslint prettier lint-staged husky npmrc nvmrc turborepo engines packageManager editorconfig tailwind`

## sitemap

`app/sitemap.ts`

```js
import { siteConfig } from '@/config'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.domain}/`,
      lastModified: new Date()
    },
    {
      url: `${siteConfig.domain}/dashboard`,
      lastModified: new Date()
    }
  ]
}
```

## csp

`src/middleware.ts`

```js
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

export function middleware(request: NextRequest) {
  const cspHeader = `
    default-src 'self' https://www.google-analytics.com/;
    script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com/;
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`

  const requestHeaders = new Headers()

  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  )

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
```

```js
import { headers } from 'next/headers'

const nonce = headers().get('x-nonce') || ''

 <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-3XQLVXB48J"
        strategy="afterInteractive"
        nonce={nonce}
      ></Script>
      <Script nonce={nonce} id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-3XQLVXB48J');
      `}
      </Script>
```

## canonical

```js
<link rel="canonical" href={`${siteConfig.domain}`}></link>
```

## 国际化

middleware.ts

```js
import { NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import type { NextRequest } from 'next/server'

const locales = ['zh-CN', 'en-US']
const defaultLocale = 'zh-CN'

function getLocale(request: NextRequest) {
  const headers = {
    'accept-language': request.headers.get('accept-language') || ''
  }
  const languages = new Negotiator({ headers }).languages()
  return match(languages, locales, defaultLocale)
}

const { pathname } = request.nextUrl

const pathnameHasLocale = locales.some(
  (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
)

if (pathnameHasLocale) return

const locale = getLocale(request)

if (locale === 'zh-CN') return

request.nextUrl.pathname = `/${locale}${pathname}`
return Response.redirect(request.nextUrl)

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
```

获取多语言 Json

```js
import 'server-only'

const dictionaries = {
  'en-US': () => import('@/config/en-US.json').then((module) => module.default),
  'zh-CN': () => import('@/config/zh-CN.json').then((module) => module.default)
}

export type Locale = 'en-US' | 'zh-CN'

export const getLang = async (locale: Locale) => dictionaries[locale]()
```

## SSR

关键是指定`fetch`的第二个参数为`{ cache: 'no-store' }`

```js
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  const projects = await res.json()

  return projects
}

export default async function Dashboard() {
  const projects = await getProjects()

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```

## SSG

关键是将  `fetch()`  默认为  `cache: 'force-cache'`（也可以指定动态路径`generateStaticParams`，相当于 `pages router` 的 `getStaticPaths`，如果指定 `fallback` 只有 `true` 和 `false` ，没有 `blocking` 了）

```js
async function getProjects() {
  const res = await fetch(`https://...`)
  const projects = await res.json()

  return projects
}

export default async function Index() {
  const projects = await getProjects()

  return projects.map((project) => <div>{project.name}</div>)
}
```

## ISR

关键是指定`fetch`的第二个参数为`{ revalidate: 'xxx秒' }`

```js
async function getPosts() {
  const res = await fetch(`https://.../posts`, { next: { revalidate: 60 } })
  const data = await res.json()

  return data.posts
}

export default async function PostList() {
  const posts = await getPosts()

  return posts.map((post) => <div>{post.name}</div>)
}
```

## 水合不一致问题

`suppressHydrationWarning`

`https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content`

可能不规则的 html 标签写法，如 p>div，或者数据水合出错

```jsx
const text = typeof window !== 'undefined' ? '1' : '2'

const [text, setText] = useState('1')

useEffect(() => {
  setText('2')
}, [])
```

## 埋点

## 主题切换

```js
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/ui/ThemeProvider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black">
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

```js
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0]

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

```js
'use client'

import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="mt-16 px-4 py-2 text-white dark:text-black bg-black dark:bg-white font-semibold rounded-md"
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    >
      Change Theme
    </button>
  )
}

export default ThemeToggle
```

```js
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>
```

## eslint 里配置 tailwindcss/recommended'

eslint-plugin-tailwindcss

```js
const prettierConfig = require('./prettier.config.js')

module.exports = {
  $schema: 'https://json.schemastore.org/eslintrc',
  root: true,
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:tailwindcss/recommended'
  ],
  plugins: ['tailwindcss', 'unused-imports', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'prettier/prettier': ['warn', prettierConfig],
    'react/jsx-key': 'off',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'error',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'none',
        argsIgnorePattern: '^_'
      }
    ]
  },
  settings: {
    tailwindcss: {
      callees: ['cn'],
      config: 'tailwind.config.js'
    },
    next: {
      rootDir: ['./']
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser'
    }
  ]
}
```

## tailwind-merge

```js
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## title 插槽

```js
title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
```

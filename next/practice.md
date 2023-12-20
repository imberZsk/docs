## 项目基建

`eslint prettier lint-staged husky npmrc nvmrc turborepo engines packageManager editorconfig`

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

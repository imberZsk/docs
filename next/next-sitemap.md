> [Google 支持的 meta 标记和属性](https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=zh-cn)

## sitemap

`sitemap` 是利于 `SEO` 的，如苹果官网的 `https://www.apple.com/sitemap.xml`

nextjs 中在 `app/sitemap.ts` 配置即可

```js
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://imber.top',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: 'https://imber.top/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://imber.top/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    }
  ]
}
```

## sitemap 支持国际化

```js
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://imber.top',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://imber.top/es',
          de: 'https://imber.top/de'
        }
      }
    },
    {
      url: 'https://imber.top/about',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://imber.top/es/about',
          de: 'https://imber.top/de/about'
        }
      }
    },
    {
      url: 'https://imber.top/blog',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://imber.top/es/blog',
          de: 'https://imber.top/de/blog'
        }
      }
    }
  ]
}
```

## canonical

另一个 `seo` 友好的配置，集中权重

```js
<link rel="canonical" href="https://imber.top"></link>
```

## TDK

静态 `TDK` 很简单，这里就举例一下可以这样设置动态 `TDK`

`layout.tsx`

```js
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const tdkId = xxx

  const product = await fetch(
    `https://dms-dataapi.meizu.com/data/jsdata.json?blockIds=${tdkId}`
  ).then((res) => res.json())

  const productObject = product[`block_${tdkId}`][0]

  const { title, description, keywords } = productObject

  return {
    title,
    description,
    keywords
  }
}
```

## Title 插槽

```js
title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
```

## robots

`app > robots.ts`

```js
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
      // disallow: '/private/'
    },
    sitemap: 'https://acme.com/sitemap.xml'
  }
}
```

生成如下格式

```bash
User-Agent: *
Allow: /
Disallow: /private/

Sitemap: https://imber.top/sitemap.xml
```

## 直接添加站点

[百度搜索资源平台](https://ziyuan.baidu.com/?castk=LTE%3D)

## 其他

[Open Graph protocol](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) 、 `RSS` 订阅 、 [Twitter Card](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)、[JSON-LD](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld) 等

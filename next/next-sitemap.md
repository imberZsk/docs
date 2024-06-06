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

另一个 `seo` 友好的配置

```js
<link rel="canonical" href="https://imber.top"></link>
```

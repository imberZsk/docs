用法

```js
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  return undefined
}
```

支持的性能指标

![alt text](next-performance-1.png)

## analyzer

[Bundle Analyzer](https://nextjs.org/docs/app/building-your-application/optimizing/bundle-analyzer) `bundle` 分析器

安装

`pnpm add @next/bundle-analyzer`

使用

```js
import withBundleAnalyzer from '@next/bundle-analyzer'

export default withBundleAnalyzer(nextConfig)
```

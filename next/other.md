## 主题切换

[Shadcn Dark mode](https://ui.shadcn.com/docs/dark-mode/next)

## 走 CDN 时打包不一致问题

```js
const { execSync } = require('node:child_process')

generateBuildId: async () => {
  try {
    // 由于docker那边没有git,所以不能这样
    const gitHash = execSync('git rev-parse HEAD').toString().trim()
    return gitHash
  } catch (error) {
    console.error('获取Git提交哈希时发生错误:', error)
    return null // 返回null或其他默认值作为构建ID
  }
}
```

## 页面 304 问题

```js
export const dynamic = 'force-dynamic'
```

## 延迟加载

加载阿里云 oss 的包的时候，`await import()`，可以等用到的时候再加载第三方包

或者使用`next/dynamic`

```jsx
import dynamic from 'next/dynamic'

const ComponentA = dynamic(() => import('../components/A'))
const ComponentB = dynamic(() => import('../components/B'))
const ComponentC = dynamic(() => import('../components/C'), { ssr: false })
```

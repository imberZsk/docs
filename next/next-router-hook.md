> 都只能在客户端使用

## useParams

用于获取动态路由的路由段

![alt text](image-53.png)

```jsx
'use client'

import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams<{ id: string }>()
  const { id } = params

  return <div>{id}</div>
}

export default Page

```

## usePathname

用于获取 `URL` 的路径名

![alt text](image-54.png)

如 `http://localhost:3000/photo/1` 返回 `/photo/1`

```jsx
'use client'

import { usePathname } from 'next/navigation'

const Page = () => {
  const pathname = usePathname()

  return <div>{pathname}</div>
}

export default Page
```

## useRouter

编程式路由，可以用`router.prefetch(href: string)`实现和 `Link` 一样的预取功能，但是尽量用 `Link`，因为 `Link` 渲染 `a` 标签更好

```js
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

## useSearchParams

用于读取当前 `URL` 的查询字符串

```js
'use client'

import { useSearchParams } from 'next/navigation'

const Page = () => {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  return <div>{id}</div>
}

export default Page
```

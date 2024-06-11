# App Router

## Server Components

在 Next.js App Router 中，所有的组件都被默认视为 React Server Components (RSC) 。在 RSC 中您只能 从 SWR 引入序列化 Key API

```js
app / page.tsx
import { unstable_serialize } from 'swr' // ✅ 在 Server components 中可用
import { unstable_serialize as infinite_unstable_serialize } from 'swr/infinite' // ✅ 在 Server components 中可用
```

您不能从 SWR 引入其他 API ，因为它们在 RSC 中不可用。

```js
app / page.tsx
import useSWR from 'swr' // ❌ 在 Server components 中不可用
```

## Client Components

您可以直接用 'use client' 标记您的组件或者从 Client Components 引入 SWR ，两种方法都允许您使用 SWR 提供的客户端数据获取 Hooks。

```js
app/page.tsx
'use client'
import useSWR from 'swr'
export default Page() {
  const { data } = useSWR('/api/user', fetcher)
  return <h1>{data.name}</h1>
}
```

如果您需要在 Server Components layout 或者 page 中使用 SWRConfig 配置公共设置，请创建一个独立的 Provider Client Component 以初始化 Provider 和配置，然后在 Server Component Pages 中使用它。

```js
app/swr-provider.tsx
'use client';
import { SWRConfig } from 'swr'
export const SWRProvider = ({ children }) => {
  return <SWRConfig>{children}</SWRConfig>
};

app/page.tsx
// 这仍然是一个 Server Component
import { SWRProvider } from './swr-provider'
export default Page() {
  return (
    <SWRProvider>
      <h1>hello SWR</h1>
    </SWRProvider>
  )
}
```

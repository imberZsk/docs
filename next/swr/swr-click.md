## 延迟加载数据，直到需要的时候

你也可以使用 `useSWRMutation` 来加载数据。`useSWRMutation` 在 `trigger` 被调用之前永远不会开始请求，所以你可以推迟到真正需要时再加载数据。

```jsx
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Page = () => {
  const [show, setShow] = useState(false)
  // 直到 trigger 被调用前，data 都为 undefined
  const { data: user, trigger } = useSWRMutation('/api/user', fetcher)

  return (
    <div>
      <button
        onClick={() => {
          trigger()
          setShow(true)
        }}
      >
        Show User
      </button>
      {show && user ? <div>{user.name}</div> : null}
    </div>
  )
}
```

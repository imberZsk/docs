## context

抽离成组件，`provider` 间可以嵌套

```js
'use client'

// 记录页面中的一个公用弹窗的打开状态

import { createContext, useState } from 'react'

export const ToastContext = createContext({
  toastValue: false,
  setToast: (toast: boolean) => {}
})

export default function ToastProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [toastValue, setToastValue] = useState(false)
  return (
    <ToastContext.Provider
      value={{
        toastValue,
        setToast: (toast: boolean) => {
          setToastValue(toast)
        }
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}
```

使用

```js
import { useContext } from 'react'
import { ToastContext } from './toast-provider'

const toastShareValue = useContext(ToastContext)

// console.log(toastShareValue.toastValue)
// toastShareValue.setToast(true)
```

## zustand

- [Setup with Next.js](https://docs.pmnd.rs/zustand/guides/nextjs)
- 对于嵌套的数据结构，不想用扩展运算符，还是 `immer`
- 对于协同文档 [zustand-middleware-yjs](https://github.com/joebobmiles/zustand-middleware-yjs)，[zustand-yjs](https://github.com/tandem-pt/zustand-yjs)
- 数据持久化

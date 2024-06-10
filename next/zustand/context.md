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

然后在 `layout.tsx` 或者在别的需要的地方包裹组件

```js
import ToastProvider from './toast-provider'

export default function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html>
      <body>
          <ToastProvider>
            {props.children}
          </ToastProvider>
      </body>
    </html>
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

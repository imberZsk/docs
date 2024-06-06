## server action 的用处

之前说了，服务端组件可以直接调用服务端操作（服务端组件用 `form` 的 `action` 提交的时候也用 `server action`），但是客户端组件只能通过 `server action` 调用服务端操作

## 服务端组件和客户端组件里使用

服务端组件可以在文件里，也可以新建一个文件在顶层`server action`

文件里，这种方式只能在服务端组件里使用

```js
// Server Component
export default function Page() {
  // Server Action
  async function create() {
    'use server'

    // ...
  }

  return (
    // ...
  )
}
```

客户端组件则只能新建一个文件在顶层`server action`

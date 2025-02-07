## 水合不一致问题

- 用`next-themes`的时候，可以用`suppressHydrationWarning`，`<html lang="zh" suppressHydrationWarning>`抑制水合警告

- [处理不同的客户端和服务器内容](https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content)

- 可能不规则的 `html` 标签写法，如 `p>div`，或者数据水合出错
- 错误的编程方式

```jsx
// ❌ 这样会导致两次渲染不一样
const text = typeof window !== 'undefined' ? '1' : '2'

// ✅ 解决方案是再客户端重新执行一遍
const [text, setText] = useState('1')

useEffect(() => {
  setText('2')
}, [])
```

- 服务器/客户端分支‘ if (typeof window !== ’undefined‘) ’
- 变量输入，如‘ Date.now() ’或‘ Math.random() ’，每次调用时都会更改。
- 用户语言环境中的日期格式与服务器不匹配。
- 外部更改数据，而不发送与 HTML 一起的快照。
- 无效的 HTML 标签嵌套。

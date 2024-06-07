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

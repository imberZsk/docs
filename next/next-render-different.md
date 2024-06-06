## 水合不一致问题

`suppressHydrationWarning`

`https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content`

可能不规则的 html 标签写法，如 p>div，或者数据水合出错

```jsx
const text = typeof window !== 'undefined' ? '1' : '2'

const [text, setText] = useState('1')

useEffect(() => {
  setText('2')
}, [])
```

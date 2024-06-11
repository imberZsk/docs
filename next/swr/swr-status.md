> swr 有去除重复、缓存 和 共享功能

如果不使用 `useSWR`，则一般用状态提升

```js
// 页面组件

function Page() {
  const [user, setUser] = useState(null)

  // 请求数据
  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [])

  // 全局加载状态
  if (!user) return <Spinner />

  return (
    <div>
      <Navbar user={user} />
      <Content user={user} />
    </div>
  )
}

// 子组件

function Navbar({ user }) {
  return (
    <div>
      ...
      <Avatar user={user} />
    </div>
  )
}

function Content({ user }) {
  return <h1>Welcome back, {user.name}</h1>
}

function Avatar({ user }) {
  return <img src={user.avatar} alt={user.name} />
}
```

通常，我们需要将所有的数据请求都保存在顶级组件中，并为树深处的每个组件添加 `props`。如果我们给页面添加更多的数据依赖，代码将变得更加难以维护。

使用 `useSWR`

```js
// 页面组件

function Page() {
  return (
    <div>
      <Navbar />
      <Content />
    </div>
  )
}

// 子组件

function Navbar() {
  return (
    <div>
      ...
      <Avatar />
    </div>
  )
}

function Content() {
  const { user, isLoading } = useUser()
  if (isLoading) return <Spinner />
  return <h1>Welcome back, {user.name}</h1>
}

function Avatar() {
  const { user, isLoading } = useUser()
  if (isLoading) return <Spinner />
  return <img src={user.avatar} alt={user.name} />
}
```

现在数据已 绑定 到需要该数据的组件上，并且所有组件都是相互 独立 的。所有的父组件都不需要关心关于数据或数据传递的任何信息。它们只是渲染。现在代码更简单，更易于维护了。

最棒的是，只会有 1 个请求 发送到 API，因为它们使用相同的 SWR key，因此请求会被自动 去除重复、缓存 和 共享。

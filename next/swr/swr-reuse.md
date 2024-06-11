封装请求

```js
function useUser(id) {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)

  return {
    user: data,
    isLoading,
    isError: error
  }
}
```

在组件中使用它：

```js
function Avatar({ id }) {
  const { user, isLoading, isError } = useUser(id)

  if (isLoading) return <Spinner />
  if (isError) return <Error />
  return <img src={user.avatar} />
}
```

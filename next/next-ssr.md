## SSR

关键是指定`fetch`的第二个参数为`{ cache: 'no-store' }`

```js
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  const projects = await res.json()

  return projects
}

export default async function Dashboard() {
  const projects = await getProjects()

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```

## SSG

`Nextjs` 默认是 `SSG`，关键是将  `fetch()`  默认为  `cache: 'force-cache'`（也可以指定动态路径`generateStaticParams`，相当于 `pages router` 的 `getStaticPaths`，如果指定 `fallback` 只有 `true` 和 `false` ，没有 `blocking` 了）

```js
async function getProjects() {
  const res = await fetch(`https://...`)
  const projects = await res.json()

  return projects
}

export default async function Index() {
  const projects = await getProjects()

  return projects.map((project) => <div>{project.name}</div>)
}
```

## ISR

关键是指定`fetch`的第二个参数为`{ revalidate: 'xxx秒' }`

```js
async function getPosts() {
  const res = await fetch(`https://.../posts`, { next: { revalidate: 60 } })
  const data = await res.json()

  return data.posts
}

export default async function PostList() {
  const posts = await getPosts()

  return posts.map((post) => <div>{post.name}</div>)
}
```

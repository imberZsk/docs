## link 和 useRouter

`Link` 默认预渲染，Link 可以导航到特定 id 位置（尽量多使用 Link（a 标签），当复制文章的时候能被浏览器识别为链接，而普通的 div 加事件不行）

```js
<Link href="/dashboard#settings">Settings</Link>
```

`useRouter` 也可以配置

```js
router.prefetch(href: string)
```

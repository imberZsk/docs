## layout

如切换 `tab` 的时候，`layout` 不会重新渲染，会保留状态，而且可以 `layout` 嵌套，在 `rootLayout` 里不要使用客户端组件。

里面也可以嵌入 client 组件

## 错误处理 error

`error.tsx`，里面还能`reset`

## 流式渲染

把组件分成客户端组件和服务端组件，在有请求的异步组件里配置`loading.tsx`，这样就能增量渲染

## middleware

## 项目目录组织

## 国际化

`next` 官网上方法不支持 `default router`，todo....

## link 和 useRouter

`Link` 默认预渲染，Link 可以导航到特定 id 位置（尽量多使用 Link（a 标签），当复制文章的时候能被浏览器识别为链接，而普通的 div 加事件不行）

```js
<Link href="/dashboard#settings">Settings</Link>
```

`useRouter` 也可以配置

```js
router.prefetch(href: string)
```

## 路由组

`()`，分组而已，不会渲染路径

## 动态路由

`[]`，在 `page.tsx` 里可以用 `{params}` 接收到参数

## 并行路由

## 拦截路由

## router handler

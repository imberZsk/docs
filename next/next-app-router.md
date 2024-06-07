## 路由组(Route Groups)

`()`，只是文件目录分组，不会渲染路径

## 动态路由(Dynamic Routes)

`[]`，`Dynamic Segment` 作为 `params` `props` 传递给 、 `layout` 、`route` 、 `page` 和 `generateMetadata` 函数

## 平行路由(Parallel Routes)

`@`，仪表盘页面到时候用，但是感觉用组件就行了，还有就是和拦截路由一起做一个效果

## 拦截路由(Intercepting Routes)

`(.)`

[dribbble](https://dribbble.com/)和小红书都有这个效果，在刷新页面时保留上下文，而不是关闭`modal`

这个效果需要拦截路由，平行路由，动态路由一起配合实现，参考 [nextgram](https://github.com/vercel/nextgram)

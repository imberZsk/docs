## 一、Turbopack 增量设计

基于 `Turbo` 引擎支持增量计算，由 `rust` 编写，比 `js` 速度更快；

## 二、Turbopack 开箱即用

`Turbopack` 目前在 `Next13` 以上开箱即用，在 `package.json` 里配置 `next dev --turbo` 即可；

## 三、函数级缓存

`Turbopack` 能做到函数级别的缓存，也就是说更细化；

## 四、按需编译

也就是说不会像 `webpack` 一样全量编译；

## 五、请求级编译

相比于页面级编译更智能；如果浏览器想要一些  CSS，turbopack 只会编译它  -  不编译引用的图像。背后  next/dynamic  有一个大的图表库，在显示图表的选项卡之前不会编译它。Turbopack 甚至知道不要编译源映射，除非你的 Chrome DevTools 是开放的；

## 六、Turbopack 支持 RSC/多环境

支持打包 `React Server Component`和服务端；

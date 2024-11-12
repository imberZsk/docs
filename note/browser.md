## 浏览器指纹

背景：不需要用户登录注册，也能区分用户，得到一个用户唯一 ID，这个时候就可以使用浏览器指纹，虽然在很多数据量的情况下，会有重复情况，但基本可以忽略不计

这个网站有介绍很多种浏览器指纹方案 https://browserleaks.com/

但自己实现经过测试，会有很大问题，比如 safari 上无痕浏览器 ID 就会变化

目前看到 https://fingerprint.com/ 这个开源库是没有问题的，但是有分 fingerprintjs 和 fingerprint pro，需要用免费的 [fingerprintjs](https://github.com/fingerprintjs/fingerprintjs/blob/master/docs/migration/v3_v4.md)，也就是这个 `@fingerprintjs/fingerprintjs` 包

然后只需要几句代码就能拿到唯一 ID

```js
// 动态导入 FingerprintJS 库
const FingerprintJS = (await import('@fingerprintjs/fingerprintjs')).default

// 加载 FingerprintJS
const fp = await FingerprintJS.load()

// 获取访客标识符
const visitorId = (await fp.get()).visitorId
```

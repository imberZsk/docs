> Nextjs14 开始，客户端服务端交互的时候（非服务端组件，因为服务端组件是直接和服务端交互），有几个选择
>
> - 正常 `spa` 开发，代理加 `useEffect` 里请求
> - `router handler`
> - `server action`

## 接口代理(解决跨域)

配置 `next.config.js`

```js
async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://xxx.com/:path*' // 配置代理地址为
      }
    ]
  },
```

## 环境变量

代理往往和环境变量一起使用，必须指定`NEXT_PUBLIC_`前缀才能在客户端访问

`.env.development`

```js
NEXT_PUBLIC_BASE_URL=/api
```

`.env.production`

```js
NEXT_PUBLIC_BASE_URL=https://xxx.com
```

使用的时候

```js
let BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
// 然后用在接口的地方
```

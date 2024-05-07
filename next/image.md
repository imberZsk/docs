## 配置图片域名协议

```js
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
      },
    ],
  }
```

## 图片渐进加载效果

## 图片警告问题

![alt text](image-41.png)

产生原因是这个图片设置的 `width` 和 `height` 和真实图片的宽高不一致，`next` 就认为图片发生了偏移，图片宽高有小数往往不行。所以先尝试设置匹配的 `width` 和 `height`。如果还不行可以给个父盒子，`Image` 上 `width` 为 0，`height` 为 0，然后 `className="h-auto w-full"` 就可以解决。

```jsx
<div className="absolute bottom-[70px] right-0 h-[316] w-[120px]">
  <Image
    src={xxx}
    alt=""
    width={0}
    height={0}
    className="h-auto w-full"
  ></Image>
</div>
```

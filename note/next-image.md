## next Image 图片闪烁问题

我有一张 1200 \* 2560 的图片，但是我想要让它全屏显示，但是发现在 next image 上面，图片会闪烁，这是有问题的代码

```jsx
<div className="mx-auto mb-[4vw] h-[60vw] w-[96vw] sm:mb-[25.6px] xl:mb-0 xl:h-screen xl:w-full">
  <Image
    src={bg_h5}
    height={600}
    width={960}
    className="h-full w-full object-cover xl:hidden"
    alt=""
  />
  <Image
    src={bg_pc}
    height={1200}
    width={2560}
    className="hidden h-full w-full object-cover xl:block"
    alt=""
  />
</div>
```

next-headers 这类的可以拿到 ua，就不用放弃服务端渲染了

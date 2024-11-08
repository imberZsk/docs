gsap 切换，用 stagger 是什么原理？

gsap 中的小于和大于

fm 的 key 可以用来触发动画

```js
<AnimatePresence>
  <motion.div
    key={cur}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  ></motion.div>
</AnimatePresence>
```

swiper 服务端渲染 loop 的时候有问题，元素太少导致的

const isWeChatBrowser = () => {
const ua = navigator.userAgent.toLowerCase()
return ua.includes('micromessenger')
}

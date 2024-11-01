## 排他思想

做切换车的皮肤的时候，要把当前皮肤透明度变为 1，其它的透明度变为 0

需要用 `ref` 来保存每个 `div` 的引用，然后通过遍历的方式，把除了当前点击的 `div` 的透明度变为 1，其它的透明度变为 0

```js
const imageRefs = useRef<(HTMLDivElement | null)[]>([])

const handleItemClick = (index: number) => {
  imageRefs.current.forEach((ref, i) => {
    if (ref && i !== index) {
      gsap.to(ref, { opacity: 0 })
    }
  })

  if (imageRefs.current[index]) {
    gsap.to(imageRefs.current[index], { opacity: 1 })
  }
}
```

注意 `ref` 接收函数的时候，返回值一定要是 `undefined`

```jsx
{
  node.map((item, index) => {
    return (
      <div
        key={index}
        ref={(el) => {
          imageRefs.current[index] = el
        }}
      ></div>
    )
  })
}
```

## instanceof

```js
function instanceof(a,b){

  //  左边的隐式原型
  const l = a.__proto__

  // 右边的显示原型
  const r = b.prototype

  //
  while(true){

  if(l===null){
    return false
  }

  if(l === r){
    return true
  }
  l = l.__proto__
}
}
```

## 深拷贝

```js
function deepClone(obj, cache = new WeakMap()) {
  // 首先不能拷贝基础数据类型
  if (typeof obj !== 'object' || obj === null) return

  // 如果能获取到缓存值
  if (cache.has(obj)) {
    return cache.get(obj)
  }

  // 定义一个拷贝的数据
  const target = obj instanceof Array ? [] : {}

  // 存
  cache.set(obj, target)

  for (let key in obj) {
    // for in会遍历原型上的属性，所以加hasOwnProperty
    if (obj.hasOwnProperty(key)) {
      // 递归
      target[key] = deepClone(obj[key], cache)
    }
  }

  return target
}
```

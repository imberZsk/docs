## new

```js

function new(fn){

  // const newObj = {}
  // newObj.__proto__ = fn.prototype

  // 创建一个空对象隐式原型指向函数的显示原型
  const newObj = Object.create(fn.prototype)

  // 执行函数得到返回值
  const res = fn.apply(newObj,arguments)

  // 如果返回值是值类型直接返回，如果是引用类型返回newObj
  return typeof(res) === 'object' && res !== null ? res : newObj
}
```

## instanceof

```js
function instanceof(a,b){

  //  左边的隐式原型
  const l = a.__proto__

  // 右边的显示原型
  const r = b.prototype

  // 一直查找
  while(true){

    // 如果找完了还没有则为false
    if(l===null){
      return false
    }

    // 如果找到了则为true
    if(l === r){
      return true
    }

    // 查找
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

## 数组转树

```js
function ArrToTree(arr, id = 0) {
  const target = []

  arr.forEach((item) => {
    // 如果找到子item
    if (item.parentId === id) {
      // 递归传入整个数组和item.id去查子元素
      const children = ArrToTree(arr, item.id)

      if (children.length > 0) {
        item.children = children
      }

      target.push(item)
    }
  })

  return target
}
```

## 拍平数组

```js
// 递归
function flat(arr) {
  const target = []
  arr.forEach((item) => {
    if (item instanceof Array) {
      target.push(...flat(item))
    } else {
      target.push(item)
    }
  })

  return target
}

// reduce
function flat(arr) {
  let res = arr.reduce((pre, next) => {
    return pre.concat(Array.isArray(next) ? flat(next) : next)
  }, [])
  return res
}
```

## 防抖

```js
function debounce(fn, time) {
  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, time)
  }
}
```

## 节流

```js
function throttle(fn, time) {
  let old = 0 //0可以立即执行
  return function () {
    const timestamp = Date.now()
    if (timestamp - old > time) {
      fn.apply(this, arguments)
      old = timestamp
    }
  }
}
```

## 冒泡排序

## 快速排序

## 拖动

## 倒计时

## 抢红包

## 版本号排序

## 柯里化

## 响应式

## 推拽

## 字符串全排列

## promise

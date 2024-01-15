> 基于 Tailwind 的组件

## 加载中

```js
<div className="flex items-center justify-center h-screen absolute left-0 top-0 w-full">
  <div className="animate-spin rounded-full h-8 w-8 border-4 border-b-transparent border-[#ff4132] "></div>
</div>
```

## 切换按钮

```js
<div
  className={`w-[10vw] h-[5.6vw] relative rounded-[11px] transition-colors duration-500 ${
    field.value ? 'bg-[#ff4132]' : 'bg-[rgba(0,0,0,0.08)]'
  }`}
  onClick={toggleIsDefault}
>
  <div
    className={`rounded-[50%] h-[3.9vw] ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] w-[3.9vw] bg-[#fff] absolute top-[50%] translate-y-[-50%] transition-all duration-500 ${
      field.value ? 'right-[0.8vw]' : 'right-[5.3vw]'
    }`}
  ></div>
</div>
```

## 弹窗

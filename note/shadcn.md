## 不常见的 tailwind 样式 ring & focus-visible

这个 shadcn 封装的按钮的一部分代码，`'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'`，这里有两个不常见的属性，focus-visible:和 ring

`focus-visible` 这个属性就像是显式的 focus，但键盘选中它可以触发，查了一下屏幕阅读器也可以，但这块好像是给盲人用的，不太了解

`ring` 和阴影相关，看这个阴影就感觉是一坨，如下：

![alt text](image-5.png)

它和 border 一样，但不会占据位置，属性也和 border 一个意思

![alt text](image-6.png)

先看看 shadow，这是它的取值，`box-shadow: h-offset v-offset blur-radius spread-radius color;`

- h-offset：水平偏移量，正值向右，负值向左。
- v-offset：垂直偏移量，正值向下，负值向上。
- blur-radius：模糊半径，值越大，阴影越模糊。可选参数，默认为 0。
- spread-radius：扩展半径，正值会使阴影变大，负值会使阴影变小。可选参数，默认为 0。
- color：阴影的颜色。可选参数，默认为黑色。

ring 和第四个和第五个值相关，ring-2 就表示 spread-radius 为 2px，ring-ring 就表示预设在 global.css 里的 ring 颜色

还有一个 offset，如 focus-visible:ring-offset-4，也就是中间的间隔，它其实在中间层设置了一个阴影为白色，还让再外面再设置一个我们看到的颜色

![alt text](image-7.png)

![alt text](image-8.png)

这种是多个阴影的写法，比如上面的 offset，我们用普通 css 如下：

```css
.test {
  box-shadow: 0px 0px 0px 4px pink, 0px 0px 0px 10px red;
}
```

![alt text](image-9.png)

![alt text](image-10.png)

## 动画

这是一个鼠标放上去卡片悬停的组件，会发现它的逻辑跟 tailwind 类名有关，好像它是怎么做的动画

![alt text](image-11.png)

这是类名

```css
'duration-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
```

这是它用的插件，如果在 tailwind.config.ts 中注释掉这个插件，就没有 fade in/out 效果了。

```js
plugins: [require('tailwindcss-animate')]
```

可以看到元素身上有个 data-state 属性，这个属性的值是 close 和 open，也就是说，主要是切换的 open 和 close 两个状态。

![alt text](image-12.png)

所以说其实主要的就是 `tailwindcss-animate`，如果要想自己设置动画，就可以自己查阅[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) 设置想要的动画值

## 表单

react-hook-form

## 总结

1. 对 shadcn 的理解：它是组件集合：它不是一个组件库，是一个可复用的组件集合，没有预先设计好的，固定的样式和行为
2. 优势有亮点：一个是 headless，灵活控制样式，第二个是 增量使用，性能更好

```

```

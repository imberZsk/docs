# 优雅的使用 Tailwind

## 目录

- 怎么解决滥用的[]（&主题切换）？
- 怎么优化 Tailwind 杂乱的排序方式？
- 不用 class 怎么给统一给标签设置类名？
- 怎么复用重复的样式？
- Tailwind 中的选择器也很强大
- @layer base component utilities
- 响应式布局
- clsx/classnames tw-merge cva
- 性能
- 封装思维的小转变，带来极致使用体验
- Shadcn 封装 Button
- js 中支持 tailwind 提示
- tailwind 的设计
- refactoringui
- 思考 tailwind & shadcn

## 怎么解决滥用的[]（&主题切换）

回头看之前写的 `Tailwind` 无数的 `[]`，非常不优雅，这种`[]`可以分为两类，一类是`text-[1px]`这种单位类型的，一类是`text-[#ccc]`，这种特定值类型的

![alt text](tailwind-1.png)

#### 解决单位类型的[]，也就是要做到 p-1 = padding:1px

方案一，记住且习惯常用的预设，特别是要只知道，p-1 的 1，在页面的时候是 4px，也就是翻了 4 倍

![alt text](image.png)

方案二，如果习惯 p-1 就是 `padding:1px`的人来说，可以设置 `global.css` 的`:root` 中配置 `font-size: 25%;`，让 `1rem` 等于 `4px`，而不是 `16px`，
这个原理其实是 tailwind 预设的默认值就是 p-1 等于 0.25rem，也就是 16 \* 0.25 = 4px，而设置了 25%后，就是 16 \* 0.25 \* 0.25 = 1px，也就是想要的结果了

![alt text](image-2.png)

![alt text](image-3.png)

#### 解决特定值类型的[] (主题切换也是这个功能)

比如颜色值，`theme.extend.colors` 配置和 `global.css` 配置结合，`text-[#fff]` 写成 `text-primary`，也就是通过**预设的值来复用**

![alt text](tailwind-3.png)

再结合 [Next-Theme](https://ui.shadcn.com/docs/dark-mode/next)，可以轻松实现切换主题，如果要自己写，略微麻烦，之前写过一篇文章，可以了解主题切换原理：[主题切换文章](https://juejin.cn/post/7331070714766082074)

## 怎么优化 Tailwind 杂乱的排序方式

比如这样一段代码，在不考虑复用的情况，明明是一样的几个类名，因为顺序问题，导致难以维护，这是 tailwind[推荐的排序方式](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted)，第三方类名>布局类名>装饰类名

```css
<div class="mt-3 flex -space-x-2 overflow-hidden">
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="w-12 h-12 rounded-full ring-2 ring-white inline-block" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12  ring-2 ring-white rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
  </div>
```

参考 [官网](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted)，`prettier-plugin-tailwindcss` 这个插件可以自动格式化 `Tailwind` 类名排序，就能得到工整的类名

```css
<div class="mt-3 flex -space-x-2 overflow-hidden">
  <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
  <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
  <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
</div>
```

只需要下载，和一个简单的配置：

![alt text](tailwind-5.png)

## 不用 class 怎么给统一给标签设置类名？

如果项目中渲染一段 `html`，这个时候无法添加类名怎么办？如果项目中有个模块挺多 `<h1>,<h2>,<h3>,<p>`，而且不想因为这里的样式影响其它的标签样式，这种情况怎么办？富文本编辑器场景的时候也有这个问题，一个一个的加类名很麻烦，有个优雅的解决方案！[tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography)

![alt text](tailwind-6.png)

但这个库或多或少有我们不会用到的样式，想要极致一点，要使用这个库的时候，最好去看一下源码，然后自己抽离需要的样式放到项目，而不是直接下载

## 怎么复用重复的样式？

对于全局样式，可以使用 `@apply`，可以设置几个常用的布局，如

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  .margin-center {
    @apply mx-auto my-0;
  }

  .flex-center {
    @apply flex items-center justify-center;
  }

  .absolute-center {
    @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
  }
}
```

也可以用 `export const card = 'border rounded-md p-4'` 全局变量，而不是 `@apply`，这样做到无 `css`

对于单个组件里重复的样式，可以抽离变量

```jsx
let card = `flex bg-pink-200 p-4 rounded-lg`

<div className={card}></div>
<div className={card}></div>
<div className={card}></div>
```

关于 `@layer`，可以把样式注入到对应层里，避免样式覆盖，这里我写的几个类，是想当层基础的类名，后面的类名可以覆盖它，所以我放到了 base，tailwind 文档是建议复杂的组件，重 UI 的时候，用@apply，并且放到 components 层里，另外，文档建议能不用就不用

![alt text](tailwind-7.png)

## Tailwind 中的选择器也很强大

鼠标悬停 `hover:`、聚焦 `focus:`

表单提交 `required`, `invalid`, `disabled`

选择第一个孩子`first:`，最后一个孩子 `last:`，奇数 `odd:`，偶数 `even:`

父元素悬停触发子元素样式 `group`

![alt text](tailwind-8.png)

## @layer base component utilities

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

tailwind 是分层的，基础层、组件层和实用程序层，[为什么 Tailwind 将样式分层](https://www.tailwindcss.cn/docs/adding-custom-styles#using-css-and-layer)

`Base` Layer 用于重置规则或应用于纯 HTML 元素的默认样式等内容。

`components` Layer 适用于您希望能够使用实用程序覆盖的基于类的样式。

`utilities` layer 适用于小型的单一用途类，这些类应始终优先于任何其他样式。

@layer 抽离到 components 层，但是把这个 button 封装成组件会更好，要不然又会一直想类名了，也还有[其它问题](https://www.tailwindcss.cn/docs/reusing-styles)，请将其用于非常小的、高度可重用的东西，但还是尽量不使用

```jsx
<button class="py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
  Save changes
</button>

<button class="btn-primary">
  Save changes
</button>
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75;
  }
}
```

## 响应式布局

- 一个方面是需要 UI 考虑更多尺寸，给出适配不同尺寸的设计稿方案
- 使用 tailwind 之后，参考 tailwind 官网的响应式，不应该使用 vw，否则很多`[]`(预设设置太多值了，得不偿失)，屏幕拉伸也没有动态设置 rem，使用的是百分比和 flex 布局
- 重点：使用 `Tailwind` 的媒体查询应该先写小尺寸如 `H5`，再写大尺寸如 `PC`，因为大尺寸会覆盖小尺寸

## clsx/classnames tw-merge cva

首先，`clsx` 是一个打包体积比 `classnames` 更小的替代工具。他的功能与 `classnames` 类似，我们可以用它来组合字符串

`shadncn` 初始化后的这个 函数，挺有用的，不仅支持函数式拼接字符串，过滤多余空格，后面的样式覆盖前面的样式（比如 px-2 p-4，最终为 p-4）

```js
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## 性能

[just-in-time](https://www.tailwindcss.cn/blog/just-in-time-the-next-generation-of-tailwind-css)，这个包已经合并到 tailwind 主框架，我使用 tailwind 挺长时间，性能上没有发现问题，然后打包后的 css 体积明显比正常写 css 体积小很多

## 封装思维的小转变，带来极致使用体验

这个转变思维让我觉得我的组件变得非常简单。这个思路从 unocss 的传参方式中获得了灵感。例如我们要封装一个 Button 组件。假设该 Button 组件需要支持的情况如下：

语义类型：`normal primary success danger`

组件大小：`small medium large`

实际情况会更多，我们这里只做演示

那么，我们在参数设计上，会很自然的想到这样传参，如下，这是一种比较传统的传参思维

`<Button type="primary" size="lg">he</Button>`

从 unocss 的使用方式上，我获得了一个更简洁的传参思路。那就是把所有的参数类型都设计成布尔型，那么我就可以这样做

```jsx
<Button danger>Danger</Button>
<Button primary sm>Primary SM</Button>
```

在组件的内部封装也很简单，这些属性都被设计成为了布尔型，那么在内部我们是否需要将一段属性加入到元素中，只需要简单判断就可以了

```js
// type: normal 为默认值
const normal = 'bg-gray-100 hover:bg-gray-200'
const _p = primary ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
const _d = danger ? 'bg-red-500 text-white hover:bg-red-600' : ''

// 内部封装，主要是根据不同的参数拼接 className 的字符串，完整实现如下

export default function Button(props) {
  const { className, primary, danger, sm, lg, success, ...other } = props
  const base =
    'rounded-xl border border-transparent font-medium cursor-pointer transition'

  // type
  const normal = 'bg-gray-100 hover:bg-gray-200'
  const _p = primary ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
  const _d = danger ? 'bg-red-500 text-white hover:bg-red-600' : ''
  const _s = success ? 'bg-green-500 text-white hover:bg-green-600' : ''

  // size
  const md = 'text-sm py-2 px-4'
  const _sm = sm ? 'text-xs py-1.5 px-3' : ''
  const _lg = lg ? 'text-lg py-2 px-6' : ''

  const cls = clsx(base, normal, md, _p, _d, _s, _sm, _lg, className)

  return (
    <button className={cls} {...other}>
      {props.children}
    </button>
  )
}
```

封装好之后，直接使用，可以感受一下极简的传参。我现在大爱这种使用方式。并且未来组件封装也准备都往这个方向发展。

```jsx
<Button>Normal</Button>
<Button danger>Danger</Button>
<Button primary>Primary</Button>
<Button success>Success</Button>
```

本段参考 `https://mp.weixin.qq.com/s/glr73rMrwqbVmjm6GNLAzA`

## Shadcn 封装 Button

另外一种封装方式， shadcn 的封装方式，完整一个 Button 封装

Slot 功能是把 props 合并到它的子元素上，可以传入 asChild，这个元素就不会显示，然后把属性传递给儿子

cva 是一个函数，跟 tailwind-merge 和 clsx 一样，最好在 ssr/ssg 中使用，减少包的体积，这里主要用了扩展，可能是想不要定义太多变量，使用如下

```jsx
<Button variant="destructive" size="lg">
  button
</Button>
```

```js
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

// ButtonProps 接口定义了 Button 组件的属性类型
// 继承了原生 button 元素的所有 HTML 属性
// 同时也继承了 buttonVariants 函数生成的 variant 和 size 属性
// asChild 属性用于决定是否将 Button 渲染为其子元素
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
```

## js 中支持 tailwind 提示

比如之前说的复用方式，`export const card = 'border rounded-md p-4'`，这是一段 js，本来不会有鼠标放到上面提示，自己配置一下，就可以有提示，会更方便

配置 `vscode` 的 `setting.json`，这个配置 [cva](https://cva.style/docs/getting-started/installation) 里出现过

```json
"tailwindCSS.experimental.classRegex": [
  ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
  ["classnames\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
  ["classNames\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
  ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
  "(?:enter|leave)(?:From|To)?=\\s*(?:\"|')([^(?:\"|')]*)",
  "(?:enter|leave)(?:From|To)?=\\s*(?:\"|'|{`)([^(?:\"|'|`})]*)",
  ":\\s*?[\"'`]([^\"'`]*).*?,",
  ["(?:twMerge|twJoin)\\(([^;]*)[\\);]", "[`'\"`]([^'\"`;]*)[`'\"`]"],
  "tailwind\\('([^)]*)\\')",
  "(?:'|\"|`)([^\"'`]*)(?:'|\"|`)",
  "(?:const|let|var)\\s+[\\w$_][_\\w\\d]*\\s*=\\s*['\\\"](.*?)['\\\"]"
]
```

## tailwind 的设计

看到了一篇很不错的文章，`https://mp.weixin.qq.com/s/EGJ7h010NiW4RenL1an6fA`，看完后会发现 tailwind 的设计原来是这样，`0.25rem` 原来是回退值

## refactoringui

[refactoringui](https://www.refactoringui.com/) 这本书是 tailwind 作者写的，我的领导买了原版（挺贵，99 刀），可以[掘金私信我](https://juejin.cn/user/3378167164966920)，如果你喜欢 tailwind，可以免费分享给你。

## 思考 tailwind & shadcn

先区分组件和 UI，组件是更底层的，比如一个 button，而 UI 是由一个活多个组件组成的，是 UI 的上层封装，所以 shadcn 生成的目录才是这样子`components/组件` `components/ui/底层UI`

![alt text](image-1.png)

再细想一下，我们自己的页面的组件也可能写在了 `components` 里，如果是 `antd` 组件库会这样吗？肯定不会，因为 `antd` 它的组件在 `node_modules` 里，而 shadcn 是 `headless` 的，支持我们随意修改样式。但没有与我们自定义的组件分离。甚至 tailwind.config.js 也是如此，我们的预设和 shadcn 的预设都混合到了一起！

所以好一点的做法，应该设置一下`components.json`，抽离 `shadcn` 的配置

<!--
- 不了解的人的角度，说明重点
- 会简单实用的人的角度，说明原理细节
- 带着疑问，一开始的疑问，看了之后的疑问
-->

## 总结

- tailwind 的好处，一个是效率，一个是性能，一个是规范。
- tailwind 的优势在于快速构建 UI，当然前期可能需要 1 周的时间经常查文档去记住常用的类名，熟悉后的收益是巨大的。第一点是可以极大提升开放效率和减少 css 体积，第二点是做响应式和主题切换也非常方便。
- 更深入的使用 tailwind，应该合理的使用预设，并且习惯比例关系，来减少`[]`的使用。同时要让项目具有一个合理的设计系统，规律的使用样式，特别是 size，color。
- 对于分层，这个能不设置就不设置。对于复用样式，抽离组件是最好的选择（其次考虑抽离 css 和@apply）。

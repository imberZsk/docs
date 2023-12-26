# 选择 tiptap 作为编辑框架的理由

## headless

`tiptap` 支持自由控制页面样式，它自己本身没有样式只提供逻辑，比如自定义类

![Alt text](1-1.jpg)

![Alt text](1-2.jpg)

配置插件 [@tiptap/starter-kit](https://tiptap.dev/docs/editor/api/extensions/starter-kit)

```js
import StarterKit from '@tiptap/starter-kit'

export const defaultExtensions = [
  StarterKit.configure({
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-stone-700'
      }
    },
    bold: {
      HTMLAttributes: {
        class: 'font-bold'
      }
    }
  })
]
```

## 生态成熟

1. 有很多开箱即用的拓展，可以减少大量开发时间：https://tiptap.dev/docs/editor/extensions

2. 它还有个 `StarterKit` 入门套件，把常用拓展封装到一起，这样我们使用的时候节省了很多代码，也可以去修改这些拓展

```js
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

const editor = new Editor({
  content: '<p>Example Text</p>',
  extensions: [
    StarterKit.configure({
      history: false, //协同的时候需要禁用history
      heading: {
        levels: [1, 2]
      }
    })
  ]
})
```

3. 另外它属于商业开源库，有自己的公司和团队，有些 `pro` 插件和它的云看板需要收费。这些收费功能也可以自己开发。这种开源项目和 `WangEditor` 个人项目不同，会持续维护。

## 易于集成

比如一个分割线插件，只需要很少的步骤就可使用，可以在 [examples](https://tiptap.dev/docs/editor/examples/default) 找到大部分功能

#### 下载和配置

```js
import HorizontalRule from './horizontalRule'

const editor = useEditor({
  extensions: [HorizontalRule],
  content: '<p>Hello World! </p>',
  editorProps: {
    attributes: {
      class:
        'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
    }
  }
})
```

#### 使用

```jsx
<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
  horizontal rule
</button>
```

```js
editor 是一个 Tiptap 实例；
chain() 用于告诉编辑器要执行多个命令；
focus() 将焦点设置回编辑器，（这样用户编辑的光标就不会中断）；
setHorizontalRule() 指定对应插件功能；
run() 执行。
```

还能记住是否已经触发过某种状态

```js
className={editor.isActive('bold') ? 'is-active' : ''}
```

## 易于拓展

写一个自定义的插件

## 一些思考

1. `tiptap` 插件使用清晰，插件开箱即用，能减少大量开发时间

2. 它想法很好，它有个入门套件，叫，可以通过 `starterKit` 一个插件就能把常用功能覆盖掉，而且也支持修改这些常用功能，减少了很大一部分代码

3. 封装的一些方法和拓展，符合函数式编程思想，比如操作按钮支持 `bold` 功能，可以去看它的 `example`，或者去看它拓展插件，可以快速实现该功能，而且仅仅是函数调用的方式（清晰优雅）

4. 一些细节也到位，比如 `focus`，不阻止用户输入，自定义样式 `headless`，自定义输出等，协同也支持，不过用不上

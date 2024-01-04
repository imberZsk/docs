## tiptap 插件

https://tiptap.dev/docs/editor/guide/custom-extensions

## 自定义 Node

```js
import { Node } from '@tiptap/core'

const CustomNode = Node.create({
  name: 'customNode'

  // Your code goes here.
})
```

## 自定义 Mark

```js
import { Mark } from '@tiptap/core'

const CustomMark = Mark.create({
  name: 'customMark'

  // Your code goes here.
})
```

## 输入位置

```js
const { $from } = tr.selection
const pos = tr.mapping.map($from.pos)
```

## 插件要考虑的事情

> 以投票插件为例

1. 考虑数据结构
   需要自定义一个 Node，如 vote，这样解析渲染的的时候，能识别到这是个投票组件，数据也能跟在 JSON 里

2. 考虑可拓展性
   样式能从外传进来，如果涉及结构，能在外部处理，也就是 headless
   数据从外部传到编辑器内部，根据传入的数据，生成定制化投票组件

3. 考虑用户体验
   如光标

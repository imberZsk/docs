> Document, Paragraph, Text 这三个是必须使用的，[starter-kit](https://tiptap.dev/docs/editor/api/extensions/starter-kit) 自带而且不需要样式，HardBreak 强制换行没有用，[History](https://tiptap.dev/docs/editor/api/extensions/history) 支持历史纪录可以撤回和还原

## 标题

先用 input，后续可能优化，有字符限制

![alt text](image.png)

## h1、h2、h3 正文字号设计、主题切换

参考 [heading](https://tiptap.dev/docs/editor/api/nodes/heading)，[shadcn Typography](https://ui.shadcn.com/docs/components/typography)、[tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography) 插件给 `markdown` 加样式，用 [next-themes](https://ui.shadcn.com/docs/dark-mode/next) 实现主题切换

![alt text](image-1.png)

## 引用

[blockquote](https://tiptap.dev/docs/editor/api/nodes/blockquote)

![alt text](image-2.png)

## 无序列表

[bulletList](https://tiptap.dev/docs/editor/api/nodes/bullet-list)，[list-item](https://tiptap.dev/docs/editor/api/nodes/list-item) 其中 `list-item` 也是必要的，是每一个 `item`，`bulletList` 是整个无序列表

![alt text](image-3.png)

## 代码块

[CodeBlock](https://tiptap.dev/docs/editor/api/nodes/code-block)，注意黑色模式下颜色不对，最好自定义多一个变量来控制背景颜色。

![alt text](image-4.png)

## 分割线

[horizontal-rule](https://tiptap.dev/docs/editor/api/nodes/horizontal-rule)，快捷方法是`***`

![alt text](image-5.png)

## 有序列表

[OrderedList](https://tiptap.dev/docs/editor/api/nodes/ordered-list)，同理也需要 `list-item`

![alt text](image-6.png)

## 加粗

[Bold](https://tiptap.dev/docs/editor/api/marks/bold)

![alt text](image-7.png)

## 代码

[Code](https://tiptap.dev/docs/editor/api/marks/code)

TODO:...有 bug ，待开发

## 斜体

[ Italic](https://tiptap.dev/docs/editor/api/marks/italic)

![alt text](image-8.png)

## 删除线

[Strike](https://tiptap.dev/docs/editor/api/marks/strike)

![alt text](image-9.png)

## 拖拽光标

[Dropcursor](https://tiptap.dev/docs/editor/api/extensions/dropcursor)，某些内容被拖入编辑器时，该插件会在放置位置显示光标。

![alt text](image-10.png)

## 间隙光标（从这里上面都是 stater-kit 包含的功能）

TODO:黑色模式光标有问题，后续可能不要这个功能改为点击空白区域增加段落

[Gapcursor](https://tiptap.dev/docs/editor/api/extensions/gapcursor)，如果最后一个元素不是段落，比如图片这种，一种处理方案是加一个段落；目前是这种间隙光标，点击元素下方，可以出现横着的光标

![alt text](image-11.png)

## 占位符

[Placeholder](https://tiptap.dev/docs/editor/api/extensions/placeholder#placeholder)

![alt text](image-12.png)

## 下划线

[Underline](https://tiptap.dev/docs/editor/api/marks/underline)

![alt text](image-13.png)

## 气泡栏

[Bubble Menu](https://tiptap.dev/docs/editor/api/extensions/bubble-menu) 基于 [tippyjs](https://atomiks.github.io/tippyjs/)

![alt text](image-14.png)

## 任务列表

[TaskList](https://tiptap.dev/docs/editor/api/nodes/task-list)

![alt text](image-16.png)

## 对齐方式

[TextAlign](https://tiptap.dev/docs/editor/api/extensions/text-align)

![alt text](image-17.png)

## 上下标

[Superscript](https://tiptap.dev/docs/editor/api/marks/superscript)[、Subscript](https://tiptap.dev/docs/editor/api/marks/subscript)

![alt text](image-18.png)

## 文字颜色

[Highlight](https://tiptap.dev/docs/editor/api/marks/highlight)

![alt text](image-19.png)

## Slash Command

[Slash Command](https://tiptap.dev/docs/editor/experiments/commands)，这是个实验性功能，需要参考 [suggestion](https://tiptap.dev/docs/editor/api/utilities/suggestion) 和 [tiptap-templates](https://templates.tiptap.dev/RF98Ccw8tn)

![alt text](image-15.png)

## Column 支持左右排列

自定义的插件，参考 [schema](https://tiptap.dev/docs/editor/api/schema)、[custom-extensions](https://tiptap.dev/docs/editor/guide/custom-extensions)

踩坑：不能使用 `tiptap-markdown`，会有冲突

![alt text](image-20.png)

## 超链接

[Link](https://tiptap.dev/docs/editor/api/marks/link)

![alt text](image-21.png)

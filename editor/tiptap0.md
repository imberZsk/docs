## 一些思考

tiptap 插件使用清晰，插件开箱即用，能减少大量开发时间

它想法很好，它有个入门套件，叫，可以通过 starterKit 一个插件就能把常用功能覆盖掉，而且也支持修改这些常用功能，减少了很大一部分代码

封装的一些方法和拓展，符合函数式编程思想，比如操作按钮支持 bold 功能，可以去看它的 example，或者去看它拓展插件，可以快速实现该功能，而且仅仅是函数调用的方式（清晰优雅）

一些细节也到位，比如 focus，不阻止用户输入，自定义样式 headless，自定义输出等，协同也支持，不过用不上

## contenteditable="true"

## nodes

## marks

## extensions

## 可以访问 ProseMirror 内部结构

## 菜单事件

editor 应该是一个 Tiptap 实例，
chain() 用于告诉编辑器要执行多个命令，
focus() 将焦点设置回编辑器，（这样用户编辑的光标就不会中断）
toggleBold() 将所选文本标记为粗体，或从文本选择中删除粗体标记（如果已应用），并且
run() 将执行链。

editor.isActive('highlight')可以检查是否将某些内容应用于所选文本

```js
className={editor.isActive('bold') ? 'is-active' : ''}
```

大多数扩展都允许您通过该 HTMLAttributes 选项向呈现的 HTML 添加属性。您可以使用它来添加自定义类（或任何其他属性）。当您使用 Tailwind CSS 时，这也非常有用。

```js
new Editor({
  extensions: [
    Document,
    Paragraph.configure({
      HTMLAttributes: {
        class: 'my-custom-paragraph'
      }
    }),
    Heading.configure({
      HTMLAttributes: {
        class: 'my-custom-heading'
      }
    }),
    Text
  ]
})
```

The rendered HTML will look like that:
呈现的 HTML 将如下所示：

```js
<h1 class="my-custom-heading">Example Text</h1>
<p class="my-custom-paragraph">Wow, that’s really custom.</p>
```

#### editorProps 可以传给 editor 元素

```js
const editor = useEditor({
  extensions: [...defaultExtensions],
  content: '<p>Hello World! 🌎️</p>',
  editorProps: {
    attributes: {
      class:
        'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
    }
  }
})
```

# 自定义菜单

# 自定义样式

1. 设置 html 样式
2. 添加自定义类
3. 自定义 html

```js
import Bold from '@tiptap/extension-bold'

const CustomBold = Bold.extend({
  renderHTML({ HTMLAttributes }) {
    // Original:
    // return ['strong', HTMLAttributes, 0]
    return ['b', HTMLAttributes, 0]
  }
})

new Editor({
  extensions: [
    // …
    CustomBold
  ]
})
```

# 自定义输出

1. JSON

```js
const json = editor.getJSON()
```

```js
editor.commands.setContent({
  type: 'doc',
  content: [
    // …
  ]
})
```

2. html

```js
const html = editor.getHTML()
```

```js
editor.commands.setContent(`<p>Example Text</p>`)
```

3. Y.js

## Listening for changes 监听变化

```js
const editor = new Editor({
  // intial content
  content: `<p>Example Content</p>`,

  // triggered on every change
  onUpdate: ({ editor }) => {
    const json = editor.getJSON()
    // send the content to an API here
  }
})
```

# Rendering 渲染

#### read-only

```js
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'

export default () => {
  const [editable, setEditable] = useState(false)
  const editor = useEditor({
    editable,
    content: `
        <p>
          This text is <strong>read-only</strong>. No matter what you try, you are not able to edit something. Okay, if you toggle the checkbox above you’ll be able to edit the text.
        </p>
        <p>
          If you want to check the state, you can call <code>editor.isEditable()</code>.
        </p>
      `,
    extensions: [StarterKit]
  })

  useEffect(() => {
    if (!editor) {
      return undefined
    }

    editor.setEditable(editable)
  }, [editor, editable])

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="checkbox">
        <input
          type="checkbox"
          id="editable"
          value={editable}
          onChange={(event) => setEditable(event.target.checked)}
        />
        <label htmlFor="editable">editable</label>
      </div>
      <EditorContent editor={editor} />
    </>
  )
}
```

#### Generate HTML from ProseMirror JSON

例如为用 Tiptap 编写的博客文章生成 HTML，您可能希望在没有实际编辑器实例的情况下执行此操作

# 协同编辑

还用不上

# 自定义拓展

## 扩展现有扩展

```js
// 1. Import the extension
import BulletList from '@tiptap/extension-bullet-list'

// 2. Overwrite the keyboard shortcuts
const CustomBulletList = BulletList.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-l': () => this.editor.commands.toggleBulletList()
    }
  }
})

// 3. Add the custom extension to your editor
new Editor({
  extensions: [
    CustomBulletList()
    // …
  ]
})
```

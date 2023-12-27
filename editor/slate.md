## 简单例子

```js
'use client'

import { useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
]

const CustomEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable />
    </Slate>
  )
}

export default CustomEditor
```

## 事件处理

```js
return (
  <Slate editor={editor} initialValue={initialValue}>
    <Editable
      onKeyDown={(event) => {
        if (event.key === '&') {
          event.preventDefault()
          editor.insertText('and')
        }
      }}
    />
  </Slate>
)
```

## 自定义元素（枝节点）

1. 枝节点：枝节点是 Slate.js 中的一个术语，它代表具有子节点的节点。枝节点是树状结构中的内部节点，可以包含其他节点作为其子节点。在编辑器中，常见的枝节点包括段落（`<p>`）、列表（`<ul>`、`<ol>`）等。枝节点通常用于组织和管理文档的结构。
1. 点通常用于组织和管理文档的结构。

```js
'use client'

import { useCallback, useState } from 'react'
import { createEditor } from 'slate'
import { Editor, Transforms, Element } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
]

const CustomEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          // console.log(event.key)
          if (event.key === '`' && event.ctrlKey) {
            event.preventDefault()
            const [match] = Editor.nodes(editor, {
              match: (n) => n.type === 'code'
            })
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              {
                match: (n) => Element.isElement(n) && Editor.isBlock(editor, n)
              }
            )
          }
        }}
      />
    </Slate>
  )
}

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>
}

// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

export default CustomEditor
```

## 应用自定义格式（叶节点）

1. 叶节点：叶节点是 Slate.js 中的另一个术语，它代表没有子节点的节点。叶节点是树状结构中的最底层节点，它不会再分支出其他节点。在编辑器中，常见的叶节点包括文本节点（`<text>`）和内联元素（`<span>`、`<strong>`、`<em>`等）。叶节点通常用于表示具体的文本内容或内联样式。

```js
'use client'

import { useCallback, useState } from 'react'
import { createEditor } from 'slate'
import { Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
]

const CustomEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          // console.log(event.key)
          if (!event.ctrlKey) {
            return
          }

          switch (event.key) {
            case '`': {
              event.preventDefault()
              const [match] = Editor.nodes(editor, {
                match: (n) => n.type === 'code'
              })

              // 支节点
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: (n) => Editor.isBlock(editor, n) }
              )
              break
            }

            case 'b': {
              event.preventDefault()
              // 叶节点
              Editor.addMark(editor, 'bold', true)
              break
            }
          }
        }}
      />
    </Slate>
  )
}

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>
}

// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

export default CustomEditor
```

## 执行命令

```js
'use client'

import { useCallback, useState } from 'react'
import { createEditor } from 'slate'
import { Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
]

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>
}

// // Define a React component renderer for our code blocks.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor)
    return marks ? marks.bold === true : false
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code'
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    if (isActive) {
      Editor.removeMark(editor, 'bold')
    } else {
      Editor.addMark(editor, 'bold', true)
    }
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) }
    )
  }
}

const MyEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        editor={editor}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return
          }

          switch (event.key) {
            case '`': {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
              break
            }

            case 'b': {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              break
            }
          }
        }}
      />
    </Slate>
  )
}

export default MyEditor
```

## Platejs 站在巨人的肩膀

官网：https://platejs.org/
模版：https://github.com/udecode/plate-playground-template

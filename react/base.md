<!-- TODO:面试题 -->

```js
// import React from 'react'
// import ReactDOM from 'react-dom'
// const element = <h1 title="foo">Hello</h1>
// const container = document.getElementById('root')
// ReactDOM.render(element, container)

// 初始化cra

// ReactDOM把虚拟fiber渲染渲染成web使用规范

// jsx通过babel转成React.createElement()，返回element对象，主要属性有type和props，根据type创建节点，props赋给属性，children是特殊的props,可以是textNode，也可以是一个element，如何render到页面
const element = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'hello'
  }
}

const container = document.getElementById('root')

const node = document.createElement(element.type)
element['title'] = element.props.title

const text = document.createTextNode('')
text.nodeValue = element.props.children

node.append(text)

container.append(node)
```

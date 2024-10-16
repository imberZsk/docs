```js
import React from 'react'
import ReactDOM from 'react-dom'

// 只写了React.createElement还不能在页面使用，生成的element,react无法识别无法render,要写了render才行，这个element不够完善

// const element = <h1 title="foo">Hello</h1>
// const element = React.createElement(
//   'h1',
//   {
//     title: 'foo'
//   },
//   'Hello'
// )

// 三个参数，里面的children要看是不是对象还是文本节点
const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'object' ? child : createTextElement(child)
      })
    }
  }
}

const createTextElement = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

const MyReact = {
  createElement
}

/** @jsx MyReact.createElement */
// const element = <h1 title="foo">Hello</h1>

const element = (
  <div id="foo">
    <a>bar</a>
    <br />
  </div>
)

console.log(element)

const container = document.getElementById('root')
ReactDOM.render(element, container)
```

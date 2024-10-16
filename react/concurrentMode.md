```js
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

const render = (element, container) => {
  // 创建对应节点
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type)

  // 过滤特殊的children
  const isProperty = (key) => {
    return key !== 'children'
  }

  // 赋给props
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name]
    })

  element.props.children.forEach((child) => {
    render(child, dom)
  })

  container.appendChild(dom)
}

let nextUnitOfWork = null

function workLook(deadline) {
  debugger
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // 如果剩余时间少于 1 毫秒，则 shouldYield 被设置为 true，表示当前任务应该让出执行权。
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(nextUnitOfWork)
}

requestIdleCallback(workLook)

function performUnitOfWork(nextUnitOfWork) {
  // TODO 创建DOM
  // 给children创建fiber
  // 找到下一个工作单元
}

const MyReact = {
  createElement,
  render
}

/** @jsx MyReact.createElement */
// const element = <h1 title="foo">Hello</h1>

const element = (
  <div id="foo">
    <a>bar</a>
    <br />
  </div>
)

const container = document.getElementById('root')
MyReact.render(element, container)
```

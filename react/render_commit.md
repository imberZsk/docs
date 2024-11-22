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

// 根据fiber创建真实dom
const createDom = (fiber) => {
  // 创建对应节点
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type)

  // 过滤特殊的children
  const isProperty = (key) => {
    return key !== 'children'
  }

  // 赋给props
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name]
    })

  return dom
}

const render = (element, container) => {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  }
  nextUnitOfWork = wipRoot
}

let nextUnitOfWork = null
// currentRoot  worikinprogress
let wipRoot = null

function commitRoot() {
  // TODO add nodes to dom
  commitWork(wipRoot.child)
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // 如果剩余时间少于 1 毫秒，则 shouldYield 被设置为 true，表示当前任务应该让出执行权。
    shouldYield = deadline.timeRemaining() < 1
  }

  // 为什么这里就不会被中断
  // commit阶段
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

// fiber对象
// {
//   type
//   props
//   dom
//   parent
//   child
//   sibling
// }

// 传入fiber,创建dom，为children创建fiber，找到下一个工作单元
function performUnitOfWork(fiber) {
  // 1、创建DOM
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom)
  // }

  // 2、给children创建fiber
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null

  while (index < elements.length) {
    const element = elements[index]

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }

    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }

  // 3、找到下一个工作单元

  // 向下递，向上归
  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

const MyReact = {
  createElement,
  render
}

/** @jsx MyReact.createElement */
// const element = <h1 title="foo">Hello</h1>

const element = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 style="text-align:right">from MyReact</h2>
  </div>
)

const container = document.getElementById('root')
MyReact.render(element, container)
```

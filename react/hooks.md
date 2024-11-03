```js
debugger

// jsx转为createElement函数执行，这个函数返回element对象，children是特殊的element对象
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  }
}

// createElement的children里处理文本地节点的时候，也是一个对象
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

// 给fiber创建真实dom
function createDom(fiber) {
  const dom =
    fiber.type == 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type)

  // 处理dom和props，传入之前的props为空，当前的props
  updateDom(dom, {}, fiber.props)

  return dom
}

// 特殊的props - 事件
const isEvent = (key) => key.startsWith('on')

// 除了children喝事件的属性
const isProperty = (key) => key !== 'children' && !isEvent(key)

// 新的 props key
const isNew = (prev, next) => (key) => prev[key] !== next[key]

// 旧的 props key
const isGone = (prev, next) => (key) => !(key in next)

// 更新dom和props
function updateDom(dom, prevProps, nextProps) {
  // 删除旧的或者改变的事件监听器
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[name])
    })

  // 删除旧的props
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = ''
    })

  // 设置新的或者改变的props
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name]
    })

  // 添加新的事件监听器
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[name])
    })
}

// 构建完fiber树后，更新到页面，就是commit阶段
function commitRoot() {
  // 删除的fiber树组
  deletions.forEach(commitWork)

  // 提交更新
  commitWork(wipRoot.child)

  // commit完后，wipRoot树变成currentRoot tree，也就是旧的树
  currentRoot = wipRoot

  // wipRoot在commit后，就置为null
  wipRoot = null
}

// 提交更新，传入wipRoot.child
function commitWork(fiber) {
  if (!fiber) {
    return
  }

  let domParentFiber = fiber.parent

  // 因为函数组件是没有对应的dom的
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, domParent)
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

// commitWork里处理删除的逻辑
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}

// 渲染函数
function render(element, container) {
  // 内存中的wipRoot fiber树
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot // 第一次为null，第二次就是 之前的wipRoot fiber
  }

  // 每次执行的时候，重新置为空树组
  deletions = []

  // 下一个工作单元第一次为wipRoot fiber
  nextUnitOfWork = wipRoot
}

// 下一个工作单元
let nextUnitOfWork = null

// 旧fiber树
let currentRoot = null

// 当前fiber树
let wipRoot = null

// 删除的fiber树组
let deletions = null

// 循环任务
function workLoop(deadline) {
  let shouldYield = false

  // 有下一个工作单元并且不会被中断的时候
  while (nextUnitOfWork && !shouldYield) {
    // 构建fiber树
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)

    // 是否中断
    shouldYield = deadline.timeRemaining() < 1
  }

  // 生成完fiber树后，一次性commit提交更新到页面
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  // 递归，生成fiber树
  requestIdleCallback(workLoop)
}

// 浏览器空闲时间执行
requestIdleCallback(workLoop)

// 执行工作单元
function performUnitOfWork(fiber) {
  // 执行函数组件处理
  const isFunctionComponent = fiber.type instanceof Function

  // 区分函数组件和类组件
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  // 先儿子
  if (fiber.child) {
    return fiber.child
  }

  // 深度遍历，构建fiber树
  let nextFiber = fiber

  // 全部处理完fiber树
  while (nextFiber) {
    // 再兄弟
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }

    // 最后父亲的兄弟，然后又会去好父亲兄弟的儿子
    nextFiber = nextFiber.parent
  }
}

// 意思听起来是当前fiber
let wipFiber = null

// hook索引，因为是单向链表
let hookIndex = null

// 执行工作单元的时候，更新函数组件
function updateFunctionComponent(fiber) {
  // 当前fiber，函数组件也是一个fiber
  wipFiber = fiber

  // 索引置为0
  hookIndex = 0

  // wipFiber的hook置为空数组
  wipFiber.hooks = []

  // 构建子fiber树
  const children = [fiber.type(fiber.props)]

  // 调度，构建子fiber树
  reconcileChildren(fiber, children)
}

function useState(initial) {
  // 旧的
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex]

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }

  const actions = oldHook ? oldHook.queue : []

  actions.forEach((action) => {
    hook.state = action(hook.state)
  })

  // 更新
  const setState = (action) => {
    // 把action添加到hook的对列里
    hook.queue.push(action)

    // 更新的时候，创建新的wipRoot fiber树
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }

    // 重置下一个工作单元
    nextUnitOfWork = wipRoot

    // 重置删除的树组
    deletions = []
  }

  // 当前fiber的hooks数组里添加hook
  wipFiber.hooks.push(hook)

  hookIndex++

  return [hook.state, setState]
}

// 更新类组件
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  reconcileChildren(fiber, fiber.props.children)
}

// 调度 reconciliation
function reconcileChildren(wipFiber, elements) {
  let index = 0

  // 旧的fiber树
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child

  let prevSibling = null

  // 同时迭代新的 element 树和旧的 fiber树
  while (index < elements.length || oldFiber != null) {
    const element = elements[index]

    // 当前fiber
    let newFiber = null

    // 类型相同：有oldFiber的时候，有element的时候，两个type相同的时候
    const sameType = oldFiber && element && element.type == oldFiber.type

    // 相同类型的dom，复用dom和props
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,

        // 打上标记，后续commit更新
        effectTag: 'UPDATE'
      }
    }

    // 如果类型不同，但是有新fiber，说明要新增dom
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,

        // 打上标记，后续commit更新
        effectTag: 'PLACEMENT'
      }
    }

    // 类型不同，旧的还有，打上删除标记
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION'

      // 因为没有新fiber，所以要存全局变量树组里
      deletions.push(oldFiber)
    }

    // 如果有旧fiber，这里是while循环用的
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    // 处理child，sibling关系
    if (index === 0) {
      // 虽然函数组件的type是函数，但不影响它的child是fiber
      wipFiber.child = newFiber
    } else if (element) {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}

// myReact
const MyReact = {
  createElement,
  render,
  useState
}

/** @jsx MyReact.createElement */
function Counter() {
  const [state, setState] = MyReact.useState(1)
  const [state1, setState1] = MyReact.useState(2)
  return (
    <div>
      <h1
        onClick={() => {
          setState((c) => c + 1)
        }}
        style="user-select: none"
      >
        Count: {state}
      </h1>
      <h2
        onClick={() => {
          setState1((c) => c + 2)
        }}
        style="user-select: none"
      >
        Count: {state1}
      </h2>
    </div>
  )
}

const element = <Counter />

const container = document.getElementById('root')

MyReact.render(element, container)
```

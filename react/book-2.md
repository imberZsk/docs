## 深入理解 JSX

#### JSX 简介

`JSX` 并不是只能被编译为 `React.createElement`

你可以通过`@babel/plugin-transform-react-jsx` 插件显式告诉 `Babel` 编译时需要将 `JSX` 编译为什么函数的调用（默认为 `React.createElement`）

`React.createElement` 最终会调用 `ReactElement` 方法返回一个包含组件数据的对象，该对象有个参数`$$typeof: REACT_ELEMENT_TYPE` 标记了该对象是个 `React Element`

所有 `JSX` 在运行时的返回结果（即 `React.createElement()`的返回值）都是 `React Element`

```js
export function createElement(type, config, children) {
  let propName

  const props = {}

  let key = null
  let ref = null
  let self = null
  let source = null

  if (config != null) {
    // 将 config 处理后赋值给 props
    // ...省略
  }

  const childrenLength = arguments.length - 2
  // 处理 children，会被赋值给props.children
  // ...省略

  // 处理 defaultProps
  // ...省略

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  )
}

const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // 标记这是个 React Element
    $$typeof: REACT_ELEMENT_TYPE,

    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  }

  return element
}
```

## React Component

## JSX 与 Fiber 节点

`JSX` 是一种描述当前组件内容的数据结构，他不包含组件 `schedule`、`reconcile`、`render` 所需的相关信息

所以，在组件 mount 时，`Reconciler 根据 JSX 描述的组件内容生成组件对应的 Fiber 节点`。

在 `update 时，Reconciler 将 JSX 与 Fiber 节点保存的数据对比，生成组件对应的 Fiber 节点，并根据对比结果为 Fiber 节点打上标记`

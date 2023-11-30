## React 理念

React 的理念是快速响应的大型 Web 应用程序，制约快速响应有两类场景

#### CPU 瓶颈

原因：当大量操作或者设备性能不足导致掉帧卡顿，本质原因是` JS 引擎线程和渲染线程是互斥的`，大量 JS 执行的时候没有时间去做渲染

解决：`时间分片`，把长任务拆分到每一帧中，时间分片的关键是将同步更新变为可中断的异步更新

#### IO 瓶颈

原因：下一个页面是异步的，如果打开下个页面时间很短也会显示 loading

解决：实现 Suspense 和 useDeferredValue，在当前页面停留一点时间，用户是无感知的，然后超过某个时间再给 loading，关键也同上

## 老的 React 架构

React15 的架构可以分为两层，`Reconciler`（协调器）负责找出变化的组件和 `Renderer`（渲染器）负责将变化的组件渲染到页面上（交替执行，无法中断）

老的架构中 Reconciler 会`递归`mountComponent 挂载组件 和 updateComponent `更新组件`，被称为 `Stack Reconciler`

## 新的 React 架构

React16 架构可以分为三层

`Scheduler`（调度器）负责调度任务的优先级，高优先级优先进入 Reconciler，用 scheduler 代替 requestIdleCallback

`Reconciler`（协调器）负责找出变化的组件，更新工作从递归变成了可以中断的 while 循环，每次循环都会调用 shouldYield 判断当前是否有剩余时间；Reconciler 和 Renderer 不再是交替工作，Reconcile 会为虚拟 DOM 打上增/删/更新的标记，都在内存中运行，只有所有组件都完成 Reconciler，才会统一交给 Renderer

```js
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress)
  }
}
```

`Renderer`（渲染器）负责将变化的组件渲染到页面上，由于工作都在内存中运行，不会更新页面上的 DOM，所以即使反复中断，用户也不会看见更新不完全的 DOM

## Fiber 架构的心智模型

代数效应：副作用从函数调用中分离 ->在 React 中的应用是 Hooks

#### 代数效应和生成器 Generator

弊端一：类似 `async`，`Generator` 也是`传染性`的，使用了`Generator`则上下文的其他函数也需要作出改变。这样心智负担比较重。

弊端二：Generator 执行的中间状态是上下文关联的。（高优先级插队无法复用之前的）

#### 代数效应和 Fiber

Fiber 是`协程`的一种实现，是代数效应思想在 JS 中的体现

React 内部实现了一套状态更新机制，支持任务不同优先级，可中断与恢复，并且恢复后可以服用之前的`中间状态`

## Fiber 架构的实现原理（Fiber 的含义）

#### 作为架构来说

React15 的 Reconciler 采用递归的方式执行，数据保存在递归数据栈中，所以被称问 Stack Fiber，React16 的 Reconciler 基于 Fiber 节点，被称为 Fiber Reconciler

#### 作为静态数据结构来说

每个 Fiber 对应一个 React Element，保存了该组件的类型，对应 DOM 节点信息

#### 作为动态工作单元来说

每个 Fiber 节点保留了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入到页面/被更新）

```js
111
```

## Fiber 架构的工作原理

双缓存：内存中构建并直接替换的技术

双缓冲 Fiber 树，workInProgress 和 Current 交替，通过 alternate 连接

mount 时

update 时

## 总结

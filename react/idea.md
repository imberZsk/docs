## React 理念

React 的理念是快速响应的大型 Web 应用程序，制约快速响应有两类场景

#### CPU 瓶颈

原因：当大量操作或者设备性能不足导致掉帧卡顿，本质原因是 JS 引擎线程和渲染线程是互斥的，大量 JS 执行的时候没有时间去做渲染

解决：时间分片，把长任务拆分到每一帧中，时间分片的关键是将同步更新变为可中断的异步更新

#### IO 瓶颈

原因：下一个页面是异步的，如果打开下个页面时间很短也会显示 loading

解决：实现 Suspense 和 useDeferredValue，在当前页面停留一点时间，用户是无感知的，然后超过某个时间再给 loading，关键也同上

## 老的 React 架构

React15 的架构可以分为两层，Reconciler（协调器）负责找出变化的组件和 Renderer（渲染器）负责将变化的组件渲染到页面上

老的架构中 Reconciler 会递归 mountComponent 挂载组件 和 updateComponent 更新组件，被称为 Stack Reconciler

## 新的 React 架构

## Fiber 架构的心智模型

## Fiber 架构的实现原理

## Fiber 架构的工作原理

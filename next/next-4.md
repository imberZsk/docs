# 渲染

## 流式渲染（Streaming）

流式渲染解决了传统 SSR 渲染的阻塞问题，先了解传统 SSR 渲染的流程

1. 在服务端获取数据
2. 在服务端生成 html
3. 把 html、css、js 发送到客户端
4. 使用 html 和 css 生成非交互的用户界面
5. 最后，在客户端注水让页面可以交互（比如绑定点击事件）

![Chart showing Server Rendering without Streaming](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-without-streaming-chart.png&w=1920&q=75&dpl=dpl_9EKEbD7jAviauyTffgoEyAkQSGtP)

这些流程是`顺序和阻塞`的，在服务器上 只能在获取所有数据后才能生成 html，在客户端上 只有在页面中所有组件
的代码都下载完后才能生成 UI！这就是传统的 SSR 的弊端。

而流式渲染的出现允许将页面 html 分解为更小的块（Streaming 和 RSC 配合得很好，一个组件就可以视为一个块），并逐步将这些块从服务器发送到客户端，这样可以更快的显示页面某些部分，不必等所有数据加载后才呈现 UI；优先级高的组件或不依赖于数据的组件可以先发送，然后客户端选择性注水，React 可以更早的 `hydration`。

![Chart showing Server Rendering with Streaming](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-with-streaming-chart.png&w=1920&q=75&dpl=dpl_9EKEbD7jAviauyTffgoEyAkQSGtP)

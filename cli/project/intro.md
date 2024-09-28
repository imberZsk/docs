## 背景

部门项目较多，隔段一段时间都会有新项目，每次重新创建新项目浪费大量时间，而且技术栈和项目配置不一定统一，所以有了这样一个项目模版。

## 用处

这个项目模版主要用于减少重复工作，它包括了 代码检查、错误处理、公共函数、公共 Hook、SEO、初始化三方库 等功能。

## 技术栈

因为部门项目以 C 端 React 为主，所以使用 Nextjs，写法为 [App router](https://nextjs.org/docs)，以汽车官网为例，性能极佳

![alt text](image.png)

CSS 统一使用 [TailwindCSS](https://www.tailwindcss.cn/)，组件库使用基于 [radix-ui](https://www.radix-ui.com/primitives/docs/overview/introduction) 的 [shadcn](https://ui.shadcn.com/docs/components/date-picker)，他们搭配可以极大的减少 CSS 体积和提高编写 CSS 的工作效率

动画库 统一使用 [GSAP](https://gsap.com/) 和 [Framer Motion](https://www.framer.com/motion/)，gsap 用于滚动的补间动画，而 Framer Motion 有很多巧妙的动画，如 [AnimatePresence](https://www.framer.com/motion/animate-presence/) 动画 和 [Layout](https://www.framer.com/motion/layout-animations/) 动画，两者搭配能快速实现动画效果

关于动画，这里写过几篇 文章，可以参考：

1. [React 中更简单的使用 gsap 的方式 useGSAP](https://juejin.cn/post/7369401900243075110)
2. [GSAP 动画从性能到核心概念](https://juejin.cn/post/7411452970082435109)
3. GSAP & Framer Motion 真实项目效果合集

## 安装

通过仓库拉取(将 git clone 命令中的 zhangshikun 替换为当前用户名)

```js
git clone http://zhangshikun@git.hz.meizu.com/scm/fes/next-starter.git
```

通过 Cli 安装

```js
TODO:
```

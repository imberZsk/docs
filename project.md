# XXX AI 协同文档

## 技术栈

- 编辑器：TipTap、Yjs
- 前端：React.js 18、Next.js 14、Tailwindcss、Shadcn-ui、NextAuth、Zustand
- 后端：Nest.js、Prisma、Supabase、postgresql
- CI/CD：Docker、Github Actions

## 项目介绍

该项目为全栈开源项目，基于 GPT 模型，AI 写作，AI 智能提示，AI 文本处理，多人协同编辑，旨在打造一个云端协作平台和个人笔记

## 负责内容

## 项目亮点

- 基于 Github Actions 和 Docker 实现自动化 CI/CD
- 基于 NextAuth Adapter 实现登陆鉴权和用户信息持久化
- 基于 GPT 模型，AI 写作，AI 智能提示，AI 文本处理，多人协同编辑
- 基于 Tiptap 富文本编辑器，支持 Markdown、支持 block-editor 架构，支持多人协同，自定义 10+ Extensions

## 问题

- 技术选型？
- Git 管理？
- Next.js SSR 原理？
  - SSR 是基于 React 提供了两个 API，renderToString 和 hydrateRoot 实现的
  - Next.js SSR 的原理是，在服务端渲染页面，然后将页面内容返回给客户端，客户端再 hydrate 页面，实现 SSR
  - renderToString 是将 React 组件渲染成字符串，然后返回给客户端
  - hydrateRoot 会复用已有的 DOM 节点，这样就不会重新渲染了，只会注册事件等
- 数据库查询有没有做什么优化？
- postgresql 和 mysql 的区别？
- 登录鉴权怎么做的？NextAuth 原理？
- 富文本编辑器如何实现？Tiptap 原理？
- 协同的原理？
- 编辑器插件怎么实现的？

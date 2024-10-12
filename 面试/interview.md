## 专业技能

1. 熟练掌握 React，熟悉 Vue，熟悉 RN，熟悉 Electron，深入研究过 React 底层原理，手写过 React 核心源码。
2. 熟练掌握 Nextjs，熟悉服务端渲染原理，对 SSR/SSG/ISR、SEO、国际化、响应式、Web 安全 有深入研究。
3. 熟练掌握 GSAP、Framer Motion，熟悉复杂 Web 动画开发/定制化特效开发，深入研究过动画原理和性能。
4. 熟练掌握 Webpack，手写过 mini-pack，熟悉 nodejs 和其框架 express/koa，了解 Nestjs，Prisma。
5. 熟悉富文本编辑器，了解协同文档，熟悉 AIGC，熟悉 Threejs，熟悉 CI/CD，熟悉 Docker，熟悉监控埋点。

## 工作经历

魅族

1. 担任官网研发部门核心开发，负责部门前端架构设计，项目基建 CI/CD，从零到一落地实现，担任面试官，带新人熟悉业务。
2. 负责魅族官网、集团官网、汽车官网、AR 眼镜官网、魅族商城、魅族社区、H5 营销活动等项目的开发和维护。

HelloTalk

1. 担任 HelloTalk 前端组开发，负责老项目的代码规范统一，性能优化，liveClass 项目负责人，跟进并同步项目进度。
2. 负责 HelloTalk App 内嵌 H5 国际化营销活动，负责 HelloTalk liveClass C 端和 B 端从零到一开发。

易教

1. 担任研发部前端开发，负责老项目升级，负责新项目开发，负责项目 CI/CD，负责项目文档编写。
2. 负责公司内部 SASS 平台，门户网站，项目开发和维护，微信小程序，微信公众号开发和维护。

## 项目经历

集团官网

技术栈：React + Nextjs + Tailwind + Shadcn + GSAP + Framer Motion + TipTap

1. ssg 国际化 seo
2. 复杂动画
3. 富文本编辑器，ai
4. 3D 模型渲染
5. 主题切换

魅族商城

技术栈

1. 大文件上传
2. 虚拟列表

跨端项目

技术栈：React + RN + Flutter + Vue + Taro + Nodejs + Express + Prisma

1.

脚手架项目

技术栈：

1. 构建工具：Webpack

## 前端安全

- 提一嘴经验：因为公司比较注重安全问题，也设有专门的安全部门，有安全编码规范任务，然后我们部门是由我模拟过 xss&csrf 攻击，所以对这块比较熟悉。
- 定位问题：
  - 对于 xss 来说，要全局查找是否有可输入的地方和 `dangerousSetInnerHTML` 或者 v-html 或者 innerHTML。
  - 对于 csrf 来说，需要后端查看是否有`不规范的 get 请求能改变数据的操作`，这是被攻击的核心前提。
- 解决问题：
  - 对于 xss 来说，首先可以字符过滤转义也就是不用 dangerousSetInnerHTML，当做普通变量，react 会转成字符串，为了防止 cookie 被盗问题，可以采取一些手段来降低风险，可以服务端设置 http-only 和 secure，还可以设置 csp 指定哪些代码能执行比如 `default-src:self ; script-src 'self' 'nonce-${nonce}' 'strict-dynamic';`。
  - 对于 csrf 来说，首先是不要 get 请求改变状态，可以使用 jwt token，不会自动携带 cookie，还可以检查 refer，还可以服务端设置 cookie 的 samesite 为 strict 或者指定 域名

## 架构设计

## 项目基建

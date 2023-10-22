## 一、Monorepo 好处

单一仓库不利于统一管理，比如多个单仓库依赖一个 common 子仓库，当 common 子仓库修改一个东西，需要所有仓库都拉取然后分别一个一个的去打包，再上线

而 monorepo 单仓库多模块，依赖了一个 common 模块，可以统一发布，对于 `lint、test、build`等 script 操作也可以统一处理，不用去开那么多项目和终端

## 二、Turborepo 优势

配置简单，基本使用官网模版配置就好

使用 GO 编写，比 JS 更快，单仓库和多仓库都支持缓存，多用于 Monorepo

增量缓存（content hash）、并行执行（相比于 Nx 的优点）、远程缓存、pipeline 任务管道等

提供了多个 Starter 模版，如 design-system（适合组件库），with-tailwind（适合普通项目），with-prisma（适合全栈项目）

## 三、Turborepo 增量缓存

Turborepo 对文件的缓存是增量式的，只会打包改变的模块，没改变的会使用缓存跳过打包

没有缓存的时候，如第一次打包的时候，会显示没有命中缓存：

![no cache](https://turbo.build/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcache-miss.21d45e92.png&w=1920&q=75)

当有缓存的时候，控制台会有 Hitting the cache 和命中缓存：

![cache](https://turbo.build/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcache-miss.21d45e92.png&w=1920&q=75)

## 四、Turborepo 并行执行

Turborepo 可以并行执行任务，如果用 yarn，它可能是这样:

```md
yarn workspaces run lint
yarn workspaces run test
yarn workspaces run build
```

![yarn](https://turbo.build/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fyarn-workspaces-excalidraw.0838365d.png&w=1920&q=75)

当使用 turbo，可以这样:

```
turbo run lint test build
```

![turbo](https://turbo.build/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fturborepo-excalidraw.8068f4b4.png&w=1920&q=75)

## 五、Turborepo 远程缓存

Turborepo 可以把缓存的状态远程同步，需要使用 `turbo login`、`turbo link`，然后设置 gitlab token 等步骤，详细看`https://turbo.build/repo/docs/ci`

## 六、Turborepo 配置实战

```json
/* prettier-ignore */
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"], // 指定根目录下的文件，如果这个文件修改会绕过缓存，turbo.json和package.json是默认的
  "pipeline": { // 任务管道，可以说是管理任务的地方
    "build": {
      "dependsOn": ["^build"], // 简历拓扑依赖，^表示上游依赖，也就是packages里的依赖先build之后再执行当前工作区的build
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"] // 指定要缓存的目录，同理还可以设置input去指定输入的目录
    },
    "lint": {
      "dependsOn": ["^build"]//同上
    },
    "dev": {
      "cache": false, // 默认是true，开发环境关闭缓存，一般watch监听文件变化的都不需要缓存，缓存可以用于lint，test，build（如果开启，当依赖包发生变化比如会影响全局的东西，那之前的缓存可能会引起冲突）
      "persistent": true // 任务是长时间运行的进程，需要标记为persistent（持久的），防止其他任务依赖这个长任务而导致任务用于不退出的问题
    }
  }
}
```

## NextAuth

![alt text](image-20.png)

`Nextjs` 中使用 `github` 登陆参考 [官网 OAuth 验证](https://authjs.dev/getting-started/providers/oauth-tutorial)（感觉不咋好，不如看 `demo`）

`app router` 参考 [next-auth-example](https://github.com/nextauthjs/next-auth-example)

## prisma 和 mysql 数据库

1. 前提：`prisma` 连接数据库
2. 创建一个 `user` 表，包括 `id`、`name`、`email`、`password`
3. 创建一个 `post` 表，包括 `id`、`title`、`content`、`authorId`

#### 初始化 prisma

```js
//安装
pnpm i prisma @prisma/client

// 初始化
npx prisma init

// 设置.env
DATABASE_URL = 'mysql://root:admin@127.0.0.1:3306/blog_system'
```

#### prisma 设置表

```prisma
model User {
  id       Int    @id @default(autoincrement())
  username String
  email    String @unique
  password String
  posts    Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}
```

#### 同步数据库

```js
npx prisma db push
//或者
npx prisma migrate dev --name init
```

## 四个页面

#### 首页 /

有一个按钮，点击后跳转到 `login`，要登陆了你才能进到 `dashboard`

![alt text](image-26.png)

#### 登陆页 /login

用 `shadcn` 的登陆 `Block`，但只需要用到 `github` 登陆

![alt text](image-31.png)

#### 注册页 /signUp

![alt text](image-21.png)

#### 落地页 /dashboard

如果用户登陆了，就跳转到 `dashboard`，并且展示获取到的用户信息

![alt text](image-27.png)

## Github 授权

这里获取的数据后面配置到'.env'，为了安全，记得`.gitignore`忽略提交`.env`
![alt text](image-23.png)

![alt text](image-24.png)

![alt text](image-25.png)

需要注意这个 `callback url` 为`http://localhost:3000/api/auth/callback/github`
![alt text](image-30.png)

最终拿到 `AUTH_GITHUB_ID` 和 `AUTH_GITHUB_SECRET`，最后一个`AUTH_SECRET` 需要随机生成
![alt text](image-32.png)

#### 生成随机字符串

这里是给`.env` 的 `AUTH_SECRET` 字段用的

```bash
openssl rand -base64 32
```

## 配置.env

从上面 `github` 配置的参数拿到，大约是这样

```bash
AUTH_GITHUB_ID = 645659b798f96xxxxxxx
AUTH_GITHUB_SECRET = bae9254b7c41532551b4aexxxxxxxxxxxxxxxxxx
AUTH_SECRET = 1CrfSEZ5KFSglM3IopvODGxxxxxxxxxxxxxxxxxxx=
```

## 配置 auth.js

先 `tsconfig.json` 配置个别名

```json
"paths": {
   "@/*": ["./src/*"],
   "auth": ["./auth"]
}
```

再配置`auth.js`

```js
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub]
})
```

## 实现 Github 登陆

![alt text](process.jpg)

首先到根页面，因为访问需要权限才能去 `dashboard`，所以有个入口先去 `/login` 的入口，`/login` 可以 `Github` 登陆也可以`sign up`去注册账号，`Github` 登陆的话就跳回 `dashboard`，`sign up` 注册了账号的话还需要跳到 `login` 登陆

![alt text](image-34.png)

在这里加代码

```tsx
import { signIn } from 'auth'

function LoginWithGitHub() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
      }}
    >
      <Button variant="outline" className="w-full">
        Login with Github
      </Button>
    </form>
  )
}
```

然后就能跳到这里

![alt text](image-33.png)

点击就是 `Github` 登陆了，登陆后会看到多了 `3` 个 `cookie`

![alt text](image-35.png)

## 获取登陆信息

主要是`await auth()`

```tsx
import { Button } from '@/components/ui/button'
import { auth, signOut } from 'auth'

interface User {
  name: string
  email: string
  image: string
}

function LoginOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button>退出登陆</Button>
    </form>
  )
}

export default async function Home() {
  const session = (await auth()) as { user: User }
  const { user } = session

  return (
    <main className="">
      <div className="absolute left-[50%] mt-[30vh] translate-x-[-50%] translate-y-[-50%]">
        <div>你已经登陆，你现在在dashboard</div>
        <br />
        <div>
          <div>用户名：{user.name}</div>
          <br />
          <LoginOut></LoginOut>
        </div>
      </div>
    </main>
  )
}
```

## 中间件判断是否登陆

具体判断保护路由，看下一个点 `Adapters`的 `auth.ts` 配置代码

```ts
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export default NextAuth(authConfig).auth

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
```

## Database Adapters

用户登录信息持久化到数据库，参考`https://authjs.dev/getting-started/adapters`和`https://authjs.dev/reference/adapter/prisma`

需要安装`@auth/prisma-adapter`，然后配置`prisma`和`auth.ts`

配置 `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  posts         Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

配置`auth.ts`

```ts
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { NextAuthConfig } from 'next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const config = {
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png'
  },
  providers: [GitHub],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user
      // 如果是这个页面就要鉴权
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    }
  }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
```

## 邮箱登陆

参考`https://authjs.dev/getting-started/providers/email-tutorial`

#### 安装 nodemailer

`pnpm i nodemailer`

#### 配置邮箱

我用的网易邮箱大师，先回到旧版，然后开启服务

![alt text](image-37.png)

![alt text](image-38.png)

![alt text](image-39.png)

然后就拿到了密钥

#### 配置.env

`PASSWORD` 不是你的邮箱登录密码，而是刚才开启 `SMTP` 时的密钥
每个邮箱的 `SMTP` 端口都不一样，自己 `Google` 查一下，`163` 邮箱的端口是 `25`

```js
EMAIL_SERVER=smtp://userame:PASSWORD@smtp.163.com:25
EMAIL_FROM=userame@163.com
```

#### 配置 auth.ts

在 `providers` 里面加配置

```ts
import Email from 'next-auth/providers/nodemailer'

export const config = {
  providers: [
    GitHub,
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ]
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
```

此时就多了一个邮箱选项，但是要项目上线后才能使用邮箱登陆

![alt text](image-40.png)

<!-- ## 验证账号密码登陆 -->

## Zod 表单校验

参考 [shadcn](https://ui.shadcn.com/docs/components/form) 的 `demo`，`react-hook-form` 和 `Zod` 一起使用

```ts
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## 踩坑

使用 `shadcn` 的时候，它的 `input` 组件，默认是没有 `name` 属性的，无法被 `form` 和 `server action` 收集

![alt text](image-28.png)

`server action` 里报错如下，重启 `vscode` 就行了

![alt text](image-29.png)

使用 `adapter` 后会有报错，原因是不能直接在 `middleware` 里使用 `prisma/client`，也就是不能直接`export { auth as middleware } from 'auth'`，需要重新在中间价配置 `nextAuth`

![alt text](image-36.png)

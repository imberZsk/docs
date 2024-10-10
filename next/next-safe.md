用 nextjs + prisma + mysql 简单模拟 xss 攻击和 csrf 攻击

[源码仓库](https://github.com/imberZsk/nextjs-safe)

## 初始化 XSS 项目

`npx create-next-app@latest` 后输入名字一路回车

## 下载 prisma

`pnpm i prisma @prisma/client @prisma/extension-accelerate`，启动后端口用 3000

## 初始化 prisma

`npx prisma init --datasource-provider mysql`，

## 连接数据库

在`.env`输入账号密码和 db 的名字，比如我连接本地的数据库后是这样 `DATABASE_URL="mysql://root:admin@localhost:3306/safe"`

## 定义模型

prisma > schema.prisma

```prisma
model Comment {
  id      Int     @id @default(autoincrement())
  comment String?
}
```

## 同步数据库

```bash
npx prisma db push
```

vscode 插件可以看到初始化的表

![alt text](next-safe-1.png)

## 初始化 PrismaClient

防止热更新重复创建 PrismaClient 的新实例

src > lib > db.ts

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
```

## 写接口

新增评论接口 src > app > api > comment > create >route.ts

```ts
import prisma from '@/lib/db'

// 获取body参数
export async function POST(request: Request) {
  const body = await request.json()
  await prisma.comment.create({
    data: {
      comment: body.comment
    }
  })

  return Response.json({ success: true })
}
```

查询评论接口 src > app > api > comment > read >route.ts

```ts
import prisma from '@/lib/db'

// query参数
export async function GET() {
  const comments = await prisma.comment.findMany()

  return Response.json({
    data: comments
  })
}
```

## 写页面

src > app > page.tsx

这里使用 `dangerouslySetInnerHTML` 才会被攻击

```tsx
'use client'

import { useEffect, useState } from 'react'
interface CommentItem {
  comment: string
}
const Page = () => {
  const [data, setData] = useState<CommentItem[]>([])
  const [comment, setComment] = useState('')

  const fetchFn = async () => {
    fetch('/api/comment/read')
      .then((res) => res.json())
      .then((response) => setData(response.data))
  }

  useEffect(() => {
    fetchFn()
  }, [])
  return (
    <div className="flex justify-center flex-col items-center p-20">
      <input
        type="text"
        className="text-black w-[200px] mb-6 px-2"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value)
        }}
      />
      <div
        onClick={() => {
          fetch('/api/comment/create', {
            method: 'POST',
            body: JSON.stringify({
              comment
            })
          })
            .then((res) => res.json())
            .then(() => {
              fetchFn()
              setComment('')
            })
        }}
      >
        提交评论
      </div>
      <hr className="bg-red-500 w-full my-20" />
      <div className="">评论列表</div>
      <div className="mt-8">
        {data?.map((item: CommentItem, index: number) => {
          return (
            <div
              key={index}
              className="my-2 text-fuchsia-400"
              dangerouslySetInnerHTML={{ __html: item.comment }}
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default Page
```

初次 read，两次请求是因为 react 的 strict mode，不用管

![alt text](next-safe.png)

提交评论

![alt text](next-safe-2.png)

## 输入攻击代码

1. 反射型 XSS

- 输入：`<script>alert('XSS');</script>`
- 效果：当输入被显示时，会弹出一个警告框。（但没有看到理想的结果，可能浏览器或者 react 或者 next 优化了）

2. 存储型 XSS

- 输入：`<img src="x" onerror="alert('XSS')" />`
- 效果：当图片加载失败时，会弹出一个警告框。

3. DOM 型 XSS

- 输入：`<span onclick="alert('XSS')">点击我</span>`
- 效果：当用户点击这个文本时，会弹出一个警告框。

![alt text](next-safe-3.png)

## 解决 XSS

1. 首先要发现问题，避免使用 dangerousHTML/v-html/innerHTML 的地方，react 对其它的变量都会转译
2. CSP，指定哪些源的代码可以执行，可以降低风险
3. cookie 指定 httponly 和 secure，防止 js 访问 cookie，可以降低风险
4. 服务器验证输入，前端验证不可信

如果你项目没有用到用户输入 或者 `dangerousHTML/v-html/innerHTML`，那就不用考虑 XSS

## 初始化 CSRF 项目（钓鱼网站）

同上初始化项目和 prisma，之前的 xss 项目作为银行网站，这个项目作为钓鱼网站

## 银行网站新增用户和钱的模型

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Comment {
  id      Int     @id @default(autoincrement())
  comment String?
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  money Money[]
}

model Money {
  id     Int   @id @default(autoincrement())
  uid    Int   @unique // 保留唯一约束
  amount Int
  user   User? @relation(fields: [uid], references: [id])
}
```

定义完后 `npx prisma db push`

## 模拟数据

User 表

![alt text](next-safe-4.png)

Money 表，目前小黑子是 0 元，蔡徐坤是 100w 元

![alt text](next-safe-5.png)

## 银行网站新增转账接口

src > app > api > transfer > route.ts

```ts
import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()
export async function GET(request: NextRequest) {
  console.log(request.url)
  const searchParams = request.nextUrl.searchParams
  const fromUid = 27
  const uid = searchParams.get('to')
  const amount = searchParams.get('amount')

  await prisma.money.updateMany({
    where: {
      uid: Number(fromUid)
    },
    data: {
      amount: {
        decrement: Number(amount)
      }
    }
  })

  await prisma.money.updateMany({
    where: {
      uid: Number(uid)
    },
    data: {
      amount: {
        increment: Number(amount)
      }
    }
  })

  return Response.json({ success: 'success' })
}
```

## 钓鱼网站代码

src > app > page.tsx

```tsx
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="mb-2">钓鱼网</div>
      <img
        width={0}
        height={0}
        src="http://localhost:3000/api/transfer?amount=999999&to=28"
        alt=""
      />
    </div>
  )
}
```

## 进入钓鱼网站，会自动转账

可以看到 3001 端口的钓鱼网，通过图片请求了 3000 端口的银行网，可以看到图片也是携带了 cookie 的

![alt text](next-safe-6.png)

再看看蔡徐坤的钱，都转给小黑子了，留了一块钱买棒棒糖

![alt text](next-safe-7.png)

## 解决 CSRF

1. 首先要发现问题，避免 get 请求更改状态
2. token，验证 token，而不会像 cookie 一样自动携带
3. 设置 cookie 的 samesite 属性
4. 服务端检查 refer 头

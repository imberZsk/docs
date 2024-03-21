## 初始化 ORM-Prisma

安装 `Prisma`

```js
pnpm install prisma
```

初始化 `Prisma`，数据库为 `Mysql`

```js
npx prisma init --datasource-provider mysql
```

连接数据库`.env`

```js
DATABASE_URL = 'mysql://root:passward@172.16.180.38:3306/ef_test'
```

## 定义表结构

```js
model User {
  id       Int      @id @default(autoincrement())
  username String
  email    String   @unique
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

## 数据库迁移

```js
npx prisma migrate dev --name init
```

## 定义数据模型

数据模型需要与数据库保持一致。有两种方式使其保持一致：

- 手动修改数据模型，然后运行 `npx prisma migrate dev`修改数据库，使其保持一致
- 手动修改数据库，然后运行 `npx prisma db pull` 修改数据模型，使其保持一致

## RSC 里查询数据

```js
import Itemes from '@/ui/list/items'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function List() {
  const posts = await prisma.post.findMany()

  console.log(posts)
  return (
    <div>
      <Itemes posts={posts}></Itemes>
    </div>
  )
}
```

## Next API 接口

```js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req: Request) {
  const post = await req.json()
  const res = await prisma.post.create({ data: post })
  return Response.json(res)
}
```

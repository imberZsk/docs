## 插件和格式化

语法高亮，直接商店下载插件

![Alt text](image.png)

然后格式化需要`setting.json`新增

```js
"[prisma]": {
  "editor.defaultFormatter": "Prisma.prisma",
  "editor.formatOnSave": true
},
```

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

## 先下载 @prisma/client

`npm install @prisma/client`

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

## Relations

关系（relation）是指 Prisma schema 中的两个 model 建立连接。建立连接的方式是通过主键（PRIMARY KEY，简写 PK）和外键（FOREIGN KEY，简写 FK）。

所谓主键，指的是数据库表中对储存数据对象予以唯一和完整标识的数据列或属性的键，换句话说，主键是关系表中记录的唯一标识，也就是我们添加 @id 属性的字段。

所谓外键，指的是指向其他表的主键的键，用于建立两张表的关联性。Prisma 用 @relation 属性来建立关系。

```js
model User {
  id       String @id @default(uuid())
  notes    Note[]
}

model Note {
  id        String   @id @default(cuid())
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}
```

Note 的 author 字段指向 User，其中 @relation(fields: [authorId], references: [id])表示 Note 的 authorId 字段与 User 的 id 字段建立关系，也就是这两个字段的值应该是一致的。

## Prisma Client

#### 查询函数

查询函数有：

增：create()、createMany()
删：delete()、deleteMany()
改：update()、upsert()（找不到就创建）、updateMany()
查：findUnique()(需要有 @unique 属性)、findUniqueOrThrow()（找不到就报错）、findFirst()（找第一个）、findFirstOrThrow()（找不到就报错）、findMany()
其他：count()、aggregate()（聚合）、groupBy()

## 查询参数

其查询参数除了 where 用于条件查找之外，还有：

include 用于定义返回的结果中包含的关系
select 用于选择返回的字段
orderBy 用于排序
distinct 用于去重

```js
const usersWithPosts = await prisma.user.findMany({
  orderBy: {
    email: 'asc'
  },
  include: {
    posts: {
      select: {
        title: true
      },
      orderBy: {
        title: 'asc'
      }
    }
  }
})
```

#### 嵌套查询

在嵌套查询里，有：create、createMany、set、connect、connectOrCreate、disconnect、update、upsert、delete、updateMany、deleteMany，也就是如何处理关系表中的数据，示例代码如下：

```js
const user = await prisma.user.create({
  data: {
    username,
    password,
    notes: {
      create: [
        { title: '1', content: '1' },
        { title: '2', content: '2' }
      ]
    }
  }
})
```

在这段代码中，创建一条 user 记录的同时，也创建了两条 note 记录并进行了关联。其他方法的作用也是类似。

## 筛选条件

筛选条件支持 equals、not、in、notIn、lt、lte、gt、gte、contains、search、mode、startsWith、endsWith、AND、OR、NOT。举个简单的例子：

```js
const result = await prisma.user.findMany({
  where: {
    name: {
      equals: 'Eleanor'
    }
  }
})
```

这段代码的含义是查询 name 等于 'Eleanor' 的记录。

## Relation filters

最后还有 Relation filters，有 some、every、none、is、isNot，举个例子：

```js
const result = await prisma.user.findMany({
  where: {
    post: {
      some: {
        content: {
          contains: "Prisma"
        }
      }
    }
  }
}
```

这段代码的含义是获取文章中包含 Prisma 文字的 user 记录。

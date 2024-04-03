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

## 三个页面

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

点击就是 `Github` 登陆了

## Database Adapters

## 同步数据库

## 踩坑

使用 `shadcn` 的时候，它的 `input` 组件，默认是没有 `name` 属性的，无法被 `form` 和 `server action` 收集

![alt text](image-28.png)

`server action` 里报错如下，重启 `vscode` 就行了

![alt text](image-29.png)

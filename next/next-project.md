参考 [eslint](https://nextjs.org/docs/app/building-your-application/configuring/eslint#usage-with-other-tools)

## eslint 和 prettier

初始化项目，`npx create-next-app .` 一路回车

安装 `eslint-config-prettier` 和 `prettier`

`pnpm i eslint-config-prettier prettier prettier-plugin-tailwindcss -D`

配置 `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "no-empty-function": "error",
    "no-var": "error",
    "no-debugger": "error"
  }
}
```

配置 `.prettierrc.json`

```json
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"],
  "printWidth": 120,
  "endOfLine": "lf"
}
```

配置 `.prettierignore`

```ignore
pnpm-lock.yaml
.next
```

## .vscode

配置 `.vscode/settings.json`

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

配置 `.vscode/.rt.code-snippets`

```json
{
  "react typescript component": {
    "prefix": "rt",
    "body": [
      "const ${TM_FILENAME_BASE/(.*)/${1:/capitalize}/} = () => {",
      "  return (",
      "    <div>",
      "      <div></div>",
      "    </div>",
      "  )",
      "}",
      "",
      "export default ${TM_FILENAME_BASE/(.*)/${1:/capitalize}/}"
    ],
    "description": "rt"
  }
}
```

## tsconfig.json

`tsconfig.json` 里新增检查未使用的变量

```json
{
  "compilerOptions": {
    "noUnusedLocals": true
  }
}
```

## lintStaged

安装 `pnpm i lint-staged -D`

配置`.lintstagedrc.js`

```js
const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand]
}
```

在 `package.json` 添加 `"lint-staged": "pnpm run lint-staged"`

## commitlint

安装 `pnpm i @commitlint/cli @commitlint/config-conventional -D`

配置`.commitlintrc.json`

```js
{ "extends": ["@commitlint/config-conventional"] }
```

## husky

`npx husky init` 生成 `.husky` 和 在`package.json` 添加 `"prepare": "husky"`

`echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg`

`echo "pnpm lint-staged" > .husky/pre-commit`

也可以手动创建文件

`.husky/commit-msg`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
```

`.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

## 其它

.npmrc

```bash
engine-strict=true
```

package.json

```bash
"preinstall": "node ./src/lib/preinstall.js"
```

```bash
"engines": {
  "node": ">=20.9.0"
}
```

next.config.mjs

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://myplus-api.meizu.cn/:path*'
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ssm.res.meizu.com',
        port: '',
        pathname: '/**'
      }
    ],
    loader: 'custom',
    loaderFile: './bin/image_loader.js'
  }
}

export default nextConfig
```

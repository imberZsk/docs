## 页面吸附效果

section {
height: 100vh;
scroll-snap-align: center;
}

main {
height: 100vh;
overflow-y: scroll;
overflow-x: hidden;
scroll-snap-type: y mandatory;
}

@layer base {
section {
@apply h-screen snap-center;
}

main {
@apply h-screen snap-y snap-mandatory overflow-y-auto;
}
}

## 文字渐入效果

## 文字回弹效果

## 普通 pin 效果

## 文字依次出现效果

## 模块出现效果

## 复杂 pin 效果 1/2

## Tab 切换渐入效果

## 数字递增效果

## 视频和滚动条联动效果

## 手风琴效果

## 图片缩到手机效果

## 图片随滚动显示完全效果

## 图片上压效果

## git 指令

1.  查看提交信息：`git log`（git log --oneline 可以查看简介的提交信息）
2.  回滚到某次提交(版本回退/回滚本地代码)：`git reset --hard commitid`
3.  回滚到某次提交：`git revert commitid`
    - revert 只会取消那次提交
    - 会弹出 vim 模式修改需要的提交信息
    - 按下 i 进入可以输入的 insert 模式，然后修改成要的提交信息
    - 修改完后按 ESC 退出 insert 模式，进入 normal 模式
    - 按下:wq 保存并退出
    - 强制更新`git push -f`
4.  强制更新：`git push -f`
5.  合并其他分支（为一次提交）到当前分支：`git cherry-pick committed`
    - 一段提交，不包括 A：`git cherry-pick A..B`
6.  缓存文件，在一个分支没有开发完，要到另一个分支去处理问题，用 stash 缓存：`git stash`
7.  上线一个版本可能需要打 tag：`git tag v0.1`，推送 tag 用：`git push origin tag v0.1`
8.  修改上次提交的 commit 信息： `git commit --amend`，输入：`git commit --amend`，然后按 vim 模式保
9.  把最近 3 次提交的日志合并为 1 次：`git rebase -i HEAD~3`
    - 输入：git rebase -i HEAD~3
    - 先出现一个 vim 模式的文件，选择最近一次为 pick（必须第一个为 pick，否则会报错），其余为 s 表示压缩（同上编辑和保存）
    - 然后又出现一个 vim 模式文件，选择需要的提交信息，其余注释掉（同上编辑和保存）
    - 强制更新：git push -f

## node 下载 csv

用这个网站把 csv 转为 json,再用 nodefs 和 http 模块下载，https://tableconvert.com/csv-to-json

```js
const fs = require('fs')
const arr = require('./arr')
const https = require('https')
async function fn() {
  for (let i = 0; i < arr.length; i++) {
    await new Promise((resolve, reject) => {
      https.get(arr[i].path, (res) => {
        let data = ''
        res.setEncoding('binary')
        res.on('data', function (chunk) {
          data += chunk
        })
        res.on('end', () => {
          fs.writeFile(`./assets/${i}.jpg`, data, 'binary', (err) => {
            console.log(err)
          })
          resolve()
        })
      })
    })
  }
}
fn()
```

## 端口冲突

```js
sudo lsof -i :80
```

```js
sudo kill <PID>
```

## 计划 优先级

##### 锻炼

不能超过 12:30

30 分钟锻炼和读书

#### 工作项目开发

画报页 PC/h5，如果有新动画可以写文章
记录下小技巧，阴影，grid，vscode 快捷键......

#### 博客

完善瀑布流
虚拟列表

#### React 技术揭秘

processOn
docs

#### 学境

空闲看看

## git

删除和同步远程被删除的分支
git push origin --delete
git remote prune origin

删除远程 tag 和本地 tag
git push origin --delete v1.0.0
git tag -d v1.0.0

## 数字效果

```js
t1.from(
  '.num2',
  {
    textContent: 0,
    duration: 1,
    roundProps: 'textContent' // 将属性值舍入为整数
  },
  'spin'
)
```

## vscode 重制命令面板

View: Reset View Locations

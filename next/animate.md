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

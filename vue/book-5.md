# 编译器

## parse

template 通过 parse（有限状态机生成 token，再通过 token 压栈） 转化为 AST，再通过 transform（插件架构） 转化为 JS AST，再通过 generator 字符串拼接生成 render 函数

## 编译优化

编译优化的核心在于区分动态节点和静态节点。

Vue 会给动态节点打补丁 patchFlag 标识，还提出 Block 概念，比普通虚拟节点多出一个 dynamicChildren 数组用来手机所有动态子代节点。

静态提升、预字符串化、缓存内联事件处理函数、v-once 指令

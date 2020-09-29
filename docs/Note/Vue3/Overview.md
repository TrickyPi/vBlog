# Vue3与Vue2区别

## Composition Api

顾名思义，`Composition Api`相当与一个组合式的开发方式，更像是一种根据逻辑来开发的一种行为；

在Vue2中，我们更多的是遵守配置式的开发，比如Vue组件中暴露出的一些`Option`配置，把我们需要写的逻辑代码分散的写到这些选项中；
这样的话，不仅会造成我们的代码分散，不易阅读，更重要的一点是，当我们需要抽离组件内的功能变成复用功能时就变得十分困难；当然在vue2
中我们可以使用mixin来实现；不过mixin存在很多隐藏问题；
因此在Vue3中就出现了composition Api；这个其实跟react的hook就有一点相似；

## tree shanke

Vue2中的一些基本`Option`配置，比如computed，watch，等是不支持tree shanke，Vue3支持后，假如一些Option配置没有用到，打包时就不会把这些实现代码打包到项目中；进一步减少了项目体积


## 源码上

### 数据劫持的实现

数据劫持的实现在Vue2和Vue3中有跟大的区别，首先Vue2使用的是`Object.definePrototype()`实现的，而Vue3是基于ES6的`Proxy`api实现的；
两种实现有啥区别呢；
第一种实现方式：
    1.将会兼容更低版本的浏览器
第二种实现方式：
    1.

### diff的优化

Vue3对比于Vue2，他在diff比较上有了优化，首先会有一个`patch flag`概念
# vue 生命周期

## vue的生命周期示意图


## vue的所有生命周期的钩子
```js @/src/shared/constants.js
export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch' //浏览器端没有该生命周期
]
```
## 解释钩子啥时候调用

###  beforeCreate
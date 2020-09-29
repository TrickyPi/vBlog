## nextTick理解

### 用途&用法

将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

[nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)

### API的实现
核心的实现需要根据浏览器的运行环境决定，优先级为Promsie.then() > MutationObserver > setImmediate > setTimeout

nextTick会生成一个微任务或者宏任务放进事件队列里面，然后在vue的所有dom更新完成后，js引擎再执行nextTick的回调函数；

宏任务和微任务的理解请查看其他文档；

### 部分代码解读

下面是nextTick函数的实现代码，当我们调用this.$nextTick(cb)（假设我们提供一个cb，若不提供，浏览器若支持promise那么就会返回一个promise）的时候，
会有一个callbacks数组来收集这些cb（用匿名函数封装cb，callbacks数组内的元素其实是这些匿名函数）
```js
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```
当callbacks收集好之后，然后再执行timerFunc()（模块内pending变量默认是false）；执行timerFunc函数就会生成一个微任务或者宏任务（下面的代码是截取源码中利用Promsie.then实现的部分）；当js引擎执行到Promsie.then()的时候就会生成一个微任务（这个微任务就是运行flushCallbacks函数）；
```js
//timerFunc函数声明
let timerFunc
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
}
```

最后由于事件循环这个机制的存在，当js引擎执行到这个flushCallbacks函数的时候，就会通过for循环来执行数组内的每个匿名函数（相当于就会执行cb）

```js
//flushCallbacks函数
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```


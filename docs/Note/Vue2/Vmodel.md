# vue双向绑定

## 大概实现思路

v-model的具体实现主要由两部分构成，一个是：数据劫持，还有一个就是观察者模式；


## 数据劫持
通常我们编写的vue代码会被vue的构建工具解析，在这个解析的过程中，可以生成一个render函数，在之后vue实例化的过程中，就是_init()函数执行的过程中，将会对该v-model绑定的数据进行数据劫持（vue2中会使用`Object.defineProperty`Api进行数据劫持)，并在`$mount`（挂载）的过程中生成一个renderWacther；

## 发布-订阅者模式
发布-订阅模式常常用来跟观察者模式进行对比，其实两者的差距并不是很大，发布-订阅者模式多了一个消息队列（我们可以称为quene）；
在观察者模式中，被观察者的数据修改时将会直接通知观察者进行更新，而在发布-订阅者模式中，发布者和订阅者并不能知道对方的存在，他们俩的通信依托于消息队列

### vue中发布-订阅模式的实现
<!-- 在vue里面，发布-订阅模式下的消息队列用的是Dep全局变量，通过dep来通知订阅者进行更新； -->



### dep的实现
首先在讲vue中发布-订阅模式怎么具体实现之前，我们先看一下dep是怎么实现的；
首先dep实例是由Dep类构造而成

```js
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```
首先从Dep的构造函数中我们可以看到dep实例有两个属性uid（uid就是定义该dep的唯一id）和subs数组（subs数组皴法该的是watcher实例），然后dep实例还包括addSub和removeSub方法用来添加和删除sub（watcher实例）、notify方法来通知所有该dep实例下的所有watcher对象进行更新；

这里有一个小细节：

就是`depend`方法，该方法修改的实Dep类上的target属性;

//todo 详解

### wacher对象的实现

### 具体实现方式
首先在数据劫持的过程中

```js @src/core/observer/index.js
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```



# 记录自己阅读vue源码的过程（vue2）

`new Vue().mount('el')`到底干了什么事情，其实大体上的可以分为两部分：Vue的实例化、dom的挂载
先说Vue的实例化过程；
相关源码位置：
首先实例化的时候会调用Vue.prototype上的的_init函数
```js @/src/core/instance/init.js 8
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```
从_init函数的源码中，我们可以看到整个vue实例化主要干了什么事情；
从主要功能将起，首先，先进行生命周期的初始化`initLifecycle`,接着是`initEvents`,`initRender`,再触发beforeCreate钩子，接着_init函数调用`initInjections`,`initState`,`initProvide`,之后再触发created钩子，接着就是判断是否需要挂载到dom元素上，如果需要挂载的话，将会执行Vue原型对象上的`$mount`函数，把Vue挂载到目标dom上
```js @/src/core/instance/init.js 16
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++ //uid 为全局变量，每次实例化的时候+1（let uid = 0）

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
}
```
我们再来研究一下这些主要的内部初始化函数和钩子调用方法到底做了哪些事，我们从执行顺序开始讲解
1.initLifecycle
```js @/src/core/instance/lifecycle.js 16
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}
```
2.initEvents(vm)
注册全局事件api

3.initRender(vm)
在执行这个函数时，会判断该vue实例是否有`$attr`和`$listeners`数据，如果有的话，会对这些数据进行数据劫持；没有的话则会绑定一个空对象并进行数据劫持；
4.callHook(vm,'breforeCreate')
调用breforeCreate钩子，触发breforeCreate生命周期

5.initInjections(vm)

6.initState(vm)
初始化一些全局配置

initProps
initMethods
initData
initComputed
intWtach

7.initProvide(vm)

8.callHook(vm,'created')
调用created钩子

9.vm.$mount(vm.$options.el)
在上面的函数执行完成后，_init函数会判断是否存在挂载dom，存在的话，将会执行`$mount`方法，把vue实例挂载到dom上；


我们再来往下执行，执行$mount方法其实是执行的是mountComponent方法
```js @/src/core/instance/lifecycle.js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```

首先我们可以看到这段函数，首先调用了`beforeMount`钩子，接着声明里一个updateComponent函数用来更新视图，接着将会初始化一个Watcher实例，最后会判断是否有父组件，有的话将会调用`mounted`钩子
## 前言

这次梳理的是vue相关的知识点，整理的是自己不太清楚的点，难易程度不是按照顺利来的。



## v-if和v-show区别

- v-show 是通过CSS display控制显示隐藏的
- v-if是真正组件的渲染和销毁，而不是隐藏和显示
- 频繁切换显示使用v-show，否则使用v-if



## 你知道v-for 中 key作用跟工作原理吗？

源码中找答案：src\core\vdom\patch.js - updateChildren()

- 必须使用key,且不能是index和random
- diff算法中通过tag和key来判断，是否是sameNode
- 这样子的话，就可以减少渲染次数，提升渲染性能。



## 说一说v-model实现的原理

v-model本质上就是语法糖，即利用v-model绑定数据后，其实就是**既绑定了数据，又添加了一个input事件监听**，如下：

```
<input v-model='searchData'>
```

等价于

```
<input 
	v-bind:value = 'searchData'
	v-on:input = 'searchData = $event.target.value'
>
```

当在input元素中使用v-model实现双数据绑定，其实就是在输入的时候触发元素的input事件，通过这个语法糖，实现了数据的双向绑定。



## 说一说Vue 生命周期钩子函数

1. **beforeCreate：**在实例初始化之后，数据观测（data observe）和event/watcher事件配置之前被调 

用，这时无法访问data及props等数据；



2. **created：**在实例创建完成后被立即调用，此时实例已完成数据观测（data observer），属性和方法 

的运算，watch/event事件回调，挂载阶段还没开始， $el 尚不可用。



3. **beforemount:**在挂载开始之前被调用，相关的render函数首次被调用



4. **mounted：**实例被挂载后调用，这时el被新创建的vm. $el 替换，若根实例挂载到了文档上的元素 

上，当mounted被调用时vm.$el也在文档内。注意mounted不会保证所有子组件一起挂载。 



5. **beforeupdated：**数据更新时调用，发生在虚拟dom打补丁前，这时适合在更新前访问现有dom，如 

手动移除已添加的事件监听器。 



6. **updated：**在数据变更导致的虚拟dom重新渲染和打补丁后，调用该钩子。当这个钩子被调用时，组 

件dom已更新，可执行依赖于dom的操作。多数情况下应在此期间更改状态。 如需改变，最好使用watcher或计算属性取代。注意updated不会保证所有的子组件都能一起被重绘。 



7. **beforedestory：**在实例销毁之前调用。在这时，实例仍可用。 

   

8. **destroyed：**实例销毁后调用，这时vue实例的所有指令都被解绑，所有事件监听器被移除，所有子实 

例也被销毁



## Vue 数据响应式怎么做到的？



## Vue.set 是做什么用的？







## Vue 如何实现组件间通信？

1. props ★★ （父传子）
2.  $emit/$on ★★ 自定义事件（跨层级通信）
3.  vuex ★★★（状态管理 常用 皆可）
4.  provide/inject ★★★ （高阶用法 = 推荐使用 ） 优点：使用简单 缺点：不是响应式



常见使用场景可以分为三类：

- 父子组件通信 

- 兄弟组件通信 

- 跨层组件通信



### props

父组件A通过 props 向子组件B传递值， B组件通过 $emit 向A组件派发一个事件，A组件通过 v-on/@ 触发



### $emit/$on 事件总线 

> vue 实例 作为事件总线（事件中心）用来触发事件和监听事件，可以通过此种方式进行组件间通信包括：父子组件、兄弟组件、跨级组件 

例子👇

创建Bus文件

```
// Bus.js 创建bus文件 
import Vue from 'vue'
export defult new Vue()
```

看看组件间怎么使用吧

```
	// gg组件
    <template id="a">
        <div>
            <h3>gg组件</h3> <button @click="sendMsg">将数据发送给dd组件</button>
        </div>
    </template>
    <script>
        import bus from './bus'
        export default {
            methods: {
                sendMsg() {
                    bus.$emit('sendTitle', '传递的值')
                    开课吧web全栈架构师
                }
            }
        }
    </script>
```

然后看看dd组件使用👇



```
	// dd组件
	<template>
        <div>接收gg传递过来的值：{{msg}} </div>
    </template>
    <script>
        import bus from './bus'
        export default {
            data() {
                return {
                    mag: ''
                }
            }
            mounted() {
                bus.$on('sendTitle', (val) => {
                    this.mag = val
                })
            }
        }
    </script>
```

最后可以在钩子函数中，beforedestory中，通过bus.$off( [event, callback] )解绑该事件。







### provide/inject

主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。 

> 需要注意的是：provide 和inject绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一 个可监听的对象，那么其对象的属性还是可响应的----vue官方文档,所以，上面 A.vue 的 name 如 果改变了，B.vue 的 this.name 是不会改变的。



解决办法：

**使用2.6最新API Vue.observable 优化响应式 provide(推荐)**



## watch 和 computed 区别

### 侦听属性watch

- 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；
- 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
- 当一个属性发生变化时，需要执行对应的操作，可以一对多；
- 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数：



### 计算属性computed

- 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；
- 不支持异步，当computed内有异步操作时无效，无法监听数据的变化



### 运用场景

- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
- 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。



## Vuex 你怎么用的？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。实现了一个单向数据流，在全局拥有一个State 存放数据，当组件要更改State 中的数据时，必须通过 Mutation 提交修改信息，** Mutation 同时提供了订阅者模式供外部插件调用获取 State 数据的更新。



主要包含以下几个模块👇



### State

定义应用状态的数据结构，可以设置默认的初始状态。



### Getter

可以将 getter 理解为计算属性， getter 的返回值根据他的依赖缓存起来，依赖发 生变化才会被重新计算。

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```



使用mapGetters辅助函数, 利用对象展开运算符将getter混入computed 对象中



```
import {mapGetters} from 'vuex'
export default{
    computed:{
        ...mapGetters(['total','discountTotal'])
    }
}
```





### mutation

更改 state 中唯一的方法是提交 `mutation `。该方法都有一个字符串和一个回调函数。 回调函数就是使劲进行状态修改的地方，并且会接收 state 作为第一个参数 `FunC` 为第二 个参数， `FunC` 为自定义函数， mutation 必须是同步函数。 

```js
// 辅助对象 mapMutations 
        mutations: {
            reducePrice: (state, FunC) => {
                return state.productList.forEach((product) => {
                    product.price -= FunC;
                })
            }
        }
```

页面怎么去使用呢👇

```js
			<!--页面使用-- >
            methods: {
                reducePrice() {
                    this.$store.commit('reducePrice', 4)
                }
            }
```

**组件中重复使用mutation**

```
import { mapMutations } from 'vuex'
methods:{
    ...mapMutations({
        setPrice:'reducePrice',
    })
}
```

调用this.setPrice(10)相当调用this.$store.commit('reducePrice',10)



### action 

 action 类似 mutation 都是修改状态，不同之处

- action 提交的 mutation 不是直接修改状态 

- action 可以包含异步操作，而 mutation 不行 

- action 中的回调函数第一个参数是 context ，是一个与 store 实例具有相同属性的 方法的对象 

- action 通过 store.dispatch 触发， mutation 通过 store.commit 提交 



```js
actions: {
            // 提交的是mutation，可以包含异步操作 
            reducePriceAsync: (context, payload) => {
                setTimeout(() => {
                    context.commit('reducePrice', payload);
                    // reducePrice为上 一步mutation中的属性 
                }, 2000)
            }
        }
```

页面中怎么去使用呢

```
			<!--页面使用-- >
            // 辅助对象 
            mapActions methods: {
                reducePriceAsync() {
                    this.$store.dispatch('reducePriceAsync', 2)
                }
            }
```



### module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）

使用如下

```
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
// 如何使用呢
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```



## VueRouter 你怎么用的？





## 路由守卫是什么？





## 组件中 data 为什么是一个函数？



答👇

> Vue组件可能存在多个实例，如果使用对象形式定义data，则会导致它们共用一个data对象，那么状态变更将会影响所有组件实例，这是不合理的；采用函数形式定义，在initData时会将其作为工厂函数返回全新data对象，有效规避多实例之间状态污染问题。而在Vue根实例创建过程中则不存在该限制，也 是因为根实例只能有一个，不需要担心这种情况。





## Vue原理面试题



## 说一说MVVM

传统组件，也就是web1.0，甚至是web2.0阶段，页面的渲染是静态的，也就是说更新需要依赖于操作Dom,而MVVM的提出，解决了这个问题。

关键点，**数据驱动视图**，我们无需去操作DOM，只需要关心数据，视图会异步的去更新。

MVVM可以拆分成三部分，Model，View，ViewModel。

Model层:我立即的是data中的数据，或者是Vuex中的状态。

View层:视图，我更多的是理解成Dom

ViewModel层：按照通俗的话理解，更像是Vue提供的一种能力，建立起两者之间的连接，我把它看成是连接层。



怎么来理解呢？我是这么想的👇

- 当数据Model层数据发生改变的话，View视图层就会发生相应的变化，我们是不需要去操作Dom的，这个工作就是交给了ViewModel层，它来帮我们完成。
- View层，比如你有点击事件，这些都是可以修改Model层中的数据的，所以说，ViewModel层更像是一个桥梁，提供了一种能力，让我们不在去关心如何去操作Dom。





## Vue响应式原理

什么是响应式，我的理解就是组件中的data数据一旦发生变化，会触发视图的更新。那么是如何监听数据发生改变，然后去通知视图View层改变的呢？👉**Object.defineProperty()**

核心API就是**Object.defineProperty()**，那么它的用法是什么，以及优缺点是什么呢？

- 可以检测对象中数据发生的修改
- 对于复杂的对象，层级很深的话，是不友好的，需要经行深度监听，这样子就需要递归到底，这也是它的缺点。
- 对于一个对象中，如果你新增加属性，删除属性，**Object.defineProperty()**是不能观测到的，那么应该如何解决呢？可以通过Vue.set()和Vue.delete()来实现。

基于以上的点，Vue3.0版本也就是提出了Proxy，当然了Proxy对浏览器兼容性不是很好，比如IE11版本不兼容，也无法polyfill，嗯….，先看下**Object.defineProperty()**是如何使用的吧。

写个简单的模拟拦截数据吧👇

```
// 模拟更新视图操作
function update(){
    console.log('数据发生改变')
}

// 从新去定义监听属性
function defineVue(target, key, value) {

    // 核心API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if(newValue !== value){

                // value是存在闭包中的,通过get获取的也是最新的value
                value = newValue

                // 触发视图
                update()
            }
        },
    })
}


function observer(target) {
    // 判断是不是对象
    if(typeof target !== 'object' || target === null ) return target

    for(let key in target) {
        defineVue(target,key,target[key])
    }
}


// 监听数据
let data = {
    name : "TianTian",
    age : 18,
    list : [1,2,3],
    major : {
        Math : 140
    }
}

// 监听数据
observer(data)

// 测试数据
data.name = 'newName'   // 这个触发了update
data.major.Math = 150    // 这个就不会去触发视图更新 update
```

这样子来看，第53行是不会去触发，也就是说对于**引用类型，是监听不到的**，那么我们就需要去进行深度监听，

加上几行代码就行

```js
// 模拟更新视图操作
function update(){
    console.log('数据发生改变')
}

// 从新去定义监听属性
function defineVue(target, key, value) {

    observer(value)  // 深度监听

    // 核心API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if(newValue !== value){

                observer(newValue)  // 设置新的值也是需要去监听的 比如data.age = {son : 123}  这样子的话,也可以避免问题

                // value是存在闭包中的,通过get获取的也是最新的value
                value = newValue

                // 触发视图
                update()
            }
        },
    })
}


function observer(target) {

    // 判断是不是对象
    if(typeof target !== 'object' || target === null ) return target

    for(let key in target) {
        defineVue(target,key,target[key])
    }
}


// 监听数据
let data = {
    name : "TianTian",
    age : 18,
    list : [1,2,3],
    major : {
        Math : 140   // 需要深度监听
    }
}

// 监听数据
observer(data)

// 测试数据
data.name = 'newName'   // 这个触发了update
console.log(data.age)
data.major.Math = 150    // 这个就不会去触发视图更新 update
console.log(data.major.Math = 150)
data.age = { so : '修改的数据是对象，也可以监听到'}     // 通过对newValue重新去监听

data['some']= '新增加属性'   // 监听步到，所以需要 Vue.set()
delete data.age            // 删除的话,也是不行，所以需要Vue.delete()
```

从上面代码来看，缺点也是有的👇

- 对于监听对象很复杂，需要深度监听，需要递归到底，一次性计算大
- 无法监听新增和删除属性(Vue.set() / Vue.delete())



**如何监听数组呢**

通过将数组的常用方法进行重写，通过包装之后的数组方法就能够去在调用的时候被监听到。

```js
const arrContext = Object.create(Array.prototype)
const arrMethods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
arrMethods.forEach(methodName => {
    arrContext[methodName] = function(...args){
        Array.prototype[methodName].apply(this,args)
        console.log(`${methodName}方法被执行了`)
    }
})

export default arrContext
```

然后再判断如果是数组的话，也就是

```
if(Array.isArray(target)){
        target.__proto__ = arrContext
}
```

这样子就可以检测数组的变化了。
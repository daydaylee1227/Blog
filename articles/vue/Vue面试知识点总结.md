## 前言

这次梳理的是vue相关的知识点，整理的是自己不太清楚的点，难易程度不是按照顺利来的。





## 说一说Vue 生命周期钩子函数

1. **beforeCreate：**在实例初始化之后，数据观测（data observe）和event/watcher事件配置之前被调 

用，这时无法访问data及props等数据；



2. **created：**在实例创建完成后被立即调用，此时实例已完成数据观测（data observer），属性和方法 

的运算，watch/event事件回调，挂载阶段还没开始， $el 尚不可用。



3. **beforemount:**在挂载开始之前被调用，相关的render函数首次被调用



4. **mounted：**实例被挂载后调用，这时el被新创建的vm. $el 替换，若根实例挂载到了文档上的元素 

上，当mounted被调用时vm.$el也在文档内。注意mounted不会保证所有子组件一起挂载。 



5. **beforeupdata：**数据更新时调用，发生在虚拟dom打补丁前，这时适合在更新前访问现有dom，如 

手动移除已添加的事件监听器。 



6. **updated：**在数据变更导致的虚拟dom重新渲染和打补丁后，调用该钩子。当这个钩子被调用时，组 

件dom已更新，可执行依赖于dom的操作。多数情况下应在此期间更改状态。 如需改变，最好使用watcher或计算属性取代。注意updated不会保证所有的子组件都能一起被重绘。 



7. **beforedestory：**在实例销毁之前调用。在这时，实例仍可用。 

   

8. **destroyed：**实例销毁后调用，这时vue实例的所有指令都被解绑，所有事件监听器被移除，所有子实 

例也被销毁



## Vue 数据响应式怎么做到的？



## Vue.set 是做什么用的？



## Vue 如何实现组件间通信？





## watch 和 computed 区别



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


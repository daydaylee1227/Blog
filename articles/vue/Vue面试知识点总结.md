## 前言

这次梳理的是vue相关的知识点，整理的是自己不太清楚的点，难易程度不是按照顺利来的。





## 说一说Vue 生命周期钩子函数







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
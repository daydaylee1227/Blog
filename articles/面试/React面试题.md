## setState是同步还是异步？

首先，这个问题的抛出，我会想为什么要抛出这个问题呢？如果说，你需要依赖状态更新后的值时，那么首先如何做呢？

- 对于Class Component而言，我们可以在componentDidMount或者是componentDidUpdate阶段来执行。
- 对于Function Component而言，我们可以在useEffect的回调函数中执行。



首先，我们先给出结论，在React中不同的模式它的情况是不一样的，主要拿两种模式来说。

1. **legacy**模式
2. **concurrent**模式



**legacy 模式**

这是当前 React app 使用的方式⬇️

```jsx
ReactDOM.render(<App />, rootNode)
```

当前没有计划删除本模式，但是这个模式可能不支持这些新功能。

回到我们上述的问题，setState是同步的还是异步的？

> 当在legacy模式下，命中batchedUpdates时，setState是异步的。
>
> 当在legacy模式下，没命中batchedUpdates时，setState是同步的。



既然聊到了这里，我们来说一说batchedUpdates函数的作用。

那么它是干嘛的呢？如果你在处理逻辑函数中多次调用this.setState时，它是如何更新状态的呢？

```react
    this.setState({
      value: this.state.value + 1
    })
    this.setState({
      value: this.state.value + 1
    })
    this.setState({
      value: this.state.value + 1
    })
```

那React实现了这个批量更新的操作,将多次的setState合并为一次更新，那么它是如何实现的呢？batchedUpdates函数就登场了。

```react
function batchedUpdates$1(fn, a) {
    var prevExecutionContext = executionContext;
    executionContext |= BatchedContext;

    try {
      return fn(a);
    } finally {
      executionContext = prevExecutionContext;

      if (executionContext === NoContext) {
        // Flush the immediate callbacks that were scheduled during this batch
        resetRenderTimer();
        flushSyncCallbackQueue(); // 同步的更新
      }
    }
  }
```

这个函数会传递一个fn，当执行fn之前，会在executionContext变量上附加一个BatchedContext，当fn执行完毕后，executionContext就会把之前的BatchedContext标记给去除掉。

- 这样子一来，当executionContext带上了BatchedContext标记的话，react内部就会去做判断，带上了这个标记，这次的更新就是批处理，那么此次更新就是异步的。



那么，我们是不是能够假设一下，如果在执行完fn函数后，再去更新状态的话，是不是就能完成同步的更新呢？

setTimeout函数,我们可以把setState放在定时器中,这样子一来的话,当fn函数执行完时，BatchedContext标记也去掉了，然后等到 `setTimeout` 的回调函数等到空闲被执行的时候，才会执行 `setState`。

```react
		setTimeout(() => {
      this.setState({ value: this.state.value + 1})
    }, 0)
```

这也就是当executionContext === NoContext，也就是会执行flushSyncCallbackQueue函数，完成此次的同步更新。

当然了，在**concurrent 模式**下，又是有所不同的。

这个时候，我们得谈一谈scheduleUpdateOnFiber函数。

我们都知道任务调度的起点是 scheduleUpdateOnFiber 方法，React.render、setState、forceUpdate、React Hooks 的dispatchAction 都会经过 scheduleUpdateOnFiber。

```react
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
    // ...
    if (root === workInProgressRoot) {
      // ...... 
    } // TO an argument to that function and this one.
    if (lane === SyncLane) {  // 同步任务
      if ( // 检查当前是不是在unbatchedUpdates（非批量更新）,（初次渲染的ReactDOM.render就是unbatchedUpdates）
      (executionContext & LegacyUnbatchedContext) !== NoContext && // Check if we're not already rendering
      (executionContext & (RenderContext | CommitContext)) === NoContext) {
        // Register pending interactions on the root to avoid losing traced interaction data.
        schedulePendingInteractions(root, lane); 
        performSyncWorkOnRoot(root);
      } else {
        ensureRootIsScheduled(root, eventTime);
        schedulePendingInteractions(root, lane);
        if (executionContext === NoContext) {
          resetRenderTimer();
          flushSyncCallbackQueue();
        }
      }
    } else { // 异步任务
      // concurrent模式下是跳过了 flushSyncCallbackQueue 同步更新
      // ....
    } 
  }
```

scheduleUpdateOnFiber函数通过lane === SyncLane来判断是同步任务还是异步任务，我们通过ReactDom.render()方式创建的React app是会进入这个判断的，而concurrent模式下，则不同，那么它是如何创建的呢⬇️



**concurrent 模式**

你可以理解成，这个暂时还是实验阶段，当未来稳定后，将会作为React开发的默认开发模式，它是如何创建一个React App应用的呢⬇️

```jsx
ReactDOM.createRoot(rootNode).render(<App />)
```

这个模式开启了*所有的*新功能。

> concurrent模式下状态的更新都是异步的。

关于React的concurrent 模式解读，有兴趣可以看看[官方文档](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html)。

到这里的话，似乎我们对React中setState是同步的还是异步的就有所了解了。





### 哪些会命中batchUpdate机制

- 生命周期(和它调用函数)
- React中注册的事件
- React可以'管理入口'





## React性能优化

主要优化的从实现组件的方式来看，基于以下两种方式。





### Class Component

1、使用纯组件 `PureComponent` 作为基类。

2、使用 `React.memo` 高阶函数包装组件。

3、使用 `shouldComponentUpdate` 生命周期函数来自定义渲染逻辑。



### Functional Component

1、使用 `useMemo`。

2、使用 `useCallBack`。







### 其他方式

1、在列表需要频繁变动时，使用唯一 id 作为 key，而不是数组下标。

2、必要时通过改变 CSS 样式隐藏显示组件，而不是通过条件判断显示隐藏组件。

3、使用 `Suspense` 和 `lazy` 进行懒加载，例如









## React组件间通信方式 





know-circle-question



## JSX本质是什么



- 首先解析出来的话，就是一个createElement函数
- 然后这个函数执行完后，会返回一个vnode
- 通过vdom的patch或者是其他的一个方法，最后渲染一个页面





```
React.createElement('div', null, [children1, children2])
// 第一个是div, 对应tag标签名称, 组件的话，应该是Input
// 第二个是一些属性，或者是null
// 第三个是子组件
```



如何答这个题目呢⬇️

首先，它是creatElement函数的语法糖，即h函数，返回的是一个vnode。

它第一个参数，可能是组件，也可能是html tag。





## Context是什么，如何使用？



- 父组件







## React原理

函数式编程，何为函数式编程

- 一种编程方式
- 纯函数
- 不可变式



## 回顾vdom和diff

- h函数
- vnode数据结构
- patch函数





### diff算法

- 只比较同一级，不跨级比较。
- tag不相同的话, 则重新删掉重建，不再深度比较。
- tag和key，两者相同的话，则认为是相同节点，不在深度比较。





## React合成事件



- 所有的事件挂在document上
- event不是原生的，是SyntheticEvent合成事件对象
- 和Vue事件不同,和DOM事件也不同



如果DOM上绑定了过多的事件处理函数,整个页面响应以及内存占用可能都会受到影响。
 React为了避免这类DOM事件滥用,同时屏蔽底层不同浏览器之间的事件系统的差异,实现了一个中间层 - SyntheticEvent

1. 当用户在为onClick添加函数时,React并没有将Click绑定到DOM上面
2. 而是在document处监听所有支持的事件,当事件发生并冒泡至document处时,React将事件内容封装交给中间层 SyntheticEvent (负责所有事件合成)
3. 所以当事件触发的时候, 对使用统一的分发函数 dispatchEvent 将指定函数执行



### 为何要合成事件



- 兼容性和跨平台
- 挂在统一的document上，减少内存消耗，避免频繁解绑
- 方便事件的统一管理（事务机制）
- dispatchEvent事件机制







## React-fiber

最主要的思想就是将任务拆分。

- DOM需要渲染时暂停，空闲时恢复。
- window.requestIdleCallback
- React内部实现的机制 





## 组件渲染和更新

- 更新的两个阶段reconciliation和commit







## React和Vue区别

### 相同点

- 组件化思想
- 都是数据驱动视图
- 都是用vdom操作DOM



### 区别

- React使用JSX拥抱JS，Vue使用模版拥抱html
- Vue声明式编程，React函数式编程。
  - Vue中data = 100，自动去更新状态
  - React中用setState去触发数据做修改,做完修改后,返回一个视图或者是新视图。





## 受控组件和非受控组件

```
<FInput value = {x} onChange = {fn} /> 
// 上面的是受控组件 下面的是非受控组件
<FInput defaultValue = {x} />
```

当你一个组件同时传递一个value以及onChange事件时，它就是一个受控组件，收入输出都是我来控制的。

第二个只是传递了默认的初时值，并没有传onchange事件，

非受控组件是一种反模式，它的值不受组件自身的state或props控制



## 什么是高阶组件

- React.memo
- 



组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

> 请注意，HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件*包装*在容器组件中来*组成*新组件。HOC 是纯函数，没有副作用。



高阶组件实际上就是一个函数，它接受一些参数后，返回一个函数。

也就是说，它接受一个组件，然后返回一个新的组件，为什么要对这个组件包装呢？

这个组件大部分都能使用，少数地方有些区别，那我们就可以把这些公用的地方写在高阶组件中去，通过传递一额外的props，动态的改变某些场景下的差异。 



**高阶组件地狱**



- 操作 props
- 通过 Refs 访问到组件实例
- 提取 state
- 用其他元素包裹 *WrappedComponent*



**用其他元素包裹 WrappedComponent**

包裹样式





## React diff原理

[点击这里](https://react.iamkasong.com/diff/prepare.html#diff%E7%9A%84%E7%93%B6%E9%A2%88%E4%BB%A5%E5%8F%8Areact%E5%A6%82%E4%BD%95%E5%BA%94%E5%AF%B9)



优化⬇️

为了降低算法复杂度，`React`的`diff`会预设三个限制：

1. 只对同级元素进行`Diff`。如果一个`DOM节点`在前后两次更新中跨越了层级，那么`React`不会尝试复用他。
2. 两个不同类型的元素会产生出不同的树。如果元素由`div`变为`p`，React会销毁`div`及其子孙节点，并新建`p`及其子孙节点。
3. 开发者可以通过 `key prop`来暗示哪些子元素在不同的渲染下能保持稳定。考虑如下例子：



###  Diff的思路

该如何设计算法呢？如果让我设计一个`Diff算法`，我首先想到的方案是：

1. 判断当前节点的更新属于哪种情况
2. 如果是`新增`，执行新增逻辑
3. 如果是`删除`，执行删除逻辑
4. 如果是`更新`，执行更新逻辑

按这个方案，其实有个隐含的前提——**不同操作的优先级是相同的**

但是`React团队`发现，在日常开发中，相较于`新增`和`删除`，`更新`组件发生的频率更高。所以`Diff`会优先判断当前节点是否属于`更新`。



基于以上原因，`Diff算法`的整体逻辑会经历两轮遍历：

第一轮遍历：处理`更新`的节点。

第二轮遍历：处理剩下的不属于`更新`的节点。







## redux中间件的原理是什么

applyMiddleware

#### 为什么会出现中间件？

它只是一个用来加工dispatch的工厂，而要加工什么样的dispatch出来，则需要我们传入对应的中间件函数



让每一个中间件函数，接收一个dispatch，然后返回一个改造后的dispatch，来作为下一个中间件函数的next，以此类推。

```js
function applyMiddleware(middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )
  return Object.assign({}, store, { dispatch })
}
```



>上面的middleware(store)(dispatch) 就相当于是 const logger = store => next => {}，这就是构造后的dispatch，继续向下传递。这里middlewares.reverse()，进行数组反转的原因，是最后构造的dispatch，实际上是最先执行的。因为在applyMiddleware串联的时候，每个中间件只是返回一个新的dispatch函数给下一个中间件，实际上这个dispatch并不会执行。只有当我们在程序中通过store.dispatch(action)，真正派发的时候，才会执行。而此时的dispatch是最后一个中间件返回的包装函数。然后依次向前递推执行。





redux-thunk原理

connect



## redux数据管理

你会把数据统一放在redux中管理，还是共享数据放在redux中管理？

**答：**

> 统一放在redux中管理，我们都知道数据存在props中和state中，当你会认为当前这个组件的数据只是这个组件需要使用，当某一天，项目扩展，这个组件数据需要给其他组件使用，这个时候，你是如何传递数据呢，是通过props传递呢，还是放在redux中存呢？
>
> 本来一开始自身使用，后来需要共享数据，需要放在redux，你还是需要将state数据迁移到redux中。
>
> 代码可维护性，可扩展性很高，加上immutable + react后，更加友好，性能更好，数据也不会臃肿。



## componentWillReceiveProps调用时机

当props值修改的时候，会调用该钩子 。





## React性能优化最佳实践

PureComponent组件，浅比较。+ immutable.js 库



**继承PureComponent时，进行的是浅比较，也就是说，如果是引用类型的数据，只会比较是不是同一个地址，而不会比较具体这个地址存的数据是否完全一致。**



> react函数组件的性能优化突破口两个，避免重复计算，减少diff.，下面针对这两个点进行性能优化





## 虚拟dom是什么，为什么虚拟dom可以提高性能

js对象，映射真实dom的一些信息。

- 真实dom比对，比如属性方法，绑定事件，很消耗性能。

- 单纯的比较js对象，就没有真实dom的一些特性，就比较快。
- 所以我们将真实dom比对换成js对象比对，有效提升react性能。



## 调用setState后，发生了什么

首先，我们将可以触发更新的方法所隶属的组件分类：

- ReactDOM.render —— HostRoot
- this.setState —— ClassComponent
- this.forceUpdate —— ClassComponent
- useState —— FunctionComponent
- useReducer —— FunctionComponent



#### 大致的流程

首先创建一个[Update对象](https://react.iamkasong.com/state/update.html#update%E7%9A%84%E7%BB%93%E6%9E%84)



从fiber到root根节点。



调度当前的根结点。



在调度后的回调函中，就会进入render阶段。



在diff算法中，会根据Update对象返回对应的state，根据这个state判断是否需要更新视图。 

如果要更新的话，就会标记effect tag类似的标记，然后进入commit阶段。



标记了effect tag的fiber就会进入对应的更新世图。





遇到的坑:

比如我需要获取到最新的ref上的值，获取的还是旧值，这里的话，我一般都会在第二个回调函数中处理。





## Refs作用是什么，什么业务场景中使用

需要操作真实dom，

场景：

当我图片渲染完后，需要获取图片的宽度和高度，这个时候就需要操作真实dom。



## ref是一个函数，有什么好处呢



```js
<div ref = {(e) => {this.refEle = e}}> </div>
// 推荐这么写
```

好处在于:

react在组件销毁或者是重新渲染时，清空ref引用，造成内存泄露。



## 父组件如何获取Child component中DOM元素？

React16之后的用Forwarding Refs。

> React.forwardRef类似一个HOC，参数是一个**function**，这个function包含两个参数props和ref，返回Component，可以将这个ref用于任何子组件或者DOM





## this指向问题如何解决的

比如事件绑定的时候，this问题。 

- 通过箭头函数，this指向当前组件，原理就是作用域链，在Class作用域中找。
- 通过bind完成，通常来说，在constructor中绑定，保证函数的引用保存一份，保证组件在渲染时不做无谓的渲染。 





## 哪个生命周期发送ajax

componentDidMount阶段发

- componentWillMount,未来会废弃
- SSR项目中，componentWillMount是要做服务端数据的获取，所有不能占用。 





## SSR原理

借助虚拟dom,服务器中没有dom概念的，react巧妙的借助虚拟dom，然后可以在服务器中nodejs可以运行起来react代码。





## react-saga设计思想，sideEffects是什么     





## 如何避免ajax数据请求重新获取

   一般而言，ajax请求的数据都放在redux中存取。



## react-router4的核心思想是什么，和3有啥区别

react-router4的路由变成了一个组件，比如<Link/>,以及<Router/>

hashRouter 



## react-router原理，hashHistory和browerHistory区别



browerHistory需要服务端做一些配置的吧，而hashHistory不需要。   



 路由跳转的主要两个方式

1. 锚点hash。 window.onhashchange
2. H5(history) 



## reselect库

类似于computed计算属性，会对数据进行缓存处理。在重复调用时便可使用缓存快速加载，加强性能。







## 什么时候使用异步组件

Reloadable 库。

异步组件是干嘛用的，什么情况会使用,这些都是我们需要知道的原因。 

假设，我们在某些场景下，一个单页面的应用，最后打包的一个js文件在5MB，7MB时。

这个时候，就需要使用异步组件，它的含义就是：

当你访问首页时，我只引入首页的代码，我单独的打包首页的代码，我访问详情页，单独打包详情页代码。

这样子，其实也就是我们说的路由懒加载。

我们就可以将一个很大的包，拆分成很多的小包。



import('./home/header').then()

实现的原理跟webpack打包有关。



##  xss攻击如何在React中防范

使用了 `dangerouslySetInnerHTML` 属性，这是React中的一个特性，它的工作原理就像原生的 `innerHTML` 浏览器API一样，由于这个原因，一般认为使用这个属性是不安全的。

React默认情况下会对渲染的内容进行转义处理，将所有的数据都视为文本字符串处理。

**在这种情况下，您确实想解析HTML并将其呈现在页面上。那么，您如何安全地做到这一点？**



> 答案是在渲染HTML之前对其进行清理。与完全转义HTML不同，在渲染之前，您将通过一个函数运行内容以去除任何潜在的恶意代码。
>
> 您可以使用许多不错的HTML清理库。



[在React中防范XSS攻击](https://bbs.huaweicloud.com/blogs/217973)





## React Class组件不足

- 在组件之间复用状态逻辑很难  

> Hook 使你在无需修改组件结构的情况下复用状态逻辑
>
> 
>
> 你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。

- 复杂组件变得难以理解 -- 一个生命周期中存在很多操作的逻辑 

**Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

- 难以理解的 class -- this

**Hook 使你在非 class 的情况下可以使用更多的 React 特性。**



> 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。



> *Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。



### Effect Hook

> 你之前可能已经在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”。







### Hook是什么

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。（我们[不推荐](https://react.docschina.org/docs/hooks-intro.html#gradual-adoption-strategy)把你已有的组件全部重写，但是你可以在新组件里开始使用 Hook。）



### memo

#### useMemo

#### useEffect

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。



### 几个有趣的问题



- 类实例成员变量如何映射到Hooks

可以使用的是useRef来实现

- Hooks如何获取历史的propos和state

可以使用useRef

```
const prevRef = useRef()

useEffect(()=> {
		preveRef.current = count // 之前的值
})
```





## Redux



### 三大核心原则



#### 单一数据源

整个应用的state被存放在一棵object tree中，并且这个tree存在唯一的一个state中。



#### State是只读的

唯一改变state的方法就是触发action，action我们都知道其实就是一个对象。

> 这样子的话，确保了视图和网络请求都不能直接去修改一个state，他们就只能表达想要修改的意图，因为所有的修改都被击中化，按照我们的所预期的效果去执行。



#### 纯函数来执行

为了描述action如何改变state tree，这个时候就需要借助reducers。



reducers其实就是一些纯函数，它接受先前的state和action，并且返回新的state。





> **Redux**：是核心库，功能简单，只是一个单纯的状态机，但是蕴含的思想不简单，是传说中的“百行代码，千行文档”。
>
> **React-Redux**：是跟`React`的连接库，当`Redux`状态更新的时候通知`React`更新组件。
>
> **Redux-Thunk**：提供`Redux`的异步解决方案，弥补`Redux`功能的不足。



我之前就告诉过你：**只要使用了`Redux Thunk`，如果你想`dispatch`一个函数，而不是一个纯对象，这个中间件会自己帮你调用这个函数，而且会将`dispatch`作为第一个参数传进去。**



```
Redux-Thunk`最主要的作用是帮你给异步`action`传入`dispatch
```



**为什么需要？**

现在我们理解了`redux-thunk`可以让我们 dispatch 一个 function，但是这有什么用呢？其实我觉得这是一项基础设施，虽然功能简单，但可扩展性极其强大。

比如很多时候我们需要在一个函数中写多次 dispatch。这也是上面 issue 中提到的问题。比如上面我们示例代码中，我们定义了 login 函数做 API 请求，在请求发出前我们可能需要展示一个全局的 loading bar，在请求结束后我们又需要将请求结果存储到 redux store 中。这都需要用到 redux 的 dispatch。

当然在一个函数中写多个 dispatch 只是我们可以做的事情之一，既然它是一个 function，而且并不要求像 reducer 一样是 pure function，那么我们可以在其中做任意的事情，也就是有副作用(side effect)的事情。





## 基于 Cookie/Session 的认证方案

> Cookie

- Cookie的工作原理

由于`HTTP`是一种无状态的协议，服务器单从网络连接上无从知道客户身份。怎么办呢？就给客户端们颁发一个通行证吧，每人一个，无论谁访问都必须携带自己通行证。这样服务器就能从通行证上确认客户身份了。这就是。
 `cookie`指的就是在浏览器里面存储的一种数据，仅仅是浏览器实现的一种数据存储功能。
 `cookie`的保存时间，可以自己在程序中设置。如果没有设置保存时间，应该是一关闭浏览器，`cookie`就自动消失。

`Cookie`实际上是一小段的文本信息。客户端请求服务器，如果服务器需要记录该用户状态，就使用`response`向客户端浏览器颁发一个`Cookie`。客户端浏览器会把`Cookie`保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该`Cookie`一同提交给服务器。服务器检查该`Cookie`，以此来辨认用户状态。服务器还可以根据需要修改`Cookie`的内容。

**注意**：`Cookie`功能需要浏览器的支持。如果浏览器不支持`Cookie`（如大部分手机中的浏览器）或者把`Cookie`禁用了，`Cookie`功能就会失效。不同的浏览器采用不同的方式保存`Cookie`。`IE`浏览器会以文本文件形式保存，一个文本文件保存一个`Cookie`。

- Cookie的不可跨域名性

`Cookie`具有不可跨域名性。根据`Cookie`规范，浏览器访问`Google`只会携带`Google`的`Cookie`，而不会携带`Baidu`的`Cookie`。浏览器判断一个网站是否能操作另一个网站`Cookie`的依据是域名。

> Session

`Session`是另一种记录客户状态的机制，**不同的是**`Cookie`保存在客户端浏览器中，而`Session`保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是`Session`。客户端浏览器再次访问时只需要从该`Session`中查找该客户的状态就可以了。

如果说`Cookie`机制是通过检查客户身上的“通行证”来确定客户身份的话，那么`Session`机制就是通过检查服务器上的“客户明细表”来确认客户身份。

`session` 也是类似的道理，服务器要知道当前发请求给自己的是谁。为了做这种区分，**服务器**就要给每个**客户端**分配不同的“身份标识”，然后**客户端**每次向服务器发请求的时候，都带上这个“身份标识”，服务器就知道这个请求来自于谁了。对于浏览器客户端，大家都默认采用 `cookie` 的方式，保存这个“身份标识”。

服务器使用`session`把用户的信息临时保存在了服务器上，用户离开网站后`session`会被销毁。这种用户信息存储方式相对`cookie`来说更安。

可是`session`有一个**缺陷**：如果`web`服务器做了负载均衡，那么下一个操作请求到了另一台服务器的时候`session`会丢失。

**提示**：`Session`的使用比`Cookie`方便，但是过多的`Session`存储在服务器内存中，会对服务器造成压力。

> Cookie与Session的区别和联系

1. `cookie`数据存放在客户的浏览器上，`session`数据放在服务器上；
2. `cookie`不是很安全，别人可以分析存放在本地的`COOKIE`并进行 `COOKIE`欺骗，考虑到安全应当使用`session`；
3. `session`会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能。考虑到减轻服务器性能方面，应当使用`COOKIE`；
4. 单个cookie在客户端的限制是3K，就是说一个站点在客户端存放的COOKIE不能超过3K；

`Cookie`和`Session`的方案虽然分别属于客户端和服务端，但是服务端的`session`的实现对客户端的`cookie`有依赖关系的，上面我讲到服务端执行`session`机制时候会生成`session`的id值，这个`id`值会发送给客户端，客户端每次请求都会把这个`id`值放到`http`请求的头部发送给服务端，而这个`id`值在客户端会保存下来，保存的容器就是`cookie`，因此当我们完全禁掉浏览器的`cookie`的时候，服务端的`session`也会不能正常使用。

## 基于token的认证方式

在大多数使用`Web API`的互联网公司中，`tokens` 是多用户下处理认证的最佳方式。

以下几点特性会让你在程序中使用基于Token的身份验证

1.无状态、可扩展

2.支持移动设备

3.跨程序调用

4.安全

### Token的起源

在介绍基于`Token`的身份验证的原理与优势之前，不妨先看看**之前**的认证都是怎么做的。

- 基于服务器的验证

我们都是知道`HTTP`协议是无状态的，这种无状态意味着程序需要验证每一次请求，从而辨别客户端的身份。

在这之前，程序都是通过在服务端存储的登录信息来辨别请求的。这种方式一般都是通过存储`Session`来完成。

- 基于服务器验证方式暴露的一些问题

1.`Seesion`：每次认证用户发起请求时，服务器需要去创建一个记录来存储信息。当越来越多的用户发请求时，**内存**的开销也会不断增加。

2.可扩展性：在服务端的内存中使用`Seesion`存储登录信息，伴随而来的是可扩展性问题。

3.`CORS`(跨域资源共享)：当我们需要让数据跨多台移动设备上使用时，跨域资源的共享会是一个让人头疼的问题。在使用`Ajax`抓取另一个域的资源，就可以会出现禁止请求的情况。

4.`CSRF`(跨站请求伪造)：用户在访问银行网站时，他们很容易受到跨站请求伪造的攻击，并且能够被利用其访问其他的网站。

在这些问题中，可扩展行是最突出的。因此我们有必要去寻求一种更有行之有效的方法。

### 基于Token的验证原理

基于Token的身份验证是**无状态**的，我们**不将**用户信息存在服务器中。这种概念解决了在服务端存储信息时的许多问题。`NoSession`意味着你的程序可以根据需要去增减机器，而不用去担心用户是否登录。

### 基于Token的身份验证的过程如下:

1. 用户通过用户名和密码发送请求。
2. 服务器端程序验证。

3.服务器端程序返回一个**带签名**的`token` 给客户端。

4.客户端储存`token`,并且每次访问`API`都携带`Token`到服务器端的。

5.服务端验证`token`，校验成功则返回请求数据，校验失败则返回错误码。

![img](https:////upload-images.jianshu.io/upload_images/15096291-543566756c7218ff?imageMogr2/auto-orient/strip|imageView2/2/w/639/format/webp)

image

### Tokens的优势

- 无状态、可扩展

在客户端存储的`Tokens`是无状态的，并且能够被扩展。基于这种无状态和不存储`Session`信息，负载负载均衡器能够将用户信息从一个服务传到其他服务器上。
 `tokens`自己`hold`住了用户的验证信息。

- 安全性

请求中发送`token`而不再是发送`cookie`能够防止`CSRF`(跨站请求伪造)。即使在客户端使用`cookie`存储`token`，`cookie`也仅仅是一个存储机制而不是用于认证。不将信息存储在`Session`中，让我们少了对`session`操作。

`token`是有时效的，一段时间之后用户需要重新验证。

- 可扩展性

`Tokens`能够创建与其它程序共享权限的程序。

- 多平台跨域

我们提前先来谈论一下`CORS`(跨域资源共享)，对应用程序和服务进行扩展的时候，需要介入各种各种的设备和应用程序。

### 需要设置有效期吗？

对于这个问题，我们不妨先看两个例子。一个例子是登录密码，一般要求定期改变密码，以防止泄漏，所以密码是有有效期的；另一个例子是安全证书。`SSL` 安全证书都有有效期，目的是为了解决吊销的问题。所以无论是从安全的角度考虑，还是从吊销的角度考虑，`Token` 都需要设有效期。

- 那么有效期多长合适呢？

只能说，根据系统的安全需要，尽可能的短，但也不能短得离谱

- 然后新问题产生了，如果用户在正常操作的过程中，`Token` 过期失效了，要求用户重新登录……用户体验岂不是很糟糕？

一种方案，使用 `Refresh Token`，它可以避免频繁的读写操作。这种方案中，服务端不需要刷新 `Token` 的过期时间，一旦 `Token` 过期，就反馈给前端，前端使用 `Refresh Token` 申请一个全新`Token` 继续使用。这种方案中，服务端只需要在客户端请求更新 `Token` 的时候对 `Refresh Token` 的有效性进行一次检查，大大减少了更新有效期的操作，也就避免了频繁读写。当然 `Refresh Token` 也是有有效期的，但是这个有效期就可以长一点了，比如，以天为单位的时间。

- 时序图表示

使用 `Token` 和 `Refresh Token` 的时序图如下：

1）登录

![img](https:////upload-images.jianshu.io/upload_images/15096291-4a028da83d83b5b7?imageMogr2/auto-orient/strip|imageView2/2/w/680/format/webp)

image



2）业务请求



![img](https:////upload-images.jianshu.io/upload_images/15096291-75ad0bdfa6dd7506?imageMogr2/auto-orient/strip|imageView2/2/w/510/format/webp)

image


 3）`Token`过期，刷新 `Token`





![img](https:////upload-images.jianshu.io/upload_images/15096291-21cdaa18849f5ae7?imageMogr2/auto-orient/strip|imageView2/2/w/648/format/webp)

image


 上面的时序图中并未提到 `Refresh Token` 过期怎么办。不过很显然，`Refresh Token` 既然已经过期，就该要求用户重新登录了。



### 项目中使用token总结

使用基于 `Token` 的身份验证方法，在服务端**不需要**存储用户的登录记录。大概的流程是这样的：

1.前端使用用户名跟密码请求首次登录

2.后服务端收到请求，去验证用户名与密码是否正确

3.验证成功后，服务端会根据用户`id`、用户名、定义好的秘钥、过期时间生成一个 `Token`，再把这个 `Token` 发送给前端

4.前端收到 返回的`Token` ，把它存储起来，比如放在 `Cookie` 里或者 `Local Storage` 里



```tsx
export interface User {
    token: string;
    userInfo: UserInfo | any;
    companyInfo: CompanyInfo | any;
    resources?: string[];
}
```



```csharp
save(key: string, value: any, storageType ?: StorageType) {
    return this.storageService.put(
        {
            pool: key,
            key: 'chris-app',
            storageType: StorageType.localStorage
        },
        value
    );
}
this.storageService.save(CACHE_USER_KEY, user);
```

5.前端每次路由跳转，判断 `localStroage` 有无 `token` ，没有则跳转到登录页。有则请求获取用户信息，改变登录状态；
 6.前端每次向服务端请求资源的时候需要在**请求头**里携带服务端签发的`Token`



```dart
HttpInterceptor => headers = headers.set('token', this.authService.getToken());
```

7.服务端收到请求，然后去验证前端请求里面带着的 `Token`。没有或者 `token` 过期，返回`401`。如果验证成功，就向前端返回请求的数据。

8.前端得到 `401` 状态码，重定向到登录页面。



```dart
HttpInterceptor => 
    401: '用户登陆状态失效，请重新登陆。'
```


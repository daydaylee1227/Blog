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



# 缘起

读了“扔物线”老师的小册《Git 原理详解及实用指南》感觉收获良多，于是想写点东西做一个总结，即加深自己的印象也希望能给社区小伙伴一点帮助，写的不对的地方还请多多指导。身为一个初入前端半年的菜鸟，由伊始的只知道git是用来托管代码的工具到逐步了解中央版本控制系统与分布式版本控制系统(git)的原理与区别；从之前只会基本的add、commit、pull、push操作到使用stash、merge、reset方便得不亦乐乎，都得益于对git原理的深入理解，逼话少说，咋们直接进入正题。前方长篇预警...

# 从了解版本控制系统开始

所谓版本控制，就是在文件修改的历程中保留修改历史，可以方便的撤销（如同文本编辑的撤销操作一般，只是版本控制会复杂的多）之前对文件的修改。一个版本控制系统的三个核心内容：版本控制（最基本的功能），主动提交（commit历史）和远程仓库（协同开发）。

## 中央式版本控制系统（VCS）

**工作模型**

> 1. 主工程师搭好项目框架
> 2. 在公司服务器创建一个远程仓库，并提交代码
> 3. 其他人拉取代码，并行开发
> 4. 每个人独立负责一个功能，开发完成提交代码
> 5. 其他人随时拉取代码，保持同步

![img](https://segmentfault.com/img/remote/1460000018272905)

## 分布式版本控制系统（DVCS）

分布式与中央式的区别主要在于，分布式除了远程仓库之外团队中每一个成员的机器上都有一份本地仓库，每个人在自己的机器上就可以进行提交代码，查看版本，切换分支等操作而不需要完全依赖网络环境。

**工作模型**

> 1. 主工程师搭好项目框架 ，并提交代码到本地仓库
> 2. 在公司服务器创建一个远程仓库，并将1的提交推送到远程仓库
> 3. 其他人把远程仓库所有内容克隆到本地，拥有了各自的本地仓库，开始并行开发
> 4. 每个人独立负责一个功能，可以把每一个小改动提交到本地（由于本地提交无需立即上传到远程仓库，所以每一步提交不必是一个完整功能，而可以是功能中的一个步骤或块）
> 5. 功能开发完毕，将和这个功能相关的所有提交从本地推送到远程仓库
> 6. 每次当有人把新的提交推送到远程仓库的时候，其他人就可以选择把这些提交同步到自己的机器上，并把它们和自己的本地代码合并

![img](https://segmentfault.com/img/remote/1460000018272906?w=657&h=446)

### 分布式版本管理系统的优缺点：

#### 优点

- 大多数操作本地进行，数度更快，不受网络与物理位置限制，不联网也可以提交代码、查看历史、切换分支等等
- 分布提交代码，提交更细利于review

#### 缺点

- 初次clone时间较长
- 本地占用存储高于中央式系统

# 继续深入git原理

假设你已经安装好了git并将代码clone到了本地，新手移步[git安装与代码拷贝指南](https://blog.csdn.net/qq_36955622/article/details/72919314)。

## git最基本的工作模型

首先理解三个基本概念：

- 工作区：就是你在电脑里能看到的目录
- 版本库：工作区有一个隐藏目录.git，这个不算工作区，而是Git的本地版本库,你的所有版本信息都会存在这里
- 暂存区：英文叫stage, 或index。一般存放在 ".git目录下" 下的index文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）

![img](https://segmentfault.com/img/remote/1460000018272907)
**工作模型**

1.首先新建一个test.txt文件并对其进行修改，通过status可以查看工作目录当前状态，此时test.txt对git来说是不存在的（Untracked）

![img](https://segmentfault.com/img/remote/1460000018272908)
2.然后通过add命令将修改放入暂存区（git开始追踪它）

![img](https://segmentfault.com/img/remote/1460000018272909)
可以看到，test.txt 的文字变成了绿色，它的前面多了「new file:」的标记，而它的描述也从 "Untracked files" 变成了 "Changes to be commited"。这些都说明一点：test.txt 这个文件的状态从 "untracked"（未跟踪）变成了 "staged"（已暂存），意思是这个文件中被改动的部分（也就是这整个文件）被记录进了 staging area（暂存区）
<blockquote> stage 这个词在 Git 里，是「集中收集改动以待提交」的意思；而 staging area ，就是一个「汇集待提交的文件改动的地方」。简称「暂存」和「暂存区」。至于 staged 表示「已暂存」，就不用再解释了吧？</blockquote>
3.现在文件已经放入暂存区，可以用commit命令提交：

![img](https://segmentfault.com/img/remote/1460000018272910)在这里你也可以直接commit提交会进入commit信息编辑页面，而加上-m参数可以快捷输入简短的提交备注信息，这样你就完成了一次提交（可以通过`git log`查看提交历史）


接着对该文件再次进行修改，输入`git status`可以看到，该文件 又变红了，不过这次它左边的文字不是 "New file:" 而是 "modified:"，而且上方显示它的状态也不是 "Untracked" 而是 "not staged for commit"，意思很明确：Git 已经认识这个文件了，它不是个新文件，但它有了一些改动。所以虽然状态的显示有点不同，但处理方式还是一样的：
![img](https://segmentfault.com/img/remote/1460000018272911)接下来再次将该文件add、commit，查看log可以看到已经存在两条提交记录

![img](https://segmentfault.com/img/remote/1460000018272912)4.最后通过push把本地的所有commit上传到远程仓库：

![img](https://segmentfault.com/img/remote/1460000018272913?w=544&h=161)

## 团队工作基本模型

**工作模型**

1.在上面基本操作的基础上，同事 commit 代码到他的本地，并 push 到远程仓库

2.你把远程仓库新的提交通过 pull指令拉取到你的本地

通过这个流程，你和同事就可以简单地合作了：你写了代码，commit，push 到远程仓库，然后他 pull 到他的本地；他再写代码，commit, push 到远程仓库，然后你再 pull 到你的本地。你来我往，配合得不亦乐乎。（但是有时候push会失败）

> 为什么会失败？
>
> 因为 Git 的push 其实是用本地仓库的commit记录去覆盖远程仓库的commit记录（注：这是简化概念后的说法，push 的实质和这个说法略有不同），而如果在远程仓库含有本地没有的commit的时候，push （如果成功）将会导致远端的commit被擦掉。这种结果当然是不可行的，因此 Git 会在 push 的时候进行检查，如果出现这样的情况，push 就会失败

这时只需要先通过`git pull`（实为fetch和merge的组合操作）将本地仓库的提交和远程仓库的提交进行合并，然后再push就可以了

## Feature Branching：最流行的工作流

核心：

（1）任何新的功能（feature）或 bug 修复全都新建一个 branch 来写；

（2）branch 写完后，合并到 master，然后删掉这个 branch（可使用`git origin -d 分支名`删除远程仓库的分支）。
![img](https://segmentfault.com/img/remote/1460000018272914)
优势：

（1）代码分享：写完之后可以在开发分支review之后再merge到master分支

（2）一人多任务：当正在开发接到更重要的新任务时，你只要稍微把目前未提交的代码简单收尾一下，然后做一个带有「未完成」标记的提交（例如，在提交信息里标上「TODO」），然后回到 master 去创建一个新的 branch 进行开发就好了。

# HEAD、branch、引用的本质以及push的本质

## HEAD：当前commit的引用

当前 commit 在哪里，HEAD 就在哪里，这是一个永远自动指向当前 commit 的引用，所以你永远可以用 HEAD 来操作当前 commit，

## branch：

HEAD 是 Git 中一个独特的引用，它是唯一的。而除了 HEAD 之外，Git 还有一种引用，叫做 branch（分支）。HEAD 除了可以指向 commit，还可以指向一个branch，当指向一个branch时，HEAD会通过branch间接指向当前commit，HEAD移动会带着branch一起移动：
![img](https://segmentfault.com/img/remote/1460000018272915)

branch 包含了从初始 commit 到它的所有路径，而不是一条路径。并且，这些路径之间也是彼此平等的。
![img](https://segmentfault.com/img/remote/1460000018272916?w=602&h=354)
像上图这样，master 在合并了 branch1 之后，从初始 commit 到 master 有了两条路径。这时，master 的串就包含了 1 2 3 4 7 和 1 2 5 6 7 这两条路径。而且，这两条路径是平等的，1 2 3 4 7 这条路径并不会因为它是「原生路径」而拥有任何的特别之处


创建branch：`git branch 名称`

切换branch：`git checkout 名称`（将HEAD指向该branch）

创建+切换：`git checkout -b 名称`

在切换到新的 branch 后，再次 commit 时 HEAD 就会带着新的 branch 移动了：
![img](https://segmentfault.com/img/remote/1460000018272917)
而这个时候，如果你再切换到 master 去 commit，就会真正地出现分叉了：
![img](https://segmentfault.com/img/remote/1460000018272918?w=462&h=582)
删除branch：`git branch -d 名称`

注意：

（1）HEAD 指向的 branch 不能删除。如果要删除 HEAD 指向的 branch，需要先用 checkout 把 HEAD 指向其他地方。

（2）由于 Git 中的 branch 只是一个引用，所以删除 branch 的操作也只会删掉这个引用，并不会删除任何的 commit。（不过如果一个 commit 不在任何一个 branch 的「路径」上，或者换句话说，如果没有任何一个 branch 可以回溯到这条 commit（也许可以称为野生 commit？），那么在一定时间后，它会被 Git 的回收机制删除掉）

（3）出于安全考虑，没有被合并到 master 过的 branch 在删除时会失败（怕误删未完成branch）把-d换成-D可以强制删除

## 引用的本质

所谓引用，其实就是一个个的字符串。这个字符串可以是一个 commit 的 SHA-1 码（例：c08de9a4d8771144cd23986f9f76c4ed729e69b0），也可以是一个 branch（例：ref: refs/heads/feature3）。

Git 中的 HEAD 和每一个 branch 以及其他的引用，都是以文本文件的形式存储在本地仓库 .git 目录中，而 Git 在工作的时候，就是通过这些文本文件的内容来判断这些所谓的「引用」是指向谁的。

## push的本质：把 branch 上传到远程仓库

（1）把当前branch位置上传到远程仓库，并把它路径上的commits一并上传

（2）git中（2.0及以后版本），`git push`不加参数只能上传到从远程仓库clone或者pull下来的分支，如需push在本地创建的分支则需使用`git push origin 分支名`的命令

（3）远端仓库的HEAD并不随push与本地一致，远端仓库HEAD永远指向默认分支（master），并随之移动（可以使用`git br -r`查看远程分支的HEAD指向）。

# 开启git操作之旅

## merge：合并

含义：从目标 commit 和当前 commit （即 HEAD 所指向的 commit）分叉的位置起，把目标 commit 的路径上的所有 commit 的内容一并应用到当前 commit，然后自动生成一个新的 commit。
![img](https://segmentfault.com/img/remote/1460000018272919)
当执行`git merge branch1`操作，Git 会把 5 和 6 这两个 commit 的内容一并应用到 4 上，然后生成一个新的提交 7 。

merge的特殊情况：

（1）merge冲突：你的两个分支改了相同的内容，Git 不知道应该以哪个为准。如果在 merge 的时候发生了这种情况，Git 就会把问题交给你来决定。具体地，它会告诉你 merge 失败，以及失败的原因；这时候你只需要手动解决掉冲突并重新add、commit（改动不同文件或同一文件的不同行都不会产生冲突）；或者使用`git merge --abort`放弃解决冲突，取消merge

（2）HEAD 领先于目标 commit：merge是一个空操作：
![img](https://segmentfault.com/img/remote/1460000018272920)
此时merge不会有任何反应。

（3）HEAD 落后于 目标 commit且不存在分支（fast-forward）：

![img](https://segmentfault.com/img/remote/1460000018272921?w=494&h=376)
git会直接把HEAD与其指向的branch（如果有的话）一起移动到目标commit。

## rebase：给commit序列重新设置基础点

有些人不喜欢 merge，因为在 merge 之后，commit 历史就会出现分叉，这种分叉再汇合的结构会让有些人觉得混乱而难以管理。如果你不希望 commit 历史出现分叉，可以用 rebase 来代替 merge。
![img](https://segmentfault.com/img/remote/1460000018272922?w=698&h=518)
可以看出，通过 rebase，5 和 6 两条 commits 把基础点从 2 换成了 4 。通过这样的方式，就让本来分叉了的提交历史重新回到了一条线。这种「重新设置基础点」的操作，就是 rebase 的含义。另外，在 rebase 之后，记得切回 master 再 merge 一下，把 master 移到最新的 commit。

> 为什么要从 branch1 来 rebase，然后再切回 master 再 merge 一下这么麻烦，而不是直接在 master 上执行 rebase？
>
> 
> 从图中可以看出，rebase 后的每个 commit 虽然内容和 rebase 之前相同，但它们已经是不同的 commit 了（每个commit有唯一标志）。如果直接从 master 执行 rebase 的话，就会是下面这样：
> ![img](https://segmentfault.com/img/remote/1460000018272923)
> 这就导致 master 上之前的两个最新 commit （3和4）被剔除了。如果这两个 commit 之前已经在远程仓库存在，这就会导致没法 push ：
> ![img](https://segmentfault.com/img/remote/1460000018272924)
> 所以，为了避免和远程仓库发生冲突，一般不要从 master 向其他 branch 执行 rebase 操作。而如果是 master 以外的 branch 之间的 rebase（比如 branch1 和 branch2 之间），就不必这么多费一步，直接 rebase 就好。

需要说明的是,rebase 是站在需要被 rebase 的 commit 上进行操作，这点和 merge 是不同的。

## stash：临时存放工作目录的改动

stash 指令可以帮你把工作目录的内容全部放在你本地的一个独立的地方，它不会被提交，也不会被删除，你把东西放起来之后就可以去做你的临时工作了，做完以后再来取走，就可以继续之前手头的事了。

操作步骤：

（1）`git stash`可以加上save参数后面带备注信息（`git stash save '备注信息'`）

（2）此时工作目录已经清空，可以切换到其他分支干其他事情了

（3）`git stash pop`弹出第一个stash（该stash从历史stash中移除）；或者使用`git stash apply`达到相同的效果（该stash仍存在stash list中），同时可以使用`git stash list`查看stash历史记录并在apply后面加上指定的stash返回到该stash。

注意：没有被track的文件会被git忽略而不被stash，如果想一起stash，加上-u参数。

## reflog：引用记录的log

可以查看git的引用记录，不指定参数，默认显示HEAD的引用记录；如果不小心把分支删掉了，可以使用该命令查看引用记录，然后使用checkout切到该记录处重建分支即可。

> 注意：不再被引用直接或间接指向的 commits 会在一定时间后被 Git 回收，所以使用 reflog 来找回被删除的 branch 的操作一定要及时，不然有可能会由于 commit 被回收而再也找不回来。

## 看看我都改了什么

### log：查看已提交内容

`git log -p`可以查看每个commit的改动细节（到改动文件的每一行）

`git log --stat`查看简要统计（哪几个文件改动了）

`git show 指定commit 指定文件名`查看指定commit的指定文件改动细节

### diff：查看未提交内容

`git diff --staged`可以显示暂存区和上一条提交之间的不同。换句话说，这条指令可以让你看到「如果你立即输入 git commit，你将会提交什么」

`git diff`可以显示工作目录和暂存区之间的不同。换句话说，这条指令可以让你看到「如果你现在把所有文件都 add，你会向暂存区中增加哪些内容」

`git diff HEAD`可以显示工作目录和上一条提交之间的不同，它是上面这二者的内容相加。换句话说，这条指令可以让你看到「如果你现在把所有文件都 add 然后 git commit，你将会提交什么」（不过需要注意，没有被 Git 记录在案的文件（即从来没有被 add 过的文件，untracked files 并不会显示出来。因为对 Git 来说它并不存在）实质上，如果你把 HEAD 换成别的commit，也可以显示当前工作目录和这条 commit 的区别。

## 刚刚提交的代码发现写错了怎么办？

再提一个修复了错误的commit？可以是可以，不过还有一个更加优雅和简单的解决方法：commit --amend。

具体做法：

（1）修改好问题

（2）将修改add到暂存区

（3）使用`git commit --amend`提交修改，结果如下图：
![img](https://segmentfault.com/img/remote/1460000018272925?w=420&h=370)
减少了一次无谓的commit。

## 错误不是最新的提交而是倒数第二个？

使用rebase -i（交互式rebase）：

所谓「交互式 rebase」，就是在 rebase 的操作执行之前，你可以指定要 rebase 的 commit 链中的每一个 commit 是否需要进一步修改，那么你就可以利用这个特点，进行一次「原地 rebase」。


操作过程：

（1）`git rebase -i HEAD^^`

> 说明：在 Git 中，有两个「偏移符号」： ^ 和 ~。
>
> ^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。例如：master^ 表示 master 指向的 commit 之前的那个 commit； HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit。
>
> ~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。例如：HEAD~5 表示 HEAD 指向的 commit往前数 5 个 commit。

上面这行代码表示，把当前 commit （ HEAD 所指向的 commit） rebase 到 HEAD 之前 2 个的 commit 上：
![img](https://segmentfault.com/img/remote/1460000018272926?w=568&h=352)
(2)进入编辑页面，选择commit对应的操作，commit为正序排列，旧的在上，新的在下，前面黄色的为如何操作该commit，默认pick（直接应用该commit不做任何改变），修改第一个commit为edit（应用这个 commit，然后停下来等待继续修正）然后:wq退出编辑页面，此时rebase停在第二个commit的位置，此时可以对内容进行修改：
![img](https://segmentfault.com/img/remote/1460000018272927)
![img](https://segmentfault.com/img/remote/1460000018272928?w=444&h=160)
（3）修改完后使用add，commit --amend将修改提交

（4）`git rebase --continue`继续 rebase 过程，把后面的 commit 直接应用上去，这次交互式 rebase 的过程就完美结束了，你的那个倒数第二个写错的 commit 就也被修正了：
![img](https://segmentfault.com/img/remote/1460000018272929)

## 想直接丢弃某次提交？

### reset --hard 丢弃最新的提交

```
git reset --hard HEAD^
```

> HEAD^ 表示 HEAD 往回数一个位置的 commit ，上节刚说过，记得吧？

![img](https://segmentfault.com/img/remote/1460000018272930?w=466&h=262)

### 用交互式 rebase 撤销历史提交

操作步骤与修改历史提交类似，第二步把需要撤销的commit修改为drop，其他步骤不再赘述。

![img](https://segmentfault.com/img/remote/1460000018272931?w=552&h=424)

### 用 rebase --onto 撤销提交

```
git rebase --onto HEAD^^ HEAD^ branch1
```

上面这行代码的意思是：以倒数第二个 commit 为起点（起点不包含在 rebase 序列里），branch1 为终点，rebase 到倒数第三个 commit 上。
![img](https://segmentfault.com/img/remote/1460000018272932)

## 错误代码已经push？

有的时候，代码 push 到了远程仓库，才发现有个 commit 写错了。这种问题的处理分两种情况：

### 出错内容在自己的分支

假如是某个你自己独立开发的 branch 出错了，不会影响到其他人，那没关系用前面几节讲的方法把写错的 commit 修改或者删除掉，然后再 push 上去就好了。但是此时会push报错，因为远程仓库包含本地没有的 commits（在本地已经被替换或被删除了），此时直接使用`git push origin 分支名 -f`强制push。

### 问题内容已合并到master

（1）增加新提交覆盖之前内容

（2）使用`git revert 指定commit`
它的用法很简单，你希望撤销哪个 commit，就把它填在后面。如：`git revert HEAD^`

上面这行代码就会增加一条新的 commit，它的内容和倒数第二个 commit 是相反的，从而和倒数第二个 commit 相互抵消，达到撤销的效果。在 revert 完成之后，把新的 commit 再 push 上去，这个 commit 的内容就被撤销了。它和前面所介绍的撤销方式相比，最主要的区别是，这次改动只是被「反转」了，并没有在历史中消失掉，你的历史中会存在两条 commit ：一个原始 commit ，一个对它的反转 commit。

## reset：不止可以撤销提交

`git reset --hard 指定commit`你的工作目录里的内容会被完全重置为和指定commit位置相同的内容。换句话说，就是你的未提交的修改会被全部擦掉。

`git reset --soft 指定commit`会在重置 HEAD 和 branch 时，保留工作目录和暂存区中的内容，并把重置 HEAD 所带来的新的差异放进暂存区。
什么是「重置 HEAD 所带来的新的差异」？就是这里：
![img](https://segmentfault.com/img/remote/1460000018272933?w=478&h=290)
`git reset --mixed（或者不加参数） 指定commit`保留工作目录，并且清空暂存区。也就是说，工作目录的修改、暂存区的内容以及由 reset 所导致的新的文件差异，都会被放进工作区。简而言之，就是「把所有差异都混合（mixed）放在工作区中」。

## checkout：签出指定commit

checkout的本质是签出指定的commit，不止可以切换branch还可以指定commit作为参数，把HEAD移动到指定的commit上；与reset的区别在于只移动HEAD不改变绑定的branch；`git checkout --detach`可以把 HEAD 和 branch 脱离，直接指向当前 commit。
![img](https://segmentfault.com/img/remote/1460000018272934)

# 最后

希望我的总结能给大家带来些许帮助，也希望和大家一起学以致用，一起成长。最后，万分感谢扔老师的小册，强势安利《git原理详解与实用指南》，认准扔物线。
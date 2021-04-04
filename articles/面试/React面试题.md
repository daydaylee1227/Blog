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



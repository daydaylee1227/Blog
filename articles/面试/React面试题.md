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
> 当在legacy模式下，命中batchedUpdates时，setState是同步的。



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



### Functional Component









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







## React原因

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

- 组件化思想
- 都是数据驱动视图
- 都是用vdom操作DOM



### 区别

- React使用JSX拥抱JS，Vue使用模版拥抱html
- Vue声明式编程，React函数式编程。
  - Vue中data = 100，自动去更新状态
  - React中用setState去触发数据做修改,做完修改后,返回一个视图或者是新视图。




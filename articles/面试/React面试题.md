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
> 当在legacy模式下，为命中batchedUpdates时，setState是同步的。



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


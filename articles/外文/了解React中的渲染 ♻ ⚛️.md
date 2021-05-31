## 正文

今天我想和大家分享一下我几周来研究的关于React中渲染的工作原理。
 首先，我要说的是，React中渲染的概念与我们所知道的有点不同。让我们来找出原因。



主要涉及的内容：

1.简介

2.VirtualDOM

3.Render

4.Reconciliation

5.Commit

6.一个例子



## 简介

你在这里可能是因为你已经使用了React，与他们的API进行了交互，改变了你的组件的状态，并且看到了魔法的发生。然而，有时深入了解一下React是如何做的也是很有用的。当你的React应用在不断地重新渲染，应用有了很大的扩展，而且组件很复杂，表现起来很昂贵时，就会出现性能问题。这就是为什么理解React中的渲染是我们所有使用这个库的人都应该了解的事情。



要理解为什么React的速度如此之快，就必须了解这四个概念。

- Virtual DOM
- Render
- Reconciliation
- Commit


让我们开始吧



## Virtual DOM







## 参考

https://dev.to/teo_garcia/understanding-rendering-in-react-i5i
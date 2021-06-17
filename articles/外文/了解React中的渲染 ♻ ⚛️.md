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









自我介绍

项目难点、深挖项目

介绍进程和线程以及他们的区别

TCP和UDP的区别

DNS的解析过程

img的alt和title的异同

seo优化了解么、服务端渲染

display：none visibility：hidden的区别 opacity：0

什么是BFC

盒子模型

手写两栏布局

js数据类型 深拷贝 浅拷贝

栈、堆数据结构

变量提升、原型原型链

看代码说输出、函数的执行结果

算法题求出现最大频率的数组元素
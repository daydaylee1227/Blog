## 正文

![](../../../Blog/images/外文/使用JavaScript创建虚拟现实体验/1.jpeg)



使用JavaScript创建虚拟现实体验

使用React的虚拟现实（VR）体验？😮

这真的可能吗？是的，随着React 360的引入，现在可以用JavaScript来创建虚拟现实体验。



----



## 现实中是如何使用VR的

在看什么是React 360之前，让我快速回顾一下现在的设备是如何使用VR的。目前，VR是一个趋势性的话题，大多数游戏和娱乐都专注于VR，以提供一个特殊的用户体验。



React 360的引入为未来UI的广泛采用带来了希望，从字面上看，它为现代网络应用提供了3D和VR体验。

等不及啦，让我们深入了解一下。

-----



## 什么是React 360？

React 360是一个框架，用于创建在网络浏览器中运行的交互式360体验。

> https://www.npmjs.com/package/react-360

这是一个NPM包，可以按以下方式安装。

```bash
npm i react-360
// Command line tool
npm install -g react-360-cli
```

它与React和React Native非常相似，但有一些区别，有利于构建VR体验。

> 它使用three.js来促进低级别的WebVR（访问VR设备）和WebGL（渲染3D图像）API，以便在浏览器上创建一个VR体验。



如果你以前有React和React Native的经验，使用React 360会比较容易。

此外，如果你用React 360创建一个新的项目，在你的项目中有三个文件是非常重要的。

- index.js - 你的应用程序的主要代码，并将包含代码/文件导入，这将决定你的应用程序的外观和感觉。
- client.js - 这个文件是连接你的浏览器和React应用程序的Runtime。这个文件中的代码将创建一个新的React 360实例，加载你的React代码并将其附加到DOM中的一个特定位置。
- index.html - 你将加载的网页。这将指向JavaScript代码来装载你的应用程序。



此外，**static_assets文件**夹用于存储资源，包括图片、全景图、音频文件和其他将被用于增强网络体验的外部内容。

**Runtime**负责将你的React组件变成屏幕上的3D元素。



## 在实践中使用React 360

一旦你成功地安装了React 360，你就可以用下面的命令初始化一个新项目。

```bash
react-360 init new-react-360-app
```

这将创建一个名为new-react-360-app的新项目目录，并将安装所有需要的依赖项。

项目的结构将如下所示:

![项目目录](../../../Blog/images/外文/使用JavaScript创建虚拟现实体验/2.png)



你可以使用npm start命令启动该项目。你的浏览器上的输出将可以在http://localhost:8081/index.html。

![项目目录](../../../Blog/images/外文/使用JavaScript创建虚拟现实体验/3.png)



你可以使用你的鼠标指针来360度导航这个框架。
React 360框架的一个重要特点是，它带有可重复使用的内置UI组件。

例如，其中一些组件如下：

- View
- Image
- Entity
- VrButton

------



这些可以在你开发React 360应用程序时使用。

在我之前提到的重要的三个文件中，index.js和index.html是非常简单的。

让我们看一下client.js文件，以便更好地了解它的内容。

![client.js file in React 360 project](../../../Blog/images/外文/使用JavaScript创建虚拟现实体验/4.png)



在这里，root 被r360.createRoot设置为index.js中的**hello_vr React**组件。

----



## React 360的特点

React 360有许多有用的功能。让我们看一下其中的几个:

- 跨平台开发
  - 有了React 360，一个React开发者就可以创建在桌面、手机和网络上运行的VR应用程序，而不需要用不同的语言和技术编写很多代码，从而节省开发成本和精力。
- 用像素工作
  - React 360使开发者能够创建嵌入3D空间的2D界面。React 360的Surfaces库允许将UI面板集成到应用程序中。Surfaces将允许开发者用像素而不是其他测量单位来开发环境，并使用传统工具实现所创建的规格。
- 3D媒体支持
  - React 360的环境功能对沉浸式媒体有更好的处理。有了这个，开发者将对应用程序的外观和感觉进行精确控制。
- 增强的性能
  - 运行时架构旨在通过提高帧率和减少垃圾收集来优化整个应用程序的性能。



----



## 支持的设备

主要的有以下的设备:

- 桌面网络浏览器（Chrome、Firefox等）。
- 移动网络浏览器
- VR设备



## 总结

React 360是一种有趣的方式来创建3D网络应用，给用户带来VR体验。这是一个开源的框架，因此在构建VR应用方面具有成本效益。



任何有React经验的开发者都可以轻松地学习这个框架，并立即开始构建VR应用。React VR应用程序支持广泛使用的设备和平台，包括iOS和Android。
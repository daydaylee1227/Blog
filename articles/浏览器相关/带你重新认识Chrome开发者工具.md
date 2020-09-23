## 前言

效率Up，Up🚀🚀🚀，这样子就有更多的时间学习，以及陪女朋友啦✅

如果你用Chrome调试工具，还是停留在console阶段，赶紧还学习一波吧，绝对是满满的干货，让你效率UpUP。

本文侧重点就是关于Chrome DevTools。通过梳理Chrome DevTools 中的小技巧，这些技巧可以帮我们节省很多的时间，直接提升工作效率！



Chrome DevTools 的各种骚操作你了解多少呢？

> 网站是：[umaar.com/dev-tips/](https://umaar.com/dev-tips/)

> 掘金小册：[你不知道的 Chrome 调试技巧](https://juejin.im/book/5c526902e51d4543805ef35e/section)

上面是我主要学习高效率使用Chrome DevTools的途径，其中一个是掘金小册，从基础开始讲起，非常受用。另外一个就是国外某网站，里面有**200+ Tips**。



接下来，我总结几个比较实用的✅

> 多图预警

## 学会使用Command

### 如何打开Command menu

我们直接看到的`DevTools` 功能，只是一部分，更多的功能怎么打开呢？

`Command` 菜单可以帮助我们快速找到那些被隐藏起来的功能，这也是它本身必不可少的原因。

> 打开方式:
>
> - [ `Ctrl]` + `[Shift]`+`[I] `打开`Chrome`调试面包
>
> - 在 `Chrome` 的调试打开的情况下 按下 [ `Ctrl]` + `[Shift]` + `[P]` (Mac： `[⌘]` + `[Shift]`+ `[P]` )

比如常见的就是切换主题了



![](..\..\images\浏览器相关\Chrome骚操作\theme.gif)

-----



### 快捷键怎么查看呢，我教你一次性看shortcuts

有时候，你看身边的人使用快捷键的时候，是不是特别帅，你也可以跟他一样潇洒，一样🚀🚀🚀

![Command-use-setting](..\..\images\浏览器相关\Chrome骚操作\Command-use-setting.gif)

----

### 截屏的新姿势

还在每次都要打开QQ或者是截图软件吗，这次不需要，大大提高你的效率🚀🚀🚀

通过 `Capture full size screenshot` 命令。请注意，这里说的是全屏，并不是嵌入页面的一部分。

![Command-use-Capture](..\..\images\浏览器相关\Chrome骚操作\Command-use-Capture.gif)



当然了，Command里面功能太多了，等着你去探索，发现新的大陆🚀🚀🚀

-----



## Elements面板

### 获取某个HTML片段代码

![copy-html-element-clipboard](..\..\images\浏览器相关\Chrome骚操作\copy-html-element-clipboard.gif)

----



当然了还有更简单的操作

- 选中你想要的dom元素，右键，选中copy中的Copy element

![copy-element](..\..\images\浏览器相关\Chrome骚操作\copy-element.gif)



-----



### 获取某个DOM元素Styles

你还在傻傻的一个个复制吗，这次一次就copy all styles

![copy-element-style](..\..\images\浏览器相关\Chrome骚操作\copy-element-style.gif)

-------



### 曾经还在为调伪类样式代码苦恼吗？

![pseudo-trigger](..\..\images\浏览器相关\Chrome骚操作\pseudo-trigger.gif)



-----



### 想不起来已注册事件侦听器的功能定义在哪里

有时候，想要看看某个DOM结点到底绑定了哪些事件，回调函数在哪里注册的，项目很大的话，找起来很不方便，那怎么提高效率呢，下面👇

![addEvent-listener](..\..\images\浏览器相关\Chrome骚操作\addEvent-listener.gif)

----



### 颜色选择器

有时候，你看见某个网站配色挺好看的，于是你去用单独的取色软件去操作，那样子就太慢啦🚀

![color-get](..\..\images\浏览器相关\Chrome骚操作\color-get.gif)



------



### 在元素面板中展开所有的子节点

有时候，你很想去查看DOM的层级关系，也就是子元素的包含关系，一个一个的去点击级联的 `▶` 按钮太慢了，不如使用右击节点后的 `expand recursively` 命令：

![open-DOM](..\..\images\浏览器相关\Chrome骚操作\open-DOM.gif)





很大程度上提升了效率🚀🚀🚀

-----------



### 看dom层级的最直观的方式？

![see-dom](..\..\images\浏览器相关\Chrome骚操作\see-dom.gif)



--------------

### 在Elements面板调整dom结构很不方便？

有时候，你想要去修改dom结果，但是在Element控制面板上操作不方便，那怎么更高效的操作呢？

![Console-Edit-element](..\..\images\浏览器相关\Chrome骚操作\Console-Edit-element.gif)





---



## Console面板



可以执行常见任务的功能，例如选择`DOM`元素，触发事件，监视事件，在`DOM`中添加和删除元素等。

### `$(selector, [startNode])`：单选择器

![$内置命令](..\..\images\浏览器相关\Chrome骚操作\$内置命令.png)

---------



###  `$$（选择器，[startNode]）`：全选择器

`document.querySelectorAll`的简写，返回一个数组标签元素 语法：

```
$$('a')
```

![$内置命令2](..\..\images\浏览器相关\Chrome骚操作\$内置命令2.png)

---------

### getEventListeners`获取指定对象的绑定事件

`getEventListeners(object)`返回在指定对象上注册的事件侦听器。返回值是一个对象，其中包含每个已注册事件类型（例如，`click`或`keydown`）的数组。每个数组的成员是描述为每种类型注册的侦听器的对象。 用法:

```
getEventListeners(document);
```



### $0

在 `Chrome` 的 `Elements` 面板中， `$0` 是对我们当前选中的 `html` 节点的引用。

理所当然，`$1` 是对上一次我们选择的节点的引用，`$2` 是对在那之前选择的节点的引用，等等。一直到 `$4`

![Console-$](..\..\images\浏览器相关\Chrome骚操作\Console-$.gif)

-----



### $_

调试的过程中，你经常会通过打印查看一些变量的值，但如果你想看一下上次执行的结果呢？再输一遍表达式吗？

这时候 `$_` 就派上了用场，`$_` 是对上次执行的结果的 **引用** ：

![保存上一次的结果](..\..\images\浏览器相关\Chrome骚操作\保存上一次的结果.gif)



---------------



### console.table()

```
var data = {code:200,content:[{'品名': '杜雷斯', '数量': 4}, {'品名': '冈本', '数量': 3}]};
console.table(data.content);
```

### console.time()

 测试执行效率：

没有`Performance API` 精准，但胜在使用简便。

```js
let i = 0;
console.time("While loop");
while (i < 1000000) {
  i++;
}
console.timeEnd("While loop");
console.time("For loop");
for (i = 0; i < 1000000; i++) {
  // For Loop
}
console.timeEnd("For loop");
```

### console.dir()

打印`DOM`对象节点

```
console.dir(document)
```

看看上面的效果是上面吧🚀🚀🚀

![Console-dir](..\..\images\浏览器相关\Chrome骚操作\Console-dir.png)



剩下的很多，自己去探索吧🚀🚀🚀

----



## Sources面板

### 在workspace修改你的文件

你把项目的文件夹直接拖到 `Source` 面板，`DevTools` 会将你做出的修改同步到系统的文件中。

![workpace](..\..\images\浏览器相关\Chrome骚操作\workpace.gif)



有时候可以提高一定的效率哒🚀🚀🚀

-------------



### 检查动画

- 检查动画。您希望慢速播放、重播或检查动画组的源代码。
- 修改动画。您希望修改动画组的时间、延迟、持续时间或关键帧偏移。 当前不支持编辑贝塞尔曲线和关键帧。

怎么操作呢？来来来，我们看一看

- 快捷键 ctrl+shift+p ,打开 Command Menu,键入 Drawer: Show Animations。

  ![Command-use-Animate](..\..\images\浏览器相关\Chrome骚操作\Command-use-Animate.gif)



------------

### `DOM`断点调试

![Source-check](..\..\images\浏览器相关\Chrome骚操作\Source-check.gif)



如上图：**监听form标签，在input框获得焦点时，触发断点调试**



----

## NetWork面板

### 查一些特定的请求，过滤器用过吗？

有时候，你想看看一些类型的文件，比如Img，js文件

有时候，你想看看请求资源小于100k的

有时候，你想看看请求资源是否成功，还是请求失败

以上问题等等，都是关于NetWork控制面板的，那我们可以使用过滤器

![Network控制面板](..\..\images\浏览器相关\Chrome骚操作\Network控制面板.png)

- 数字1箭头指向的就是过滤器，获取你想要的信息资源

- 数字2箭头也同样是过滤器作用，不过更加快捷
- 数字3表示的就是某个资源文件在哪里调用了，点进去就会跳转到对于位置
- 数字4箭头Waterfall，可以更清楚的看请求一个资源每个阶段画的时间，比如DNS Lookup，建议DNS链接，SSL过程，Request sent发送时间，DownLoad下载某个特定资源时间如下👇

![1594521107702](..\..\images\浏览器相关\Chrome骚操作\waterfall.png)

---------

那我们看下怎么具体操作:

![Network-all](..\..\images\浏览器相关\Chrome骚操作\Network-all.gif)



----------



### 不想加载某个资源文库怎么操作呢？

如果你通过自己源码去修改，就out了，这样子效率很明显很低，我们通过**Block request URL**

![NetWork-block-request-url](..\..\images\浏览器相关\Chrome骚操作\NetWork-block-request-url.gif)



效率是不是Up，Up🚀🚀🚀

-----



### 移动开发过程中，想模拟网络3G,4G,2G,没问题

有时候，你做移动端的时候，想试一试网络速度对你项目有啥波动，比如，3G的时候，你首屏加载有多块，需不需要引入骨架图来优化用户体验呢，那你怎么检测呢，看下面👇

![change-wifi](..\..\images\浏览器相关\Chrome骚操作\change-wifi.gif)

- 打开控制面板Network
- 找到online字样按钮，选中你所需要的网络环境即可



-----------------



### 网络面板中请求资源更加详细的信息

有时候，项目中会遇到很多问题，比如请求资源就是其中一个，你需要更加完善的信息，这样子才可以更加高效的取诊断出问题，那需要怎么操作呢👇

![Network-add-someting](..\..\images\浏览器相关\Chrome骚操作\Network-add-someting.gif)

在此页面下，右键新增你想要查看的信息，会让你的效率🚀🚀🚀



> NetWork控制面板还有其他的功能，比如请求是否要从缓存中取，也就是Disable cache字样

-----



## Layers面板

这个对于查看浏览器渲染阶段中的图层的分成，绘制，分块，光栅化，挺有帮助的，那接下来我带你们看看要怎么操作吧👇

![Layers-make](..\..\images\浏览器相关\Chrome骚操作\Layers-make.png)

接下来就是怎么查看了：

![Layers-use](..\..\images\浏览器相关\Chrome骚操作\Layers-use.gif)

-----------

当然了，你对于渲染流程中阶段还不是很了解的话，可以看看我这篇博客：

[[1.1W字]写给女友的秘籍-浏览器工作原理（渲染流程）篇](https://juejin.im/post/5f05d12a5188252e8406e37b)

里面详细的描述了构建布局树后，图层是怎么一步步的绘制，比如图层会生成绘制列表，然后再提交给合成线程，在一步步，最后在显示器显示。



🚀🚀🚀不够的话，自己去摸索吧。

-------



## ❤️ 感谢大家

如果你觉得这篇内容对你挺有有帮助的话：

1. 点赞支持下吧，让更多的人也能看到这篇内容（收藏不点赞，都是耍流氓 -_-）

2. 欢迎在留言区与我分享你的想法，也欢迎你在留言区记录你的思考过程。

3. 觉得不错的话，也可以看看往期文章：

   [[干货👍]从详细操作js数组到浅析v8中array.js](https://juejin.im/post/5f02e7725188252e8272cd47)

   [[1.2W字👍]写给女友的秘籍-浏览器工作原理（上）篇](https://juejin.im/post/5f007d32f265da22b64936bf)

   [[1.1W字]写给女友的秘籍-浏览器工作原理（渲染流程）篇](https://juejin.im/post/5f05d12a5188252e8406e37b)

   [[建议👍]再来100道JS输出题酸爽继续（共1.8W字+巩固JS基础）](https://juejin.im/post/5efb4ca5f265da23016c5c80)

   [[诚意满满✍]带你填一些JS容易出错的坑](https://juejin.im/post/5f0884c9e51d453462004fae)
#  移动端动画组件PAG，动效制作新体验



我们知道，动画特效可以辅助视觉制作焦点，引导注意力的方向，越来越为广大视觉设计师青睐，并广泛应用于各类场景开发。

关于动画设计工具，既有 Framer.js、Origami， 也有交互原型类 Principle、Flinto，还有 Figma 自带动画演示功能的工具，但是对于一些视觉特效、非逻辑表达类动画，设计师通常会借助 AE 完成。

遗憾的是，AE动画效果的开发至今也没有一种完备且成熟的跨平台解决方案，导致动画需求交付上线的效率，交付质量，视觉动效弱，生产周期长，研发成本高等这些方案都不尽人意，为了解决上述痛点，腾讯研发了一款动画开发“神器”——“PAG”（Portable Animated Graphics），日前，PAG也正式开源到了GitHub上（https://github.com/tencent/libpag）。



接下来主要从以下几个部分介绍这款神器：

- 技术原理
- PAG存在的优势
- PAG使用初体验

从上面3个部分展开，一起探索下“PAG”的好用之处。



## 技术原理

想要解这款神器的话，我们得从以下几个方面来看：



### 为什么会有PAG

PAG作为动画的一种解决方案，不得不提目前业界常用的动画工作流解决方案：Lottie和SVGA。



Lottie 最早从UI动画场景出发解决矢量动画渲染的问题，从官方社区来看，我们能容易发现 Lottie 的矢量基因，社区作品大多是矢量图形类动画。SVGA 是 YY 直播的开发工程师 2017 年发布的一套跨平台动画解决方案，诞生于直播场景，SVGA 不支持复杂矢量图形动画，对位图动画的支持超过 Lottie，其最初的目标是为了改善和弥补Lottie。

不可否认，两者都是业界优化的动画解决方案。 PAG诞生于2016年，最初的原因是为了解决更为复杂的视频编辑场景下动画渲染问题，同时又完美覆盖了UI动画和直播场景。





### 为什么要用PAG



#### 传统实现方案的工作流*

首先，我们来看看传统实现方案的整体流程：设计师需要在AE中完成动效设计，进行手工还原，最后与设计师反复确认效果。如没有此类特效的话，需要重新开发，直到符合预期。

​                 ![img](https://docimg6.docs.qq.com/image/aIkXiJFZs0DPSlIQozuUvQ.png?w=605&h=345)        

#### PAG 的工作流程

再说到PAG的工作流程，在体验后，整个流程总结如下：

​                 ![img](https://docimg1.docs.qq.com/image/Xyc8DM8NanS1-Fn4jYZxsg.png?w=1280&h=1236.7230169050715)        



主要流程：

- 由AE生成对应动画
- 通过AE插件，完成动画导出部分
- 预览图片素材
- 导出对应文件
- 运营配置后，端上渲染



可以看到，在PAG的工作流程下，许多之前需要人工配置和手工调整的部分都简化了，直接可以在PAG桌面预览工具中做相应的素材替换预览效果，查看性能面板定量评估性能，极大提高了动效研发的效率。



## PAG主要优势介绍

PAG的主要技术优势主要是以下几个方面：

- 全AE特性支持
- 支持图层编辑
- 与视频渲染无缝整合
- 支持服务端渲染
- 文件更小等



### 文件更小

PAG是二进制文件格式，采用了动态比特位编码技术，让相同动画导出的文件大小平均只有 Lottie 的一半左右（都经过zip压缩后对比）。

### 解码更快

PAG由于采用二进制格式，不存在JSON的字符串解析，解码耗时平均只有Lottie文件的7.6%，同时二进制文件格式也更容易做到单文件集成图片，音频，视频等任意资源，所以它的解码速度比Lottie快得很多。

### 支持更多AE特性

PAG支持更多的AE特性，目前支持Lottie在移动端几乎所有的功能，并且额外在**文本，遮罩，滤镜方面**比Lottie支持更加全面。比如一些内置的特效。



### 性能更好

PAGViewer 面板可以定性的评估PAG素材的性能，如下图就是性能面板给到的结果：

​                 ![img](https://docimg3.docs.qq.com/image/9_rWKGuHKDZ5NYKzwzPW8g.png?w=380&h=414)        

对比不同的素材，我们从渲染耗时来看，优化的时间都是Lottie的100%以上的，从内存上来看，平均优化的空间是巨大的，对于一款应用来说，提升不可小觑。

###  

### 接口易维护

首先，我们从平台上来看：

- Lottie仅支持Android、iOS、web、mac OS
- SVGA支持Android、iOS和web端
- PAG可以支持到Android、iOS、web、mac OS、windows、Linux，涵盖到所有平台。



PAG为很多的用户考虑到平台兼容性，真的下了很多功夫。当然了，除了上面的平台兼容外，PAG 在接口设计上也更加容易去维护。

​                 ![img](https://docimg4.docs.qq.com/image/7wcQHHXj0Yj-DHaMtrYgGA.png?w=1280&h=903.8231469440832)        

打开官网，都有完备的接入文档。



## PAG使用初体验

接下来，我会作为零基础的用户，给大家介绍下操作体验。

### PAG导出面板

以设计完成的AE动效为例，安装好PAGViewer后，选择安装AE插件，即可在AE中支持导出PAG文件。

​                 ![img](https://docimg10.docs.qq.com/image/74tP-XKjZujDSoo0IPvTlQ.png?w=223&h=268)                         ![img](https://docimg7.docs.qq.com/image/JrkAkbZkSVDSpto7U-hKyQ.png?w=496&h=354)        

在导出PAG文件时可以看到提供了两种方式，如下图所示：

导出插件面板和直接导出，前者增加了导出插件面板的显示，方便查看AE工程中直接导出存在的问题，并且有更丰富的错误提示以及相应的改进建议，方便设计师快速发现和解决问题。

​                 ![img](https://docimg6.docs.qq.com/image/FMCqo2wdZYTjlg3REfWtQg.png?w=979&h=556)        

​                 ![img](https://docimg4.docs.qq.com/image/NNJkQuE8QO99beu3PL-xpw.png?w=1101&h=718)        

同时，支持一键导出BMP预合成和查看占位图层。

另外，由于pag动画的时长是固定的，在某些场景需要pag文件的时长能够动态变化，于是增加了时间伸缩的功能。当设置PAG的播放时长和pag文件时长不一致时，会应用时间伸缩。

由此可见，在PAG文件导出之前，就能在面板确保动效呈现效果，并对动效图层做出相应的预览和调整。用UI的方式替代复杂的手工操作，提高了设计师的生产效率。

​                 ![img](https://docimg1.docs.qq.com/image/siK3BYtc8QA0YF_JOBmzNg.png?w=666&h=715)                         ![img](https://docimg1.docs.qq.com/image/LfG9p-Ya8dQ4Y6IydwZSIw.png?w=663&h=699)                         ![img](https://docimg8.docs.qq.com/image/XgIdMywptGTmf_7Qo5o6Zg.png?w=666&h=715)        

并且，操作过后，界面上能够记忆上次的选择，避免多次重复的操作。



### PAG Viewer功能

文件结构：

打开PAG文件，可以直观的了解文件结构，方便直接参看图形或参数配置。

​                 ![img](https://docimg3.docs.qq.com/image/DAALzSXShAYktHxcaV8sNQ.png?w=737&h=540)        

性能检测：

PAGViewer上的Profiler性能检测面板可以很直观地帮助设计师进行性能调优。预览贴纸时按下键盘上的P键即可呼出该面板，再次按下关闭面板。

​                 ![img](https://docimg10.docs.qq.com/image/faYeft500EmYw0N1s9ty8A.png?w=740&h=540)        

灵活的占位图替换和文字编辑能力，如下替换中间的占位图片：

​                 ![img](https://docimg1.docs.qq.com/image/BzGiQIklCq6o8Ah9WPqnDg.png?w=741&h=544)        

替换前：                                      替换后：

​                 ![img](https://docimg10.docs.qq.com/image/0e3_1-JrAW7bfXr1g3O7pQ.gif?w=737&h=534&type=image/gif)                         ![img](https://docimg8.docs.qq.com/image/SI1e8JEv05e45VhVhMU-nw.gif?w=737&h=534&type=image/gif)        

或者直接在PAG Viewer上进行文字编辑：

如下图，在图层编辑面板中点击希望更改的文字区域，可以直接修改图层文字。

​                 ![img](https://docimg10.docs.qq.com/image/LPFdb25J7VCFKQmRgllUsw.png?w=657&h=639)        

​                 ![img](https://docimg4.docs.qq.com/image/EB8cbnOUSQjjHIOBswg5fQ.png?w=633&h=385)        

​                 ![img](https://docimg8.docs.qq.com/image/tPuNUOs-3BrZCiy_ipXjJA.png?w=664&h=650)        



## 总结

从体验上来说，PAG方案的出现，显著提升了动画设计到上线的效率，解决了行业在动画制作这块的大量痛点问题。根据业务场景，支持多种形式视频及动画创意，广告、游戏、视频编辑..目前接入PAG的产品，比如QQ，微信，王者荣耀，QQ音乐等。

​                 ![img](https://docimg10.docs.qq.com/image/iKsrKLAYrATJahR7aWEWMQ.gif?w=265&h=486&type=image/gif)                         ![img](https://docimg9.docs.qq.com/image/7qO2_4Mg2p7vpDyH8_flDg.gif?w=265&h=486&type=image/gif)                         ![img](https://docimg7.docs.qq.com/image/fp38X_nvUMDoMFQVUmia3Q.gif?w=265&h=486&type=image/gif)        

PAG 目前已正式对外开源，如果大家对改进 PAG 项目有任何的想法或建议，欢迎访问 PAG 的 Github 主页：https://github.com/tencent/libpag 。大家也可以加入PAG官方群（893379574）或通过他们的官网（https://pag.io/），与更多优秀的设计师和开发人员共同体验！
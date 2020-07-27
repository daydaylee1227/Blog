

## 前言

最近的一个项目做的是vue组件中的一个应用，**处理滚动列表**，这个应该是很常见的需求了，在项目中遇到的痛点，难点，如何一步步解决的，以及小细节一些优化。



> 借鉴某课的思路，仿QQ音乐效果，记录一下，自己字母解决这个难题，分享给你们，**希望对你们做移动端滚动列表问题有所帮助**



[GitHub仓库](https://github.com/daydaylee1227/Blog/tree/master/vue-daymusic)



----------



## 效果

![处理滚动列表最终效果](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\处理滚动列表最终效果.gif)

从最终效果来看，实现了三个我的难点👇

- 第一个就是右侧快速入口，点击一个字母跳转到相应的部分
- 左上角的那个title是跟随字母一起修改内容的
- 向下滚动的话，会随时刷新右侧快速路口以及左上角字母title



接下来就是一步步去实现，优化上面的效果

------------



## 第三方库介绍

[better-scroll](https://github.com/ustbhuangyi/better-scroll) 移动端滚动的解决方案

[vue-lazyload](https://github.com/hilongjw/vue-lazyload) 图片懒加载



基本上实现上面的效果就是基于这两个第三方库

**better-scroll基本使用**

经常会遇到的问题就是初始化了，**还是不能滚动**。那么对于这个而言，我最近用到一些经验是什么呢？

我们先看常见的html结果👇

```html
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
    ...
  </ul>
  <!-- you can put some other DOMs here, it won't affect the scrolling
</div>
```

滚动的原理是什么👇

![看图说话](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\better-scroll原理说明.png)

wrapper是父容器，它一定要有**固定高度**，content是内容区域，它是父元素的第一个元素，它content会随着内容的大小撑开而撑高，只有这个高度大于wrapper父容器高度时，才会出现滚动，也就是它的原理。

那么我们怎么去初始化呢👇

```
import BScroll from '@better-scroll/core'
let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper,{})
//{}配置一些信息
```

[点这里有文档](https://better-scroll.github.io/docs/zh-CN/plugins/#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89%E6%8F%92%E4%BB%B6)



接下来就开始把👇

----------



## 从0到1完成

### scroll组件

这个scroll组件是子组件，也可以算是个base组件，完成日常滚动的效果👇

```javascript
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      // 初始化Scroll
      _initScroll() {
        // 判断是否初始化
        if (!this.$refs.wrapper) {
          return
        }
        // 调用Scroll实例,表现可以滑动
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {  // 刷新scroll,重新计算高度
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      // 监听到数据的变化,就会重新去refresh数据,重新去计算响应的数据
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
```

在父组件中导入即可



### 完成列表滚动

listview组件导入

```
<template>
  <scroll
    :listen-scroll="listenScroll"
    :probe-type="probeType"
    :data="data"
    class="listview"
    ref="listview"
  >
    <ul>
      <li v-for="(group,index) in data" class="list-group" ref="listGroup" :key="index">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li
            @click="selectItem(item)"
            v-for="(item, index) in group.items"
            class="list-group-item"
            :key="index"
          >
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
  </scroll>
</template>
```

然后导入scroll组件即可，看看效果👇

![](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\处理滚动列表-实现列表滚动.gif)



上面在listview组件中导入scroll组件，完成基本的列表滚动效果，接下来，完善一步一步效果吧。



### 右侧快速入口

```
<div
      class="list-shortcut"
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
    <!-- data-index方便获取一个列表中的index -->
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :data-index="index"
          class="item"
          :class="{'current':currentIndex===index}"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
```

点击右侧快速路口的话，会跳转到相应的title去，使用的方法就是

[scrollElement](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#%E6%96%B9%E6%B3%95)

scrollToElement(el, time, offsetX, offsetY, easing)

**这个方法很方便的解决了我们第一个难点**，现在就差获取右侧快速路口的索引值了

给每一个li增加一个data-index属性名称，值为index下

```
:data-index="index"
```

这样子每次就可以获取当前的索引值👇

有了索引值，我们就可以直接调用srcollToElement()方法，完成左侧的跳转效果。

```
this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
// 这个index就是获取到下标索引值,然后通过这个
// 这个第二个参数是滚动的动画的时间，我们默认为0就行，文档上面也有专门的说明，可以去看看。
```

我们看看效果吧下👇

![实现点击右侧跳转相应位置](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\处理滚动列表-实现点击右侧跳转相应位置.gif)





接下来完成**touchMove事件**，我们绑定到div上👇

```
@touchmove.stop.prevent="onShortcutTouchMove"
// 两个修饰符阻止冒泡以及默认的事件
```

思路👇

- 首先要监听touchStart事件一开始锚点，也就是anchorIndex，还有保存e.touches[0].pageY, y轴上的位置信息，记作y1
- 监听touchuMove事件，保存y轴距离，记为y2，这个时候y2-y1就是y轴上的距离变化dataChange
- 将这个距离dataChange除以高度，这里的高度，我选择的是每个li的content+padding高度，这个高度的话，正好是整个一个li元素高度，我觉得很合理，delta = dataChange/ANCHOR_HEIGHT
- 最后一开始的anchorIndex加上delta，就是最新的锚点，这个anchorIndex一定要取证，因为获取的可能是字符串。

看代码👇

```js
	onShortcutTouchStart(e) {
        // 获取到右侧的列表索引值
      let anchorIndex = getData(e.target, "index");
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;   // 计入一开始y轴上的位置
      this.touch.anchorIndex = anchorIndex;   // 保存了每次点击的锚点
      this._scrollTo(anchorIndex);
    },
    // 监听的是TouchMove事件
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      // 滚动的两个差值 也就是y轴上的偏移
      // 除以每个高度，这样子的话，就知道偏移了几个锚点
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;

      this._scrollTo(anchorIndex);
    },
    
```

效果怎么样呢，基本上点击和手势移动都较为完美的实现了。

![实现手势移动左侧跳转相应位置](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\处理滚动列表-实现手势移动右侧跳转相应位置.gif)





### 左右联动

左右联动的效果指的是左侧点击到某个区域，紧接着右侧快速路口也跳转到相应位置，这里其实指的就是高亮效果。

效果就是滑动列表，右侧的字母会相应的高亮，达到同步的作用，难点是什么呢？

![](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\ListGroup计算高度.png)

从图片上面看，我们发现每个listGroup分组里面的成员是不固定的，所以我们怎么去获取到相应的currentIndex呢？

**我们可以获取到每次滚动的距离，那怎么样去获取相应的currentIndex呢，比如滑到K分组时，currentIndex是对应的下标?**

有个不错的思路：

- 我们去维护一个height[i]数组，该数组含义就是第i个分组的范围是height[i]~~heigth[i+1]
- 那么我们获取到滚动Y轴的距离，那么就可以确定它所在的范围，如果滚动的距离在posY>height[i]&&posY<height[i+1]，那么currentIndex就可以取值i，这样子好像行。

那么我们按照上面的思路来完善吧👇

```
	_calculateHeight() {
      // 这个方法就是计算每个listGroup高度
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
```

这个listHeigth数据就是我们维护的第i个分组的clientHeight距离

第二步，我们监控这个scrollY，这个变量表示的就是滚动的距离👇

```
watch: {
    // 每次去watch这个滚动的距离,
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    },
```

这里需要提醒的就是，我们怎么去拿到这个scrollY滚动距离呢？

说到这个，我们得看到scroll组件中，阅读它的API，会发现它提供了on方法，该方法可以去监听该**实例的钩子函数**，所以我们去**监听钩子函数scroll**

 **scroll钩子函数**

- 参数：{Object} {x, y} 滚动的实时坐标
- 触发时机：滚动过程中。

所以我们可以通过这个钩子来获取滚动的实时坐标👇

```
if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            // me指的就是实例
            // 通过监听scroll事件,有一个回调,pos是一个对象,有x,y轴的具体距离
            // 去派发一个scroll事件,这样子外部也就是父组件可以拿到我们的pos
            me.$emit('scroll', pos)
          })
        }
```

这样子我们在子组件scroll中向外派发一个scroll事件，并且把**pos = {Object} {x, y} 滚动的实时坐标**向外传递，这样子的话，父组件通过@scroll="scroll" 就可以拿到这个坐标pos

这样子我们这个难点就解决了。

我们来看看效果👇

![](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\处理滚动列表-滑动列表右侧高亮.gif)



这样子基本上问题就解决了，但是呢还会遇到一个问题？👇👇👇

-------





## [probeType](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html#probetype)

- 类型：Number
- 默认值：0
- 可选值：1、2、3
- 作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发[scroll 事件](https://better-scroll.github.io/docs/zh-CN/guide/api.html#scroll)；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。



这个是文档上面的内容，我们可以看到这个配置项还是很重要的，我们listview组件需要通过props向子组件传递probeType值，值为3，这样子就可以**在滚动中实时派发 scroll 事件**。

```
 <scroll :probe-type='3'></scroll>
 // 当然了，这个probeTyep会在data中拿到
```



---------



## 总结

- 解决难点一，获取滚动的实时位置，通过子组件scroll实例on方法，去**监听钩子函数scroll**，然后向外去派发一个scroll函数，并且把滚动的距离传给父组件listview
- 解决难点二，获取到滚动Y轴的距离，就可以进一步去判断，它是落在哪一个listGroup中，也就是哪一个分组中，这样子就确定currentIndex。
- 通过watch监听scrollY值，表示Y轴滚动距离，发生变化时，更新currentIndex。
- 有了currentIndex，在判断currentIndex === index，就可以实现高亮效果
- 还有一些BetterScroll 提供的API👇
  - 比如refresh(),重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
  - scrollToElement(el, time, offsetX, offsetY, easing)  滚动到指定的目标元素
  - on(type, fn, context)  监听当前实例上的钩子函数。如：scroll、scrollEnd 等

- 还有一个收获就是用第三方API，**有问题一定要查文档**。







## ***❤️ 感谢大家***

如果你觉得这篇内容对你挺有有帮助的话：

1. 点赞支持下吧，让更多的人也能看到这篇内容（收藏不点赞，都是耍流氓 -_-）

2. 欢迎在留言区与我分享你的想法，也欢迎你在留言区记录你的思考过程。

3. 觉得不错的话，也可以阅读TianTian近期梳理的文章（感谢掘友的鼓励与支持🌹🌹🌹）：

   

   - [「查缺补漏」送你18道浏览器面试题](https://juejin.im/post/5f184aade51d4534aa4ad7c0)(450+👍)
   - [「查缺补漏」送你 54 道 JavaScript 面试题](https://juejin.im/post/5f1412ad6fb9a07e944eff6b)(500+👍)
   - [「算法与数据结构」链表的9个基本操作](https://juejin.im/post/5f107425e51d4534a2088f82)(150+👍)
   - [「小技巧」写给男同胞的Chrome DevTools调试小技巧，效率🚀🚀🚀](https://juejin.im/post/5f0aaa1b5188252e74339985)(210+👍)
   - [「浏览器工作原理」写给女友的秘籍-渲染流程篇（1.1W+字）](https://juejin.im/post/5f05d12a5188252e8406e37b)(230+👍)
   - [「数组方法」从详细操作js数组到浅析v8中array.js](https://juejin.im/post/5f02e7725188252e8272cd47)(220+👍)
   - [「浏览器工作原理」写给女友的秘籍-浏览器组成&网络请求篇（1.2W字)](https://juejin.im/post/5f007d32f265da22b64936bf)(240+👍)


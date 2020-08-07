## vue-daymusic

> 音乐播放器

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```



## 项目环境搭建

**安装脚手架**

```
npm install --global vue-cli
```

**安装webpack** 

```
npm install webpack -g
```

**创建vue项目工程**

```
vue init webpack vue-daymusic
```

**有些配置文件的选项**

```
Vue build 选择runtime
ESLint -->> 选择Standard
```

**测试是否能支持运行**

```
cd vue-daymusic
npm run dev
```

![](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\环境搭建成功.PNG)

出现这个即表示运行成功



## 项目文件说明

![项目说明](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\项目说明.png)

对于其他的文件配置未修改，Vue-cli基本上以及配置完全，接下来我们主要将的修改内容就是src这个目录进行修改的👇 所以，数字标记的是显示修改的内容。



**api文件**

主要是一个后台数据请求，比如axios，jsonp跨域请求类似的

**assets**

通用的资源，比如字体文件，图片，通用的JS逻辑代码

**stylus**

通用的样式文件

**store**

状态库，存放vuex相关代码



**导入资源**

分别是这次项目的fonts和stylus文件中的样式，

地址在点这里，stylus点这里



**安装对应的loader**

比如stylus-loader

```
npm install stylus-loader stylus --save-dev
```

**.eslintrc.js文件**

在rules中增加两个规则

```markdown
rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    
    'eol-last':0, //文件以单一的换行符结束 - 关闭
    'space-before-function-paren': 0 //函数定义时括号前面要有空格 - 关闭
  }
```

**webpack.base.conf.js配置别名**

```
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'base': resolve('src/base'),
      'api': resolve('src/api')
    }
  },
```

有人会好奇这个resolve是什么函数，我们看看这个文件中是怎么写的吧

```
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
```

就是相对路径的写法，所以有时候，看见别人路径写法很奇怪，就是因为设置了别名

不写的话，默认情况找不到该路径下的资源，就去node_modules模块下找



**package.json增加内容**

**babel-runtime**

babel-runtime用以提供编译模块的工具函数，启用插件babel-plugin-transform-runtime后，Babel就会使用babel-runtime下的工具函数。

`npm install --save babel-runtime`

**fastclick** 解决移动端点击300ms问题

`npm install --save fastclick `

将他们作为生成依赖

```
"dependencies": {
	// 其他的省略
    "babel-runtime": "^6.0.0",
    "vue": "^2.3.3",
    "vue-router": "^2.5.3",
    "vuex": "^2.3.1",
    "fastclick": "^1.0.6",
  },
```



```
"devDependencies": {
   	// 其他的省略
    "babel-polyfill": "^6.2.0",
}
```

**babel-polyfill** 是解决使用es6中的API 比如 Promise

`npm install --save-dev babel-polyfill `作为开发依赖



**main.js导入上面的包**

```
import 'babel-polyfill'

import fastclick from 'fastclick'

fastclick.attach(document.body)
```



## 页面骨架的开发

**页面入口+header组件的编写**

```vue
<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
```



路由的配置+tab顶导组件开发

```vue
<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
```



## 推荐页面开发

使用Promise封装JSONP

```js
import originJsonp from 'jsonp'
export default function JSONP(url, data, option) {
    url += (url.indexOf('?') === -1 ? '&' : '?') + param(data)
    return new Promise((resolve, reject) => {
        originJsonp(url, option,(err, data) => {
            if(!err) {
                resolve(data)
            }else{
                reject(err)
            }
        })
    }) 
}



export function param(data) {
    let url =''
    for(var k in data) {
        let value = data[k] === void 0 ? '' : data[k]
        url += '&'+ k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
}
```



接下来就是在api文件下，封装数据请求的代码

我们通过QQ音乐首页面，打开调试工具，然后通过NetWork控制面板，找到请求地址路径



```
//recommend.js文件

import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({},commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    }) 
    return jsonp(url, data, options)
}

```

我们看看config.js文件的配置信息

```
export const commonParams = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}

export const options = {
    param: 'jsonpCallback'
}

export const ERR_OK = 0
```

最后通过调用recommend.js写好的数据接口，拿到5条数据后，我们开始写轮播图板块。

### 轮播图slider



**轮播图借用第三方插件better-scroll**



```
npm install better-scroll -S
```



使用方法👇

```vue
<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop, // 表示轮播
        snapThreshold: 0.3,
        snapSpeed: 400,
});
```

为什么轮播图实现不了无缝轮播，

解决的办法就是减低版本，最新版本不知道为什么使用不了

```
"better-scroll": "^0.1.15"
```

接下来就是动态的去获取设备的宽度，然后设置响应容器的宽

**先看看div标签**👇

```
<div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="item.id"></span>
    </div>
  </div>
```

然后是方法👇

```
methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        console.log(this.children.length)
        console.log(width)
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
```

在使用better-scroll插件的时候，需要将sliderGroup的宽度设置为n+2个子元素的宽度，这样子才可以实现无缝的轮播效果。



### 轮播图小圆点

```
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" ></span>
```

要是当前的currentPageIndex等于index，增加一个active属性，接下来就是如何去完成这个currentPageIndex的取值。

需要完成的就是小圆点跟随图片无限滚动，BScroll实例对象上面会派发一个scrollEnd方法，我们去调用它就行👇



```
// BScroll实例对象会派发一个事件,每次滚动完成后,都会获得这个事件的下标
this.slider.on('scrollEnd', () => {
		  // 这样子的话,就可以用分别去获取当前的下标
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {   // 无缝滚动的话,需要下标减一  这是因为默认会在前面添加一个元素
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          
          // 判断是否是无限滚动的效果,是的话
          // 每次先清除定时器,然后重新去滚动
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
```

### 轮播

BScroll实例上有个goToPage方法，表示跳转到哪一个pageindex，我们来看看👇

```
_play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          // 如果是无限轮播的话,就需要加1
          pageIndex += 1
        }
        // 实现轮播的效果
        this.timer = setTimeout(() => {
          // slider实例上面有个goToPage(indexX,indexY,400)方法
          // 分别表示x,y跳转的位置,400表示的是时间间隔
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
```

该方法传入三个参数，分别表示x,y跳转的位置,400表示的是时间间隔，也就是一开始构造函数中的`snapSpeed: 400`。



切换设备的话，存在可视窗口的问题无法解决，比如轮播图slider下面children都没有修改，解决办法就是监听window的resize事件。

```

window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
```

this.slider.refresh() 重新去刷新slider，重新去计算。

看看效果👇

![轮播图展示实现效果](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\轮播图实现效果.gif)



整体思路👇

1. 先动态获取到设备的宽度，给sliderGroup设置宽度。
2. let slider = new Bscroll()实例，参数配置好对应信息
3. slider会派发一个scrollEnd方法，每次滚动完一次，会执行一个回调函数，你可以做一个事情，比如获取`this.slider.getCurrentPage().pageX` 获取x轴方向的值，每次滚动完一次，执行这个autoPlay()方法，完成自动轮播。小细节的话，执行autoPlay()要先清除定时器。
4. autoPlay()方法是每次都执行一次setTimeout()，里面的callback函数，功能是跳转到指定的页，这个方法在slider实例上会派发，也就是`this.slider.goToPage(pageIndex, 0, 400)` 
5. 监听window的resize事件，每次视口发生变化的时候，就需要重新计算slider，以及sliderGroup的宽度，这样子的话，在调用slider实例上的refresh()方法重新刷新slider，以及计算。



----



### 完成热门歌单推荐

通过QQ音乐，发现响应头中的HOST：c.yy.qq.com,要求的话，就是请求的数据必须是这个网站，那么就不能使用到这个数据请求接口了吗？

解决方案：后端请求代理



**使用express中间件**

在最新的webpack配置中，找到webpack.dev.conf.js文件

我们先来看看webpack官方文档下**[点这里](https://webpack.js.org/configuration/dev-server/#devserverbefore)**

**devServer.before**

function (app, server, compiler)

提供在服务器内部在所有其他中间件之前执行自定义中间件的功能。这可以用于定义自定义处理程序，例如：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    before: function(app, server, compiler) {
      app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });
    }
  }
};
```

所以我们可以根据这个需求，完成我们的中间件



**配置请求代理**

```
// 设置请求代理 --start
const axios = require('axios')
const express = require('express')
const app = express()
const apiRouters = express.Router()

// 在devServer配置中间件
devServer:{
	before(apiRouters) {
      // 完成代理的工作
      apiRouters.get('/api/getDiscList', (req, res) => {
        var url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
        axios.get(url, {
          headers: {
            'referer': 'https://c.y.qq.com/',
            'host': 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
}
```



配置好中间件后，我们如何获取我们需要的数据呢？

接下来，我们看如何获取到数据👇

```
function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

```

通过axios.get(url,{params:data}) 返回是一个Promise对象，这样子的话，中间件会代理，然后通过中间件请求数据。





### Scroll组件

**完成了热门歌单推荐数据的获取，接下来就是要增加一个scroll组件**

因为获取到热门的数据很多，所以需要做的就是增加一个scroll组件,可以滑动。

对应的就是在base/scroll/scroll.vue创建一个组件，然后new Scroll()实例。

#### 有时候滑不到列表的最底部？

这个原因就是scroll组件中有个slider组件，slider组件中也是使用better-scroll完成互动的效果，这个组件的渲染过程是通过数据去获取的，获取**数据的过程是异步的**，所以需要监听一个事件，判断是否加载完毕，加载完毕的话，重新去refresh，重新去计算宽高。

- 监听图片的加载是否完成
- @load=“loadImage“ 一旦完成的话，就获取重新去refresh一下scroll组件，重新去渲染一遍。



### vue-lazyload图片懒加载

[点这里](https://github.com/hilongjw/vue-lazyload)

```
$ npm i vue-lazyload -S
```

然后就是注册到vue中

```
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
// or with options
Vue.use(VueLazyload,{
  loading : require('base/loading/loading.gif')
})
//导入loading图片
```

最后通过👇

```
<img width="60" height="60" v-lazy="item.imgurl">
```



### better-scroll与fastclick点击事件冲突

```
<img class="needsclick"  :src="item.picUrl" @load="loadImage">
```

给你需要点击事件的元素设置一个class属性，needsclick，这样子就不会阻止点击事件了

-------



## 歌手页面开发

### singer.vue页面

页面布局以及获取到相应QQ音乐数据的接口

```
_getSingerList() 获取到相应页面的数据
```

唯一区别就是返回的数据不是我们按照字母大小返回的怎么办呢？



### 歌手数据的处理以及Singer类封装

我们需要的数据是按照一定顺序完成的，比如热门歌手，比如按照字母来排序！所以我们需要对数据经行处理

原本歌手数据👇

![原本歌手数据](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\原本歌手数据.png)

杂乱无章，也不是我们想要的，我们看看处理后的数据👇

![歌手页面数据处理](C:\Users\DayDay\Desktop\Blog\images\vue-daymusic\歌手页面数据处理.png)

通过singer.vue中methods的_normalizeSinger方法完成对原有数据的处理。



### listview组件开发

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

------





### [probeType](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html#probetype)

- 类型：Number
- 默认值：0
- 可选值：1、2、3
- 作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发[scroll 事件](https://better-scroll.github.io/docs/zh-CN/guide/api.html#scroll)；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。



这个是文档上面的内容，我们可以看到这个配置项还是很重要的，我们listview组件需要通过props向子组件传递probeType值，值为3，这样子就可以**在滚动中实时派发 scroll 事件**。

```
 <scroll :probe-type='probeTyep'></scroll>
 // 当然了，这个probeTyep会在data中拿到
```





## 歌手详情页开发

### 完成子路由的配置

```
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: '/:id',
          component: SingerDetail
        }
      ]
    }
```

这样子的话，表示传入的id是动态的！

利用编程式导航跳转👇

```
selectSinger(singer){
      // console.log(singer.id)
        this.$router.push({
          path: `/singer/${singer.id}`
        })
    }
```

listview组件向外派发一个点击事件，这样子的话singer组件就可以通过这个事件的名称拿到对于的singer类型数据！



### vuex

假设我们的应用是比较复杂的，其中有些数据是被共享的，而这些组件又是兄弟组件，或者是关联度比较低的组件，这时候要是想去共享这些数据就会比较困难，包括修改数据也是一样，即使通过这个eventBus去操作也是困难的，这个时候，去维护的话，就会显得很困难。



注册以及使用，在store文件夹下，创建一个index.js文件，里面把vuex配置好，如下👇

```
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 这个logger作用就是每次通过commit mutations修改state时,控制台会去打印修改记录是什么

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// npm run dev 这个值为true
// 
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  // 开启的就是线下的严格模式,它会去判断,这个state状态是否是由mutations操作而修改的
  // vuex严格模式,当发现这个state状态修改不是来源于commit mutations的话,会报错
  // 并且开启严格模式的话,会消耗一定的性能的,所以建议线上不适用
  
  plugins: debug ? [createLogger()] : []
})
```

最后在main.js文件中导入index.js文件，挂载到vue实例上。



### mapMutations VS mapGetters

这个两个vuex提供的语法糖怎么去使用呢？

**mapMutations** 

```
import { mapMutations } from "vuex";

methods: {
    ...mapMutations({
      setSinger: "SET_SINGER",
    }),
  },
```

这个setSinger,就是新的函数名称，SET_SINGER就是你自己定义在mutations中的方法名

**mapGetters**

```
import {mapGetters} from 'vuex'

computed: {
      ...mapGetters([
        'singer'
        // 这个时候就是类似于直接拿到数据，this.singer就存在这个数据了
      ])
    },
```

这个singer就是你vuex仓库中存的变量类型



### music-list



```
singr-detail.vue
<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
```

该组件singer-detail.vue组件向子组件传递三个参数，一个是title，背景图，还有歌曲的列表





## 播放器内置组件开发

配置好vuex相应的state,接下来就是布局👇

state.js文件配置

```
const state = {
  singer: {},
  playing: false,           // 控制播放状态
  fullScreen: false,       // 播放器的展开缩小
  playlist: [],           // 播放歌曲的list
  sequenceList: [],      // 这个播放歌曲的随机列表
  mode: playMode.sequence,    //  播放模式, 随机播放,顺序播放,循环播放
  currentIndex: -1,     // 当前播放的索引
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

```



### Player组件

因为player组件并不是某个功能所拥有的，所以将它放在APP.vue中，并引入注册，使用。





### vuex提供语法糖mapActions

可以在组件中使用Actions中设置的行为方法，如何使用呢？



```

import {mapActions} from 'vuex'

methods: {
      // 使用vuex中映射问题
      selectItem(item, index) {
        // 这样子的话就可以在当前的vue中拿到selectPlay方法
        this.selectPlay({    
          list: this.songs,
          index
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
```

### 播放器展开收起动画

**使用transition组件**

需要使用到的就是JS钩子

```
<transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
>
</transition>
```

对应的就是在method中定义transition中钩子函数enter,after,leave,after-leave



create-keyframe-animation，因为要在JS中去完成CSS3的动画，所以呢，我去GitHub上面找到了一个用JS实现的动画库

使用第三方库，方便通过JS操作动画





### audio标签

```
<audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"></audio>
```

audio 提供的事件

error *请求数据时遇到错误*

canplay *可以播放，但中途可能因为加载而暂停*

timeupdate   *播放时间改变*

ended  *播放结束*



currentSong.duration 歌曲的时间长



percent = this.currentTime / this.currentSong.duration

传入百分比之后，就可以通过percent * this.$refs.progressBar.clientWidth计算出进度条的宽度



### 播放器进度条组件

**移动端事件绑定**

```
<div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
>
```

点击或者是平移的话，怎么获取播放进度条呢

- 获取当前进度条的clientWidth + 偏移量
- 这个偏移量就是从touchstart开始记录水平方向位移，通过event.touches[0].pageX - this.touch.startX



点击事件的话，该怎么实现呢

### **getBoundingClientRect()获取的是相对于视口的距离**



- 通过progressBar.getBoundingClientRect() 获取视口距离

- 然后 event.pageX - rect.left  也就是鼠标的位置减去progressBar组件left距离

  

### 随机播放，顺序播放，循环播放

打乱歌曲算法

```js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

```



### 抓取歌词数据信息

歌词数据的Base64解码  "js-base64": "^2.1.9"

首先需要做的内容是Base64.decode(res.lyric)  需要解码

**lyric-parser **这个库的作用就是解析这个歌词语法，生成一个有规矩的数据结构。



### 播放器底部适配问题

因为每个页面都会遇到这个问题，比如热门歌曲页面，比如歌手页面，歌手详情页面等，都会出现歌手播放器底部遮住部分信息的问题，解决的办法就是使用mixin,抽离公共的逻辑代码部分。



```
import {playerMixin} from 'common/js/mixin'

mixins: [playerMixin]
```

然后再去重写这个handlePlaylist方法,这样子的话，就会去调用基础组件的refresh()方法

```
// 给具体的DOM修改样式
handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
```

// 给具体的DOM修改样式，比如选中singer组件的DOM元素，给它设置一个bottom，然后调用scroll组件中的refresh()方法，这样子的话，就可以重新高度，也就是重新计算。
# vue-daymusic

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

### 轮播图



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
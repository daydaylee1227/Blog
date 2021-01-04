## 前言

这篇文章的话，分享一些最近使用React开发项目时，用到的小技巧,其实也算是JavaScript中的一些技巧吧，内容主要有一下几点👇



- 产生随机不重复id
- 快速取整数
- 合理布局样式
- 字符串xml的转换
- 特殊字符串的排序
- 获取数组的最大最小值
- 在条件中使用逻辑与或





---------



## 快速取整数

在JavaScript中去整数的话，最常见的是`Math.round()`进行四舍五入，`Math.floor() `以及` Math.ceil() `等方法取整数。接下来还有一种去整数的方法👇

```js
const num = Math.random() * 100
console.log(num)   // 随机数字
console.log(~~num) // 取得整數的部分
```



这样子，也是一种很方便，而且很容易记住的方法来获取整数。

是不是get一个小技巧呢🤭



----------



## 获取数组的最大最小值

这是最近遇到的一个小问题，当然了，求解这个问题不是难点，我觉得这是一个小技巧，所以就分享出来👇



```js
const numbers = [1, 2, 3, 99, 4, 4, -1];
const maxNumber = Math.max.apply(Math, numbers);
const minNumber = Math.min.apply(Math, numbers);
```





-----------



## 特殊字符串的排序

最近在排序字母的时候，遇到一点小问题，这次把它给分享出来👇

使用的是**localeCompare**这个函数，那它的返回值是哪些

首先，它返回一个数字表示是否 **引用字符串** 在排序中位于 **比较字符串** 的前面，后面，或者二者相同。

这个返回值有三个👇

- 当 **引用字符串** 在 **比较字符串** 前面时返回 -1
- 当 **引用字符串** 在 **比较字符串** 后面时返回 1
- 相同位置时返回 0



举个例子👇

```js
'a'.localeCompare('c')
// 返回的值是 -1
'check'.localeCompare('against') 
// 返回的值是 1

'a'.localeCompare('a')
// 返回的值是 0
```



掌握了基本的使用方法，排序数组就很简单了👇

```
const strList = ['a','d','f','h','e']
strList.sort((a, b) => a.localeCompare(b))
console.log(strList)

// ["a", "d", "e", "f", "h"]
```

是不是get一个小技巧呢



-----------





## 在条件中使用逻辑与或

最近项目中，学会得一个小技巧，就是逻辑与或去渲染对应的场景，通过state中的isRight来更新答错答错的效果。

```react
render() {
    const {
        _gameContainer,
        _optionStyle,
        _mode,
        state: {
            isRight
        }
    } = this
    let style = {}
    
    return (
        <div style = {style}>
            { _mode === MODE.NORMAL && this._renderFourOptionsBg()}
            {/* 正确错误,提示的效果显示 */}
            {isRight && this._renderCorrectBg()}
        </div>
    )
}
```



哈哈哈，get一个小技巧🤭





------



## 合理布局样式

最近在用react开发中，又get到一个小技巧，这里分享一下，我们经常会遇到布局，那么如何优雅的布局呢👇



举个例子🌰，拿到UI时，有三个按钮样式基本上一样，就是定位不同，那么我们可以这样子来写👇



```

// 三个按钮的基本样式
this._threeBaseStyle = Array(3).fill(null).map( (_, i) => {
  const left = (757 + i * (238 + 21)) * scale - leftCut
  return {
      position: 'absolute',
      width: 238 * scale,
      height: 59 * scale,
      top: 596 * scale,
      left,
      backgroundSize: '100% 100%',
  }
})

// 每个不同按钮的具体信息
this._threeOptionsStyle = [{
  top: 159 * scale,
  left: 1340 * scale - leftCut,
},{
  top: 253.6 * scale,
  left: 1431.4 * scale - leftCut,
},{
  top: 347.3 * scale,
  left: 1339.6 * scale - leftCut,
}]
```

在react中，我们定义好了这些数据后，应该如何去渲染呢👇

```react
_renderBottomEleBg() {
  const {
      _threeBaseStyle,
      _threeOptionsStyle,
      state: {
          isRight,
          userAnswer
      }
  } = this
  const _index = this._options.findIndex(e => e === userAnswer)
  return (
      <div>
          {
              _threeBaseStyle.map((el,i) => {
                  return (
                      <div 
                          key = {i} 
                          style = { {...el,..._threeOptionsStyle,backgroundImage:((isRight && _index === i) ? `url(${BOTTOM_CORRECT_BG})` : `url(${BOTTOM_PROMPT_BG})`)} }
                      >
                      </div>
                  )
              })
          }
      </div>
  )
}
```

合理的减少代码量，也算是开发中的一个小技巧吧🤭





-----------------



## 产生随机不重复id

当你有这个需求的时候，希望产生随机且不同的id时，这时，我们应该使用什么方式呢👇

有个不错的方式👉**随机数+时间戳**

1. 首先使用Math.random() 产生0~1之间的约16~17位的浮点数，再通过toString(36)方法缩短其位数。



```js
// 通常而言,这个n是自己定的
Math.random().toString(36).substr(2,n)  
```



2. 使用Date.now() 获取目前毫秒数，一共13位，同样可以通过这个toString(36)的方法缩短其位数。



```js
// n自己来规定大小

Date.now().toString(36).substr(0,n)

//Date.now().toString(36).substr(0,4)
```



那么他们两个组合在一起的话，应该就不可能有重复的啦👇

```js
Date.now().toString(36).substr(0,n) + Math.random().toString(36).substr(2,n)  
```



----------------



## 字符串xml的转换

你是不是遇到过在JavaScript中获取XML，但是得到的东西又不是你想要的东西呢，那么有没有更加简单的方法呢？ 接下来我们看看下面所提到的👇



**XML转字符串String**👇

```js
xmlToString = (new XMLSerializer()).serializeToString(xmlObject)
```



字符串转XML

```js
 stringToXML = (new DOMParser()).parseFromString(xmlString, "text/xml")
```



----------





## 快速取整数

在JavaScript中去整数的话，最常见的是`Math.round()`进行四舍五入，`Math.floor() `以及` Math.ceil() `等方法取整数。接下来还有一种去整数的方法👇

```
const value = 12 / 5 ｜ 0
// value = 2
```



## 将数组变成字符串

有时候，需要将数组按照一定的顺序连接起来，并且构造成字符串的⬇️

```
const value = [1,2,3,4,5,6,7,8,9,0]
value.join('')
// '123456789'

```



## 删除数组第一项

直接使用Array.prototype.shift() 删除第一项,并且返回该元素。




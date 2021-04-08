## 前言

这篇文章的话，分享一些最近使用 React 开发项目时，用到的小技巧,其实也算是 JavaScript 中的一些技巧吧，内容主要有一下几点 👇

- 产生随机不重复 id
- 快速取整数
- 合理布局样式
- 字符串 xml 的转换
- 特殊字符串的排序
- 获取数组的最大最小值
- 在条件中使用逻辑与或

---

## 快速取整数

在 JavaScript 中去整数的话，最常见的是`Math.round()`进行四舍五入，`Math.floor() `以及`Math.ceil()`等方法取整数。接下来还有一种去整数的方法 👇

```js
const num = Math.random() * 100;
console.log(parseInt(num)); // 常用方法
console.log(~~num); // “双按位非”操作符
console.log(num | 0); // 按位或
console.log(num ^ 0); // 按位异或
console.log(num << 0); // 左移操作符
```

这样子，也是一种很方便，而且很容易记住的方法来获取整数。

是不是 get 一个小技巧呢 🤭

---



## 优雅的向下取整

向下取整有很多种方式，做常用的，是调用Math的方法，如下图的例子

```js
const num = 3.23
const num1 = Math.floor(num);
console.log(num1); //3
```

那么优雅的方式是什么呢

```js
const num2 = num | 0
console.log(num2); //3
```



## 方法验证参数

JavaScript允许你设置默认参数并且进行验证。

```javascript
const isRequired = () => { throw new Error('param is required'); };
const print = (num = isRequired()) => { console.log(`printing ${num}`) };
print(2);//printing 2
print()// error
print(null)//printing null
```

使用此功能，我们可以实现一个简洁的技巧来验证您的方法参数。



## 从数组中删除伪造值(falsy)

在某些情况下，你可能需要从数组中删除falsy值。伪值是指JavaScript中的值，它的计算值为FALSE。在JavaScript中，只有6个falsy值，它们是:

- `undefined`
- `null`
- `NaN`
- `0`
- `“”` (empty string)
- `false`

我们可以使用函数过滤:

```javascript
myArray
    .filter(Boolean);
```

假设你想对你的数组对一些修改然后过滤新数组，可以这么做:

```javascript
myArray
    .map(item => {
        // Do your changes and return the new item
    })
    .filter(Boolean);
```



## 禁用右键单击

您可能希望阻止您的用户右键单击您的网页。虽然这是非常罕见的，但可能有几个实例需要此功能。

```html
<body oncontextmenu="return false">
    <div></div>
</body>

```



## 使用别名破坏

解构赋值语法是一种JavaScript表达式，它可以将数组中的值，或者对象中的属性解包到不同的变量中。我们可以不拘泥于现有的对象变量，而是按照自己的喜好重新命名它们。

```javascript
const object = { number: 10 };
// Grabbing number
const { number } = object;
// Grabbing number and renaming it as otherNumber
const { number: otherNumber } = object;
console.log(otherNumber); //10
```



## 数组混淆

```javascript
(arr) => arr.slice().sort(() => Math.random() - 0.5);
```







## 随机项

通过一个指定了最小值和最大值的范围来生成一个随机数：

```javascript
const getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};
console.log("Get random", getRandom(0, 10));
```



## 获取数组的最大最小值

这是最近遇到的一个小问题，当然了，求解这个问题不是难点，我觉得这是一个小技巧，所以就分享出来 👇

```js
const numbers = [1, 2, 3, 99, 4, 4, -1];
const maxNumber = Math.max.apply(Math, numbers);
const minNumber = Math.min.apply(Math, numbers);
```

---



## 特殊字符串的排序

最近在排序字母的时候，遇到一点小问题，这次把它给分享出来 👇

使用的是**localeCompare**这个函数，那它的返回值是哪些

首先，它返回一个数字表示是否 **引用字符串** 在排序中位于 **比较字符串** 的前面，后面，或者二者相同。

这个返回值有三个 👇

- 当 **引用字符串** 在 **比较字符串** 前面时返回 -1
- 当 **引用字符串** 在 **比较字符串** 后面时返回 1
- 相同位置时返回 0

举个例子 👇

```js
"a".localeCompare("c");
// 返回的值是 -1
"check".localeCompare("against");
// 返回的值是 1

"a".localeCompare("a");
// 返回的值是 0
```

掌握了基本的使用方法，排序数组就很简单了 👇

```
const strList = ['a','d','f','h','e']
strList.sort((a, b) => a.localeCompare(b))
console.log(strList)

// ["a", "d", "e", "f", "h"]
```

是不是 get 一个小技巧呢

---



## 在条件中使用逻辑与或

最近项目中，学会得一个小技巧，就是逻辑与或去渲染对应的场景，通过 state 中的 isRight 来更新答错答错的效果。

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

哈哈哈，get 一个小技巧 🤭

---



## 合理布局样式

最近在用 react 开发中，又 get 到一个小技巧，这里分享一下，我们经常会遇到布局，那么如何优雅的布局呢 👇

举个例子 🌰，拿到 UI 时，有三个按钮样式基本上一样，就是定位不同，那么我们可以这样子来写 👇

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

在 react 中，我们定义好了这些数据后，应该如何去渲染呢 👇

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

合理的减少代码量，也算是开发中的一个小技巧吧 🤭

---

## 产生随机不重复 id

当你有这个需求的时候，希望产生随机且不同的 id 时，这时，我们应该使用什么方式呢 👇

有个不错的方式 👉**随机数+时间戳**

1. 首先使用 Math.random() 产生 0~1 之间的约 16~17 位的浮点数，再通过 toString(36)方法缩短其位数。

```js
// 通常而言,这个n是自己定的
Math.random().toString(36).substr(2, n);
```

2. 使用 Date.now() 获取目前毫秒数，一共 13 位，同样可以通过这个 toString(36)的方法缩短其位数。

```js
// n自己来规定大小

Date.now().toString(36).substr(0, n);

//Date.now().toString(36).substr(0,4)
```

那么他们两个组合在一起的话，应该就不可能有重复的啦 👇

```js
Date.now().toString(36).substr(0, n) + Math.random().toString(36).substr(2, n);
```

---



## 字符串 xml 的转换

你是不是遇到过在 JavaScript 中获取 XML，但是得到的东西又不是你想要的东西呢，那么有没有更加简单的方法呢？ 接下来我们看看下面所提到的 👇

**XML 转字符串 String**👇

```js
xmlToString = new XMLSerializer().serializeToString(xmlObject);
```

字符串转 XML

```js
stringToXML = new DOMParser().parseFromString(xmlString, "text/xml");
```

---



## 将数组变成字符串

有时候，需要将数组按照一定的顺序连接起来，并且构造成字符串的 ⬇️

```
const value = [1,2,3,4,5,6,7,8,9,0]
value.join('')
// '123456789'

```



## 删除数组第一项

直接使用 Array.prototype.shift() 删除第一项,并且返回该元素。



## 在数组开头添加几项

首先，我们想到数组的 unshift 方法

```js
const demo = ["day", "day", "up", "up"];

demo.unshift("you", "should");
```

或者我们可以想到另外一个方法 splice

```js
demo.splice(0, 0, "you", "should");
```



## 一行代码获取 url 参数

```js
const getParam = (url, param) => new URLSearchParams(new URL(url).search).get(param);

// 例子
getParam('http://domain.com?message=hello', 'message');     // 'hello'
```





## 字符串集锦

### 字符串的反转

借助的就是 split reverse join 三个方法

- 字符串变数组 split
- 数组原型上 reverse 反转
- join 变成字符串

```
let name = 'daydaylee Up Up'
const resultName = name.split('').reverse().join('')
```

## 创建一个二维数组

当我们创建一个数组时，会这样子 ⬇️

```js
Array(len).fill(0);
```

我们类比一下，如果用上述的方式，创建一个二维数组的话,如下 ⬇️

```js
Array(len).fill(Array(len).fill(0));
// 如果你实践过的话,肯定会明白，这样子创建的话,会带来一些影响的
// 这样子的话,数据的每一项其实存的都是引用类型，也就是说，他们指向的内存地址都是相同的

Array.from(new Array(len, () => new Array(len).fill(0)));
```

所以我们推荐下面的方式 ⬇️

```js
Array.from(new Array(len, () => new Array(len).fill(0)));
// 这样子的话，保证了数组的每一项都是不同的对象
```

## for of 和 for in 的区别

1. 推荐在循环对象属性的时候，使用`for...in`,在遍历数组的时候的时候使用`for...of`。
2. `for...in`循环出的是 key，`for...of`循环出的是 value
3. 注意，`for...of`是 ES6 新引入的特性。修复了 ES5 引入的`for...in`的不足
4. `for...of`不能循环普通的对象，需要通过和`Object.keys()`搭配使用

如果实在想用`for...of`来遍历普通对象的属性的话，可以通过和`Object.keys()`搭配使用，先获取对象的所有 key 的数组,然后遍历：

```js
const student = {
  name: "wujunchuan",
  age: 22,
  locate: {
    country: "china",
    city: "xiamen",
    school: "XMUT",
  },
};
for (var key of Object.keys(student)) {
  //使用Object.keys()方法获取对象key的数组
  console.log(key + ": " + student[key]);
}
```

[点击这里](https://segmentfault.com/q/1010000006658882)

## 返回字符的 Unicode 编码





## 合并多个对象

我曾有过几次需要合并两个或多个类的情况，这是我常用的方法。

```javascript
const user = { 
 name: 'John Ludwig', 
 gender: 'Male' 
 };
const college = { 
 primary: 'Mani Primary School', 
 secondary: 'Lass Secondary School' 
 };
const skills = { 
 programming: 'Extreme', 
 swimming: 'Average', 
 sleeping: 'Pro' 
 };
const summary = {...user, ...college, ...skills};
```


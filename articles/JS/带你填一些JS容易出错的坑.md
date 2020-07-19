

### 前言

> 漫漫编程路，总有一些坑让你泪流满面。



### [1,2,5,10].sort()

不写回调函数的话，是按照什么排序呢？

JavaScript默认使用字典序(alphanumeric)来排序。因此结果是[1,10,2,5]

正确排序的话，应该[1,2,5,10].sort( (a,b) => a-b )



### "b" + "a" + +"a" + "a"

你认为输出是什么？

上面的表达式相当于'b'+'a'+ (+'a')+'a'，因为（+'a'）是NaN，所以：

'b'+'a'+ (+'a')+'a' = 'b'+'a'+ "NaN"+'a'='baNaNa'



### 闭包

这是一个经典JavaScript面试题

```js
		let res = new Array()
        for(var i = 0; i < 10; i++){
            res.push(function(){
                return console.log(i)
            })
        }
        res[0]() 
        res[1]()
        res[2]()
```

期望输出的是0,1,2,实际上却不会。原因就是涉及**作用域**，怎么解决呢？

- [x] 使用let代替var，形成块级作用域
- [x] 使用bind函数。

```
res.push(console.log.bind(null, i))
```

解法还有其他的，比如使用IIFE，形成私有作用域等等做法。

### 又一经典闭包问题

```
function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,?,?,?
var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?
```

**留给你们思考**





### 隐式转换

```
var a = [0];
if (a) {
  console.log(a == true);
} else {
  console.log("wut");
}
```

你们觉得答案是多少呢？这题涉及到隐式转换了，这个坑我自己的好好补一补

// 答案：false



**再来一道？**

```js
function fn() {
    return 20;
}
console.log(fn + 10); // 输出结果是多少
```

```js
function fn() {
    return 20;
}
fn.toString = function() {
    return 10;
}
console.log(fn + 10);  // 输出结果是多少？
```



```
function fn() {
    return 20;
}

fn.toString = function() {
    return 10;
}

fn.valueOf = function() {
    return 5;
}

console.log(fn + 10); // 输出结果是多少？
```

**说到底JS类型转换的好好补一补了**



### 你真的理解操作符吗

```
[1<2<3,3<2<1]
//[false,false]
//[true,true]
//[false,true]
//[true,false]
```

选一个吧，比较操作符，赋值运算符优先级哪个更高呢？

### 0.1+0.2  !== 0.3  ?

面试的时候，问你这个问题，要是回答错误的话，估计面试官对基础很是怀疑！！！

问你这个题目的时候，你可以牵扯出很多问题，比如JS如何存储小数的呢？比如聊一聊二进制，比如实际开发中，遇到精度的问题，你是怎么解决的，你有什么好办法。

聊完这个，你可以牵扯出最大安全数，比如JavaScript的最大安全整数是多少，超出这个范围的话，怎么解决精度问题呢？

ES规范中新提出的BigInt解决了什么问题呢，你又发现了BigInt中哪些坑呢？



如何解决精度问题呢？

这里推荐[Number-Precision](https://github.com/nefe/number-precision)库，不到1K的体积。





### arguments

```js
		function sidEffecting(ary) {
            ary[0] = ary[2];
        }
        function bar(a, b, c) {
            c = 10
            sidEffecting(arguments);
            return a + b + c;
        }
        function demo (arg) {
            arg.name = 'new Name'
        }
        console.log(bar(2, 2, 2))
```

涉及到ES6语法，这题答案肯定都会做是22，但是呢，稍微改变一下题目，就比较坑了….

```
		function sidEffecting(ary) {
            ary[0] = ary[2];
        }
        function bar(a, b, c = 4) {
            c = 10
            sidEffecting(arguments);
            return a + b + c;
        }
        function demo (arg) {
            arg.name = 'new Name'
        }
        console.log(bar(2, 2, 2))
```

这个答案是多少呢？根据MDN上对argument有更加准确的定义，看[argument](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)

> 当非严格模式中的函数**有**包含[剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)、[默认参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters)和[解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)，那么`arguments`对象中的值**不会**跟踪参数的值（反之亦然）。

找到这句话，bar函数存在默认参数，并且在非严格模式下，所以不会跟踪参数的值，自然结果就14

**请读者细细体会**



### 浏览器懵逼史

```js
		let demo1 = {class: "Animal", name: 'sheet'};
        console.log(demo1.class)
```

比较流氓，这个跟浏览器相关，class是保留字（现在的话，class是关键字），答案并不要紧，重要的是自己在取属性名称的时候尽量避免保留字. 如果使用的话请加引号 a['class']。

**保留字vs关键字**

个人理解的话，关键字就是有特殊含义的，不用用作变量名。比如

```
let class = 123;
```

现在看来肯定报错，那有什么需要我们注意的呢？

```
let undefined = 123;
```

这样子并不会报错，这个跟浏览器有点关系，这样子看来undefined不是关键字。所以为了保险起见，**建议大家在判断一个变量是不是未定义的话，尽量使用void 0 === undefined** 很有可能undefined会被当作是变量来赋值

**void 0 值就是undefined**







### ["1", "2", "3"].map(parseInt)

这个应该是经常遇见的题了，搞明白很简单，map函数怎么使用，parseInt函数怎么使用

关于Array数组的话，我之前写了一篇文章，从**源码角度解析大部分方法**

点进去重温一遍：[[干货👍]从详细操作js数组到浅析v8中array.js](https://juejin.im/post/5f02e7725188252e8272cd47) 

map接受两个参数，一个callback，一个this，即调用函数时this指向，其中callback回调函数是三个参数，一个currentValue，index，array；

parseInt接受两个参数：string,radix(基数)

返回NaN有两种情况

- `radix` 小于 `2` 或大于 `36` ，或
- 第一个非空格字符不能转换为数字。
- 当radix是0或者undefined时，又是特殊情况，具体异步[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

```
parseInt('1', 0);
parseInt('2', 1);
parseInt('3', 2);
```

两者结合的话，结果自然很明显，[1,NaN,NaN]



### Math.min() 为什么比 Math.max() 大？

```
  Math.min() < Math.max() // false
```

按照常规思路的话，应该是true，毕竟最小值应该小于最大值，但是实际情况是false

原因：

- Math.min 的参数是 0 个或者多个。如果是多个参数很容易理解，返回参数中最小的。
- 如果是0个参数，或者没有参数，则返回 **Infinity**。
- 而 Math.max() 没有传递参数时返回的是 -Infinity。

要是面试官问这个问题，额。。。。



### [].concat[1,2,3]

输出是什么?注意不是[].concat([1,2,3])

```
// [1,2,3]

// Uncaught SyntaxError: ....

// undefined
```

答案是undefined，原因是什么呢？

1. 第一步计算[].concat,结果是Array.prototype.concat

2. 第二步执行一个逗号操作符，逗号操作符对它的每个操作对象求值（从左至右），然后返回最后一个操作对象的值。

   ```
   >1,2,3
   返回3
   ```

3. 第三步执行一个数组访问运算或属性访问运算

所以上面[].concat[1,2,3] 等价于Array.prototype.concat[3]

那么结果自然就是 `undefined`。



### [1,2,NaN,3].indexOf(NaN)

//2 or -1

- indexOf方法会进行严格相等判断
- NaN !== NaN

怎么办呢？

```js
let realIsNaN = value => typeof value === 'number' && isNaN(value);
```

先要判断类型，是因为字符串转换会先转换成数字，转换失败为 NaN。所以和 NaN 相等。

```
isNaN('jjjj') —> true
```

第二种方法

```
let realIsNaN = value => value !== value;
```



### Number.isFinite & isFinite

```
Number.isFinite('0') === isFinite('0')

Number.isFinite(0) === isFinite('0')
```

打印结果是什么，能不能具体说一说？

> Number.isFinite()检测有穷性的值，唯一和全局isFinite()函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回 `true`。

自然答案就是 false,true





### 一道容易被人轻视的面试题

```
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

```



### push方法

```js
let newList = [1,2,3].push(4)
console.log(newList.push(4))
```

认为输出什么？

// Error

原因在于Array.prototype.push()返回的是新数组的长度，所以呢4.push(5)自然Error

-------



### 7.13更新一波



### 自动分号插入

```js
function foo1()
{
 return {
     bar: "hello"
 };
}

function foo2()
{
 return
 {
     bar: "hello"
 };
}
var a=foo1();
var b=foo2();
console.log(a) //Object {bar: "hello"}
console.log(b) //underfind
//仔细看就知道了
// 会在第10行加入一个`;`
```

会在第10行自动加一个分号; 所以返回的就是undefined



---



### let var

```js
function foo() {
let a = b = 0;
a++;
return a;
}
foo();
typeof a; // => ???
typeof b; // => ???

```

上面的let a = b = 0; 等价于 window.b  = 0, let a = b;



----



### 眼力题

```
const length = 4;
const numbers = [];
for (var i = 0; i < length; i++);{
  numbers.push(i + 1);
}

numbers; // => ???
```

唯一需要注意的就是`for语句`后面带了`;`沙雕题

加了`;`，会认为for执行完，所以指定的都是空语句，最后numbers为[5]

----



### 获取字符串中特定索引字符

```js
console.log('Hello World'[4])
```

使用的就是方括号表示法获取字符串特定索引的字符，值得注意的是，IE7低版本使用的是charAt()

所以这题输出o

----



### !==

```
const name = 'TianTianUp'
console.log(!typeof name === 'string')
console.log(!typeof name === 'object')
```

typeof name 返回的是 ’string‘, 字符串’string‘是一个truthy值。因此！typeof name 返回一个布尔值false。所以

false === ’string'  

和 false === ’object‘返回false

(检测一个类型的值话，我们应该使用 !==而不是!typeof)

---



### forEach

```
const nums = [1, 2, 3, 4, 5, 6];
let firstEven;
nums.forEach(n => {
  if (n % 2 ===0 ) {
    firstEven = n;
    return n;
  }
});
console.log(firstEven);
```

唯一需要注意的就是forEach源码是怎么写的，看过源码的都知道，forEach使用return是不能中止循环的，或者说每一次调用callback函数，终止的是当前的一次，而不是整个循环。

结果自然就是6

------



### 7.19更新一波

### 你真的了解作用域吗

```
		var a = 0,  
            b = 0;
        function A(a) {
            A = function (b) {
                console.log(a + b++)
            }
            console.log(a++)
        }
        A(1)
        A(2)
```

留给你们思考，我可是第一遍就做错了(；′⌒`)

**答案 1 4**

### 三元运算符

```
var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');
```

```
答案：Something
解析：字符串连接比三元运算有更高的优先级 
     所以原题等价于 'Value is true' ? 'Somthing' : 'Nonthing' 
     而不是 'Value   is' + (true ? 'Something' : 'Nonthing')
巩固：
    1 || fn() && fn()   //1  
    1 || 1 ? 2 : 3 ;    //2  
```

### 原型

```
var a = {}, b = Object.prototype;
[a.prototype === b, Object.getPrototypeOf(a) === b] 
```

执行结果是多少呢

```
答案：false, true
解析：Object 的实例是 a，a上并没有prototype属性
     a的__poroto__ 指向的是Object.prototype，也就是Object.getPrototypeOf(a)。a的原型对象是b
```

### 原型II

```
function f() {}
var a = f.prototype, b = Object.getPrototypeOf(f);
a === b         
```

这段代码的执行结果？

```
答案：false
解析：a是构造函数f的原型 ： {constructor: ƒ}
b是实例f的原型对象 ： ƒ () { [native code] }
```

### 函数名称

```
function foo() { }
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name]     
```

代码执行结果是什么？

```
答案：["foo", "foo"]
解析：函数的名字不可变.
```

### [typeof null, null instanceof Object]

```
答案：["object", false]
解析：null代表空对象指针，所以typeof判断成一个对象。可以说JS设计上的一个BUG
     instanceof 实际上判断的是对象上构造函数，null是空当然不可能有构造函数
巩固：null == undefined //true    null === undefined //flase
```







### 持续更新中

有不错的题目，或者是JS中容易出错的坑，掘金网友可以提出来❤️，我会更新的啦🆗



## ❤️ 感谢大家

如果你觉得这篇内容对你挺有有帮助的话：

1. 点赞支持下吧，让更多的人也能看到这篇内容（收藏不点赞，都是耍流氓 -_-）

2. 欢迎在留言区与我分享你的想法，也欢迎你在留言区记录你的思考过程。

3. 觉得不错的话，也可以看看往期文章：

    [[[诚意满满👍]Chrome DevTools调试小技巧，效率➡️🚀🚀🚀](https://juejin.im/user/5ef326ab6fb9a07ebe237664/posts)
    
   [[干货👍]从详细操作js数组到浅析v8中array.js](https://juejin.im/post/5f02e7725188252e8272cd47)

   [[1.2W字👍]写给女友的秘籍-浏览器工作原理（上）篇](https://juejin.im/post/5f007d32f265da22b64936bf)

   [[1.1W字]写给女友的秘籍-浏览器工作原理（渲染流程）篇](https://juejin.im/post/5f05d12a5188252e8406e37b)

   [[建议👍]再来100道JS输出题酸爽继续（共1.8W字+巩固JS基础）](https://juejin.im/post/5efb4ca5f265da23016c5c80)

   [[诚意满满✍]带你填一些JS容易出错的坑](https://juejin.im/post/5f0884c9e51d453462004fae)
Js中error处理

- Error 所有错误的父类型
- ReferenceError 引用变量不存在
- TypeError 数据类型不存在
- RangeError 数据值不在允许范围内
- SyntaxError 语法错误

错误处理

- 捕获对象 try catch
- 抛出错误 throw error

错误对象

- message属性 错误相关信息
- stack属性 函数调用栈记录信息

异步编程

- callback（回调函数）
- generator + co库
- Promise
- async + await

### Promise理解和使用

1. Promise是什么
2. 为什么使用Promise
3. 如何使用Promise

### Promise是什么

1. 抽象表达:Promise是JS中进行异步编程的新的解决方案
2. 具体表达：语法上，Promise是一个构造函数。
3. 功能上说：Promise对象是用来封装一个异步操作并可以获取其结果

#### Promise的状态改变

1. pending变为resolved
2. pending变为rejected
3. 说明：只有这两种，且一个Promise对象只能改变一次，无论变为成功还是失败，都会有一个结果数据。成功的结果数据一般称为value，失败的结果一般称为reson

### 为什么要用Promise 优点是什么

- 1. 指定回调函数方式更加灵活，灵活的方面指的就是时间上面的问题。旧的方式必须启动异步任务前就指定，Promise可以在启动异步任务之后，或者说比如请求一个数据，三秒内可以获取结果，可是我们可以在5秒后在指定这个回调函数，去完成对应的任务。
- 支持链式调用，可以解决回调地狱问题。
- 回调地狱：回调函数嵌套调用，外部回调函数异步执行的结果是内部嵌套函数执行的条件。
- 回调地狱缺点：不方便阅读，不便于异常处理。
- 比如多个串联异步任务，第二个异步任务条件是第一个异步任务成功的结果。

终极解决方案：async/await

### 如何使用Promise

#### 对应的API：

##### Promise构造函数： Promise（excutor）{}

1. excutor函数：同步执行 （resolve,reject) => {}
2. resolve函数：内部定义成功时我们调用的函数 value =>{}
3. reject函数：内部定义失败时我们调用的函数 reson =>{}
4. 说明：excutor会在Promise内部立即同步回调，异步操作在执行器中执行

##### Promise.prototype.then()方法：（onResolved,onRejected) => {}

1. onResolved函数：成功的回调函数(value) => {}
2. onRejected函数： 失败的回调函数(reson) =>{}
3. 说明：它最多需要有两个参数：Promise 的成功和失败情况的回调函数。最后放回一个Promise对象

##### Promise.prototype.catch(onRejected)方法:

1. **catch()** 方法返回一个[Promise](https://developer.mozilla.org/zh-CN/docs/Web/API/Promise)，并且处理拒绝的情况。
2. **catch()** 方法返回一个[Promise](https://developer.mozilla.org/zh-CN/docs/Web/API/Promise)，并且处理拒绝的情况。它的行为与调用[`Promise.prototype.then(undefined, onRejected)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 相同。 

2. 当Promise 被rejected时,被调用的一个[`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Function)。 该函数拥有一个参数：`reason`    rejection 的原因。

##### Promise.resolve(value)方法:

1. 静态方法 `Promise.resolve`返回一个解析过的`Promise`对象。

2. value:将被`Promise`对象解析的参数，也可以是一个`Promise`对象，或者是一个thenable。

3. 返回值：返回一个带着给定值解析过的`Promise`对象，如果参数本身就是一个`Promise`对象，则直接返回这个`Promise`对象。

##### Promise.reject(reason)方法:

1. `**Promise.reject()**`方法返回一个带有拒绝原因的`Promise`对象。

2. reason：表示`Promise`被拒绝的原因。
3. 返回值：一个给定原因了的被拒绝的Promise对象
4. 描述：静态函数`Promise.reject`返回一个被拒绝的`Promise对象`。通过使用[`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)的实例获取错误原因`reason`对调试和选择性错误捕捉很有帮助。

Promise.all(**iterable**)方法:

1. 返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 实例，此实例在 `iterable` 参数内所有的 `promise` 都“完成（resolved）”或参数中不包含 `promise` 时回调完成（resolve）；如果参数中  `promise` 有一个失败（rejected），此实例回调失败（reject），失败的原因是第一个失败 `promise` 的结果。

2. 参数 iterable：一个[可迭代](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)对象，如 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array) 或 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)。
3. 它通常在启动多个异步任务并发运行并为其结果创建承诺之后使用，以便人们可以等待所有任务完成。
4. 放回值：
   1. 如果传入的参数是一个空的可迭代对象，则返回一个**已完成（already resolved）**状态的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。
   2. 如果传入的参数不包含任何 `promise`，则返回一个**异步完成（asynchronously resolved）** [`Promise`]
   3. 其它情况下返回一个**处理中（pending）**的[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。这个返回的 `promise` 之后会在所有的 `promise` 都完成或有一个 `promise` 失败时**异步**地变为完成或失败。

##### Promise.race(**iterable**)方法:

1. 返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

2. **iterable** 可迭代对象，类似[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)。
3. 放回值：一个**待定的** [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 只要给定的迭代中的一个promise解决或拒绝，就采用第一个promise的值作为它的值，从而**异步**地解析或拒绝（一旦堆栈为空）。



### Promise几个关键问题

1. 如何改变Promise的状态
   - resolve(value):如果当前是pending就会变为resolved
   - reject(reason):如果当前是pending就会变为rejected
   - 抛出异常：如果当前是pending就会变为rejected
2. 一个Promise指定多个成功/失败回调函数，都会调用吗？
   1. 当Promise改变为对应状态时都会调用
3. 改变Promise状态和指定回调函数谁先谁后？
   1. 都有可能，正常情况下是先指定回调再改变状态，但也有可能先改变状态再指定回调函数。
   2. 如何先改变状态再指定回调呢？
      1. 在执行器中直接调用resolve() / reject()
      2. 延迟更长时间去调用then()
   3. 什么时候才能得到数据
      1. 如果先指定回调,那当状态改变时,回调函数调用，得到数据
      2. 如果是先改变状态,那当指定回调时,回调函数就会调用，得到数据。
4. Promise.then() 返回的新Promise的结果状态由什么决定
   1. 简单表达：由then()指定的回调函数执行的结果决定
   2. 详细表达：
      1. 如果抛出异常，新Promise变为rejected,reason为抛出的异常，抛出err，则reason就是err，抛出数值，也就是数值
      2. 如果返回的时非Promise任意值,新Promise状态就是resolve,value就是返回值
      3. 如果返回的时另一个新Promise,此Promise的结果就是新Promise结果
5. Promise如何串连多个操作任务
   1. Promise的then()返回一个新Promise,可以看成then的链式调用
   2. 通过then链式调用串连多个同步/异步任务
   3. 值得注意的是:在then()中实现异步任务的话，需要new Promise()将异步代码包裹起来
6. Promise异常穿透
   1. 当使用Promise的then链式调用时,可以在最后指定失败的回调。
   2. 前面任何操作出现了异常，会传到最后失败的回调中处理，有时候,then( value => {})不指定失败的回调函数,是因为默认给你加上then(value =>{}, reason => {throw reason})
7. 中断Promise链
   1. 当使用Promise的then链式调用时,在中间中断,不在调用后面的回调函数
   2. 办法:在回调函数中return new Promise(() => {})



### 自定义Promise(手写)

#### 整体结构

```javascript
/**
自定义Promise函数模块:IIFE
 */

(function(window){

    /**
     * Promise构造函数
     * executor 执行器函数
     * @param {*} executor 
     */
    function Promise(executor) {

    }
    /**
     * Promise原型对象的then()
     * 指定成功和失败的回调函数
     * 返回一个新的promise对象
     */
    Promise.prototype.then = function (onSolved, onRejected){

    }

    /**
     * Promise原型对象上的catch()
     * 指定失败的回调函数
     * 返回一个新的promise对象
     */
    Promise.prototype.catch = function (onRejected) {

    }

    /**
     * Promise函数对象上resolve方法
     * 返回一个成功的Promise,值为value
     */
    Promise.resolve = function(value) {

    }

    /**
     * Promise函数对象上reject方法
     * 返回一个失败的Promise,值为reason
     */
    Promise.reject = function(reason) {

    }

    /**
     * Promise函数对象上all方法
     * 返回一个promise,只有当所有的promise都成功才为成功状态,否则为失败
     */
    Promise.all = function(promises) {

    }

    /**
     * Promise函数对象上race方法
     * 返回一个promise对象,其结果取决于第一个完成的Promise
     */
    Promise.race = function(promises) {

    }
    window.Promise = Promise;
})(window)
```

#### 构造函数完善

```js
function Promise(executor) {

        this.status = 'pending'  //给每个Promise指定status属性,初始值为pending
        this.data = undefined    // 给每个对象指定一个用于存储结果的属性
        this.callbacks = []        //每个元素的结构: {onResolved() {}, onRejected() {}}

        function resolve(value) {
            // 当前状态不是pending 直接中断
            if(this.status !== 'pending') return 
            this.status = 'resolved'   //状态改为resolve
            this.data = value        //保存value

            //  如果有待执行callback函数,立即异步执行回调函数onRejected
            if(this.callbacks.length > 0) {    //模拟异步操作放入队列中
                setTimeout(()=>{
                    this.callbacks.forEach(calbacksObj => {
                        calbacksObj.onSolved(value);
                    })
                })
            }
        }

        function reject(reason) {

            // 当前状态不是pending 直接中断
            if(this.status !== 'pending') return 
            this.status = 'rejected'   //状态改为rejected
            this.data = reason        //保存reason

            //  如果有待执行callback函数,立即异步执行回调函数onRejected
            if(this.callbacks.length > 0) {    //模拟异步操作放入队列中
                setTimeout(()=>{
                    this.callbacks.forEach(calbacksObj => {
                        calbacksObj.onRejected(reason);
                    })
                })
            }
        }


        try {
            executor(resolve, reject);
        } catch (error) {   // 如果执行器抛出异常,Promise对象变为rejected状态
            reject(error)
        }   
        
    }
```

#### 完善then方法

1. 唯一的难点就是then返回的是一个新的Promise，返回的状态由指定的回调函数所决定的，所以我们需要new Promise() 包裹
2. 对于状态为onReolved和onRejected时，需要调用setTimeout去模拟异步任务。

```js
/**
     * Promise原型对象的then()
     * 指定成功和失败的回调函数
     * 返回一个新的promise对象
     */
    Promise.prototype.then = function (onSolved, onRejected) {
        const self = this;
        // 返回一个新的Promise
        return new Promise((resolve, reject) => {
            if (self.status === 'pending') {
                this.callbacks.push({
                    onSolved,
                    onRejected
                })
            }else if (self.status === 'resolved') {  //then中回调函数都要异步执行，所有使用setTimeout模拟
                setTimeout(() => {
                    /**
                     * 1. 如果抛出异常，return promise就失败
                     * 2. 如果回调函数执行返回非Promise,return的Promise成功,value就是返回的值
                     * 3. 如果回调函数执行返回是Promise,return的Promise结果就是这个Promise结果
                     */
                    try {
                        const result = onSolved(self.data)
                        if(result instanceof Promise){ //第三种情况
                            // result.then(
                            //     value => resolve(value),
                            //     reason => reject(reason)
                            // )
                            result.then(resolve,reject)  //上面三行代码简洁写法

                        }else {     //第二种情况
                            resolve(result)
                        }
                    } catch(error) { // 第一种情况
                        reject(error)
                    }
                })
            } else {
                setTimeout(() => {
                    try {
                        const result = onRejected(self.data)
                        if(result instanceof Promise){ //第三种情况
                            // result.then(
                            //     value => resolve(value),
                            //     reason => reject(reason)
                            // )
                            result.then(resolve,reject)  //上面三行代码简洁写法

                        }else {     //第二种情况
                            resolve(result)
                        }
                    } catch(error) { // 第一种情况
                        reject(error)
                    }
                })
            }
        })
    }
```

#### 代码优化then以及优化功能

```js
Promise.prototype.then = function (onSolved, onRejected) {
        
        // 指定默认失败回调函数(实现错误/异常穿透的关键点)
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}   //向后传递失败的reason
        onSolved = typeof onSolved === 'function' ? onSolved : value => value   //向后传递成功的value
        
        const self = this;
        // 返回一个新的Promise
        return new Promise((resolve, reject) => {

            function handle(callback){
                /**
                     * 1. 如果抛出异常，return promise就失败
                     * 2. 如果回调函数执行返回非Promise,return的Promise成功,value就是返回的值
                     * 3. 如果回调函数执行返回是Promise,return的Promise结果就是这个Promise结果
                     */
                    try {
                        const result = callback(self.data)
                        if(result instanceof Promise){ //第三种情况
                            // result.then(
                            //     value => resolve(value),
                            //     reason => reject(reason)
                            // )
                            result.then(resolve,reject)  //上面三行代码简洁写法

                        }else {     //第二种情况
                            resolve(result)
                        }
                    } catch(error) { // 第一种情况
                        reject(error)
                    }
            }
            if (self.status === 'pending') {
                this.callbacks.push({
                    onSolved(value) {
                        handle(onSolved)
                    },
                    onRejected(reason) {
                        handle(onRejected);
                    }
                })
            }else if (self.status === 'resolved') {  //then中回调函数都要异步执行，所有使用setTimeout模拟
                setTimeout(() => {
                    handle(onSolved);
                })
            } else {
                setTimeout(() => {
                    handle(onRejected);
                })
            }
        })
    }
```

#### Promise.resolve() / reject() 实现

唯一需要注意的就是resolve方法返回的Promise可能失败的也可能时成功状态的Promise

```js
Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            if(value instanceof Promise){
                value.then(resolve,reject);
            }else{
                resolve(value);
            }
        })
    }
```

```js
Promise.reject = function (reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
```

#### Promise.all() / race() 实现

对于all方法中保存结果的数组,不能使用push方法,这是因为Promise委托的是异步的任务,如果使用push的话,一开始存入的顺序就会打乱，你也不知道具体哪个Promise任务先执行好,所以按照数组的顺序保存结果最好，也就是下面的代码

```js
values[index] = value
```

```js
Promise.all = function (promises) {
        
        // 保存成功状态Promise结果
        const values = new Array(promises.length);
        // 计数成功状态的次数
        let resolvedCount = 0;
        return new Promise((resolve, reject) => {
            promises.forEach((obj,index) => {
                Promise.resolve(obj).then(
                    value => {
                        // 计算进入resolved状态数量,同时values数组保存的是成功状态结果
                        resolvedCount++
                        values[index] = value
                        if( resolvedCount === promises.length)
                            resolve(values)
                    },
                    reason => {
                        reject(reason);
                    }
                )
            })
        })
    }
```



```js
Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((obj, index) => {
                Promise.resolve(obj).then(          //小优化,这样子数组中元素是非Promise也行
                    value => resolve(value),
                    reason => reject(reason)
                )
            })
        })
    }
```

### 面试题



```js
setTimeout(() => {
            console.log(0);
        },0)
        new Promise((resolve, reject) => {
            console.log(1)
            resolve()
        }).then(()=>{
            console.log(2)
            new Promise((resolve, reject) => {
                console.log(3)
                resolve()
            }).then(() => {
                console.log(4)
            }).then(()=>{
                console.log(5)
            })
        }).then(() => {
            console.log(6)
        })

        new Promise((resolve, reject)=>{
            console.log(7)
            resolve();
        }).then(() => {
            console.log(8);
        })
// 1 7 2 3 8 4 6 5 0
```

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once')
    resolve('success')
  }, 1000)
})

const start = Date.now()
promise.then((res) => {
  console.log(res, Date.now() - start)
})
promise.then((res) => {
  console.log(res, Date.now() - start)
})
// once
// success 1001
// success 1005
```

```js
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
// then:  Error: error!!!
```


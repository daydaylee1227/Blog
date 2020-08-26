// 深拷贝

function deepClone(obj, map = new WeakMap()) {
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);

    if (obj == null || typeof obj != 'object') return obj;
    if (map.has(obj)) {
        return map.get(obj);
    }
    let t = new obj.constructor();
    map.set(obj, t);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            t[key] = deepClone(obj[key], map);
        }
    }
    return t;
}
//测试用例
let obj = {
    a: 1,
    b: {
        c: 2,
        d: 3
    },
    d: new RegExp(/^\s+|\s$/g)
}

let clone_obj = deepClone(obj)
obj.d = /^\s|[0-9]+$/g
console.log(clone_obj)
console.log(obj)


// 函数柯里化

let currying = (fn, ...args) =>
    fn.length > args.length ?
        (...arguments) => currying(fn, ...args, ...arguments) :
        fn(...args)

let addSum = (a, b, c) => a + b + c
let add = curry(addSum)
console.log(add(1)(2)(3))
console.log(add(1, 2)(3))
console.log(add(1, 2, 3))


// 函数防抖节流

function throttle(fn, delay) {
    let flag = true,
        timer = null
    return function (...args) {
        let context = this
        if (!flag) return

        flag = false
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
            flag = true
        }, delay)
    }
}

function debounce(fn, delay) {
    let timer = null
    return function (...args) {
        let context = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}





// 手写一个sleep
function sleep(fn, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fn);
        }, time);
    });
}
let saySomething = (name) => console.log(`hello,${name}`)
async function autoPlay() {
    let demo = await sleep(saySomething('TianTian'), 1000)
    let demo2 = await sleep(saySomething('李磊'), 1000)
    let demo3 = await sleep(saySomething('掘金的好友们'), 1000)
}
autoPlay()

// 实现Promise.all 以及 race

Promise.myall = function (arr) {
    return new Promise((resolve, reject) => {
        if (arr.length === 0) {
            return resolve([])
        } else {
            let res = [],
                count = 0
            for (let i = 0; i < arr.length; i++) {
                // 同时也能处理arr数组中非Promise对象
                if (!(arr[i] instanceof Promise)) {
                    res[i] = arr[i]
                    if (++count === arr.length)
                        resolve(res)
                } else {
                    arr[i].then(data => {
                        res[i] = data
                        if (++count === arr.length)
                            resolve(res)
                    }, err => {
                        reject(err)
                    })
                }

            }
        }
    })
}

Promise.myrace = function (arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            // 同时也能处理arr数组中非Promise对象
            if (!(arr[i] instanceof Promise)) {
                Promise.resolve(arr[i]).then(resolve, reject)
            } else {
                arr[i].then(resolve, reject)
            }

        }
    })
}

// 测试用例
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(11)
    }, 2000);
});
let p2 = new Promise((resolve, reject) => {
    reject('asfs')

});
let p3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(33);
    }, 4);
});

Promise.myall([p3, p1, 3, 4]).then(data => {
    // 按传入数组的顺序打印
    console.log(data); // [3, 1, 2]
}, err => {
    console.log(err)
});

Promise.myrace([p1, p2, p3]).then(data => {
    // 谁快就是谁
    console.log(data); // 2
}, err => {
    console.log('失败跑的最快')
})

// Promise allSetted
Promise.mySettled = function (arr) {
    return new Promise((resolve, reject) => {
        let res = []
        for (let i = 0; i < arr.length; i++) {
            if ((arr[i] instanceof Promise)) {
                arr[i].then((data) => {
                    res[i] = {
                        "status": 'fulfiled',
                        "value": data
                    }
                }, err => {
                    res[i] ={
                        "status": 'rejected',
                        "reason": err
                    }
                })
            } else {
                res[i] ={
                    "status": 'fulfiled',
                    "value": arr[i]
                }
            }
        }
        resolve(res)
    })
}


// 实现reduce
Array.prototype.myreduce = function(fn, initVal) {
    let result = initVal,
        i = 0;
    if(typeof initVal  === 'undefined'){
        result = this[i]
        i++;
    }
    while( i < this.length ){
        result = fn(result, this[i])
    }
    return result
}

//实现Object.create方法
function create(proto) {
    function Fn() {};
    Fn.prototype = proto;
    Fn.prototype.constructor = Fn;
    return new Fn();
}
let demo = {
    c : '123'
}
let cc = Object.create(demo)


// 实现new操作

function _new() {
    let obj = {};
    const [constructor, ...args] = [...arguments];
    obj.__proto__ = constructor.prototype;
    let result = constructor.apply(obj, args);
    if (result && typeof result === 'function' || typeof result === 'object') {
        return result;
    }
    return obj;
}

// 实现call
Function.prototype.mycall = function () {
    let [thisArg, ...args] = [...arguments]
    thisArg = Object(thisArg) || window
    let fn = Symbol()
    thisArg[fn] = this
    let result = thisArg[fn](...args)
    delete thisArg[fn]
    return result
}
// 实现apply
Function.prototype.myapply = function () {
    let [thisArg, args] = [...arguments];
    thisArg = Object(thisArg)
    let fn = Symbol()
    thisArg[fn] = this;
    let result = thisArg[fn](...args);
    delete thisArg.fn;
    return result;
}

////测试用例
let cc = {
    a: 1
}

function demo(x1, x2) {
    console.log(typeof this, this.a, this)
    console.log(x1, x2)
}
demo.apply(cc, [2, 3])
demo.myapply(cc, [2, 3])
demo.call(cc,33,44)
demo.mycall(cc,33,44)


// 实现bind
Function.prototype.mybind = function(context, ...args){
    return (...newArgs) => {
        return this.call(context,...args, ...newArgs)
    }
}

// 测试用例
let cc = {
    name : 'TianTian'
}
function say(something,other){
    console.log(`I want to tell ${this.name} ${something}`);
    console.log('This is some'+other)
}
let tmp = say.mybind(cc,'happy','you are kute')
let tmp1 = say.bind(cc,'happy','you are kute')
tmp()
tmp1()


// 数组扁平化 不传递参数
let flatDeep = (arr) => {
    return arr.reduce((res, cur) => {
        if(Array.isArray(cur)){
            return [...res, ...flatDep(cur)]
        }else{
            return [...res, cur]
        }
    },[])
}

// 可以传递参数
function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
    []) :
        arr.slice();
};


// 数组去重的几种方式

var array = [1, 1, '1', '1', null, null, 
                undefined, undefined, 
                new String('1'), new String('1'), 
                /a/, /a/,
                NaN, NaN
            ];

// 使用Set
let unique_1 = arr => [...new Set(arr)];

// 使用filter
function unique_2(array) {
    var res = array.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    })
    return res;
}

//Object 键值对

function unique_3(array) {
    var obj = {};
    return array.filter(function (item, index, array) {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}

// 使用Map

function unique_4(arr) {
    const tmp = new Map();
    return arr.filter(item => {
        return !tmp.has(item) && tmp.set(item, 1);
    })
}

// 使用reduce

let unique_5 = arr => arr.reduce((pre, cur) => pre.includes(cur) ? pre : [...pre, cur], []);


// 继承 **寄生组合式继承**


function inheritPrototype(subType, superType) {
    // 创建对象，创建父类原型的一个副本
    var prototype = Object.create(superType.prototype); 
    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
    prototype.constructor = subType; 
    // 指定对象，将新创建的对象赋值给子类的原型
    subType.prototype = prototype; 
}

// 测试用例
// 父类初始化实例属性和原型属性
function Father(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
Father.prototype.sayName = function () {
    alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function Son(name, age) {
    Father.call(this, name);
    this.age = age;
}

// 将父类原型指向子类
inheritPrototype(Son, Father);

// 新增子类原型属性
Son.prototype.sayAge = function () {
    alert(this.age);
}

var demo1 = new Son("TianTian", 21);
var demo2 = new Son("TianTianUp", 20);

demo1.colors.push("2"); // ["red", "blue", "green", "2"]
demo2.colors.push("3"); // ["red", "blue", "green", "3"]



// 使用Class

class Rectangle {
    // constructor
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    // Getter
    get area() {
        return this.calcArea()
    }

    // Method
    calcArea() {
        return this.height * this.width;
    }
}

const rectangle = new Rectangle(40, 20);
console.log(rectangle.area);
// 输出 800

// 继承
class Square extends Rectangle {

    constructor(len) {
        // 子类没有this,必须先调用super
        super(len, len);

        // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
        this.name = 'SquareIng';
    }

    get area() {
        return this.height * this.width;
    }
}

const square = new Square(20);
console.log(square.area);
// 输出 400
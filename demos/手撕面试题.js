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
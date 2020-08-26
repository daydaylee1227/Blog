// Array.isArray
if (!Array.isArray) {
    Array.isArray = obj => Object.prototype.toString.call(obj) === '[object Array]'
}


// Array.from
/**
 * 实现Array.from
 * toInteger方法:返回一个整数
 * toLength方法: 保证len数字合法[0~Number.MAX_SAFE_INTEGER]
 * Number.MAX_SAFE_INTEGER = Math.pow(2,53) - 1
 * 判断arrayLike 为 空 抛出错误
 * mapFn非空并且不是构造函数抛出错误
 * 每次遍历arrayLike,如果mapFn存在, arr[i] = mapFn(iValue,i) 不存在的话 arr[i] = iValue
 * 判断thisArg是否存在,存在的话 arr[i] = mapFn.call(thisArg, iValue,i)
 * */
Array.myfrom = (function () {
    const toStr = Object.prototype.toString
    const isCallable = fn => typeof fn === 'function' || toStr.call(fn) === '[object Function]'

    const toInteger = value => {
        const v = Number(value)
        if (isNaN(v)) return 0
        // 无穷大或者0 直接返回
        if (v === 0 || !isFinite(v)) return v
        return (v > 0 ? 1 : -1) * Math.floor(Math.abs(v))
    }
    // 最大的范围Number.MAX_SAFE_INTEGER
    const maxSafeInteger = Number.MAX_SAFE_INTEGER

    const toLength = value => {
        const len = toInteger(value)
        return Math.min(maxSafeInteger, Math.max(0, len))
    }
    return function myfrom(arrayLike/*, mapFn, thisArg*/) {
        const that = this
        if (arrayLike === null) throw new TypeError("Array.from requires an array-like object - not null or undefined")

        const items = Object(arrayLike)
        let thisArg = ''
        // 判断mapFn是否undefined, 这里最好不要直接使用undefined,因为undefined不是保留字,
        // 很有可能undefined是个值  最好用 void 0 或者 void undefined 
        const mapFn = arguments.length > 1 ? arguments[1] : void 0
        if (typeof mapFn !== 'undefined') {
            // 接下来判断第二个参数是不是构造函数
            if (!isCallable(mapFn)) throw new TypeError("Array.from when provided mapFn must be a function")
            if (arguments.length > 2) thisArg = arguments[2]
        }
        const len = toLength(items.length)
        const arr = isCallable(that) ? Object(new that(len)) : new Array(len)

        let i = 0,
            iValue;
        while (i < len) {
            iValue = items[i]
            if (mapFn) arr[i] = typeof thisArg === 'undefined' ? mapFn(iValue, i) : mapFn.call(thisArg, iValue, i)
            else
                arr[i] = iValue
            i++
        }
        arr.length = len
        return arr
    }
})()

// Array.prototype.myforEach()
/**
 * Array.prototype.myforEach(callback, thisArg)
 * 除了抛出异常外,无法终止或者跳出forEach()循环
 * 
 **/
Array.prototype.myforEach = function (callback, thisArg) {
    if (this == null) throw new TypeError("this is null or not defined")
    let newArr = Object(this)
    let len = newArr.length >>> 0
    let thatArg = null
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    if (arguments.length > 1) thatArg = thisArg
    let k = 0

    while (k < len) {

        if (k in newArr) {
            callback.call(thatArg, newArr[k], k, newArr);
        }
        k++
    }
    return void 0
}

// Array.prototype.myevery()
/**
 * Array.prototype.myevery(callback, thisArg)
 **/
Array.prototype.myevery = function (callback, thisArg) {
    if (this == null) throw new TypeError("this is null or not defined")
    let newArr = Object(this)
    let len = newArr.length >>> 0
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    let thatArg = arguments.length >= 2 ? arguments[1] : void 0
    let k = 0

    while (k < len) {

        if (k in newArr) {
            let testResult = callback.call(thatArg, newArr[k], k, newArr);
            if (!testResult) return false
        }
        k++
    }
    return true
}

// Array.prototype.some()
/**
 * 测试数组中是不是至少有1个元素通过了被提供的函数测试
 * Array.prototype.mysome(callback, thisArg)
 **/
Array.prototype.mysome = function (callback, thisArg) {
    if (this == null) throw new TypeError("this is null or not defined")
    let newArr = Object(this)
    let len = newArr.length >>> 0
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    let thatArg = arguments.length >= 2 ? arguments[1] : void 0

    for (let i = 0; i < len; i++) {
        if (i in newArr && callback.call(thatArg, newArr[i], i, newArr))
            return true
    }

    return false
}

// Array.prototype.filter

/**
 * 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
 * Array.prototype.myfilter(callback, thisArg)
 *
 */
Array.prototype.myfilter = function (callback, thisArg) {
    if (this == null) throw new TypeError("this is null or not defined")
    let newArr = Object(this)
    let len = newArr.length >>> 0
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    let thatArg = arguments.length >= 2 ? arguments[1] : void 0,
        resultArr = new Array(len),
        count = 0

    for (let i = 0; i < len; i++) {
        if (i in newArr) {
            if (typeof thatArg === 'undefined' && callback(newArr[i], i, newArr))
                resultArr[count++] = newArr[i]
            if (typeof thatArg !== 'undefined' && callback.call(thatArg, newArr[i], i, newArr))
                resultArr[count++] = newArr[i]
        }
    }
    resultArr.length = count
    return resultArr
}

// Array.prototype.map
/**
 * 一个由原数组每个元素执行回调函数的结果组成的新数组 
 * Array.prototype.map(callback, thisArg)
 *
 */
Array.prototype.mymap = function (callback, thisArg) {
    if (this == null) throw new TypeError("this is null or not defined")
    let newArr = Object(this)
    let len = newArr.length >>> 0
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    let thatArg = arguments.length >= 2 ? arguments[1] : void 0,
        resultArr = new Array(len),
        mappedValue

    for (let i = 0; i < len; i++) {
        if (i in newArr) {
            // 可能会有疑惑的地方
            mappedValue = callback.call(thatArg, newArr[i], i, newArr)
            resultArr[i] = mappedValue
        }
    }
    return resultArr
}

// Array.prototype.reduce

/**
 * 对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值
 * Array.prototype.reduce(callback, initialValue)
 *
 */
Array.prototype.myreduce = function (callback /*, initialValue*/) {
    if (this == null) throw new TypeError("this is null or not defined")
    let newArr = Object(this)
    let len = newArr.length >>> 0
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    let initialValue,
        k = 0

    if (arguments.length >= 2) {
        initialValue = arguments[1]
    } else {
        while (k < len && !(k in newArr))
            k++
        if (k >= len)
            throw new TypeError('Reduce of empty array with no initial value')
        initialValue = newArr[k++]
    }

    for (let i = k; i < len; i++) {
        if (i in newArr) {
            initialValue = callback(initialValue, newArr[i], i, newArr)
        }
    }
    return initialValue
}

// Array.prototype.find
/**
 * 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
 * Array.prototype.find(callback, thisArg)
 *
 */
Array.prototype.myfind = function (callback /*, thisArg */) {
    if (this == null) throw new TypeError("this is null or not defined")
    let newArr = Object(this)
    let len = newArr.length >>> 0
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    let thatArg = arguments.length >= 2 ? arguments[1] : void 0

    for (let i = 0; i < len; i++) {
        if (i in newArr && callback.call(thatArg, newArr[i], i, newArr))
            return newArr[i]
    }
    return void 0
}
// Array.prototype.indexOf

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {

        var k;
        // 1. Let O be the result of calling ToObject passing
        //    the this value as the argument.
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get
        //    internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {
            return -1;
        }
        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }
        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }
        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        // 9. Repeat, while k < len
        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

// Array.prototype.fill
if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
        value: function (value) {

            // Steps 1-2.
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            var O = Object(this);

            // Steps 3-5.
            var len = O.length >>> 0;

            // Steps 6-7.
            var start = arguments[1];
            var relativeStart = start >> 0;

            // Step 8.
            var k = relativeStart < 0 ?
                Math.max(len + relativeStart, 0) :
                Math.min(relativeStart, len);

            // Steps 9-10.
            var end = arguments[2];
            var relativeEnd = end === undefined ?
                len : end >> 0;

            // Step 11.
            var final = relativeEnd < 0 ?
                Math.max(len + relativeEnd, 0) :
                Math.min(relativeEnd, len);

            // Step 12.
            while (k < final) {
                O[k] = value;
                k++;
            }

            // Step 13.
            return O;
        }
    });
}




改善性能的最好方法之一是避免重复两次相同的工作。

因此，只要可以**缓存结果**供以后使用，就可以加快程序的速度。

诸如延迟加载属性模式之类的技术使任何属性都可以成为缓存层以提高性能。

这里说到的**延迟加载属性模式**就是利用的**访问器属性**，将计算昂贵的操作推迟到需要时再使用。



## 场景

有些时候，你会在JavaScript类内部创建一些属性，它保存实例中可能需要的任何数据。

对于在构造函数内部随时可用的小数据而言，这不是问题。

但是，如果需要在实例中可用之前计算一些大数据，则您可能需要执行昂贵的计算操作。例如，考虑此类：

```js
class MyClass {
    constructor() {
        this.data = someExpensiveComputation();
    }
}
```



在这里，该`data`属性是执行一些昂贵的计算而创建的。

如果您不确定将使用该属性，则提前执行可能不太好，效率低。幸运的是，接下来介绍几种方法可以将这些操作推迟。

接下来主要围绕的**访问器属性**来展开的。

-----



## 按需属性模式

优化**执行计算操作**的最简单方法是等到需要数据后再进行计算。

例如，您可以使用带有getter的data属性来按需进行计算，如下所示：

```js
class MyClass {
    get data() {
        return someExpensiveComputation();
    }
}
```



在这种情况下，直到有人第一次读取该`data`属性时，您的昂贵的计算操作才发生，这是一种改进。

但是，也是存在问题的，每次`data`读取属性时都会执行相同的昂贵计算操作，这比之前的示例（其中至少仅执行一次计算）差。

按照我们分析的情况来看，这不是一个好的解决方案，所以可以在此基础上创建一个更好的解决方案。



----



## 延迟加载属性模式

只有在**访问该属性**时才执行计算是一个好的开始。您真正需要的是在那之后**缓存**信息，然后仅使用该缓存的数据结果。

但是，有个问题需要我们考虑，您将这些信息缓存在何处以便于访问呢？

最简单的方法是定义一个具有相同名称的属性，并将其值设置为计算出的数据，如下所示：

```js
class MyClass {
    get data() {
        const actualData = someExpensiveComputation();
        Object.defineProperty(this, "data", {
            value: actualData,
            writable: false,
            configurable: false,
            enumerable: false
        });
        return actualData;
    }
}
```



在这里，该`data`属性再次被定义为该类的getter，但是这一次它将**缓存结果**。

调用`Object.defineProperty()`创建一个名为的新属性`data`，该属性的固定值为`actualData`，并且被设置为不可写，不可配置和可枚举。然后，将返回值本身。

下次`data`访问该属性时，它将从新创建的属性中读取而不是调用getter：

```js
const object = new MyClass();
// calls the getter
const data1 = object.data;
// reads from the data property
const data2 = object.data;
```



实际上，所有计算仅在第一次读取数据属性时完成。数据属性的每次后续读取都将返回缓存的版本。
这种模式的缺点是**data**属性开始时是不可枚举的原型属性，最后是不可枚举的自己的属性：

```js
const object = new MyClass();
console.log(object.hasOwnProperty("data"));     // false
const data = object.data;
console.log(object.hasOwnProperty("data"));     // true
```



尽管这种区别在许多情况下并不重要，但了解这种模式很重要，因为在传递对象时，这种模式可能会引起细微的问题。

幸运的是，我们可以使用接下来的模式很容易解决这个问题。

----



## 类的延迟加载属性

如果您有一个实例，对于这个实例，延迟加载属性存在很重要，那么您可以使用`Object.defineProperty()`在类构造函数内部创建该属性。

它比前面的示例有点混乱，但是它将确保该属性仅存在于实例上。这是一个例子：

```js
class MyClass {
    constructor() {
        Object.defineProperty(this, "data", {
            get() {
                const actualData = someExpensiveComputation();
                Object.defineProperty(this, "data", {
                    value: actualData,
                    writable: false,
                    configurable: false
                });
                return actualData;
            },
            configurable: true,
            enumerable: true
        });
    }
}
```



我们从这个例子中可以发现，构造函数使用创建`data`访问器属性`Object.defineProperty()`。该属性是在实例上创建的（使用`this`），定义了一个getter并指定了可枚举和可配置的属性。

将`data`属性设置为可配置尤其重要，这样您可以`Object.defineProperty()`再次调用它。



然后，getter函数进行计算并再次调用`Object.defineProperty()`。对于`data`来说，将该属性重新定义为具有特定值的数据属性，并且将其变为不可写且不可配置以保护最终数据。下次`data`读取该属性时，将从存储的值中读取该属性。作为奖励，该`data`属性现在仅作为自己的属性存在，并且在第一次读取之前和之后都具有相同的作用：

```js
const object = new MyClass();
console.log(object.hasOwnProperty("data"));     // true

const data = object.data;
console.log(object.hasOwnProperty("data"));     // true
```

对于类，这很可能是您要使用的模式。另一方面，**对象模式**下可以使用更简单的方法。

----



## 对象的延迟加载属性

如果使用的是**对象模式**而不是类，则过程要简单得多，因为在**对象模式**上定义的getter与数据属性一样被定义为可枚举的自身属性（而不是原型属性）。这意味着您可以为类使用延迟加载属性模式，而不会造成混乱：

```js
const object = {
    get data() {
        const actualData = someExpensiveComputation();

        Object.defineProperty(this, "data", {
            value: actualData,
            writable: false,
            configurable: false,
            enumerable: false
        });

        return actualData;
    }
};
console.log(object.hasOwnProperty("data"));     // true
const data = object.data;
console.log(object.hasOwnProperty("data"));     // true
```

-----





## 总结

在JavaScript中重新定义对象属性的能力提供了独特的机会来缓存可能计算成本很高的信息。

通过从重新定义为数据属性的访问器属性开始，您可以将计算推迟到第一次读取该属性时，然后将结果缓存起来以备后用。这种方法适用于类和对象文字，并且在**对象模式**中更简单一些，因为您不必担心getter最终会出现在原型上。


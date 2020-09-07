## 前言

本篇文章，更多讲述的是React使用规范，最近开始上手项目，开发完后，导师提出以下问题，

- `命名不合理问题`
- `let const混用`
- `无用/重复代码问题`
- `驼峰命名规范`
- `合理使用解构`
- `React实际项目中解决用户卡顿`







## 命名不合理问题

这个问题，在项目中，具体有两个是我没有处理好的👇



### 首字母频繁大写❌





### 变量命名不合理❌





## 合理使用解构

这次收获很大的，就是这个解构，解构的很大程度上，优化了代码行数，代码更加简洁，具体，我们来看看以下效果👇



```react
_renderBorderBg() {
    const {
        _fiveBuildingStyle,
        state: {
            scale,
            clickedIndex,
            randomListNumber,
            explainIsShowing,
            dirNumber
        }
    } = this;
    return (
        <div>
        	something
        </div>
    )
}
```



- 当我们需要获取当前组件中state中数据时，我们可以通过解构的方式来获取
- 很大程度上，代码量减少，看起来很简洁。









## let const混用

整个项目中，抛弃了var生命变量，这个是必须的，但是在实际开发中，合理的使用`let`，`const`命名还是有所区别的，这里就不谈及它们之间语义上的区别，实际中，应该如何去使用呢。

结论👉 **优先用 const, 其次 let, 禁用 var。**

对于性能而言，mentor意思是告诉我，let更消耗性能，那么查了相关的资料，对于这个的理解，可以参考下文👇

 这篇文章👉[ES6的let和const哪个性能高？](https://www.zhihu.com/question/58136118?from=profile_question_card)

接下来，举个例子👇

```react
_renderTopBg() {
    const {
        _topContentStyle,
        state: {
            dir,
            centerNumber,
            buildingList
        }
    } = this
    const building = buildingList[centerNumber]
    return (
        <div style = {_topContentStyle} className = "flex-box">
            {
                `选一选，${building}的${dir}面是哪里？`
            }
        </div>
    )
}
```



这段代码是做了优化的，比如👇

- `building`变量不在使用let，这是因为我们后续更不不需要修改它。



还有一种情况下，也是可以使用const来声明变量的。



```

// 省略代码
_renderBorderBg() {
    // 省略一些代码
    return (
        <div>
            {
                randomListNumber.map( (el, index) => {
                    if(index !== 0) {
                        const newStyle = {
                            ..._fiveBuildingStyle[index],
                            backgroundImage: index === clickedIndex ? `url(${BORDER_BG})` : (explainIsShowing && (index === dirNumber + 1)? `url(${BORDER_BG})`: `url(${BORDER_INIT_BG})`),
                            zIndex:20,
                        }
                        
                        if(el === 0) {
                            newStyle['height'] = 200 * scale
                            newStyle['backgroundRepeat'] = 'no-repeat'
                            newStyle['backgroundSize'] = '100% 90%'
                        }
                        return (
                            <div style = {newStyle} key={index}></div>
                        )
                    }
                })
            }
        </div>
    )
}
```



我们这个newStyle变量的话，也是可以使用const来说明的，及时我们后面修改了，**但是它是一个对象**。



那么我们如何在项目中，更好合理的命名呢👇

我个人的经验，我使用的是vscode，通常情况下，使用 `ctrl + F`快捷键，然后搜关键字let，然后在逐个对比，嗯~ o(*￣▽￣*)o，我的经验。




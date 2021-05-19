## 正文

本文主要介绍React 17中JsX的新特性以及你为什么要关注它。



React 17的发布是独一无二的。几乎没有任何你会注意到的新功能。然而，你可以找到几个对React核心影响很大的改进。在这些改进中，JJSX的变化是非常明显的。



本文将讨论JSX的改进，它们背后的动机，以及每个开发者在升级到React 17之前应该知道的事情。

首先，最重要的是，让我们看看你将从外部体验到的变化。







## 对开发者来说，可见的变化

对React 17的肤浅研究肯定会让你印象不深。真正令人兴奋的东西不是新功能，而是在React的编译方式。

为了更好地理解这些，让我们看一下使用旧版React的组件中的JSX的编译代码。



![Before React 17](../../../Blog/images/外文/React 17中新的JSX增强功能/2.png)



你可能会注意到，编译后的版本使用React.createElement，其中React的依赖性应该在范围内可用。这就是为什么你需要在每个组件中首先导入React。

现在让我们来看看它在React 17中是如何工作的。

有了React 17，**你就不需要为JSX导入React了**。



我希望这能提供一个线索，即编译后的版本不需要React的导入。

正如你在下图中看到的，React 17编译器从react/jsx-runtime导入了一个新的依赖项，它处理JJSX转换。

![New JSX Transform with React 17](../../../Blog/images/外文/React 17中新的JSX增强功能/3.png)



因此，作为开发者，一旦你升级到React 17，你可以从你的组件的代码中删除React导入，如果它只是为了JSX而存在。

**但这是唯一的变化吗，有关系吗？**



正如你已经注意到的，从外面看效果似乎无关紧要。

重要的是要明白，当你的代码库中有更多的React组件时，整体效果会显现出来

为了更好地理解这种影响，让我们看看为什么取消与React.createElement的依赖关系对JSX很重要。

-----



## 删除React.createElement的好处

首先做个总结的话，有几个点:

- 减少捆绑文件的大小
- 减少动态属性查询
- Props、Args和KeyRef相关的改进





### 减少捆绑文件的大小

首先，可以想到的一点是：**减少捆绑文件的大小**。

随着React导入的删除，你的编译捆绑输出的大小将变得稍微小一些。我希望这一点变得很明显，因为我们需要在编译器将其替换为React中的子模块的每个组件中删除React导入，如下所示：

```js
import {jsx as _jsx} from 'react/jsx-runtime';
```







### 减少动态属性查询

由于React 17不再为JSX使用React.createElement，因此消除了对动态属性查找的需要。正如前面所讨论的，你可以在前端代码库的编译版本中找到这个。

然而，这里的性能改进是非常小的，在这里你几乎不会注意到差异
这是因为现代的JavaScript引擎主要是针对动态属性查询进行优化的。

------



### Props、Args和KeyRef相关的改进

好吧，我只是想告诉你，这些改进存在于React 17中。
然而，这些改进太过技术性，无法详述。如果你有兴趣，你可以在Motivation部分的create-element-changes中阅读它们。

----





## 需要用React17吗

如果你在JSX之外创建动态元素，你仍然需要React.createElement方法。



如果你需要在你的代码中手动创建元素，你应该继续使用React.createElement。



此外，你可能会想，我们不是还在使用react/jsx-runtime来替代React 17的React.createElement的JSX吗，这些问题在那里得到了解决吗？简而言之，是的!

当我们看新的react/jsx-runtime时，它带来了一些设计上的变化，以避免React.createElement方法中出现的瓶颈问题。

其中一些变化的引入是为了在未来的架构中有所发展。

你可以在详细设计部分下的同一链接create-element-changes中阅读这些内容。链接:

> https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#motivation



----



## 作为一个开发者，我还应该知道什么？



嗯，这不是别的，而是**废弃通知**。

在React 17 JSX的变化中，有几个通知是你应该注意的。

### 废除 "模块模式 "组件

```js
const Foo = (props) => {
  return {
    onClick() {
      //...
    }
    render() {
      return <div onClick={this.onClick.bind(this)} />;
    }
  }
};
```

然而，通过做下面提到的两个改变，升级会更容易。

- 使用函数表达式而不是箭头函数。
- 添加一个带有isReactComponent的原型，告诉React区分类和函数组件



结果看起来如下。

```js
function Foo(props) {
  return {
    onClick() {
      //...
    }
    render() {
      return <div onClick={this.onClick.bind(this)} />;
    }
  }
};
Foo.prototype = { isReactComponent: true};
```



同样，也会有以下的废弃通知。

- 废弃函数组件上的defaultProps。
- 废弃对象中的spreading key。
- 废弃字符串引用（并删除生产模式_所有者字段）。



你可以在详细设计部分的同一个链接create-element-changes中读到它们，链接：

> https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#motivation

然而，这些警告并不妨碍你迁移到React 17。在下一个主要版本之前，你也有时间来升级它们。



## 总结

JSX变换的好消息是，它是向后兼容的，升级到React 17的变化很小。

但我觉得影响可能会更好，因为目前的改进在现实世界中几乎看不到。

然而，同样重要的是要明白，这些改进中的大部分将有助于加速未来的发布。因此，升级到React 17将使你的代码库面向未来。而且你不需要提醒自己在JSX文件中保留React导入。



此外，如果你从旧版本升级，值得参考废止通知，以避免将来出现任何麻烦。



谢谢你的阅读，如果你有任何问题，请在下面的评论中提出来。



## 参考

https://blog.bitsrc.io/new-jsx-enhancements-in-react-17-e5f64acbea89
## React简介

一个函数式编程框架，官网👉https://reactjs.org/

中文文档👉https://react.docschina.org/



React Fiber是个什么东西呢？官方的一句话解释是“**React Fiber是对核心算法的一次重新实现”**。

更多关于React Fiber的文章，可以看这里👉[React Fiber是什么](https://zhuanlan.zhihu.com/p/26027085)



### React开发环境准备

利用脚手架工具搭建环境，使用的市Create React App👇



```
npx create-react-app my-app  // 项目的名称
cd my-app
npm start
```

然后通过运行相应的命令，出现了react经典的logo，那么你的环境说明至少安装成功啦。



React Fiber是个什么东西呢？官方的一句话解释是“**React Fiber是对核心算法的一次重新实现”**。



### index.js文件

```react
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// ReactDOM的作用,将组件或者是对应的值挂载到root下面,显示对应的内容
// jsx语法,一定需要引入React
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

- 对于类似于`<App />`的语法，称为JSX语法，那么我们需要做的就是引入React，这样子，它才能识别它。

- `ReactDom`的作用就是将组件或者是对应要显示的内容挂载到root下面，这样子才会显示对应的内容。

- `App`你可以理解成就是一个对应的组件，里面就是需要展示的信息。



### App.js文件

```js
import React from 'react';
//JSX语法,所以需要引入React
function App() {
  return (
    <div >
      hello world
    </div>
  );
}

export default App;

```

我们发现这个App中使用了JSX语法，所以我们需要引入React，对应的就是返回你需要展示的内容即可。





-------------



## React基础总结



### 支持函数组件，类(class)组件

```react
import React, { Component} from 'react'


// 支持类定义
class TodoList extends Component {
    render() {
        return (
            <div>TodoList</div>
        )
    }
}
// 支持函数定义
function App() {
    return (
      <div >
        hello world
      </div>
    );
  }
  
export default TodoList
```



### Fragment

有时候，需要在一个组件中有个最外层的div,但是你又不想要它多显示DOM结构，使用Fragment👇

```react
class TodoList extends Component {
    render() {
        return (
            <Fragment>
                <input />提交内容

                <ul>
                    <li>学习React</li>
                    <li>学习learning</li>
                </ul>
            </Fragment>
        )
    }
}
```



### JSX回调中的this

需改的就是函数作用域中的this。

在JavaScript中，class的方法不会绑定this,举个例子的话，当你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。





这并不是 React 特有的行为；这其实与 [JavaScript 函数工作原理]()有关。通常情况下，如果你没有在方法后面添加 `()`，例如 `onClick={this.handleClick}`，你应该为这个方法绑定 `this`。

```react
onClick = {this.handleDelete.bind(this, index)}
```

或者是在class方法中的constructor定义👇

```js
constructor(props) {
  super(props)
  this.handleDelete = this.handleDelete.bind(this)
}
```



### State

这个我们可以理解成就是数据存储的地方，类似于vue中的data,它有一个核心的概念，也就是immutable，也就是说，react不允许我们对state做任何的改变，如果你需要做修改的话，你应该这么做👇

```js
		const list = [...this.state.list];
        list.splice(index, 1)
        this.setState({
            list : list
        })
```

而不是这里写👇

```js
        this.state.list.splice(index,1)
```

这个是不推荐，我觉得提出这个的一个主要原因就是，也会消耗一些性能上的问题。



### className

当你给一个元素设置样式时，我们更多的应该使用的是`className = “wrapper”`通过这个方式来设置，因为react会默认的认为这个class是类声明，所以我们需要使用className



### dangerouslySetInnerHTML

- `dangerouslySetInnerHTML` 是 React 为浏览器 DOM 提供 `innerHTML` 的替换方案。通常来讲，使用代码直接设置 HTML 存在风险，因为很容易无意中使用户暴露于[跨站脚本（XSS）](https://en.wikipedia.org/wiki/Cross-site_scripting)的攻击。
- 当你想设置 `dangerouslySetInnerHTML` 时，需要向其传递包含 key 为 `__html` 的对象，以此来警示你。例如👇

```react
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```



### htmlFor

由于 `for` 在 JavaScript 中是保留字，所以 React 元素中使用了 `htmlFor` 来代替。





### 父子组件传值

父组件向子组件传值

```react
   <TodoItem  itemValue = {item} key={index}/>
```

子组件如何拿到值呢👇

```
    this.props.itemValue
```

通过这个this.props对象获取，然后通过对应设置的值去获取



当你想调用父组件中的方法，或者是想传值时，应该怎么操作呢👇

其实也是通过这个属性传值的方式进行

```react
handleItem = {this.handleDelete.bind(this)}

handleDelete(index) {
  // 对数据的拷贝
  const list = [...this.state.list];
  list.splice(index, 1)
  this.setState({
      list : list
  })
  // console.log(index)
}
```

这个需要注意的是，当你传递的是一个函数的时候，需要注意的内容就是需要修改这个this指向问题。

那么子组件，该怎么去调用呢？👇

```
        this.props.handleItem(index)
```



-------



## React高级概念



### React Developer Tools插件安装

打开Chrome设置-->>更多工具-->>扩展插件-->>Chrome商店，然后下载这个React Developer Tools调试工具，这个调试工具对于React项目中，比如State状态的调试还是很友好的。



### PropTypes和 defaultProps

更多的查看[中文文档](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html)

React内置了一些类型检查的功能，要在组件中props上进行类型检测的话，只需要配置特定的`propTypes`属性👇



```react
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

这样子的话，从父组件中向子组件传入的name时，规定的是string类型。

当传入的 `prop` 值类型不正确时，JavaScript 控制台将会显示警告。出于性能方面的考虑，`propTypes` 仅在开发模式下进行检查。



**默认的Prop值**

有些时候，你可以通过defaultProps属性来设置定义props的默认值👇

```react
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染出 "Hello, Stranger"：
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```



更多的使用规则查看官网的使用规范👉[中文文档](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html)



### props state render关系

当一个组件中的state或者是props发生改变的时候，render函数就会重新被执行一遍，render函数被执行后，对应页面中的内容也是会更新的。





### 虚拟DOM



将这个之前，我们可以看看react数据驱动视图更新原理大致流程👇

有这么一个dom片段，`<div id = 'wrapper'><span>hello world</span></div>`

1. state数据的定义，收集
2. JSX模板的定义，初始化
3. `数据` + `模板` 生成虚拟的DOM，类似于`['div',{id : wrapper},['span',{},'hello world']]`
4. 根据这个虚拟的DOM结构生成真实的DOM结构👉`<div id = 'wrapper'><span>hello world</span></div>`
5. 当state数据发生改变的时候
6. `数据` + `模板` 生成新的虚拟DOM(性能极大的提升)👉`['div',{id : wrapper},['span',{},'My name is TianTian']]`
7. 比较原始虚拟DOM和新的虚拟DOM的区别，找到区别后，发现是span中的内容(极大提高性能)
8. 直接操作DOM，改变span中的内容



上面就是一个类似react数据驱动视图的一个过程，那么我们现在就知道，这里说的虚拟DOM，`应该就是一个JS对象，用来描述真实的DOM`。



JSX -->> 虚拟DOM -->> 真实DOM

```react
return (
    <div >
      hello world
    </div>
  );
```

我们通过是这么去写的，其实呢，我们更加偏向底层的话，应该这么去写👇

```react
return React.createElement('div',{},'hello world')
```

为了我们开发的遍历，我们实际的开发中，使用的更多是JSX语法吧。

那使用虚拟的DOM,优点如何呢

优点👇

- 性能提升了
- 它使得跨端应用得以实现，React Native。



### 虚拟DOM中Diff算法

在进行原始虚拟DOM以及新的虚拟DOM比对的过程，使用的就是Diff算法，我理解的就是找不同。





为什么需要引入keys，其中的一个主要原因就是在做列表循环的时候，我们需要给每一个item加上key，这样子的目的是为了提高虚拟DOM比对的性能，尽量保证key值的稳定，比如不要使用index作为它的值，因为它的值是不稳定的。


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



首先，我们得知道一个概念就是`调和`，将Virtual DOM树转换成actual DOM树的**最少操作的过程** 称为 调和 。

那么知道这个概念之后，我们就会发现，其实React diff算法就是调和的具体表现，而React采用三大策略，将O(n^3)复杂度 转化为 **O(n)复杂度**。

**三大策略**👇

策略一（**tree diff**）：
 Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。

策略二（**component diff**）：
 拥有相同类的两个组件 生成相似的树形结构，
 拥有不同类的两个组件 生成不同的树形结构。

策略三（**element diff**）：
 对于同一层级的一组子节点，通过唯一id区分。



那么基于以上三点，我们可以得出👇

（1）React通过updateDepth对Virtual DOM树进行**层级控制**。

（2）对树分层比较，两棵树 只对**同一层次节点** 进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较。
（3）只需遍历一次，就能完成整棵DOM树的比较。



你需要知道的是，当DOM节点出现跨层级操作时，diff算法只考虑同层级，如果是跨层级时，那么只有**只有创建节点和删除节点的操作。**






为什么需要引入keys，其中的一个主要原因就是在做列表循环的时候，我们需要给每一个item加上key，这样子的目的是为了提高虚拟DOM比对的性能，尽量保证key值的稳定，比如不要使用index作为它的值，因为它的值是不稳定的。





### React中ref使用

有些时候，我们需要去操作这个DOM，那么我们在react中，应该如何去获得DOM呢👇



Refs 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

```react
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

如何去访问Refs呢👇

```
const node = this.myRef.current;
```

这样子的话，node通常情况下，就是页面中的DOM。

这个时候，我们有一个需要注意的点是什么呢？当你通过操作UI使数据发送变化时，那么想获取变化后的DOM，这个时候会出错，我们都知道这个this.setState()对数据的处理是异步的，而我们获取数据的操作是同步的，所以为了更好的获取数据，通常我们的做法是如下👇

```react
		this.setState({
            inputValue : e.target.value
        },() => {
        console.log(this.myRef.current.querySelectorAll('div').length)
        })
```

通常this.setState()第二个参数是一个回调函数，表示的意思就是当数据异处理更新完后，再去执行后续的回调函数。



更多的Refs使用，查看文档👉[传送门](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)





### React生命周期函数

[点这里](https://www.jianshu.com/p/b331d0e4b398) 这个写得不错

生命周期函数指的就是在某一时刻组件会自动执行的函数。

- 在v16.3版本中，新增加了两个新的生命周期函数，`getDerivedStateFromProps`，`getSnapshotBeforeUpdate` 
- 以及在未来 v17.0 版本中即将被移除的三个生命周期函数 `componentWillMount`，`componentWillReceiveProps`，`componentWillUpdate`




#### componentWillMount

// 在组件即将被挂载到页面的时刻自动执行

#### componentDidMount

// 发生在所有的子组件render完成之后,才会自动执行componentDidMount函数

#### componentWillUnmount

// 当这个组件即将被从页面中剔除的时候,该组件会被自动执行



接下来就是更新的生命周期函数👇

#### shouldComponentUpdate(nextProps,nextState)

- 主要用于性能优化(部分更新)

- 唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，在这里return false可以阻止组件的更新

- 因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断



#### componentWillUpdate

在组件更新前的时候，就会自动去执行，但是呢，有以下的规则👇

```
// 组件被更新时,它会自动的执行,但是它是在shouldComponentUpdate之后执行
// 如果这个shouldComponentUpdate返回true,它才会执行
// 如果返回false,这个函数就不会被执行
```



#### componentDidUpdate

// 组件更新完成之后,它会被自动执行



### Charles实现本地数据mock





### React的CSS过渡动画

通常的情况下，我们对于一些简单的动画，我们可以使用`animation`来完成，对于一些复杂度的动画而言，`animation`实现起来就不尽人意啦,那么有哪些好的解决方案吗?👇

[react-transition-group](https://github.com/reactjs/react-transition-group) 我们可以去借助第三方的库，完成复杂的动画效果

这个库的文档，在这里👉[点击文档](https://reactcommunity.org/react-transition-group/)



首先我们需要做的就是下载这个库👇

```bash
cnpm install react-transition-group -S
```

接下来，我们导入这个模块即可👇

```react
				<CSSTransition
					classNames="fade"
					in={this.state.show}
					timeout={300}
                    unmountOnExit
                    appear = {true}
                    onEnter = { (el) => {
						el.style.color = 'blue'
					}}
				>
					<div>hello world</div>
				</CSSTransition>
```

`classNames`表示的是一个进场出场的过渡动画的前缀，我们需要设置对应的前缀信息👇

入场动画三个状态

`fade-enter`, `fade-enter-active`, `fade-enter-done`

- `fade-enter` 表示的就是入场动画还没有开始时，也就是出场动画的第一个时刻。
- `fade-enter-active`  表示的就是从入场动画开始到入场动画结束前的这个过程
- `fade-enter-done` 表示的就是入场动画，结束以后的状态样式由什么来决定



`fade-exit`, `fade-exit-active`, `fade-exit-done`

同理的话，这个表示的内容就是跟入场动画的效果差不多，也就是出场动画的一些效果。





`appear = {true}`

`fade-appear`, `fade-appear-active`, `fade-appear-done`

```
appear = {true}
```

这个表示的涵义，就是告诉这个这个组件，当我使用它的时候，一面一开始刷新的过程，我们也需要动画的效果，那么实现这个效果的话，是上面三个样式会自动的添加到对应的DOM元素上，所以需要我们去设置一下。

- `fade-appear` 表示刷新的时候，也就是第一次展示的时候，对应会增加的className
- `fade-appear-active` 这个表示的就是第一次页面开始展示，到页面展示结束的时候，会增加的类名。
- `fade-appear-done` 表示的就是第一次刷新页面时，也就是动画最后一刻时，展示的动画。



`unmountOnExit`

这个属性的作用:整个DOM元素的消失，也就是display:none



`onEnter`

这个表达的就是钩子函数，它的作用是什么呢👇

我们都知道这个钩子函数的作用就是当执行到某个时刻的时候，它会自动的去触发并且执行，那么`onEnter`这个钩子的话，它的触发时机就是当这个入场动画结束的时候，我们就会触发。



对于其他的钩子而言，这里就不展开梳理了，聪明的小伙伴，肯定以及全部掌握啦。



**多个组件动画效果**

同样的情况下，这个组件`TransitionGroup`完美的提供给我们了这个方案，我们需要把整个需要动画的元素给包裹起来，然后对于每个不同的DOM而言的话，我们需要做的就是还是跟上面的方案一致，对每个不同的组件经行不同的`CSSTransition`。





---------



## React性能优化

### 函数改变this

有些时候，你需要频繁的改变this指向当前这个组件的话，从而达到目的，那么我们可以尝试在constructor中显示的调用`.bind(this)`👇

```json
constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // 这一行很重要！
    this.handleClick = this.handleClick.bind(this);
  }
```

很大程度上，当你的项目很大的时候，这样子的写法是会提升运行效率的。

你可以理解成，改变this指向问题，写在constructor中的话，只需要执行一次，而且可以避免子组件的一些不必要的渲染问题。



### setState(State,callback)

它是一个异步的处理函数，它会将多次的数据处理整合成一个，这样子的话，降低了频率，从而渲染次数也减少了。





### `shouldComponentUpdate` 

如果你知道在什么情况下你的组件不需要更新的话，你可以在`shouldComponentUpdate` 中放回false来跳过整个渲染过程。其包括该组件的`render`调用以及之后的操作。

通常情况下，我们会对比当前与之前的props和state，然后看是否需要跳过整个渲染过程。举个例子👇

如果你的组件只有当 `props.color` 或者 `state.count` 的值改变才需要更新时，你可以使用 `shouldComponentUpdate` 来进行检查：

```react
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

从上面代码来看，我们通过检查`props.color` 或 `state.count` 是否改变，如果这些值没有改变，那么这个组件就不会更新，如果你的组件更复杂一些的话，可以用类似的办法'浅比较'的模式来检查 `props` 和 `state` 中所有的字段，以此来决定是否组件需要更新。

### 虚拟化长列表



## Redux使用规范

首先得安装redux

```
cnpm i redux -S
```

接下来，我们需要做的就是创建一个store文件夹，然后在它下面创建一个index.js文件。

我们看看index.js入口文件的作用↓

```js
import { createStore} from 'redux'
import reducer from './reducer'

const store = createStore(
    reducer,
    // 下面这个配置信息是为了Redux devtools插件使用的,判断window下是否存在这个变量
    // 存在的话，就是使用这个插件
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store
```

- createStore 创建一个store仓库，然后把reducer初始化



我们看看reducer是如何定义的↓

```js
// 这两个参数的含义
// state可以理解成整个仓库的数据
const stateDefalut = {
    inputValue : '1232',
    list : [1,2,3,4]
}

// reducer 可以去接受state,但是不能去修改这个state转态


// reducer 其实就是一个函数,处理store.dispatch()派发的action
// 对于每个action处理过后,返回的就是一个新的newState
export default (state = stateDefalut, action) => {

    // 我们可以去通过这个action.type来定义新的状态
    if(action.type === 'chang_input_value') {
        const newState = JSON.parse(JSON.stringify(state)) 
        newState.inputValue = action.value
        return newState
    }

    if(action.type === 'add_todo_item') {
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = ''
        newState.list.push(action.value)
        return newState
    }
    
    return state
}
```

- state表示的就是我们最后仓库的数据，一开始我们需要做的就是stateDefalut默认一个。



**store.getState()** 

获取的是最新的state，例如↓

```js
this.state = store.getState();
```

**store.subscribe(callback)**

表示是当你感知到store数据发生变化时， 会去执行这个callback方法。



```js
constructor(props) {
    super(props)
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    store.subscribe(this.handleStoreChange)
  }
```

我们可以看到，store.subscribe()当这个store转态发生变化时，我们会去执行这个`this.handleStoreChange`

那么我们来看看这个方法↓

```js
handleStoreChange() {
    this.setState(store.getState())
}
```

通过执行这块代码，那么我们的this.state的数据也会发生修改，也就是说组件中的数据是通过`store.subscribe`来修改的。所以我们一般是通过`store.subscribe`修改组件中的数据state。

然后通过`store.dispatch`去修改store中的数据。



**store.dispatch(action)**

这个表示的派发一个action对象，然后reducer.js这个模块会对相应的代码处理。

```js
handleChange(e) {
    const action = {
      type : "chang_input_value",
      value : e.target.value
    }
    store.dispatch(action)
  }
```

一般而言，就是类似于这样子的，派发一个action,然后这个action对象，有一个type以及value。



**小结**

- 需要改变state中的数据的话，我们需要通过store.dispatch派发一个action
- 这个action的话，会通过reducers函数转换成一个新的newstate,然后返回给store
- store拿到新的newstore后，我们通过`store.subscribe`感知store的变化，通过对应的callback回调函数，完成对组件中state数据的更新。
- reducers必须是一个纯函数，纯函数概念（给定固定的输入，就一定有固定的输出，而且不会有任何的副作用）





### 封装actionTypes以及actionCreators

当你的项目特别庞大的时候，这个时候的话，如果不把一些公共的逻辑抽离出来的话， 是非常复杂的，那么我们接下来就是完成这个操作。

我们看看actionCreators.js文件

```js
import {CHANG_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './actionTypes'
export const changInputvalue = (value) => ({
    type : CHANG_INPUT_VALUE,
    value
})
export const addTodoItem = (value) => ({
    type: ADD_TODO_ITEM,
    value
})
export const delete_todo_item = (index) => ({
    type: DELETE_TODO_ITEM,
    index
})
```

那么我们再来看看这个actionTypes.js文件吧↓

```js
export const CHANG_INPUT_VALUE = 'chang_input_value'
export const ADD_TODO_ITEM = 'add_todo_item'
export const DELETE_TODO_ITEM = 'delete_todo_item'
```

到这里的话，我们就把ationType和actionCreators给抽离出来了。







## UI组件与容器组件

UI组件只负责展示效果，页面的显示，对于组件中的逻辑代码，它并不负责。

容器组件负责的内容就是逻辑代码的部分，对于UI界面的显示，它并不会去关心。



## Redux使用规范

首先得安装redux

```
cnpm i redux -S
```

接下来，我们需要做的就是创建一个store文件夹，然后在它下面创建一个index.js文件。

我们看看index.js入口文件的作用↓

```
import { createStore} from 'redux'
import reducer from './reducer'

const store = createStore(
    reducer,
    // 下面这个配置信息是为了Redux devtools插件使用的,判断window下是否存在这个变量
    // 存在的话，就是使用这个插件
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store
```

- createStore 创建一个store仓库，然后把reducer初始化

我们看看reducer是如何定义的↓

```
// 这两个参数的含义
// state可以理解成整个仓库的数据
const stateDefalut = {
    inputValue : '1232',
    list : [1,2,3,4]
}

// reducer 可以去接受state,但是不能去修改这个state转态


// reducer 其实就是一个函数,处理store.dispatch()派发的action
// 对于每个action处理过后,返回的就是一个新的newState
export default (state = stateDefalut, action) => {

    // 我们可以去通过这个action.type来定义新的状态
    if(action.type === 'chang_input_value') {
        const newState = JSON.parse(JSON.stringify(state)) 
        newState.inputValue = action.value
        return newState
    }

    if(action.type === 'add_todo_item') {
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = ''
        newState.list.push(action.value)
        return newState
    }
    
    return state
}
```

- state表示的就是我们最后仓库的数据，一开始我们需要做的就是stateDefalut默认一个。

**store.getState()**

获取的是最新的state，例如↓

```
this.state = store.getState();
```

**store.subscribe(callback)**

表示是当你感知到store数据发生变化时， 会去执行这个callback方法。

```
constructor(props) {
    super(props)
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    store.subscribe(this.handleStoreChange)
  }
```

我们可以看到，store.subscribe()当这个store转态发生变化时，我们会去执行这个`this.handleStoreChange`

那么我们来看看这个方法↓

```
handleStoreChange() {
    this.setState(store.getState())
}
```

通过执行这块代码，那么我们的this.state的数据也会发生修改，也就是说组件中的数据是通过`store.subscribe`来修改的。所以我们一般是通过`store.subscribe`修改组件中的数据state。

然后通过`store.dispatch`去修改store中的数据。

**store.dispatch(action)**

这个表示的派发一个action对象，然后reducer.js这个模块会对相应的代码处理。

```
handleChange(e) {
    const action = {
      type : "chang_input_value",
      value : e.target.value
    }
    store.dispatch(action)
  }
```

一般而言，就是类似于这样子的，派发一个action,然后这个action对象，有一个type以及value。

**小结**

- 需要改变state中的数据的话，我们需要通过store.dispatch派发一个action
- 这个action的话，会通过reducers函数转换成一个新的newstate,然后返回给store
- store拿到新的newstore后，我们通过`store.subscribe`感知store的变化，通过对应的callback回调函数，完成对组件中state数据的更新。
- reducers必须是一个纯函数，纯函数概念（给定固定的输入，就一定有固定的输出，而且不会有任何的副作用）

### 封装actionTypes以及actionCreators

当你的项目特别庞大的时候，这个时候的话，如果不把一些公共的逻辑抽离出来的话， 是非常复杂的，那么我们接下来就是完成这个操作。

我们看看actionCreators.js文件

```
import {CHANG_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './actionTypes'
export const changInputvalue = (value) => ({
    type : CHANG_INPUT_VALUE,
    value
})
export const addTodoItem = (value) => ({
    type: ADD_TODO_ITEM,
    value
})
export const delete_todo_item = (index) => ({
    type: DELETE_TODO_ITEM,
    index
})
```

那么我们再来看看这个actionTypes.js文件吧↓

```
export const CHANG_INPUT_VALUE = 'chang_input_value'
export const ADD_TODO_ITEM = 'add_todo_item'
export const DELETE_TODO_ITEM = 'delete_todo_item'
```

到这里的话，我们就把ationType和actionCreators给抽离出来了。

## UI组件与容器组件

UI组件只负责展示效果，页面的显示，对于组件中的逻辑代码，它并不负责。

容器组件负责的内容就是逻辑代码的部分，对于UI界面的显示，它并不会去关心。
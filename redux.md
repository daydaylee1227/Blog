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




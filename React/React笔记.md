



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


## React Hooks







### 使用react-create-app构建工具

```react
npx create-react-app train-ticket
// train-ticket项目名称
```

Create React App 是一个官方支持的创建 React 单页应用程序的方法。它提供了一个零配置的现代构建设置。





[react调试工具](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?utm_source=chrome-ntp-icon)





更多的使用，可以点击这里React [中文文档](https://www.html.cn/create-react-app/docs/documentation-intro/)



## react-scripts的作用与工作原理

react-scripts 是 create-react-app 的一个核心包，我们有必要来了解它的作用和原理。



项目初始化后，我们打开package.json文件，然后我们发现我们能用的Scripts有以下几个👇

```bash
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

充满好奇的我，想知道这个react-scripts到底做了哪些事情，那么我们就打开node_modules文件中一窥究竟👇



找到这个react-scripts/bin目录中，有个js文件，我们点进去看看具体做了哪些事情👇

```js
nodeArgs
      .concat(require.resolve('../scripts/' + script))
      .concat(args.slice(scriptIndex + 1))
```

从上面这话可以看出调用start时需要调用scripts/start.js，点开该文件,会发现其实里面好多默认的配置都是写在该文件，可以通过修改改文件来实现自己文件的存放配置，通过嵌套关系，然后你会找到`config/webpack.config.js`文件，到这里的话，一切都很明朗了。

react-scripts帮我们配置好了webpack构建过程，之前需要我们配置的内容，现在都不需要我们动手去配置了。



那我们接下来看看可用的Scripts具体有哪些作用👇

- `npm test` ：以交互式监视模式启动测试运行器。
- `npm run eject` ：如果你对构建工具和配置选项不满意，可以随时 `eject` 。此命令将从项目中删除单个构建依赖项。



执行eject指令，你可以理解成会将封装再create-react-app中的配置全部反编译到当前项目中，这样子用户就可以完全取到webpack文件的控制权限，所以你可以理解成eject命令存在意义就是更改webpack配置。



## React 新特性

接下来梳理总结以下常见的新特性。



## Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。



### 何时使用Context

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。



如何使用它呢？



### React.createContext()

```jsx
const MyContext = React.createContext(defaultValue)
```







更多的例子，可以查看官网的[Context文档](https://react.docschina.org/docs/context.html)




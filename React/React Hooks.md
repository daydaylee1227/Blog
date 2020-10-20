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
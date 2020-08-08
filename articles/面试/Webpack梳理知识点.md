



## Webpack基础知识

### 什么是webpack

webpack其实我理解就是**模块打包工具**，将多个模块打包到生成一个最终的bundle.js问题。

目前来看，webpack4.0已经可以打包任何形式的模块。



### 如何安装Webpack

首先确保你有node环境，在终端运行下面指令

```
node -v
npm -v
```

出现了两个版本号后，接下来就可以继续学习webpack了，npm包管理工具是必须的。



### 初始化项目

```
npm init 
```



这个意思就是为了使项目符合规范，**初始化一个项目**，这样子使项目符合规范。

接下来就发现，在该根目录下，会**生成一个package.json文件**，这个文件描述了node项目，node包的一些信息。也就是说，**npm init 生成的就是一个package.json文件。**

**package.json属性说明**

```
	name - 包名.
    version - 包的版本号。
    description - 包的描述。
    homepage - 包的官网URL。
    author - 包的作者，它的值是你在https://npmjs.org网站的有效账户名，遵循“账户名<邮件>”的规则，		例如：zhangsan <zhangsan@163.com>。
    contributors - 包的其他贡献者。
    dependencies / devDependencies - 生产/开发环境依赖包列表。它们将会被安装在 node_module 目录下。
    main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
    keywords - 关键字
```

### 接下来就是安装webpack

```
 npm install webpack webpack-cli -g   // 全局安装webpack
```

不过建议还是不要这样子安装，当你有多个项目的时候，你其中一个webpack依赖版本是3.x本版，当前版本是4.0版本的话，那么这个项目是运行不起来的。

那么先卸载全局安装的webpack，然后在当前你要运行的项目再单独安装。

```
 npm uninstall webpack webpack-cli -g   //卸载全局webpack
```

怎么全局安装呢👇

```
 npm install webpack webpack-cli -D   // 局部安装
```

要想查看版本的话，**webpack -v**这个命令此时不行，因为node此时会去全局查找，发现找不到webpack包，因为我们之前已经卸载全局的webpack，所以我们得用一个新命令。

```
npx webpack -v
```

这个时候，就可以看到对于版本号。

如何查看包的版本呢

```
npm info webpack   // 查看webpack包版本
```



### webpack配置文件

webpack.config.js就是webpack的默认配置文件，我们可以自定义配置文件，比如文件的入口，出口。

```
const path = require('path')
module.exports = {
    entry : './index.js',
    output : {
        filename : 'bundle.js',
        path : path.join(__dirname, 'dist')
    }
}
```

这个就是最基本的配置，打包一个index.js文件，也就是entry，output打包的入口，出口配置信息。

那么这个时候，在命令行中运行`npx webpack`，就会去找webpack.config.js文件中的配置信息。



**默认的配置文件必须是webpack.config.js这个名称**，但是你自己写了一个webpack配置文件信息，那行不行呢？当然是可以的，那你得运行以下命令👇

```
npx webpack --config webpack.config.js
// --config 后面就是你自己配置的webpack文件信息
```

### npm scripts

**npm scripts** 有时候，你用过vue，React的话， 经常使用的都是npm run dev的形式，那么我们是不是也能配置这样子的信息呢？我们只需要在package.json文件中配置scripts命令就行👇

```
"scripts": {
    "dev": "webpack --config webpack.config.js"
  },
```

这个时候，你在运行npm run dev，它会被翻译成对于的指令，也会打包对应的文件。



**webpack打包三种命令**

- webpack index.js (全局)
- npx webpack index.js
- npm run dev

### webpack-cli

这个时候，你也许就会发现这个webpack-cli作用了吧，不下载这个包的话，你在命令行运行webpack指令是不生效的，也就是说，**webpack-cli作用就是可以在命令行运行webpack命令并且生效。**

不下载的话，在命令行中使用webpack命令是不允许的。



### webpack配置环境



主要分为**development**和**production**两种环境，默认情况下是production环境，**两者的区别就是，后者会对打包后的文件压缩。**那么我们去配置一下👇

```
const path = require('path')
module.exports = {
    mode : 'development',
    entry : './index.js',
    output : {
        filename : 'bundle.js',
        path : path.join(__dirname, 'bundle')
    }
}
```

这个时候，再去看的话，就会发现，**bundle.js文件没有压缩代码**。


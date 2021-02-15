## Webpack面试题



### webpack基本配置

- 拆分和merge
- 启动服务，webpack-dev-server
- 处理ES6， bable-loader, 需要配置.bablerc文件, preset : bable/preset-env 
- 处理样式： 比如css-loader,需要知道执行顺利是从后往前，也就是说，postcss-loader -->> css-loader -->> style--loader
- 处理图片 file-loader(dev)  url-loader(线上 )  base64格式打包到bundle中去





### webpack高级配置



#### 如何配置多个入口文件

- entry入口配置多个bundle，这里的话，比如index，other，会打两个包。
- output配置这个输出的文件



```
output: {
		filename: '[name].[contentHash].js'
}

new HtmlWebpackPlugin({
            template: 'src/index.html'  // 以src/目录下的index.html为模板打包
            chunks: ['index'] // 引用哪些chunks
}
```





#### 如何抽离css以及压缩css



```

// loader需要借助的就是 MiniCssExtractPlugin.loader
new MiniCssExtractPlugin({  
		filename: 'css/main.[contentHash].css'
})
// 压缩css
optimization: {
	minimizer: [TerserJSPlugin(), OptimizeCssAssetsPlugin()]
}
// 
```



#### 抽离公共代码和第三方库代码

通过这个splitChunks完成





### 前端代码为何要进行构建和打包







### loader和plugin的区别







### module chunk bundle区别

- module，指的是源码文件，或者说webpack中万物皆模块。
- chunk，多模块合成的，比如entry，import语法，splitChunk
- bundle， 最后输出的文件。 比如.css , .js, .jpg



### webpack如何实现懒加载的





### webpack常见的性能优化

- 优化打包速度和构建速度，体验感和效率。
- 优化产出代码。



#### 优化babel-loader

```
rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory'], // 开启缓存
            include: path.resolve(__dirname, 'src') // 明确打包范围
        }]

```





#### IgnorePlugin(生产环境 prod)

1. 这是webpack内置插件
2. 这个插件的作用是：忽略第三方包指定目录，让这些指定目录不要被打包进去。







#### happyPack多进程打包

我们知道js是单线程的，所以我们如果可以开启多进程打包。

提高构建速度，利用多核cpu。

> Happypack 只是作用在 loader 上，使用多个进程同时对文件进行编译。
>
> 在使用 Webpack 对项目进行构建时，会对大量文件进行解析和处理。当文件数量变多之后，Webpack 构件速度就会变慢。由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以 Webpack 需要处理的任务要一个一个进行操作。



由于 JavaScript 是单线程模型，要想发挥多核 CPU 的能力，只能通过多进程去实现，而无法通过多线程实现。



```js
module.exports = {
    ...
    module: {
        rules: [
            test: /\.js$/,
            // use: ['babel-loader?cacheDirectory'] 之前是使用这种方式直接使用 loader
            // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
            use: ['happypack/loader?id=babel'],
            // 排除 node_modules 目录下的文件
            exclude: /node_modules/
        ]
    },
    plugins: [
        ...,
        new HappyPack({
            /*
             * 必须配置
             */
            // id 标识符，要和 rules 中指定的 id 对应起来
            id: 'babel',
            // 需要使用的 loader，用法和 rules 中 Loader 配置一样
            // 可以直接是字符串，也可以是对象形式
            loaders: ['babel-loader?cacheDirectory']
        })
    ]
}
```



关于开启多进程打包

- 项目较大，打包速度慢，开启多进程能提高速度。
- 项目较小，打包速度快，开启多进程会降低速度(进程开销)



#### 配置热更新（本地开发development）

自动刷新：整个页面刷新，速度较慢，状态丢失。

热更新：新代码失效，网页不刷新，状态不丢失。



本地开发环境中，我们需要去增加开启热更新之后的逻辑代码

// HotModuleReplacementPlugin() 需要这个插件

然后在devServer ：{

​	hot: true

}

```
if (module.hot) {
	module.hot.accept(['./main'], () => {
	
	})
}


```



#### DllPlugin 动态连接库插件（不能用于生产的环境中）

- 前端框架 vue react，体积大，构建慢
- 较稳定，不常升级版本。
- 同一个版本只构建一次，不用每次都重新构建。

DllPlugin 打包出dll文件

DllReferencePlugin   使用dll文件



链接: https://segmentfault.com/a/1190000016567986

使用dll时，可以把构建过程分成dll构建过程和主构建过程（实质也就是如此），所以需要两个构建配置文件，例如叫做`webpack.config.js`和`webpack.dll.config.js`。



引用的过程，需要的在index中引用产出物

```
<body>

  <div id="app"></div>

  <!--引用dll文件-->

  <script src="../../dist/dll/react.dll.js" ></script>

</body>
```





我们对比一下 DLL 和前端常接触的网络缓存，一张表就看明白了：

| DLL                                         | 缓存                                   |
| :------------------------------------------ | :------------------------------------- |
| 1.把公共代码打包为 DLL 文件存到硬盘里       | 1.把常用文件存到硬盘/内存里            |
| 2.第二次打包时动态链接 DLL 文件，不重新打包 | 2.第二次加载时直接读取缓存，不重新请求 |
| 3.打包时间缩短                              | 3.加载时间缩短                         |



不错的链接：https://mp.weixin.qq.com/s/jtIbVc9Bl50TIs7YilWbFg







### Scope Hosting

作用域提升，在生产环境下。

我们先来简单分析一下：（没有开启Scope Hoisting ）

**现象**：构建后的代码存在大量的闭包代码



链接：https://blog.csdn.net/liuhua_2323/article/details/103433533





### webpack常见的性能优化-优化产出代码

- 体积更小
- 合理分包，不重复加载。
- 速度更快，内存使用更小。



有一下几个方面：

- 小图片 base64 编码
- bundle + hash --- contenthash
- 懒加载
- 提取公共代码，splitChunks
- 使用cdn加速，publicPath
- 使用production - 自动开启代码压缩
- Scope Hosting







### babel-runtime和babel-polyfill的区别





### ES6 Module 和  Commonjs区别

- ES6 静态引用，编译时引入。
- Commonjs动态引用，执行时引入

Tree-shaking是在webpack打包时执行的，webpack打包只是静态分析，只是一个编译。

webpack只适合于ES6,原因在于webpack只是编译打包，


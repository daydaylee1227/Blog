



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



## webpack核心概念loader

### 什么是loader

**loader就是一个打包的方案，它知道对于某个特定的文件该如何去打包。** 本身webpack不清楚对于一些文件如何处理，loader知道怎么处理，所以webpack就会去求助于loader。



webpack是默认知道如何打包js文件的，但是对于一些，比如图片，字体图标的模块，webpack就不知道如何打包了，那么我们如何让webpack识别图片等其他格式的模块呢？

那么就去配置文件webpack.config.js配置相应的信息，配置module👇

```js
const path = require('path')
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: 'file-loader'
            }
        }]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    }
}
```

我们需要file-loader的话，也就是依赖于它，所以先下载它

```
npm install file-loader -D
```

然后我们看看index.js是如何写的👇

```
import acator from './头像.jpg'
console.log(acator)
```

通过这个我们发现，在控制台，打印的结果是

```
3f16daf5233d30f46509b1bf2c4e08a5.jpg
```

说明file-loader帮我们图片模块打包到了dist目录下，并且index.js中，这个acator变量，结果是一个名称，这样子的话，就可以完成打包，后续需要该图片也轻松搞定。



**总结**

webpack无法识别非js结尾的模块，所以需要loader让webpack识别出来，这样子就可以完成打包。

- 遇到非js结尾的模块，webpack会去module中找相应的规则，匹配到了对于的规则，然后去求助于对应的loader
- 对应的loader就会将该模块打包到相应的目录下，上面的例子就是dist目录，并且呢，**返回的是该模块的路径**,拿上面的例子来说，就是`acator` 变量的值就是路径。



### 如何配置file-loader

当然就是看webpack官网了，这里面文档很详细，[点这里](https://www.webpackjs.com/loaders/file-loader/)

举个例子，比如，你想将文件打包名称不改变，并且加个后缀的话，可以这么来配置options👇

```js
			{
                loader: 'file-loader',
                options: {
                    // name就是原始名称,hash使用的是MD5算法,ext就是后缀
                    name: '[name]_[hash].[ext]'
                }
            }
```

我们引入照片的是下面👇

```js
import acator from './头像.jpg'
```

那么最后打包完的名称是说明呢👇

```
头像_3f16daf5233d30f46509b1bf2c4e08a5.jpg
```

在举个例子，比如你想将图片这些模块都打包到dist目录下的images下，是不是也是可以配置下

```js
			{
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/'
                }
            }
```

这样子的话，就会在dist/images/ 目录下找到对应的打包好图片。

比如不同的环境下，打包的图片位置也可以不一样，👇

```
if (env === 'development') {
        return '[path][name].[ext]'
}
```

剩下的就去官网，自己配置吧。

### 如何配置url-loader



上面对于图片的模块打包，我们同样可以去使用url-loader，那么它与file-loader区别是什么呢？

```js
			{
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit : 102400  //100KB
                }
            }
```

唯一的区别就在于，要打包的图片是否会打包到images目录下，还是以Base64格式打包到bundle.js文件中，这个就看limit配置项了。

- 当你打包的图片大小比limit配置的参数大，那么跟file-loader一样。
- 当图片较小时，那么就会以Base64打包到bundle.js文件中。

更多的url-loader[看官网](https://www.webpackjs.com/loaders/url-loader/)



### 如何配置css-loader

比如你引入了一个css模块，这个时候，就需要去下载相应的模块loader。

```
cnpm install css-loader style-loader -D   // 下载对应的模块
```

然后就是配置module👇

```
		{
            test: /\.css$/,
            use: ['style-loader','css-loader']
        }
```

这样子的话，你在index.js 导入样式就可以生效啦，我们看看是如何导入的👇

```
import acator from './头像.jpg'
import './index.css'
const img = new Image()
img.src = acator
img.classList.add('imgtitle')
document.body.appendChild(img)
```

这个imgtitle就是样式，如下👇

```
.imgtitle{
    width: 100px;
    height: 100px;
}
```

通过两个loader，就实现了webpack打包css文件，那我们分析以下两个loader功能。

- css-loader主要作用就是将多个css文件整合到一起，形成一个css文件。
- style-loader会把整合的css部分挂载到head标签中。



那么如果你使用scss预编译css的话，webpack是无法打包该文件的，所以又需要安装新的loader👇

### 如何配置sass-loader

我们看官网scss-loader需要下载哪些，[点这里](https://www.webpackjs.com/loaders/sass-loader/) 

```
npm install sass-loader node-sass --save-dev
```

上面是安装sass-loader，需要同时安装node-sass，然后就去配置对应的module

```js
		{
            test: /\.scss$/,
            use: ['style-loader','css-loader','sass-loader']
        }
```

这样子的话，你像下面去导入scss样式文件，是可以打包完成的👇

```
// index.js 
import acator from './头像.jpg'
// console.log(acator)
import './index.scss'   // 导入scss文件

const img = new Image()
img.src = acator
img.classList.add('imgtitle')
document.body.appendChild(img)
```

模块的加载就是从右像左来的，所以先加载sass-loader翻译成css文件，然后使用css-loader打包成一个css文件，在通过style-loader挂载到页面上去。

接下来又有新的问题了，如果在scss文件中使用css3新特新的话，是不是需要加上厂商前缀呢？这个时候，我们需要怎么去呢？应该加上一个什么loader呢？看下面



### 如何配置postcss-loader

这个loader解决的就是加上厂商前缀，我们看webpack官网是怎么做的👉[点这里](https://www.webpackjs.com/loaders/postcss-loader/)

```
npm i -D postcss-loader autoprefixer
```

然后呢，还需要建一个**postcss.config.js**，这个配置文件(**位置跟webpack.config.js一个位置**)配置如下信息👇

```
// postcss.config.js
// 需要配置这个插件信息
module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ]
        })
    ]
};
```

一开始我设置的话，是不生效的，原因就是**没有设置支持的浏览器**，然后看看下面👇

```js
		{
            test: /\.scss$/,
            use: ['style-loader','css-loader','sass-loader','postcss-loader']
        }
```

最后就可以看见比如css3会加上厂商前缀了👇

```
-webkit-transform: translate(100px, 100px);
-ms-transform: translate(100px, 100px);
transform: translate(100px, 100px);
```



一些其他问题，有时候，你会遇到这样子的一个问题，你不在某个scss文件中又导入新的scss文件，这个时候，打包的话，它就不会帮你重新安装postcss-loader开始打包，这个时候，我们应该如何去设置呢，我们先来看例子👇

```scss
// index.scss
@import './creare.scss';
body {
    .imgtitle {
        width: 100px;
        height: 100px;
        transform: translate(100px, 100px);
    }
}
```

- 我们知道，我们配置的loader规则中，是符合这样子的预期
- 当js代码中引入scss模块的话，会按照这样子的规则去做
- 那么如何在scss文件中引入scss文件，那么规则肯定不会从postcss-loader开始打包，所以我们需要配置一些信息。

```js
		{
            test: /\.scss$/,
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options:{
                        importLoaders:2,
                        modules : true
                    }
                },
                'sass-loader',
                'postcss-loader'
            ]
        }
```

我们需要在css-loader中配置options，加入**importLoaders :2**， 这样子就会走postcss-loader，和sass-loader，这样子的语法，**无论你是在js中引入scss文件，还是在scss中引入scss文件，都会重新依次从下往上执行所以loader。**

那么`modules:true`这个配置是什么作用呢？有时候，你希望你的css样式作用的是当前的模块中，而不是全局的话，就需要加上这个配置了，看下案例👇

```js
// index.js
import acator from './头像.jpg'
import create from './create'

import style from './index.scss'  // 通过modules:true 避免了css作用域create中的模块
const img = new Image()
img.src = acator
img.classList.add(style.imgtitle)
document.body.appendChild(img)
create()
```

那么create模块是什么呢👇

```js
import acator from './头像.jpg'
import style from './index.scss'
function create() {
    const img = new Image()
    img.src = acator
    img.classList.add(style.imgtitle)
    document.body.appendChild(img)
}

export default create;
```

可以看出来，这个create模块，就是创建一个img标签，并且设置单独的样式。给`modules : true`后，我们需要接着往下做的就是import语法上有些改变。

```js
import style from './index.scss'
```

然后通过style这个对象变量中去找，找到scss中设置的名称即可。

**总结**

- `importLoaders:2`该配置信息解决的就是在scss文件中又引入scss文件，会重新从postcss-loader开始打包
- `modules:true`会作用域当前的css环境中，样式不会全局引入，语法上也需要使用如下引入
- import style from './index.scss'



比如字体图标怎么配置信息呢？对于字体图标大打包，可以使用file-loader完成👇

```js
		{
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        }
```

更多的静态资源的打包配置，可以看官网是如何使用的，👉（[静态loader管理资源]()）



## webpack核心概念plugins

如何使用plugins让打包更加便捷呢，plugins意思就是插件意思，很大程度上方便了我们，那我们来看看吧。

plugins: **可以在webpack运行到某个时刻的时候,帮你做一些事情.**

### 如何使用HtmlWebpackPlugin

**这个插件的作用，就是为你生成一个HTML文件，然后将打包好的js文件自动引入到这个html文件中。**

如何配置呢？可以看[webpack官网](https://www.webpackjs.com/plugins/html-webpack-plugin/)

首先第一步下载HtmlWebpackPlugin

```bash
cnpm install --save-dev html-webpack-plugin
```

然后在webpack.config.js中配置如下信息👇

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
            template: 'src/index.html'  // 以src/目录下的index.html为模板打包
        }
    )],
};
```

然后运行npm run dev，就会发现在dist目录下，自动帮你生成一个HTML模块，并且引入bundle.js文件。

`template: 'src/index.html'` 这个配置信息的作用就是告诉你，以具体哪个index.html为模板去打包



### 如何使用CleanWebpackPlugin

这个插件的作用就是会帮你删除某个目录的文件,是在打包前删除所有上一次打包好的文件。

```
cnpm i clean-webpack-plugin -D
//"clean-webpack-plugin": "^3.0.0",我的是这个版本
```

然后配置clean-webpack-plugin的话,需要去对于网站上查看如何配置的,可以点这里👉 [npm上](https://www.npmjs.com/package/clean-webpack-plugin)

配置信息如下👇,这个是最新的clean-webpack-plugin配置

```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// plugins新增加这一项
plugins: [ new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist']
        })]
```

然后运行命令,这样子的话,就可以在打包前,把dist目录下的文件删除



## webpack核心概念



### entry和output基本配置

有时候,你需要多个入口文件,那么我们又是怎么去完成的呢?这个时候,就需要来看一看entry和output配置项

当然了,webpack官网也是有文档的,[out点这里](https://www.webpackjs.com/configuration/output/)以及[entry点这里](https://www.webpackjs.com/configuration/entry-context/)

```js
entry: {
        index :'./src/index.js',
        bundle : './src/create.js',
    },
output: {
        filename: '[name].js',
        publicPath: "https://cdn.example.com/assets/",
        path: path.join(__dirname, 'dist')
    }    
```

**总结**

- entry这样子配置就可以接受多个打包的文件入口,同时的话,output输出文件的filename需要使用占位符name
- 这样子就会生成两个文件,不会报错,对于的名字就是entry名称对应
- 如果后台已经将资源挂载到了cdn上,那么你的publicPath就会把路径前做修改加上publicPath值



### 如何使用devtool配置source-map

devtool配置source-map,解决的问题就是,当你代码出现问题时,会映射到你的原文件目录下的错误,并非是打包好的错误,这点也很显然,如果不设置的话,只会显示打包后bundle.js文件中报错,对应查找错误而言,是很不利的

```js
devtool:'inline-cheap-source-map'
```

对应不同的环境,设置devtool是很有必要的,开发环境中,我们需要看我们代码是哪里报错误,所以需要配置

[webpack官网有文档介绍](https://www.webpackjs.com/configuration/devtool/)

那我们给出结论👇

- development环境下,配置 `devtool:'cheap-module-eval-source-map'`
- production环境下,配置 `devtool:'cheap-module-source-map'`

```
// development devtool:'cheap-module-eval-source-map'
// production  devtool:'cheap-module-source-map'
```

### 如何使用webpack-dev-server

webpack-dev-server 能够用于快速开发应用程序。很多的配置都在webpack官网有,[点击这里](https://www.webpackjs.com/configuration/dev-server/)

首先先下载它

```java
cnpm i clean-webpack-plugin -D
```

它的作用很多,可以开启一个服务器,而且可以实时去监听打包文件是否改变,改变的话,就会出现去更新.

```
devServer: {
        contentBase: path.join(__dirname, "dist"),   // dist目录开启服务器
        compress: true,    // 是否使用gzip压缩
        port: 9000,    // 端口号
        open : true   // 自动打开网页
    },
```

很多的配置项,可以去官方文档查看,比如proxy代理等配置项,更多文档[点击这里](https://www.webpackjs.com/configuration/dev-server/)

然后在package.json中scripts配置项如下

```
"start": "webpack-dev-server"
```

**这个devServer可以实时检测文件是否发生变化**

同时你需要注意的内容就是使用webpack-dev-server打包的话,不会生成dist目录,而是将**你的文件打包到内存中**



**总结**

- devServer可以开启一个本地服务器,同时帮我们更新加载最新资源
- 打包的文件会放在内存中,不会生成dist目录



### 模块热替换(hot module replacement)

模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除[模块](https://www.webpackjs.com/concepts/modules/)，而无需重新加载整个页面。

顾名思义它说的就是,多个模块之前,当你修改一个模块,而不想重新加载整个页面时,就可以使用`hot module replacement`

举个例子,当你修改了css代码中一些样式,不配置HMR模块热替换的话,整个页面都会重新去渲染,这样子是没有必要的,那么我们接下来就去配置👇

```
devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true,
        hot: true,   // 开启热更新
        // hotOnly: true,
    },
```

这个hotOnly可以设置,最主要的是设置`hot:true`

然后加入两个插件,这个插件时webpack自带的,所以不需要下载👇

```
const webpack = require('webpack')
plugins: [
        new webpack.NamedModulesPlugin(),  // 可配置也可不配置
        new webpack.HotModuleReplacementPlugin() // 这个是必须配置的插件
    ],
```

添加了 `NamedModulesPlugin`，以便更容易查看要修补(patch)的依赖。

配置完上述的信息之后,重新去运行命令的话,就会发现启动了`模块热替换`,不同模块的文件更新,只会下载当前模块文件

**总结**

- HMR模块热替换解决的问题就是,它允许在运行时更新各种模块，而无需进行完全刷新。
- 意思就是不需要重新去本地服务器重新去加载其他为修改的资源



更多的配置信息去webpack官网查看,[点这里查看HMR](https://www.webpackjs.com/guides/hot-module-replacement/)
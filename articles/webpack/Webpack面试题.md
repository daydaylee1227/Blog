## Webpack面试题



### webpack基本配置

- 拆分和merge
- 启动服务，webpack-dev-server
- 处理ES6， bable-loader, 需要配置.bablerc文件, preset : bable/preset-env 
- 处理样式： 比如css-loader,需要知道执行顺利是从后往前，也就是说，postcss-loader -->> css-loader -->> style--loader
- 处理图片 file-loader(dev)  url-loader(线上 )  base64格式打包到bundle中去





### webpack高级配置



- 如何配置多个入口文件
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





- 如何抽离css以及压缩css



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



- 抽离公共代码和第三方库代码



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



优化babe







### babel-runtime和babel-polyfill的区别
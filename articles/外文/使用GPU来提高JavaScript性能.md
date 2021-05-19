## 正文

用GPU.js使你的应用程序快10倍。



作为开发者，我们总是寻找机会来提高应用程序的性能。当涉及到网络应用时，我们主要在代码中进行这些改进。

但是，你有没有想过将GPU的力量结合到你的网络应用中来提高性能？

本文将向你介绍一个名为GPU.js的JavaScript加速库，并告诉你如何改进复杂的计算。





## 什么是GPU.js

首先，官网地址:

> https://gpu.rocks/#/

![Source: https://gpu.rocks/#/](../../../Blog/images/外文/使用GPU来提高JavaScript性能/1.png)



简而言之，GPU.js是一个JavaScript加速库，可用于使用JavaScript在GPU上进行通用计算。它支持浏览器、Node.js和TypeScript。

除了性能提升外，我推荐使用GPU.js的原因还有以下几点:

- GPU.js使用JavaScript作为基础，允许你使用JavaScript语法。
- 它承担着将JavaScript自动转译为着色器语言的责任，并对它们进行编译。
- 如果设备中没有GPU，它可以退回到普通的JavaScript引擎。因此，使用GPU.js不会有任何不利因素。
- GPU.js也可以用于并行计算。此外，你可以同时在CPU和GPU上异步地进行多项计算。



所有这些东西加在一起，我不认为有理由不使用GPU.js。因此，让我们看看如何开始使用它。

----



## 如何设置GPU.js？

为您的项目安装GPU.js与其他的JavaScript库类似。



### 对于Node项目

```bash
npm install gpu.js --save
or
yarn add gpu.js
import { GPU } from ('gpu.js')
--- or ---
const { GPU } = require('gpu.js')
--- or ---
import { GPU } from 'gpu.js'; // Use this for TypeScript
const gpu = new GPU();
```



### 对于Bowsers

在本地下载GPU.js或使用其CDN。

```js
<script src="dist/gpu-browser.min.js"></script>
--- or ---
<script 
  src="https://unpkg.com/gpu.js@latest/dist/gpu- browser.min.js">
</script>
<script 
  rc="https://cdn.jsdelivr.net/npm/gpu.js@latest/dist/gpu-browser.min.js">
</script>
<script>
 const gpu = new GPU();
 ...
</script>
```



**注意：**

> 如果你使用的是Linux，你需要确保你安装了正确的文件，运行：**sudo apt install mesa-common-dev libxi-dev**

这就是你需要知道的关于安装和导入GPU.js的情况。

现在，你可以开始在你的应用程序中使用GPU编程。



此外，我强烈建议理解GPU.js的基本功能和概念。所以，让我们从GPU.js的一些基础知识开始。



### 创建函数

你可以在GPU.js中定义函数以在GPU中运行，使用一般的JavaScript语法。

```js
const exampleKernel = gpu.createKernel(function() {
    ...
}, settings);
```



上面的代码样本显示了一个GPU.js函数的基本结构。我将该函数命名为exampleKernel。正如你所看到的，我使用了createKernel函数，利用GPU进行计算。



另外，定义输出的大小是必须的。在上面的例子中，我使用了一个名为settings的参数来指定输出大小。

```js
const settings = {
    output: [100]
};
```



内核函数的输出可以是1D、2D或3D，这意味着它最多可以有3个线程。你可以使用this.thread命令在内核中访问这些线程。

- 1D : [长度] - 值[this.thread.x]
- 2D : [宽度，高度] - 值[this.thread.y][this.thread.x]
- 3D: [宽度，高度，深度] - 值[this.thread.z][this.thread.y][this.thread.x]。



最后，创建的函数可以像其他的JavaScript函数一样使用函数名来调用：**exampleKernel()**



### 内部支持的变量

**Number**

你可以在GPU.js函数中使用任何整数或浮点数。

```js
const exampleKernel = gpu.createKernel(function() {
 const number1 = 10;
 const number2 = 0.10;
 return number1 + number2;
}, settings);
```

**Boolean**

GPU.js中也支持布尔值，与JavaScript类似。

```js
const kernel = gpu.createKernel(function() {
  const bool = true;
  if (bool) {
    return 1;
  }else{
    return 0;
  }
},settings);
```

**Arrays**

你可以在内核函数中定义任何大小的数字数组，并返回它们。

```js
const exampleKernel = gpu.createKernel(function() {
 const array1 = [0.01, 1, 0.1, 10];
 return array1;
}, settings);
```



**Functions**

在内核函数中使用私有函数，在GPU.js中也是允许的。

```js
const exampleKernel = gpu.createKernel(function() {
  function privateFunction() {
    return [0.01, 1, 0.1, 10];
  }
  return privateFunction();
}, settings);
```

---



### 支持的输入类型

除了上述变量类型外，你还可以向内核函数传递几种输入类型。

**Numbers**

与变量声明类似，你可以向内核函数传递整数或浮点数，如下所示。

```js
const exampleKernel = gpu.createKernel(function(x) {
 return x;
}, settings);
exampleKernel(25);
```



**1D,2D, or 3D Array of Numbers**

你可以将Array、Float32Array、Int16Array、Int8Array、Uint16Array、uInt8Array等数组类型传入GPU.js内核。

```js
const exampleKernel = gpu.createKernel(function(x) {
 return x;
}, settings);
exampleKernel([1, 2, 3]);
```

预扁平化的2D和3D数组也被内核函数所接受。这种方法使上传的速度更快，你必须使用GPU.js的输入选项来实现这一点。

```js
const { input } = require('gpu.js');
const value = input(flattenedArray, [width, height, depth]);
```



**HTML Images**

与传统的JavaScript相比，将图像传递到函数中是我们在GPU.js中可以看到的一个新东西。使用GPU.js，你可以将一个或多个HTML图像作为数组传递给内核函数。

```js
//Single Image
const kernel = gpu.createKernel(function(image) {
    ...
})
  .setGraphical(true)
  .setOutput([100, 100]);

const image = document.createElement('img');
image.src = 'image1.png';
image.onload = () => {
  kernel(image);  
  document.getElementsByTagName('body')[0].appendChild(kernel.canvas);
};
//Multiple Images
const kernel = gpu.createKernel(function(image) {
    const pixel = image[this.thread.z][this.thread.y][this.thread.x];
    this.color(pixel[0], pixel[1], pixel[2], pixel[3]);
})
  .setGraphical(true)
  .setOutput([100, 100]);

const image1 = document.createElement('img');
image1.src = 'image1.png';
image1.onload = onload;
....
//add another 2 images
....
const totalImages = 3;
let loadedImages = 0;
function onload() {
  loadedImages++;
  if (loadedImages === totalImages) {
    kernel([image1, image2, image3]);
     document.getElementsByTagName('body')[0].appendChild(kernel.canvas);
  }
};
```

除了上述配置外，还有许多令人兴奋的事情可以用GPU.js进行实验。你可以在其文档中找到它们。既然你现在了解了几种配置，让我们用GPU.js写一个函数并比较其性能。







## 使用GPU.js的第一个功能

通过结合我们之前讨论的所有内容，我写了一个小型的angular应用程序，通过将两个有1000个元素的数组相乘来比较GPU和CPU的计算性能。



### 第1步，生成1000个元素的数组的函数

我将生成一个每个元素有1000个数字的2D数组，并在接下来的步骤中使用它们进行计算。

```js
generateMatrices() {
 this.matrices = [[], []];
 for (let y = 0; y < this.matrixSize; y++) {
  this.matrices[0].push([])
  this.matrices[1].push([])
  for (let x = 0; x < this.matrixSize; x++) {
   const value1 = parseInt((Math.random() * 10).toString())
   const value2 = parseInt((Math.random() * 10).toString())
   this.matrices[0][y].push(value1)
   this.matrices[1][y].push(value2)
  }
 }
}
```



### 第2步,内核函数

这是这个应用程序中最关键的函数，因为所有的GPU计算都发生在这里。

在这里，multiplyMatrix函数将接收两个数字数组和矩阵的大小作为输入。

然后，它将把两个数组相乘并返回总和，同时使用性能API测量时间。

```js
gpuMultiplyMatrix() {
  const gpu = new GPU();
  const multiplyMatrix = gpu.createKernel(function (a: number[][], b: number[][], matrixSize: number) {
   let sum = 0;
  
   for (let i = 0; i < matrixSize; i++) {
    sum += a[this.thread.y][i] * b[i][this.thread.x];
   }
   return sum;
  }).setOutput([this.matrixSize, this.matrixSize])
  const startTime = performance.now();
  const resultMatrix = multiplyMatrix(this.matrices[0],  this.matrices[1], this.matrixSize);
  
  const endTime = performance.now();
  this.gpuTime = (endTime - startTime) + " ms";
  
  console.log("GPU TIME : "+ this.gpuTime);
  this.gpuProduct = resultMatrix as number[][];
}
```



### 步骤3,CPU乘法函数。

这是一个传统的TypeScript函数，用于测量相同数组的计算时间。



```js
cpuMutiplyMatrix() {
  const startTime = performance.now();
  const a = this.matrices[0];
  const b = this.matrices[1];
  let productRow = Array.apply(null, new Array(this.matrixSize)).map(Number.prototype.valueOf, 0);
  let product = new Array(this.matrixSize);
  
  for (let p = 0; p < this.matrixSize; p++) {
    product[p] = productRow.slice();
  }
  
  for (let i = 0; i < this.matrixSize; i++) {
    for (let j = 0; j < this.matrixSize; j++) {
      for (let k = 0; k < this.matrixSize; k++) {
        product[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  const endTime = performance.now();
  this.cpuTime = (endTime — startTime) + “ ms”;
  console.log(“CPU TIME : “+ this.cpuTime);
  this.cpuProduct = product;
}
```



-----



## CPU vs GPU，性能比较

现在是时候看看围绕着GPU.js和GPU计算的所有讨论是否真实。由于我在上一节中创建了一个Angular应用程序，所以我用它来测量性能。

![CPU vs GPU — Execution Time](/Users/lee/Desktop/Blog/images/外文/使用GPU来提高JavaScript性能/2.png)



> 你可以清楚地看到，GPU编程的计算只花了799ms，而CPU花了7511ms，这几乎是10倍的时间。

我没有就此罢休，通过改变数组大小，对同样的测试进行了几个循环。





![CPU vs GPU](../../../Blog/images/外文/使用GPU来提高JavaScript性能/3.png)



首先，我试着用较小的数组大小，我注意到CPU比GPU花费的时间要少。例如，当我把数组大小减少到10个元素时，CPU只花了0.14ms，而GPU花了108ms。



但随着数组大小的增加，GPU和CPU所花的时间有明显的差距。正如你在上图中看到的，GPU是赢家。





## 结论

根据我使用GPU.js的实验，它可以提高JavaScript应用程序的性能。
但是，我们必须注意只将GPU用于复杂的任务。否则，我们将浪费资源，最终会降低应用程序的性能，如上图所示。
不过，如果你还没有尝试过GPU.js，我邀请大家使用它。



谢谢你的阅读！！！







## 参考

https://blog.bitsrc.io/using-gpu-to-improve-javascript-performance-e5a41c2e129b
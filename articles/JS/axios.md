## 前言

梳理一下对Axios的使用，总结一下该知识点。



## Axios是什么

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中使用。



## Axios 功能

也是它的一些特点，有以下几点👇

- 基于promise的异步ajax请求库
- 浏览器/node端都可以使用
- 支持请求/响应式拦截
- 支持请求取消
- 自动转换JSON数据
- 转换请求数据和响应数据
- 客户端支持防御XSRF





## 如何使用

[查看文中文档](http://www.axios-js.com/zh-cn/docs/)



**常用API**

### axios(config)

```
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

### axios(url[, config])

```
// 发送 GET 请求（默认的方法）
axios('/user/12345');
```

### 处理并发请求的助手函数

##### axios.all(iterable)

##### axios.spread(callback)



### axios.create([config])

```
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

### 实例方法

以下是可用的实例方法。指定的配置将与实例的配置合并

```
axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#options(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
```

### 请求配置

这些是创建请求时可以用的配置选项。只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `get` 方法。





## 请求拦截器 

在请求或响应被 `then` 或 `catch` 处理前拦截它们。

```
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


```



**注意：**对于设置多个请求拦截器而言，执行的顺序是先执行后面的请求拦截，也就是说是**从后往前执行**拦截器中的回调函数。



## 响应拦截器



在请求或响应被 `then` 或 `catch` 处理前拦截它们。

```
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

设置多个响应拦截器时，是按照顺序去执行响应拦截器中的回调函数。



可以为自定义 axios 实例添加拦截器

```
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```



## 取消请求

使用 *cancel token* 取消请求

```
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// cancel the request
cancel();
```

注意: 可以使用同一个 cancel token 取消多个请求



## 使用 application/x-www-form-urlencoded format

默认情况下，axios将JavaScript对象序列化为JSON。 要以application / x-www-form-urlencoded格式发送数据，您可以使用以下选项之一。



您可以使用qs库编码数据：

```
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

或者以另一种方式（ES6），

```
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```


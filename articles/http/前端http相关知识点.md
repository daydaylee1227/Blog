## 前言

这次梳理的篇幅主要是涉及网络部分，包括HTTP，TCP等协议，有了更加深入的了解，对巩固自己的网络知识体系也是很有帮助的，进一步的对性能优化上也是帮助很大的。





> 感谢掘友的鼓励与支持🌹🌹🌹，往期文章都在最后梳理出来了(●'◡'●)



接下来就以问题的形式展开梳理👇



## HTTP协议

**HTTP就是一个用文本格式描述报文头并用双换行分隔报文头和内容，在TCP基础上实现的请求-响应模式的双向通信协议。**





## HTTP 状态码知道哪些？分别什么意思？

RFC 规定 HTTP 的状态码为**三位数**，第一个数字定义了响应的类别，被分为五类:

- **1xx**: 代表请求已被接受，需要继续处理。
- **2xx**: 表示成功状态。
- **3xx**: 重定向状态。
- **4xx**: 客户端错误。
- **5xx**: 服务器端错误。



### 1xx 信息类

接受的请求正在处理，信息类状态码。

### 2xx 成功

- 200 OK 表示从客户端发来的请求在服务器端被正确请求。
- 204 No content，表示请求成功，但没有资源可返回。
- 206 Partial Content，该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的 GET 请求
  响应报文中包含由 **Content-Range** 指定范围的实体内容。



### 3xx 重定向

- 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL，这时应该按 Location 首部字段提示的 URI 重新保存。
- 302 found，临时性重定向，表示资源临时被分配了新的 URL。
- 303 see other，表示资源存在着另一个 URL，应使用 GET 方法获取资源。
- 304 not modified，当协商缓存命中时会返回这个状态码。
- 307 temporary redirect，临时重定向，和302含义相同



>当 301、302、303 响应状态码返回时，几乎所有的浏览器都会把 POST 改成 GET，并删除请求报文内的主体，之后请求会自动再次发送
>301、302 标准是禁止将 POST 方法改变成 GET 方法的，但实际使用时大家都会这么做



### 4XX 客户端错误

- 400 bad request，请求报文存在语法错误。
- 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息。
- 403 forbidden，表示对请求资源的访问被服务器拒绝。
- 404 not found，表示在服务器上没有找到请求的资源。
- 405 Method Not Allowed，服务器禁止使用该方法，客户端可以通过options方法来查看服务器允许的访问方法，如下 👇

```
Access-Control-Allow-Methods →GET,HEAD,PUT,PATCH,POST,DELETE
```



### 5XX 服务器错误

- 500 internal sever error，表示服务器端在执行请求时发生了错误。
- 502 Bad Gateway，服务器自身是正常的，访问的时候出了问题，具体啥错误我们不知道。
- 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求。





------





## HTTP 缓存有哪几种？

需要详细的了解 ETag、Cache-Control、Expires 的异同

答题要点：

- ETag 是通过对比浏览器和服务器资源的特征值（如MD5）来决定是否要发送文件内容，如果一样就只发送 304（not modified）
- Expires 是设置过期时间（绝对时间），但是如果用户的本地时间错乱了，可能会有问题
- Cache-Control: max-age=3600 是设置过期时长（相对时间），跟本地时间无关。

我在我之前的那一篇中已经详细的说过了，[点这里传送门聊一聊浏览器缓存](https://juejin.im/post/5f184aade51d4534aa4ad7c0#heading-40)



------



## 说一说HTTP 的请求方法？

`http/1.1`规定了以下请求方法(注意，都是大写):

- GET：                请求获取Request-URI所标识的资源
- POST：              在Request-URI所标识的资源后附加新的数据
- HEAD：             请求获取由Request-URI所标识的资源的响应消息报头
- PUT：                请求服务器存储一个资源，并用Request-URI作为其标识（修改数据）
- DELETE：          请求服务器删除对应所标识的资源
- TRACE：            请求服务器回送收到的请求信息，主要用于测试或诊断
- CONNECT：      建立连接隧道，用于代理服务器
- OPTIONS：        列出可对资源实行的请求方法，用来跨域请求



---------



## GET 和 POST 的区别

本质上，只是语义上的区别，GET 用于获取资源，POST 用于提交资源。

想装逼请参考 https://zhuanlan.zhihu.com/p/22536382

具体差别👇

- 从缓存角度看，GET 请求后浏览器会主动缓存，POST 默认情况下不能。
- 从参数角度来看，GET请求一般放在URL中，因此不安全，POST请求放在请求体中，相对而言较为安全，但是在抓包的情况下都是一样的。
- 从编码角度看，GET请求只能经行URL编码，只能接受ASCII码，而POST支持更多的编码类型且不对数据类型限值。
- GET请求幂等，POST请求不幂等，幂等指发送 M 和 N 次请求（两者不相同且都大于1），服务器上资源的状态一致。
- GET请求会一次性发送请求报文，POST请求通常分为两个TCP数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。



从应用场景角度来看，Get 多用于无副作用，幂等的场景，例如搜索关键字。Post 多用于副作用，不幂等的场景，例如注册。

-----------



## 谈一谈你对URL理解

统一资源定位符的简称，Uniform Resource Locator，常常被称为网址，是因特网上标准的资源地址。

### 组成

通用的格式：scheme://host[:port]/path/…/?query#anchor



| 名称         | 功能                                                         |
| ------------ | :----------------------------------------------------------- |
| scheme       | 访问服务器以获取资源时要使用哪种协议，比如：http，https 和 FTP 等 |
| host         | HTTP 服务器的 IP 地址或者域名                                |
| port         | HTTP 服务器的默认端口是 80，HTTPS默认端口是443，这种情况下端口号可以省略，如果使用了别的端口，必须指明。不同的端口，你可以认为是不同的应用程序。 |
| path         | 访问资源的路径                                               |
| query-string | 发给 http 服务器的数据                                       |
| anchor       | 锚点                                                         |

举个例子👇

```
https://www.baidu.com/s?tn=baidu&bar=&wd=TianTian
```

这个URL中，https就是协议，www.baidu.com就是域名，默认端口是443，/s就是请求的path，`tn=baidu&bar=&wd=TianTian`这个就是query



## URL 编码

- URL 只能使用 [ASCII 字符集](https://www.w3school.com.cn/tags/html_ref_ascii.asp)来通过因特网进行发送。
- 由于 URL 常常会包含 ASCII 集合之外的字符，URL 必须转换为有效的 ASCII 格式。
- URL 编码使用 "%" 其后跟随两位的十六进制数来替换非 ASCII 字符。
- URL 不能包含空格。URL 编码通常使用 + 来替换空格。

举个例子👇

`天天`转换为有效的ASCII格式就是`%CC%EC%CC%EC`



-------



## 对Accept系列字段理解









------------





## HTTP代理



----------



## 队头阻塞问题





------





## HTTP数据传输



-------------



## HTTPS与HTTP



-------



## HTTP/1.0 与HTTP/1.1



## 参考

- [图解 HTTP 缓存](https://juejin.im/post/5eb7f811f265da7bbc7cc5bd)
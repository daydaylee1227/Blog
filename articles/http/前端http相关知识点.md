## 前言

这次梳理的篇幅主要是涉及网络部分，包括HTTP，TCP等协议，有了更加深入的了解，对巩固自己的网络知识体系也是很有帮助的，进一步的对性能优化上也是帮助很大的。





> 感谢掘友的鼓励与支持🌹🌹🌹，往期文章都在最后梳理出来了(●'◡'●)



接下来就以问题的形式展开梳理👇



## 谈一谈HTTP协议优缺点

超文本传输协议，**HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范**。

### HTTP 特点

1. **灵活可扩展**。一个是语法上只规定了基本格式，空格分隔单词，换行分隔字段等。另外一个就是传输形式上不仅可以传输文本，还可以传输图片，视频等任意数据。
2. **请求-应答模式**，通常而言，就是一方发送消息，另外一方要接受消息，或者是做出相应等。
3. **可靠传输**，HTTP是基于TCP/IP，因此把这一特性继承了下来。
4. **无状态**，这个分场景回答即可。

### HTTP 缺点

1. **无状态**，有时候，需要保存信息，比如像购物系统，需要保留下顾客信息等等，另外一方面，有时候，无状态也会减少网络开销，比如类似直播行业这样子等，这个还是分场景来说。
2. **明文传输**，即协议里的报文(主要指的是头部)不使用二进制数据，而是文本形式。这让HTTP的报文信息暴露给了外界，给攻击者带来了便利。
3. **队头阻塞**，当http开启长连接时，共用一个TCP连接，当某个请求时间过长时，其他的请求只能处于阻塞状态，这就是队头阻塞问题。





-------



## HTTP/1.0 HTTP1.1 HTTP2.0版本之间的差异

### HTTP 0.9

- 1991年,原型版本，功能简陋，只有一个命令GET,只支持纯文本内容，该版本已过时。



### HTTP 1.0

- 任何格式的内容都可以发送，这使得互联网不仅可以传输文字，还能传输图像、视频、二进制等文件。
- 除了GET命令，还引入了POST命令和HEAD命令。
- http请求和回应的格式改变，除了数据部分，每次通信都必须包括头信息（HTTP header），用来描述一些元数据。
- 只使用 header 中的 If-Modified-Since 和 Expires 作为缓存失效的标准。
- 不支持断点续传，也就是说，每次都会传送全部的页面和数据。
- 通常每台计算机只能绑定一个 IP，所以请求消息中的 URL 并没有传递主机名（hostname）

### HTTP 1.1

http1.1是目前最为主流的http协议版本，从1999年发布至今，仍是主流的http协议版本。

- 引入了持久连接（ persistent connection），即TCP连接默认不关闭，可以被多个请求复用，不用声明Connection: keep-alive。长连接的连接时长可以通过请求头中的 `keep-alive` 来设置
- 引入了管道机制（ pipelining），即在同一个TCP连接里，客户端可以同时发送多个
  请求，进一步改进了HTTP协议的效率。
- HTTP 1.1 中新增加了 E-tag，If-Unmodified-Since, If-Match, If-None-Match 等缓存控制标头来控制缓存失效。
- 支持断点续传，通过使用请求头中的 `Range` 来实现。
- 使用了虚拟网络，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。
- 新增方法：PUT、 PATCH、 OPTIONS、 DELETE。



### http1.x版本问题

- 在传输数据过程中，所有内容都是明文，客户端和服务器端都无法验证对方的身份，无法保证数据的安全性。
- HTTP/1.1 版本默认允许复用TCP连接，但是在同一个TCP连接里，所有数据通信是按次序进行的，服务器通常在处理完一个回应后，才会继续去处理下一个，这样子就会造成队头阻塞。
- http/1.x 版本支持Keep-alive，用此方案来弥补创建多次连接产生的延迟，但是同样会给服务器带来压力，并且的话，对于单文件被不断请求的服务，Keep-alive会极大影响性能，因为它在文件被请求之后还保持了不必要的连接很长时间。



### HTTP 2.0

- `二进制分帧`  这是一次彻底的二进制协议，头信息和数据体都是二进制，并且统称为"帧"：头信息帧和数据帧。
- `头部压缩`  HTTP 1.1版本会出现 **User-Agent、Cookie、Accept、Server、Range** 等字段可能会占用几百甚至几千字节，而 Body 却经常只有几十字节，所以导致头部偏重。HTTP 2.0 使用 `HPACK` 算法进行压缩。
- `多路复用` 复用TCP连接，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应，且不用按顺序一一对应，这样子解决了队头阻塞的问题。
- `服务器推送` 允许服务器未经请求，主动向客户端发送资源，即服务器推送。
- `请求优先级` 可以设置数据帧的优先级，让服务端先处理重要资源，优化用户体验。







-----------------------



## 谈一谈你对HTTP/2理解 

### 头部压缩

HTTP 1.1版本会出现 **User-Agent、Cookie、Accept、Server、Range** 等字段可能会占用几百甚至几千字节，而 Body 却经常只有几十字节，所以导致头部偏重。

HTTP 2.0 使用 `HPACK` 算法进行压缩。





## 介绍一下HTTP 常见状态码

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
- 307 temporary redirect，临时重定向，和302含义相同,不会改变method



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



## 介绍一下Connection为keep-alive表示什么

### 什么是keep-alive

我们知道HTTP协议采用“请求-应答”模式，当使用普通模式，即非KeepAlive模式时，每个请求/应答客户和服务器都要新建一个连接，完成 之后立即断开连接（HTTP协议为无连接的协议）；

当使用Keep-Alive模式（又称持久连接、连接重用）时，Keep-Alive功能使客户端到服 务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接。



### 为什么要使用keep-alive

keep-alive技术的创建目的，能在多次HTTP之前重用同一个TCP连接，从而减少创建/关闭多个 TCP 连接的开销（包括响应时间、CPU 资源、减少拥堵等），参考如下示意图（来源：维基百科）：

![](C:\Users\DayDay\Desktop\Blog\images\http\keep-alive-demonstration.svg)





### 客户端如何开启

在HTTP/1.0协议中，默认是关闭的，需要在http头加入"Connection: Keep-Alive”，才能启用Keep-Alive；

```
Connection: keep-alive
```

http 1.1中默认启用Keep-Alive，如果加入"Connection: close “，才关闭。

```
Connection: close
```

目前大部分浏览器都是用http1.1协议，也就是说默认都会发起Keep-Alive的连接请求了，所以是否能完成一个完整的Keep- Alive连接就看服务器设置情况。





---------------





## 介绍HTTP 缓存策略

这个跟之前的浏览器缓存原理一样，我直接拿我之前梳理过的吧。

我在我之前的那一篇中已经详细的说过了，[点这里传送门聊一聊浏览器缓存](https://juejin.im/post/5f184aade51d4534aa4ad7c0#heading-40)

我们来梳理一下吧👇



### 强缓存

强缓存两个相关字段，**Expires**，**Cache-Control**。

**强缓存分为两种情况，一种是发送HTTP请求，一种不需要发送。**

首先检查强缓存，这个阶段**不需要发送HTTP请求。**通过查找不同的字段来进行，不同的HTTP版本所以不同。

- HTTP1.0版本，使用的是Expires，HTTP1.1使用的是Cache-Control



#### Expires

`Expires`即过期时间，时间是相对于服务器的时间而言的，存在于服务端返回的响应头中，在这个过期时间之前可以直接从缓存里面获取数据，无需再次请求。比如下面这样:

```
Expires:Mon, 29 Jun 2020 11:10:23 GMT
```

表示该资源在2020年`7月29日11:10:23`过期，过期时就会重新向服务器发起请求。

这个方式有一个问题：**服务器的时间和浏览器的时间可能并不一致**，所以HTTP1.1提出新的字段代替它。

#### Cache-Control

HTTP1.1版本中，使用的就是该字段，这个字段采用的时间是过期时长，对应的是max-age。

```
Cache-Control:max-age=6000
```

上面代表该资源返回后6000秒，可以直接使用缓存。

当然了，它还有其他很多关键的指令，梳理了几个重要的👇



注意点：

- 当Expires和Cache-Control同时存在时，优先考虑Cache-Control。
- 当然了，当缓存资源失效了，也就是没有命中强缓存，接下来就进入协商缓存👇



### 协商缓存

强缓存失效后，浏览器在请求头中携带响应的`缓存Tag`来向服务器发送请求，服务器根据对应的tag，来决定是否使用缓存。

缓存分为两种，**Last-Modified** 和 **ETag**。两者各有优势，并不存在谁对谁有`绝对的优势`，与上面所讲的强缓存两个Tag所不同。

#### Last-Modified

这个字段表示的是**最后修改时间**。在浏览器第一次给服务器发送请求后，服务器会在响应头中加上这个字段。

浏览器接收到后，**如果再次请求**，会在请求头中携带`If-Modified-Since`字段，这个字段的值也就是服务器传来的最后修改时间。

服务器拿到请求头中的`If-Modified-Since`的字段后，其实会和这个服务器中`该资源的最后修改时间`对比:

- 如果请求头中的这个值小于最后修改时间，说明是时候更新了。返回新的资源，跟常规的HTTP请求响应的流程一样。
- 否则返回304，告诉浏览器直接使用缓存。





#### ETag

ETag是服务器根据当前文件的内容，对文件生成唯一的标识，比如MD5算法，只要里面的内容有改动，这个值就会修改，服务器通过把响应头把该字段给浏览器。

浏览器接受到ETag值，会在下次请求的时候，将这个值作为**If-None-Match**这个字段的内容，发给服务器。

服务器接收到**If-None-Match**后，会跟服务器上该资源的**ETag**进行比对👇

- 如果两者一样的话，直接返回304，告诉浏览器直接使用缓存
- 如果不一样的话，说明内容更新了，返回新的资源，跟常规的HTTP请求响应的流程一样



#### 两者对比

- 性能上，`Last-Modified`优于`ETag`，`Last-Modified`记录的是时间点，而`Etag`需要根据文件的MD5算法生成对应的hash值。
- 精度上，`ETag`优于`Last-Modified`。`ETag`按照内容给资源带上标识，能准确感知资源变化，`Last-Modified`在某些场景并不能准确感知变化，比如👇
  - 编辑了资源文件，但是文件内容并没有更改，这样也会造成缓存失效。
  - Last-Modified 能够感知的单位时间是秒，如果文件在 1 秒内改变了多次，那么这时候的 Last-Modified 并没有体现出修改了。



最后，**如果两种方式都支持的话，服务器会优先考虑`ETag`**。



### 缓存位置

接下来我们考虑使用缓存的话，缓存的位置在哪里呢？

浏览器缓存的位置的话，可以分为四种,优先级从高到低排列分别👇

- Service Worker
- Memory Cache
- Disk Cache
- Push Cache

#### Service Worker

这个应用场景比如PWA，它借鉴了Web Worker思路，由于它脱离了浏览器的窗体，因此无法直接访问DOM。它能完成的功能比如：`离线缓存`、`消息推送`和`网络代理`，其中`离线缓存`就是**Service Worker Cache**。



#### Memory Cache

指的是内存缓存，从效率上讲它是最快的，从存活时间来讲又是最短的，当渲染进程结束后，内存缓存也就不存在了。

#### Disk Cache

存储在磁盘中的缓存，从存取效率上讲是比内存缓存慢的，优势在于存储容量和存储时长。



#### Disk Cache VS Memory Cache

两者对比，主要的策略👇

内容使用率高的话，文件优先进入磁盘

比较大的JS，CSS文件会直接放入磁盘，反之放入内存。



#### Push Cache

推送缓存，这算是浏览器中最后一道防线吧，它是`HTTP/2`的内容。具体我也不是很清楚，有兴趣的可以去了解。



### 总结

- 首先检查`Cache-Control`， 尝鲜，看强缓存是否可用
- 如果可用的话，直接使用
- 否则进入协商缓存，发送HTTP请求，服务器通过请求头中的`If-Modified-Since`或者`If-None-Match`字段检查资源是否更新
- 资源更新，返回资源和200状态码。
- 否则，返回304，直接告诉浏览器直接从缓存中去资源。



------



## 说一说HTTP 的请求方法？

- HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法
- HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT

`http/1.1`规定了以下请求方法(注意，都是大写):

- GET：                请求获取Request-URI所标识的资源
- POST：              在Request-URI所标识的资源后附加新的数据
- HEAD：             请求获取由Request-URI所标识的资源的响应消息报头
- PUT：                请求服务器存储一个资源，并用Request-URI作为其标识（修改数据）
- DELETE：          请求服务器删除对应所标识的资源
- TRACE：            请求服务器回送收到的请求信息，主要用于测试或诊断
- CONNECT：      建立连接隧道，用于代理服务器
- OPTIONS：       列出可对资源实行的请求方法，用来跨域请求



---------



## 谈一谈GET 和 POST 的区别

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



### URL 编码

- URL 只能使用 [ASCII 字符集](https://www.w3school.com.cn/tags/html_ref_ascii.asp)来通过因特网进行发送。
- 由于 URL 常常会包含 ASCII 集合之外的字符，URL 必须转换为有效的 ASCII 格式。
- URL 编码使用 "%" 其后跟随两位的十六进制数来替换非 ASCII 字符。
- URL 不能包含空格。URL 编码通常使用 + 来替换空格。

举个例子👇

`天天`转换为有效的ASCII格式就是`%CC%EC%CC%EC`



-------



## 对Accept系列字段理解









------------





## 谈一谈HTTP代理





----------



## 谈一谈队头阻塞问题

### 什么是队头阻塞？

对于每一个HTTP请求而言，这些任务是会被放入一个任务队列中串行执行的，一旦队首任务请求太慢时，就会阻塞后面的请求处理，这就是`HTTP队头阻塞`问题。

有什么解决办法吗👇

### 并发连接

我们知道对于一个域名而言，是允许分配多个长连接的，那么可以理解成增加了任务队列，也就是说不会导致一个任务阻塞了该任务队列的其他任务，在`RFC规范`中规定客户端最多并发2个连接，不过实际情况就是要比这个还要多，举个例子，Chrome中是6个。



### 域名分片

顾名思义，我们可以在一个域名下分出多个二级域名出来，而它们最终指向的还是同一个服务器，这样子的话就可以并发处理的任务队列更多，也更好的解决了队头阻塞的问题。

举个例子，比如`TianTian.com`，可以分出很多二级域名，比如`Day1.TianTian.com`，`Day2.TianTian.com`,`Day3.TianTian.com`,这样子就可以有效解决队头阻塞问题。





------





## 谈一谈HTTP数据传输

大概遇到的情况就分为**定长数据** 与 **不定长数据**的处理吧。

### 定长数据

对于定长的数据包而言，发送端在发送数据的过程中，需要设置`Content-Length`,来指明发送数据的长度。

当然了如果采用了Gzip压缩的话，Content-Length设置的就是压缩后的传输长度。

我们还需要知道的是👇

- Content-Length如果存在并且有效的话，则必须和消息内容的传输长度完全一致，也就是说，如果过短就会截断，过长的话，就会导致超时。
- 如果采用短链接的话，直接可以通过服务器关闭连接来确定消息的传输长度。
- 那么在HTTP/1.0之前的版本中，Content-Length字段可有可无,因为一旦服务器关闭连接，我们就可以获取到传输数据的长度了。
- 在HTTP/1.1版本中，如果是Keep-alive的话，chunked优先级高于`Content-Length`,若是非Keep-alive，跟前面情况一样，Content-Length可有可无。

那怎么来设置`Content-Length`

举个例子来看看👇

```

const server = require('http').createServer();
server.on('request', (req, res) => {
  if(req.url === '/index') {
  	// 设置数据类型
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', 10);
    res.write("你好，使用的是Content-Length设置传输数据形式");
  }
})

server.listen(3000, () => {
  console.log("成功启动--TinaTian");
})

```





### 不定长数据

现在采用最多的就是HTTP/1.1版本，来完成传输数据，在保存Keep-alive状态下，当数据是不定长的时候，我们需要设置新的头部字段👇

```
Transfer-Encoding: chunked
```

通过chunked机制，可以完成对不定长数据的处理，当然了，你需要知道的是

- 如果头部信息中有`Transfer-Encoding`,优先采用Transfer-Encoding里面的方法来找到对应的长度。
- 如果设置了Transfer-Encoding，那么Content-Length将被忽视。
- 使用长连接的话，会持续的推送动态内容。



那我们来模拟一下吧👇



```
const server = require('http').createServer();
server.on('request', (req, res) => {
  if(req.url === '/index') {
  	// 设置数据类型
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.setHeader('Content-Length', 10);
    res.setHeader('Transfer-Encoding', 'chunked');
    
    res.write("你好，使用的是Transfer-Encoding设置传输数据形式");
    setTimeout(() => {
      res.write("第一次传输数据给您<br/>");
    }, 1000);
    res.write("骚等一下");
    setTimeout(() => {
      res.write("第一次传输数据给您");
      res.end()
    }, 3000);
  }
})

server.listen(3000, () => {
  console.log("成功启动--TinaTian");
})

```



上面使用的是nodejs中http模块，有兴趣的小伙伴可以去试一试，以上就是HTTP对**定长数据**和**不定长数据**传输过程中的处理手段。





-------------









## 介绍一下HTTPS和HTTP区别





## 介绍一个HTTPS工作原理







-------







## 参考

- [听说『99% 的人都理解错了 HTTP 中 GET 与 POST 的区别』？？](https://zhuanlan.zhihu.com/p/25028045)
- [如何理解HTTP响应的状态码？](https://harttle.land/2015/08/15/http-status-code.html#header-11)
- [HTTP 响应代码 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
- [图解 HTTP 缓存](https://juejin.im/post/5eb7f811f265da7bbc7cc5bd)
- [看完这篇HTTP，跟面试官扯皮就没问题了](https://juejin.im/post/5e1870736fb9a02fef3a5dcb#heading-40)
- [HTTP keep-alive 二三事](https://lotabout.me/2019/Things-about-keepalive/)
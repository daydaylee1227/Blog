导语：在 Web 身份验证中，如何在Cookie 和 Tokens之间进行选择。

![](../../images/外文/Web 身份验证：Cookie 与 Tokens/1.jpeg)





因此，在这篇文章中，我将讨论基于**Tokens**的认证与基于**cookie**的认证的特点、优点、缺点和比较，以帮助你决定适合你的项目的最佳方法。







# 基于Cookie的认证

认证是将用户凭证换成一块独特的标识的过程。

基于cookie的认证中，这种独特的标识符（cookie）是在服务器端创建并发送给浏览器的。

当你登录到一个网络应用程序时，你的浏览器将从其应用程序的服务器上收到一个cookie，浏览器将储存它，并在以后的每个请求中发送该cookie，以验证请求来自同一个用户。



为了更好地理解cookie的工作原理，我们把这个过程分成5个部分。



### 第一,用户使用凭证登录到应用程序。

![](../../images/外文/Web 身份验证：Cookie 与 Tokens/2.png)

### 第二,服务器验证凭证并在数据库中创建一个会话。

服务器验证凭证并在数据库中创建一个会话。

注意：**虽然有可能在内存中创建会话，但这是不可扩展的。**

![](../../images/外文/Web 身份验证：Cookie 与 Tokens/3.png)



### 第三,服务器通过将cookie包含在Set-Cookie头中对浏览器进行响应。

![](/Users/lee/Blog/images/外文/Web 身份验证：Cookie 与 Tokens/4.png)

这个cookie是以名称值对的形式发送的，它包含一个唯一的id来识别用户。
除此之外，cookie还可以包含一些细节，如到期日、域名和年龄。带有多个Set-Cookie头的样本响应将看起来像这样。



```js
HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie: <cookie-name>=<cookie-value>
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<number>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly

[page content]
```



注意：你也可以使用一个Set-Cookie头来设置多个属性（Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain>; Secure; HttpOnly）。



### 第四，浏览器将Cookie存储在存储器中，并在随后的请求中发送它。

![](/Users/lee/Blog/images/外文/Web 身份验证：Cookie 与 Tokens/5.png)

当服务器收到一个带有Cookie的请求时，它将把Cookie中的会话ID与数据库中的会话进行比较，以验证用户的身份。

你可以使用开发工具在应用部分的Cookie存储中找到保存在浏览器中的所有Cookie。





![](/Users/lee/Blog/images/外文/Web 身份验证：Cookie 与 Tokens/赛后.png)



### 第五，当用户注销时，服务器将从数据库中删除该会话。

![](/Users/lee/Blog/images/外文/Web 身份验证：Cookie 与 Tokens/7.png)



一旦用户从系统中注销，服务器将通过清除数据库会话来使Cookie失效。浏览器也会通过从Cookie存储器中删除它来完成同样的工作。

既然你已经了解了基于Cookie的认证是如何工作的，让我们看看基于Cookie的认证的特点、优点和缺点。



**这是一个完全自动化的过程。**



如果你使用Cookies进行认证，你不需要明确地开发任何东西来将Cookies添加到请求中。

浏览器将负责处理Cookie，它将自动为所有的请求添加Cookie。

虽然这种自动化过程使开发人员的工作变得简单，但也有一些缺点。例如，有些请求不需要任何认证。但是，使用这种方法，Cookie将在每个请求中被发送。



> 此外，CSRF攻击者可以利用这一机制，欺骗浏览器将带有Cookie的请求发送到虚假网站。





**安全测量。**
默认情况下，基于Cookie的认证没有坚实的保护措施，它们主要容易受到跨站脚本（XSS）和跨站请求伪造（CSRF）攻击。
但是，我们可以明确地修改Cookie头，使其免受此类攻击。
例如，通过在设置Cookie头时使用HttpOnly属性，可以轻松地保护Cookie免受XSS攻击。

```
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
```

此外，我们还可以在cookie头中使用SameSite属性来有效防止CSRF攻击。

```
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax
```



SameSite属性可以使用3个值:

SameSite=Lex，将确保浏览器不会在跨站请求中发送Cookie（如果你不定义SameSite属性，这就是Cookie的默认行为）。
SameSite=Strict将确保浏览器只对同站请求发送Cookie。
SameSite=Note将允许你在跨站和同站请求时都发送Cookies。



**通常在单个域上工作。**



除非你特别配置，否则Cookies只能在一个单一的域名上工作。
虽然从外表上看，它是一个限制，但在默认情况下，它是执行单源的最强大的功能之一。
但是，如果你的前端和后端（API）来自不同的域或子域，你需要在Cookie中明确地将其列入白名单。否则，浏览器不会将Cookie与请求一起发送。



**不适合于API。**

如果你正在建立一个API来向客户提供服务，那么Cookies并不是一个好的选择。除非客户端是一个浏览器，否则它将使客户端的事情变得复杂。
例如，如果你开发一个移动应用程序，与token相比，拥有Cookies将使移动应用程序难以管理Cookie。



**可能存在可扩展性问题。**

正如所解释的，服务器负责Cookie的配置，我们需要为每个用户在数据库中保存会话。
虽然有成熟的方法来处理可扩展性（例如，使用Redis等内存数据库作为会话存储），但它仍然增加了更多的复杂性。
但是，随着用户数量的增加，在扩展和管理这些会话时可能会出现问题。



**最适合于存储额外的数据。**

由于这种方法为每个用户保持独立的会话，我们可以存储附加在会话上的数据。
通过Cookies和会话，我们可以存储特定的数据，如用户的个性化、访问控制和会话。然后，它允许我们在随后的请求中使用它。
然而，也可以用Tokens来做这件事。例如，用JWT令牌，我们可以存储Claims数据。然而，由于这将增加Token的大小，保留更多的会影响到更高的网络利用率。
如果我们考虑一个单一的请求，这可能没有意义，但当事情聚合和扩展时，开销可能变得可见。



**可以在浏览器中限制对Cookie的访问。**

由于Cookie提供了HTTP-Only的选项，我们可以限制JavaScript对它的访问。此外，它还可以防止任何对Cookie的跨站脚本攻击的访问。



# 基于令牌的认证

基于令牌的认证是为了解决基于Cookie的方法的几个缺点而引入的。

与Cookie不同，基于令牌的方法需要手动实现，令牌保存在客户端。

当你登录到一个网络应用程序时，服务器将验证你的凭证并向浏览器发送一个加密的令牌。然后，浏览器将存储这个令牌，并可以添加到未来请求的授权头中。

然而，基于令牌的方法的标准实现比上面描述的流程更复杂。例如，OpenID Connect引入了多种认证流程以解决不同类型的用例。

为了更好地理解令牌的工作原理，让我们把这个过程分成4个部分，并以JWT（最广泛使用的令牌标准）为例。

JSON Web Token（JWT）是基于令牌的认证中最常用的开放标准。



### 第一步，用户使用凭证登录到应用程序。

![](/Users/lee/Blog/images/外文/Web 身份验证：Cookie 与 Tokens/8.png)





### 第二步，服务器验证凭证，生成一个令牌，用秘钥签名，并将其发回给浏览器。

![](/Users/lee/Blog/images/外文/Web 身份验证：Cookie 与 Tokens/9.png)



通常情况下，你需要在传输过程中使用SSL等加密技术来保证通道的安全。
在服务器端，你可以使用jsonwebtoken这样的NPM库来生成这些令牌。

```
// Install
npm install jsonwebtoken
// Usage
var jwt = require('jsonwebtoken');
var token = jwt.sign(
              { data: user}, 
              privateKey, 
              { algorithm: 'RS256'},
              exp: Math.floor(Date.now() / 1000) + (60 * 60),            );
```



从jsonwebtoken库生成的令牌看起来如下：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```



该令牌由3部分组成，头、有效载荷和签名（header.payload.signature）。它们被一个.所分割，你可以使用jwt.io网站来解析令牌信息。



![](/Users/lee/Blog/images/外文/Web 身份验证：Cookie 与 Tokens/10.png)



### 第三步，将令牌存储在浏览器存储器中，并使用JavaScript添加到后续请求中。

![](/Users/lee/Blog/images/外文/Web 身份验证：Cookie 与 Tokens/11.png)

浏览器可以将此令牌存储在本地存储、会话存储或 Cookie 存储中。然后这个令牌将被添加到必要的请求的授权头中，并被发送到服务器端进行请求验证。因此，将令牌添加到标头中需要用JavaScript来实现。



```
Authorization: Bearer <token>
```

此外，你可以使用jsonwebtoken库中的jwt.decode()函数来解码这个令牌，并在应用程序中使用有效载荷数据。





### 当用户注销时，你需要从其存储中手动删除令牌。



一旦用户从系统中注销，你需要手动清除存储在存储器中的令牌，使其对进一步的请求不可用。
既然你现在明白了基于令牌的认证是如何工作的，让我们看看基于令牌的认证的特点、优点和缺点。



有哪些优点

**它是一种无状态机制。**

与Cookies不同，基于令牌的方法是无状态的。这意味着它不在数据库或服务器中保存任何关于用户的信息。

服务器只负责创建、验证令牌，这允许建立比基于Cookie的方法更可扩展的解决方案。



**安全问题。**

尽管令牌试图解决Cookies中的安全问题，但它并不完全是防弹的。
如果你的应用程序允许外部的JavaScripts嵌入到你的应用程序中，保存在浏览器中的令牌就有可能受到XSS攻击。
此外，由于令牌是无状态的，如果暴露在外面，就没有办法撤销它，直到它过期。所以，尽可能地减少令牌的数量是至关重要的。我看到许多身份服务将5分钟作为JWT令牌的默认时间，如ID令牌和访问令牌。





# 总结

基于令牌和基于Cookie的方法是Web应用中最常用的两种认证机制。在这篇文章中，我讨论了它们是如何工作的，它们的特点，优点，和缺点。
正如我们所看到的，这些方法都不是100%完美的，而且它们有一些缺点。
因此，在选择认证方法时，我建议你根据你的项目要求来选择，而不是去追求完美的方法。
谢谢您的阅读！！！。

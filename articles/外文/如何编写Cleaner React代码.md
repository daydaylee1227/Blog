## 正文

作为React开发者，我们都希望写出更干净的代码，更简单，更容易阅读。



在本指南中，我把一些编写更干净的React代码的七个顶级方法放在一起，使得构建React项目和审查你的代码更容易。



总的来说，学习如何编写更干净的React代码将使你成为一个更有价值的、整体上更快乐的React开发者，所以让我们马上开始吧!



主要涉及以下几个点：

- 合理使用jsx。
- 把不相关的代码移到一个独立的组件中。
-  为每个组件创建单独的文件。
- 将共享功能移入React hooks。
- 尽可能多地从你的JSX中删除JavaScript。
- 格式化内联样式，减少臃肿的代码。
- 合理使用React context。



## 合理使用JSX

你如何向一个给定的prop传递一个true的值？

在下面的例子中，我们使用showTitle在Navbar组件中显示我们应用程序的标题。

```react
// src/App.js

export default function App() {
  return (
    <main>
      <Navbar showTitle={true} />
    </main>
  );
}

function Navbar({ showTitle }) {
  return (
    <div>
      {showTitle && <h1>My Special App</h1>}
    </div>
  )
}
```



我们是否需要明确地将showTitle设置为布尔值true？我们不需要! 

一个快速的速记方法是，在一个组件上提供的任何prop的默认值都是true。

因此，如果我们在Navbar上添加showTitle，我们的标题元素就会显示出来。

```react
// src/App.js

export default function App() {
  return (
    <main>
      <Navbar showTitle />
    </main>
  );
}

function Navbar({ showTitle }) {
  return (
    <div>
      {showTitle && <h1>My Special App</h1>} // title shown!
    </div>
  )
}
```

另一个要记住的有用的速记法涉及到传递字符串prop。

当你传递一个字符串的值时，你不需要用大括号把它包起来。

如果我们要设置导航条的标题，使用title的prop时，我们可以把它的值放在双引号中。

```react
// src/App.js

export default function App() {
  return (
    <main>
      <Navbar title="My Special App" />
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}
```



-----





## 把不相关的代码移到一个独立的组件中

可以说，编写更干净的React代码的最简单和最重要的方法是善于将我们的代码抽象成独立的React组件。

让我们看一下下面的例子：

```react
// src/App.js

export default function App() {
  const posts = [
    {
      id: 1,
      title: "How to Build YouTube with React"
    },
    {
      id: 2,
      title: "How to Write Your First React Hook"
    }
  ];

  return (
    <main>
      <Navbar title="My Special App" />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```



我们的应用程序正在显示一个导航条组件。我们正在用.map()遍历一个帖子数组，并在页面上显示其标题。

我们思考一个问题，我们怎样才能使它更干净呢？

我们为什么不把我们正在循环的代码，抽象化，并在一个单独的组件中显示它们，我们称之为**FeaturePosts**。

让我们看看改进后的结果：

```react
// src/App.js

export default function App() {
 return (
    <main>
      <Navbar title="My Special App" />
      <FeaturedPosts />
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

function FeaturedPosts() {
  const posts = [
    {
      id: 1,
      title: "How to Build YouTube with React"
    },
    {
      id: 2,
      title: "How to Write Your First React Hook"
    }
  ];

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

正如你所看到的，我们现在可以只看我们的App组件。

通过阅读其中的组件名称，即Navbar和FeaturePosts，我们可以准确地看到我们的应用程序所显示的内容。





##  为每个组件创建单独的文件

从我们之前的例子来看，我们把所有的组件都放在一个文件里，即app.js文件。

类似于我们将代码抽象成独立的组件以使我们的应用程序更具可读性，为了使我们的应用程序文件更具可读性，我们可以将我们拥有的每个组件放在一个单独的文件中。

这又一次帮助我们在应用程序中分离关注点。这意味着每个文件只负责一个组件，如果我们想在我们的应用程序中重复使用一个组件，就不会混淆它的来源了。

```react
// src/App.js
import Navbar from './components/Navbar.js';
import FeaturedPosts from './components/FeaturedPosts.js';

export default function App() {
  return (
    <main>
      <Navbar title="My Special App" />
      <FeaturedPosts />
    </main>
  );
}
```

我们来看看Navbar中的代码：

```react
// src/components/Navbar.js

export default function Navbar({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

接着我们看看FeaturedPosts中代码：

```react
// src/components/FeaturedPosts.js

export default function FeaturedPosts() {
  const posts = [
    {
      id: 1,
      title: "How to Build YouTube with React"
    },
    {
      id: 2,
      title: "How to Write Your First React Hook"
    }
  ];

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```



此外，通过将每个单独的组件包含在自己的文件中，我们可以避免一个文件变得过于臃肿。如果我们想把所有的组件都加入到app.js文件中，我们很容易看到我们的app.js文件变得非常大。





------



## 将共享功能移入React hooks

看看我们的FeaturePosts组件，假设我们不是显示静态的帖子数据，而是想从一个API中获取我们的帖子数据。

我们可以用fetch API来做。你可以看到下面这个结果:

```react
// src/components/FeaturedPosts.js

import React from 'react';

export default function FeaturedPosts() {
  const [posts, setPosts] = React.useState([]);  	
    
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

然而，如果我们想在多个组件中执行这一数据请求，该怎么办？

比方说，除了FeaturePosts组件外，我们还想创建一个具有相同数据的Post组件。我们将不得不复制我们用来获取数据的逻辑，并将其粘贴到该组件中。

为了避免这样做，我们为什么不使用一个新的React钩子，我们可以称之为useFetchPosts:

```react
// src/hooks/useFetchPosts.js

import React from 'react';

export default function useFetchPosts() {
  const [posts, setPosts] = React.useState([]);  	
    
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return posts;
}
```



一旦我们在一个专门的 "钩子 "文件夹中创建了这个钩子，我们就可以在任何我们喜欢的组件中重复使用它，包括我们的FeaturePosts组件:

```react
// src/components/FeaturedPosts.js

import useFetchPosts from '../hooks/useFetchPosts.js';

export default function FeaturedPosts() {
  const posts = useFetchPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```



----





## 尽可能多地从你的JSX中删除JavaScript

另一个非常有用的，但经常被忽视的清理组件的方法是尽可能多地从我们的JSX中删除JavaScript。

让我们看一下下面的例子:

```react
// src/components/FeaturedPosts.js

import useFetchPosts from '../hooks/useFetchPosts.js';

export default function FeaturedPosts() {
  const posts = useFetchPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li onClick={event => {
          console.log(event.target, 'clicked!');
        }} key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

我们正试图处理一个帖子的点击事件。你可以看到，我们的JSX变得更加难以阅读。鉴于我们的函数是作为一个内联函数包含的，它掩盖了这个组件的目的，以及它的相关函数。

我们能做什么来解决这个问题呢？我们可以把与onClick相连的内联函数提取出来，变成一个单独的处理程序，我们可以给它一个合适的名字，如handlePostClick。



一旦我们这样做，我们的JSX就会再次变得可读。



```react
// src/components/FeaturedPosts.js

import useFetchPosts from '../hooks/useFetchPosts.js';

export default function FeaturedPosts() {
  const posts = useFetchPosts()
  
  function handlePostClick(event) {
    console.log(event.target, 'clicked!');   
  }

  return (
    <ul>
      {posts.map((post) => (
        <li onClick={handlePostClick} key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```



----



## 格式化内联样式，减少臃肿的代码

React开发者经常会在他们的JSX中写内联样式。

但是，这使我们的代码更难阅读，更难写出额外的JSX。

```react
// src/App.js

export default function App() {
  return (
    <main style={{ textAlign: 'center' }}>
      <Navbar title="My Special App" />
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h1 style={{ fontWeight: 'bold' }}>{title}</h1>
    </div>
  )
}
```

我们想把这种关注点分离的概念应用到我们的JSX样式中，把我们的内联样式移到一个CSS样式表中，我们可以把它导入我们喜欢的任何组件。



另一种重写内联样式的方法是将它们组织成对象。你可以看到这种模式是什么样子的:

```react
// src/App.js

export default function App() {
  const styles = {
    main: { textAlign: "center" }
  };

  return (
    <main style={styles.main}>
      <Navbar title="My Special App" />
    </main>
  );
}

function Navbar({ title }) {
  const styles = {
    div: { marginTop: "20px" },
    h1: { fontWeight: "bold" }
  };

  return (
    <div style={styles.div}>
      <h1 style={styles.h1}>{title}</h1>
    </div>
  );
}
```



-----



## 合理使用React context

在你的React项目中，另一个必不可少的模式是使用React Context（特别是如果你有共同的属性，你想在你的组件中重复使用，而你发现自己写了很多重复的props）。



例如，如果我们想在多个组件之间共享用户数据，而不是多个重复的props（一种叫做props drilling的模式），我们可以使用React库中的context功能。

在我们的例子中，如果我们想在我们的Navbar和FeaturePosts组件中重复使用用户数据，我们所需要做的就是把我们的整个应用包裹在一个提供者组件中。

接下来，我们可以在值prop上传递用户数据，并在useContext钩子的帮助下，在我们的各个组件中消费该上下文。

```react
// src/App.js

import React from "react";

const UserContext = React.createContext();

export default function App() {
  const user = { name: "Reed" };

  return (
    <UserContext.Provider value={user}>
      <main>
        <Navbar title="My Special App" />
        <FeaturedPosts />
      </main>
    </UserContext.Provider>
  );
}

// src/components/Navbar.js

function Navbar({ title }) {
  const user = React.useContext(UserContext);

  return (
    <div>
      <h1>{title}</h1>
      {user && <a href="/logout">Logout</a>}
    </div>
  );
}

// src/components/FeaturedPosts.js

function FeaturedPosts() {
  const posts = useFetchPosts();
  const user = React.useContext(UserContext);

  if (user) return null;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```



----



## 总结

我希望当你试图改进你自己的React代码，使其更干净，更容易阅读，并最终更愉快地创建你的React项目时，你会发现这个指南很有用。





## 参考

https://www.freecodecamp.org/news/how-to-write-cleaner-react-code/






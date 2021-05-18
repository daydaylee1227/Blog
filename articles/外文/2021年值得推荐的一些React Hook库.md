## 正文



React钩子是一种函数类型，允许你钩住React状态和生命周期功能。这个功能在React 16.8更新中首次引入，从那时起，它已经成为任何React应用程序的一个重要组成部分。

因此，作为网络开发者，我们应该知道实现React Hooks的最佳方法，本文将讨论十大React Hook库，可以很容易地用于你的下一个React项目。

在使用React钩子时要记住的一点是，它们是可组合的。这意味着你应该把它们看作是可重用的有状态逻辑构件，可以用来组成新的更大、更复杂的钩子--就像你对UI组件一样。

10个值得推荐的React Hook库:

- react-hook-form
- hookrouter
- use-http
- @rehooks/local-storage
- react-use-hover
- use-media
- react-recipes
- use-debounce
- react-redux
- react-useportal



----



## React Hook Form

React-Hook-Form是一个基于性能的灵活库，具有易于用户验证和可扩展的形式。

可以说，这是目前使用最多的Hooks库之一，它有一些惊人的功能，比如:

- 最大限度地减少重新渲染的次数，更快地安装。
- 一个没有任何依赖性的小库。
- 它可以在没有其他依赖性的情况下轻松采用。
- 专注于用户体验。
- 可维护性。
- 内建的表单验证支持。

> 除了所有这些之外，React Hook表单库每周大约有780,000次下载，并且有超过205,000个GitHub star。



这些统计信息还表明该库的使用和流行程度，如果您想使用该库，则可以使用npm和**npm i react-hook-form**命令轻松下载该库。



以下代码显示了使用自定义React Form Hook useForm的示例，您可以使用其文档获取更多详细信息:



```js
import React from "react";
import useForm from "react-hook-form";

const fontstyle = {
  fontSize: "15px"
};
export default function Order() {
  const { signup, handleSubmit, errors } = useForm();
  const onSubmit = data => {  // upload the data retreived from the form to a database, return value to a user, etc
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Full Name</label>
        <input name="fullname" ref={signup} />
        <label>Product Name</label>
        <input
          name="productName"
          ref={signup({ required: true, maxLength: 20 })}
        />

        <select style={fontstyle} name="Title" ref={signup({ required: true })}>
          <option value="">Select...</option>
          <option value="One bundle">One bundle</option>
          <option value="Two bundle">Two bundle</option>
        </select>
        <label>
          <input type="checkbox" placeholder="Age 18+" name="Age 18+" ref={signup} /> 
          Age Above 18 Years Only
        </label>
        {errors.productType && <p>Required Field</p>}
        <input type="submit" value="Make the Payment" />
      </form>
    </div>
  );
}
```



-----



## HookRouter

React HookRouter是一个很棒的库，用于满足您的应用程序的路由要求。

随着项目的发展，对正式和便捷的路由系统的需求变得越来越重要。但是，您不必担心，因为React为此提供了完美的解决方案。

尽管处于早期阶段，但它有一些现有的功能来吸引开发者。我可以很容易地列出其中的一些功能

- 使用navigate(url, [replace], [queryParams])函数轻松实现编程导航。
- 在useRedirect()钩子的支持下处理重定向。
- 使用辅助函数setLinkProps()创建自定义链接组件。
- 拦截导航意图和受控拦截器。
- 通过setBasepath()设置基本路径，在你的URLs开头忽略某个路径。



> Hook Router是react-router的现代替代品，每周有4647次下载，大约有1.3k颗GitHub星。

您可以通过运行**npm i hookrouter**轻松安装HookRouter，以下示例显示了HookRouter的简单用法。



```js
// index.js or where you choose to render your entire app from
import { useRoutes } from "hookrouter";
import Routes from "./router";

function App() {
  const routes = useRoutes(Routes);
  return <div>{routes}</div>;
}
```

> 注意：如果我们通常使用react-router，代码行数可能会增加，因为我们必须为我们应用中的每个路由渲染<Route/>组件并传递道具。现在只需导入Routes部分并将其传递给useRoutes Hook。



-----



## Use-Http

Use-Http是一个很棒的包，它作为Fetch API的**替代品**。



它是一个基于**TypeScript**的库，它允许我们在提高可读性的同时轻松地进行编码，并强烈关注数据使用角度。



它提供的主要功能可以列举如下:

- 支持服务器端渲染（SSR）和React-Native
- 支持GraphQL与useQuery和useMutation Hooks。
- 请求/响应拦截器。
- 暂停支持。
- 重试功能。
- 内置缓存和持久化缓存支持。



>它目前的版本是1.0.20，每周有14,418次下载和1.8k个GitHub星级。



你可以通过运行**npm i use-http**命令使用npm来安装它，下面的代码显示了一个使用useFetch钩子的简单例子。



```js
import useFetch from "use-http"

const OrderExample = () => {
  const [orders, setOrders] = useState([])
  const { get, post, response, loading, error } = useFetch("https://ordering.com")
  
  useEffect(() => { get("/orders") }, [])

  const addOrder = async () => {
      await post("/orders", { title: "example order" });
      if (response.ok) setOrders([...orders, newOrder])
  }

  return (
    <>
      <button onClick={addOrder}>Add Order</button>
      {error && 'Error!'}
      {loading && 'Loading...'}
      {orders.map(order => (
        <span key={order.id}>{order.title}</span>
      )}
    </>
  );
};

```



-----



## UseLocalStorage

UseLocalStorage钩子允许我们将状态同步到本地存储中，以便在页面刷新时保留这些状态。

使用useLocalStorage钩子，我们可以顺利地处理本地存储，它有一些有趣的功能，比如:

- 支持自动JSON序列化。
- 通过多个标签进行同步。
- 支持TypeScript和Type hinting。
- 包括更新组件localStorage的功能和触发组件外部的状态更新。



> 这也是一个非常受欢迎的钩子库，每周约有14307次下载，GitHub星级超过21.9k。



文档写得很好，容易掌握，有大量的例子。

使用npm，安装一如既往地简单。你只需要运行npm i @rehooks/local-storage - save命令，然后你就可以尝试下面的例子了。



```js
import React from "react";
import { useLocalStorage } from '@rehooks/local-storage';

export default function App() {
  const [value, setValue, remove] = useLocalStorage("key", "product");

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue("Shampoo")}>Shampoo</button>
      <button onClick={() => setValue("Conditioner")}>Conditioner</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
}
```



------



## React-Use-Hover

useHover是React的一个状态钩子，用于指定一个React元素是否有悬停。
该钩子返回一个参考值和一个布尔值，指定该参考值的元素是否在此刻悬停。它只需将返回的引用添加到任何你想跟踪的悬停状态的元素中。



它提供的功能列举如下:

- 它毫不费力地使用和理解。
- 该库很小，易于使用。
- 它支持TypeScript。
- 为悬停效果提供了一个延迟。



> 它的周下载量只有2,339左右，GitHub星级为0.5k，但如果你创造性地使用它，它有很大的潜力。



你可以用npm install react-use-hover命令来安装它，然后自己试试。



```js
import useHover from "react-use-hover";

const Example = () => {
  const [isHovering, hoverProps] = useHover();
  return (
    <>
      <span {...hoverProps} aria-describedby="overlay">Hover pls</span>
      {isHovering ? <div> Hey.. I am hovered! </div> : null}
    </>
  );
}
```



----





## UseMedia

useMedia是React的传感器钩子，用于跟踪CSS媒体查询的状态。

你是否曾经需要一种方法来跟踪CSS中的媒体查询？use-media钩子直接解决了这个问题，因为媒体查询对于任何应用程序或网站的响应性都是极其关键的。

这个钩子包括以下功能:

- 支持TypeScript。
- 该库带有良好的文档，描述了如何使用该钩子以及如何测试它。



> useMedia钩子每周有超过96,000次的下载，同时有415颗GitHub之星，目前是1.4.0版本。



你可以通过运行**npm install --save use-mediacommand**来使用npm来安装它，下面的代码显示了一个使用useMediahook的简单例子。



```js
import useMedia from 'use-media';

const Example = () => {
  const isWidth = useMedia({minWidth: '500px'});

  return (
    <span>
      Page width is: {isWidth ? "WideScreen" : "NarrowScreen"}
    </span>
  );
};
```

------



## React Recipes

React-recipes是一个拥有大量自定义Hooks的钩子库。

它包括用于使用浏览器API、管理状态、运行异步代码的钩子。 ode，并为我们带来很多React没有提供的功能。同样重要的是，它是一个非常详细和完善的文档的库。



> 到目前为止，react-recipes的总下载量超过了46.58k，GitHub上有470颗星。



你可以用npm i react-recipes --save命令安装React-recipes，下面的例子展示了如何实现useSpeechSynthesis，让你的浏览器说话。



```js
import React, { useState } from "react";
import { useSpeechSynthesis } from "react-recipes";

export default function App() {
  const [value, setValue] = useState("");
  const [ended, setEnded] = useState(false);
  const onBoundary = (event) => {
    console.log(`${event.name}: ${event.elapsedTime} milliseconds.`);
  };
  const onEnd = () => setEnded(true);
  const onError = (event) => {
    console.warn(event);
  };

  const {
    cancel,
    speak,
    speaking,
    supported,
    voices,
    pause,
    resume
  } = useSpeechSynthesis({
    onEnd,
    onBoundary,
    onError
  });

  if (!supported) {
    return "Voice Not Supported.";
  }

  return (
    <div>
      <input value={value} onChange={(event) => setValue(event.target.value)} />
  /* makes the browser start speaking */
      <button
        type="button"
        onClick={() => speak({ text: value, voice: voices[1] })}
      >
        Speak Button
      </button>
/* cancels the speech synthesis */
      <button type="button" onClick={cancel}>
        Cancel Button
      </button>
/*  lets us pause speaking */
      <button type="button" onClick={pause}>
        Pause Button
      </button>
/* lets us resume speaking */
      <button type="button" onClick={resume}>
        Resume Button
      </button>
      <p>{speaking && "Voice is speaking"}</p>
      <p>{ended && "Voice has ended"}</p>
      <div>
        <h2>Voices:</h2>
        <div>
          {voices.map((voice) => (
            <p key={voice.name}>{voice.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
```

----



## UseDebounce

useDebounce是一个轻量级的钩子，用来对对象进行调试。

你可以使用这个钩子来去掉任何快速变化的值。它经常被用于获取数据的输入和表单中，它被用来延迟函数的执行。



> 它可能是最常用的React钩子库之一，每周有398,202次下载，大约有1.4k颗GitHub星。

你可以通过**npm i use-debounce - save**命令来安装这个钩子。

```js
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

export default function Input() {
  const [text, setText] = useState("Hi");
  const [value] = useDebounce(text, 1000);

  return (
    <div>
      <input
        defaultValue={"Hey There!"}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <p>Value: {text}</p>
      <p>Debounced text: {value}</p>
    </div>
  );
```



------



## Redux Hooks

React Redux包括它自己的自定义钩子API，它允许你的React组件订阅Redux商店和调度行动。

在你的React组件中，建议使用React-Redux钩子API作为默认方法。

现有的connect API仍在工作，并将在未来得到支持，但hooks API更直接、更简单，并且在TypeScript中表现良好。

以下是最重要的Redux Hooks。

- useSelector -使用选择器函数让你从Redux商店状态中提取数据。

- useDispatch -这个钩子从Redux商店返回一个对调度函数的引用。你可以根据需要使用它来调度行动。

- useStore -这个钩子返回一个对同一个Redux商店的引用，不经常使用。



> 它在GitHub上有超过20.9k颗星，这表明它在React社区是多么受欢迎。

文档是有益的--有时有点复杂，但它会给你所有的细节，你需要开始使用它们。

```js
import {useSelector, useDispatch} from "react-redux";
import React from "react";
import * as actions from "./actions";

const ReduxExample = () => {
const dispatch = useDispatch()
const counter = useSelector(state => state.counter)

return (
<div>
   <span>
     {counter.value}
   </span>
   <button onClick={() => dispatch(actions.incrementCounter)}>
     Counter +1 Increment
   </button>
</div>
);
}
```

---





## UsePortal

React Portals提供了一种一流的方式，将子代渲染到存在于父代组件的DOM层次结构之外的DOM节点中。

下拉、模态、通知弹出、工具提示都可以用usePortal简单创建。它还允许在应用程序的DOM层次结构之外的元素存在。

>usePortal的版本号为1.0.14，每周下载量约为17754，GitHub星级超过700。



你可以通过运行**npm i -S react-useportal**命令使用npm来安装它，下面的代码显示了一个使用usePortalhook的简单例子。



```js
import React, { useState } from "react";
import usePortal from "react-useportal";

const Example = () => {
const { ref, openPortal, closePortal, isOpen, Portal } = usePortal()

    return (
      <>
    <button ref={ref} onClick={() => openPortal()}>
       Open Portal
    </button>
     {isOpen && (
       <Portal>
         <p>
           This Portal handles its own state.{' '}
           <button onClick={closePortal}>Close The Portal!</button>, Press ESC or
           click outside of me.
         </p>
       </Portal>
     )}
       </>
 )
}
```

-------





**原文链接:**

> https://blog.bitsrc.io/top-10-react-hook-libraries-ca284ab3ae1d


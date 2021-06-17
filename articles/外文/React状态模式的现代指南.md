## 现代React状态模式指南

![](/Users/lee/Blog/images/外文/现代React状态模式指南/1.jpg)



## 简介

自2013年成立以来，React已经推出了一套强大的工具，帮助开发人员减轻了创建Web应用程序的一些琐事，使他们能够专注于重要的事情。

尽管React有很多功能，而且在开发者中一直很受欢迎，但是我一次又一次地发现，我们中的很多人都在问同一个问题。我们如何使用React处理复杂的状态？



在这篇文章中，我们将研究什么是状态，我们如何组织它，以及随着我们应用程序的复杂性增加而采用的不同模式。

---



## 了解React中的state

在其最纯粹的形式中，React可以被认为是一个蓝图。给定一些状态，你的应用程序将以某种方式出现。React更倾向于声明式而不是命令式，这是一种华丽的说法，即你写下你想要发生的事情，而不是写下实现它的步骤。正因为如此，正确管理状态变得极其重要，因为状态控制着你的应用程序的行为方式。

![](/Users/lee/Blog/images/外文/现代React状态模式指南/2.jpg)



### State in action

在我们开始之前，简单地讨论一下什么是状态会很有帮助。就我个人而言，我认为状态是一个可变值的集合，它随时间变化，并直接影响组件行为。

状态与prop非常相似，但不同的是，状态可以在其定义的上下文中改变，而接收到的道具如果不通过回调函数就无法改变。

让我们来看看:

```jsx
const UserList = () => {
    const [users, setUsers] = useState([])

     useEffect(() => {
       const getUsers = async () => {
           const response = await fetch("https://myuserapi.com/users")
           const users = await response.json()
           setUsers(users)
       }
       getUsers()
     }, [])

    if (users.length < 1) return null;

    return <ul>
      {users.map(user => <li>{user.name}</li>)}
    </ul>
}
```





在这个例子中，我们在组件安装时从API中获取用户，并在收到响应后更新用户数组。我们天真地假设调用总是成功的，以减少这个例子的复杂性。

我们可以看到，状态被用来渲染带有用户名字的列表项，如果数组中没有用户，它将返回空。状态随着时间的推移而变化，并被用来直接影响组件的行为。



这里值得注意的另一件事是，我们正在使用React的内置状态管理方法，使用useState Hook。根据你的应用程序和状态管理的复杂性，你可能只需要使用React的内置Hook来管理你的状态。



然而，从React的大量状态管理解决方案中可以看出，内置的状态管理方法有时是不够的。让我们来看看其中的一些原因。

----



## 了解prop

让我们考虑一个稍微复杂的应用程序。随着你的应用程序的增长，你不得不创建多层的组件，以分离关注点和/或提高可读性。当你有多个组件需要的状态时，问题就出现了，这些组件在树上有不同的位置。

![](/Users/lee/Blog/images/外文/现代React状态模式指南/4.jpg)



如果我们想给**UserMenu**和**Profile**组件提供用户数据，我们必须把状态放在App中，因为这是唯一能把数据传播到每个需要它的组件的地方。

这意味着我们将通过那些可能不需要这些数据的组件，比如说仪表盘和设置--将不必要的数据污染给它们。



现在，如果你需要在另一个组件中操作这些数据怎么办？那么，你就需要向需要进行更新的组件提供更新函数（上一个例子中的setUsers函数），增加另一个需要向下传播的属性--所有这些都是为了一个状态。现在想象一下，再增加五个属性就更复杂了。它很快就会失去控制。



对我来说，这意味着我对通过多层组件来更新器函数有多舒服。就我个人而言，我对三层有一个硬性的限制；在那之后，我就会去找另一个解决方案。但在那之前，我坚持使用React的内置功能。



状态库也是有成本的，除非你确定绝对需要，否则没有理由增加不必要的**复杂性**。



### 重新渲染的问题

由于React在状态更新后会自动触发重新渲染，所以一旦应用程序增长，内部状态处理就会出现问题。组件树的不同分支可能需要相同的数据，而为这些组件提供相同数据的唯一方法是将状态提升到最近的共同祖先。



随着应用程序的增长，大量的状态将需要在组件树中向上提升，这将增加prop的复杂程度，并在状态更新时造成不必要的重新提交。



### 测试问题

将所有的状态保存在组件中的另一个问题是，你的状态处理变得麻烦。有状态的组件需要你设置复杂的测试场景，在那里你调用触发状态的动作并在结果上进行匹配。以这种方式测试状态很快就会变得复杂，而且改变状态在你的应用程序中的工作方式往往需要完全重写你的组件测试。



-----



## 用Redux管理状态

就状态库而言，最突出和最广泛使用的管理状态的库之一是Redux。Redux于2015年推出，是一个状态容器，帮助你编写可维护、可测试的状态。它是基于Flux的原则，Flux是Facebook的一个开源架构模式。

![](/Users/lee/Blog/images/外文/现代React状态模式指南/5.jpg)



从本质上讲，Redux提供了一个全局状态对象，为每个组件提供它所需要的状态，只重新渲染接收该状态的组件（及其子组件）。Redux根据行动和还原器来管理陈述。让我们快速检查一下这些组件。

![](/Users/lee/Blog/images/外文/现代React状态模式指南/赛后.jpg)

在这个例子中，组件派发了一个动作，这个动作被送到了reducer那里。reducer更新了状态，这反过来又触发了一次重新渲染。



### State

状态是唯一的真理来源；它在任何时候都代表你的状态。它的工作是为组件提供状态。例子:

```jsx
{
  users: [{ id: "1231", username: "Dale" }, { id: "1235", username: "Sarah"}]
}
```

### Actions

行动是预定义的对象，代表状态的变化。它们是遵循某种契约的纯文本对象。

```jsx
{
  type: "ADD_USER",
  payload: { user: { id: "5123", username: "Kyle" } }
}
```



### Reducers

reducer是一个接收动作并负责更新状态对象的函数。

```jsx
const userReducer = (state, action) => {
    switch (action.type) {
       case "ADD_USER":
          return { ...state, users: [...state.users, action.payload.user ]}
       default:
          return state;
    }
}
```



-----



## 现代React状态模式



虽然Redux仍然是一个伟大的工具，但随着时间的推移，React已经发展起来，让我们获得了新的技术。此外，新的思想和理念也被引入到状态管理中，从而产生了许多不同的处理状态的方法。让我们在本节中研究一些更多的当代模式。



### useReducer和Context API

React 16.8引入了Hooks，为我们提供了通过应用程序共享功能的新方法。因此，我们现在可以使用React内置的一个名为useReducer的Hook，它允许我们创建开箱即用的Reducer。如果我们把这个功能与React的Context API配对，我们现在就有了一个类似Redux的轻量级解决方案，我们可以通过我们的应用程序来使用。

让我们来看看一个有处理API调用的减速器的例子:

```jsx
const apiReducer = (state = {}, action) => {
  switch (action.type) {
      case "START_FETCH_USERS":
        return { 
               ...state, 
               users: { success: false, loading: true, error: false, data: [] } 
         }
      case "FETCH_USERS_SUCCESS": 
        return {
              ...state,
              users: { success: true, loading: true, error: false, data: action.payload.data}
        }
      case "FETCH_USERS_ERROR":
        return {
           ...state,
           users: { success: false, loading: false, error: true, data: [] }
        }
      case default:
         return state 
    }
}
```



现在我们有了我们的Reducer，让我们来创建我们的上下文:

```jsx
const apiContext = createContext({})

export default apiContext;
```

有了这两块，我们现在可以通过组合它们来创建一个高度灵活的状态管理系统:

```jsx
import apiReducer from './apiReducer'
import ApiContext from './ApiContext

const initialState = { users: { success: false, loading: false, error: false, data: []}}

const ApiProvider = ({ children }) => {
    const [state, dispatch] = useReducer(apiReducer, initialState)

    return <ApiContext.Provider value={{ ...state, apiDispatcher: dispatch }}>
      {children}
    </ApiContext.Provider>
}
```

完成这些后，我们现在需要把这个提供者包裹在我们应用程序中需要访问这个状态的组件周围。例如，在我们应用程序的根部:

```jsx
ReactDOM.render(document.getElementById("root"), 
   <ApiProvider>
     <App />
   </ApiProvider>
)
```



现在，任何作为App的孩子的组件将能够访问我们的ApiProviders的状态和调度器，以便触发行动并以如下方式访问状态：

```jsx
import React, { useEffect } from 'react'
import ApiContext from '../ApiProvider/ApiContext

const UserList = () => {
     const { users, apiDispatcher } = useContext(ApiContext)

     useEffect(() => {
        const fetchUsers = () => {
           apiDispatcher({ type: "START_FETCH_USERS" })
           fetch("https://myapi.com/users")
              .then(res => res.json())
              .then(data =>  apiDispatcher({ type: "FETCH_USERS_SUCCCESS", users: data.users }))
              .catch((err) => apiDispatcher({ type: "START_FETCH_ERROR" }))
        }
        fetchUsers()
     }, [])
```



### 用状态机和XState来管理状态



另一种流行的管理状态的方式是使用状态机。简而言之，状态机是专用的状态容器，可以在任何时候容纳有限数量的状态。这使得状态机具有极高的可预测性。

由于每个状态机都遵循相同的模式，你可以在生成器中插入一个状态机，并收到一个带有数据流概览的状态图。

![](/Users/lee/Blog/images/外文/现代React状态模式指南/7.jpg)



状态机在格式方面通常比Redux遵循更严格的规则，以保持可预测性。

在React状态管理的世界里，XState是最流行的创建、解释和处理状态机的库。

让我们看一下XState文档中的例子：

```jsx
import { createMachine, interpret, assign } from 'xstate';

const fetchMachine = createMachine({
  id: 'Dog API',
  initial: 'idle',
  context: {
    dog: null
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      invoke: {
        id: 'fetchDog',
        src: (context, event) =>
          fetch('https://dog.ceo/api/breeds/image/random').then((data) =>
            data.json()
          ),
        onDone: {
          target: 'resolved',
          actions: assign({
            dog: (_, event) => event.data
          })
        },
        onError: 'rejected'
      },
      on: {
        CANCEL: 'idle'
      }
    },
    resolved: {
      type: 'final'
    },
    rejected: {
      on: {
        FETCH: 'loading'
      }
    }
  }
});

const dogService = interpret(fetchMachine)
  .onTransition((state) => console.log(state.value))
  .start();

dogService.send('FETCH');
```



### useSWR

多年来，状态管理已经变得越来越复杂。虽然适当的状态管理加上像React这样的视图库可以让我们做一些惊人的事情，但毫无疑问，我们正在将大量的复杂性转移到前端。随着复杂性的增加，我们也招致了更多的认知负荷，更多的间接性，更多的潜在错误，以及更多需要彻底测试的代码。

在这方面，useSWR是一股清新的空气。将这个库与React Hooks的本地功能配对，产生了一种很难不爱的简单程度。这个库使用HTTP缓存技术stale-while-revalidate，这意味着它保留了先前数据集的本地缓存，并在后台与API同步以获得新鲜数据。



这使应用程序保持高度的性能和用户友好性，因为用户界面可以在等待更新时用陈旧的日期进行响应。让我们来看看我们如何利用这个库，摆脱一些复杂的状态管理:

```jsx
// Data fetching hook
import useSWR from 'swr'

const useUser(userId) {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR(`/api/user/${userId}`, fetcher)

    return { 
      user: data,
      error,
      loading: !data && !error
    }
}

export default useUser
```



现在我们有了一个可重复使用的Hook，我们可以利用它来将数据输入到我们的组件视图中。不需要为了获得数据而创建还原器、动作或连接组件到状态--只需在需要数据的组件中导入并使用Hook:

```jsx
import Loader from '../components/Loader'
import UserError from '../components/UserError'
import useUser from '../hooks/useUser';

const UserProfile = ({ id }) => {
    const { user, error, loading } = useUser(id);

     if (loading) return <Loader />
     if (error) return <UserError />

      return <div>
          <h1>{user.name}</h1>
          ...
      </div>
}
```

另外一个组件：

```jsx
import Loader from '../components/Loader'
import UserError from '../components/UserError'
import useUser from '../hooks/useUser';

const Header = ({ id }) => {
    const { user, error, loading } = useUser(id);

     if (loading) return <Loader />
     if (error) return <UserError />

      return <div>
           <Avatar img={user.imageUrl} />         
           ...
      </div>
}
```

这个方法允许你轻松地传递可以访问共享数据对象的Hooks，因为useSWR的第一个参数是一个键(Key)。

```jsx
const { data, error } = useSWR(`/api/user/${userId}`, fetcher)
```

基于这个Key，我们的请求被压缩、缓存，并在我们所有使用useUser Hook的组件中共享。

这也意味着，只要密钥匹配，就只向API发送一个请求。即使我们有10个组件使用useUser Hook，只要useSWR密钥匹配，就只发送一个请求。

------



## 结论

如果React是一个随时代表你的应用程序状态的画布，那么状态的正确性真的很重要。在这篇文章中，我们看了在React应用程序中处理状态的各种方法，事实上，我们本可以包括更多。

**Recoil**和**Jotai**，更不用说React Query和**MobX**了，在这样的讨论中当然是相关的，而且我们有很多不同的状态库，这是一件好事。它促使我们去尝试不同的东西，并促使库的作者不断地做得更好。而这样的方式就是前进的方向。







## 参考

https://blog.logrocket.com/modern-guide-react-state-patterns/
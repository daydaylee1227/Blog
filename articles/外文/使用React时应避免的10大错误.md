

今天，我们将探讨一下React开发中，一些注意事项，可能会放的错误。

接下来，可能涉及的几点点:



- 创建完整的组件
- 直接修改state
- 将数字传递为字符串
- 在列表组件上使用key
- setstate使用事项
- 没有遵循React文件夹结构
- 使用大写字母命名组件名称

-------



## 创建完整的组件

React开发者常犯的一个错误是，他们没有创建完整的组件。

在React的帮助下，我们能够创建执行许多任务的大型组件，但最好保持组件的规模，也就是说一个组件对应一个功能。

这不仅能节省你的时间，而且还能帮助你进行调试，因为你知道哪些组件可能出现的错误有关。

让我们看一下TodoList组件的例子:



```js
// ./components/TodoList.js

import React from 'react';

import { useTodoList } from '../hooks/useTodoList';
import { useQuery } from '../hooks/useQuery';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';

const TodoList = () => {
  const { getQuery, setQuery } = useQuery();
  const todos = useTodoList();
  return (
    <div>
      <ul>
        {todos.map(({ id, title, completed }) => (
          <TodoItem key={id} id={id} title={title} completed={completed} />
        ))}
        <NewTodo />
      </ul>
      <div>
        Highlight Query for incomplete items:
        <input value={getQuery()} onChange={e => setQuery(e.target.value)} />
      </div>
    </div>
  );
};

export default TodoList;
```



----



## 直接修改 state



在React中，**状态应该是不可变的**。如果直接修改状态，则会导致难以解决的性能问题。

让我们看一个例子：

```js
const modifyPetsList = (element, id) => {
  petsList[id].checked = element.target.checked;
  setPetsList(petsList);
};
```

您想要基于复选框的状态更新数组中对象的选中键，但是您遇到了问题。由于对象使用相同的引用进行更改，因此React无法观察并触发重新渲染。

要解决此问题，可以使用`setState()`方法或`useState()`挂钩。这两种方法都可以确保您的更改被React确认，并且您的DOM被正确地重新呈现。

让我们重写前面的示例并使用该`useState()`方法。



> ***注意***：您还可以使用*`map()`*和`*spread syntax`避免突变其他状态值。

```js
const modifyPetsList = (element, id) => {
  const { checked } = element.target;
  setpetsList((pets) => {
    return pets.map((pet, index) => {
      if (id === index) {
        pet = { ...pet, checked };
      }
      return pet;
    });
  });
};
```



----



## 将数字传递为字符串



当通过props传递数据时，将数字传递为字符串可能导致一些其他的问题。

让我们从一个例子开始：

```js
class Arrival extends React.Component {
  render() {
    return (
      <h1>
        Hi! You arrived {this.props.position === 1 ? "first!" : "last!"} .
      </h1>
    );
  }
}
```



在此示例中，该组件预期通过一个props来接受一个数字。

由于进行了严格的比较，因此任何不是数字或不完全等于1的东西会触发第二个表达和打印“last!”。

要解决此问题，您应该在传递数据的时候插入括号：

```js
const element = <Arrival position={1} />;
```

---



## 在列表组件上使用key

假设您需要呈现列表组件的话，您的代码看起来像这样：

```js
const lists = ['cat', 'dog', 'fish’];

render() {
  return (
    <ul>
      {lists.map(listNo =>
        <li>{listNo}</li>)}
    </ul>
  );
}
```



如果您正在使用较小的应用程序，这可以工作。但是在使用大型列表时，您将在想要从列表中修改或删除项目时渲染问题。

要解决此问题，您需要将**键key**添加到所有列表元素。键为每个元素提供唯一的身份，这有助于反应确定已添加，删除，修改等操作。

如何做到这一点：

```js
<ul>
  {lists.map(listNo =>
    <li key={listNo}>{listNo}</li>)}
</ul>
```



----



## setState使用事项

很多情况下，setstate是异步的，这样子意味着您所做的任何修改都不会立即生效（可能会对下一个渲染生效）。

这样子的原因，可能是自动批量更新调用会提高性能。如果在设置它后立即访问状态值，则可能无法获得最准确的结果。

让我们来看看一个例子：

```js
handlePetsUpdate = (petCount) => {
  this.setState({ petCount });
  this.props.callback(this.state.petCount); // Old value
};
```



您可以通过为setState（）提供可选的第二个参数来解决此问题，这将充当回调函数。在更新状态后，将在更新状态后调用回调函数。

```js
handlePetsUpdate = (petCount) => {
  this.setState({ petCount }, () => {
    this.props.callback(this.state.petCount); // Updated value
  });
};
```



> 注意：useState() 和setState相同的是，除了它没有与setState（）具有类似的回调参数。

-----



## 没有遵循React文件夹结构

有些时候，创建的项目不仅是用于当前的开发，未来的某一天，新人可能在将来维持或跟进项目。在考虑项目的未来是否会被他人使用，文件夹结构非常重要。

让我们来看看一个标准的文件夹结构，后跟Reactjs社区：

![Standard React JS Folder Structure](https://miro.medium.com/max/2032/1*yxyLeUYp2vMhq0Jf6vISuA.png)



项目的命名也是十分的重要，资源和组件之间的位置结构也很重要。遵循命名约定来帮助可读性和组织也很有用。这有助于您轻松识别项目中写入代码的目的。





----



## 使用大写字母命名组件名称

忘记使用大写字母来命名组件名称是一个很容易会放的小错误。在JSX中，以小写字母开头的组件向下编译为HTML元素。

例子:

```js
class demoComponentName extends React.Component {
	
}
```



这将会导致错误。如果你需要做得是渲染React组件，则需要使用大写字母来约束它的名称。
所以你可以这么来写:

```js
class DemoComponentName extends React.Component {
}
```



---------



## 使用React时应避免的10大错误

链接:https://javascript.plainenglish.io/top-10-mistakes-to-avoid-when-using-react-1796711ad2a0


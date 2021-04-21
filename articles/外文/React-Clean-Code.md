## 前言





干净的代码不仅仅是工作的代码。干净的代码易于阅读，简单易懂，而且组织整齐。在这篇文章中，我们将看一下我们可以写出更干净的React代码的八个方法。

在浏览这些建议时，重要的是要记住，这正是这些建议的内容：**建议**。

如果你不同意其中任何一条，那也完全没问题。然而，这些都是我在编写自己的React代码时发现的有益做法。让我们开始行动吧!





### 只对一个条件进行条件性渲染

如果你需要在一个条件为真时有条件地呈现一些东西，在一个条件为假时不呈现任何东西，不要使用三元运算符。使用&&运算符代替。

**糟糕的例子:**

```react
import React, { useState } from 'react'

export const ConditionalRenderingWhenTrueBad = () => {
  const [showConditionalText, setShowConditionalText] = useState(false)

  const handleClick = () =>
    setShowConditionalText(showConditionalText => !showConditionalText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionalText ? <p>The condition must be true!</p> : null}
    </div>
  )
}
```



**好的例子:**

```react
import React, { useState } from 'react'

export const ConditionalRenderingWhenTrueGood = () => {
  const [showConditionalText, setShowConditionalText] = useState(false)

  const handleClick = () =>
    setShowConditionalText(showConditionalText => !showConditionalText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionalText && <p>The condition must be true!</p>}
    </div>
  )
}
```



### 有条件的渲染是指在任何条件下

如果你需要在一个条件为真时有条件地呈现一个东西，在条件为假时呈现另一个东西，请使用三元运算符。

**糟糕的例子:**

```react
import React, { useState } from 'react'

export const ConditionalRenderingBad = () => {
  const [showConditionOneText, setShowConditionOneText] = useState(false)

  const handleClick = () =>
    setShowConditionOneText(showConditionOneText => !showConditionOneText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionOneText && <p>The condition must be true!</p>}
      {!showConditionOneText && <p>The condition must be false!</p>}
    </div>
  )
}
```



**好的例子:**

```react
import React, { useState } from 'react'

export const ConditionalRenderingGood = () => {
  const [showConditionOneText, setShowConditionOneText] = useState(false)

  const handleClick = () =>
    setShowConditionOneText(showConditionOneText => !showConditionOneText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionOneText ? (
        <p>The condition must be true!</p>
      ) : (
        <p>The condition must be false!</p>
      )}
    </div>
  )
}
```





### Boolean props

一个真实的props可以提供给一个组件，只有props名称而没有值，比如：myTruthyProp。 写成myTruthyProp={true}是不必要的。

**糟糕的例子:**

```react
import React from 'react'

const HungryMessage = ({ isHungry }) => (
  <span>{isHungry ? 'I am hungry' : 'I am full'}</span>
)

export const BooleanPropBad = () => (
  <div>
    <span>
      <b>This person is hungry: </b>
    </span>
    <HungryMessage isHungry={true} />
    <br />
    <span>
      <b>This person is full: </b>
    </span>
    <HungryMessage isHungry={false} />
  </div>
)
```



**好的例子:**

```react
import React from 'react'

const HungryMessage = ({ isHungry }) => (
  <span>{isHungry ? 'I am hungry' : 'I am full'}</span>
)

export const BooleanPropGood = () => (
  <div>
    <span>
      <b>This person is hungry: </b>
    </span>
    <HungryMessage isHungry />
    <br />
    <span>
      <b>This person is full: </b>
    </span>
    <HungryMessage isHungry={false} />
  </div>
)
```



### String props

可以用双引号提供一个字符串道具值，而不使用大括号或反斜线。



**糟糕的例子:**

```react
import React from 'react'

const Greeting = ({ personName }) => <p>Hi, {personName}!</p>

export const StringPropValuesBad = () => (
  <div>
    <Greeting personName={"John"} />
    <Greeting personName={'Matt'} />
    <Greeting personName={`Paul`} />
  </div>
)
```



**好的例子:**

```react
import React from 'react'

const Greeting = ({ personName }) => <p>Hi, {personName}!</p>

export const StringPropValuesGood = () => (
  <div>
    <Greeting personName="John" />
    <Greeting personName="Matt" />
    <Greeting personName="Paul" />
  </div>
)
```



### 事件处理函数

如果一个事件处理程序只需要事件对象的一个参数，你就可以像这样提供函数作为事件处理程序：onChange={handleChange}。

你不需要像这样把函数包在一个匿名函数中。

**糟糕的例子:**

```react
import React, { useState } from 'react'

export const UnnecessaryAnonymousFunctionsBad = () => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <label htmlFor="name">Name: </label>
      <input id="name" value={inputValue} onChange={e => handleChange(e)} />
    </>
  )
}
```



**好的例子:**

```react
import React, { useState } from 'react'

export const UnnecessaryAnonymousFunctionsGood = () => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <label htmlFor="name">Name: </label>
      <input id="name" value={inputValue} onChange={handleChange} />
    </>
  )
}
```



### 将组件作为props传递



当把一个组件作为props传递给另一个组件时，如果该组件不接受任何props，你就不需要把这个传递的组件包裹在一个函数中。



**糟糕的例子:**

```react
import React from 'react'

const CircleIcon = () => (
  <svg height="100" width="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
)

const ComponentThatAcceptsAnIcon = ({ IconComponent }) => (
  <div>
    <p>Below is the icon component prop I was given:</p>
    <IconComponent />
  </div>
)

export const UnnecessaryAnonymousFunctionComponentsBad = () => (
  <ComponentThatAcceptsAnIcon IconComponent={() => <CircleIcon />} />
)
```



**好的例子:**

```react
import React from 'react'

const CircleIcon = () => (
  <svg height="100" width="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
)

const ComponentThatAcceptsAnIcon = ({ IconComponent }) => (
  <div>
    <p>Below is the icon component prop I was given:</p>
    <IconComponent />
  </div>
)

export const UnnecessaryAnonymousFunctionComponentsGood = () => (
  <ComponentThatAcceptsAnIcon IconComponent={CircleIcon} />
)
```



### 为定义的props

未定义的props被排除在外，所以如果props未定义是可以的，就不要担心提供未定义的回退。

**糟糕的例子:**

```react
import React from 'react'

const ButtonOne = ({ handleClick }) => (
  <button onClick={handleClick || undefined}>Click me</button>
)

const ButtonTwo = ({ handleClick }) => {
  const noop = () => {}

  return <button onClick={handleClick || noop}>Click me</button>
}

export const UndefinedPropsBad = () => (
  <div>
    <ButtonOne />
    <ButtonOne handleClick={() => alert('Clicked!')} />
    <ButtonTwo />
    <ButtonTwo handleClick={() => alert('Clicked!')} />
  </div>
)
```



**好的例子:**

```react
import React from 'react'

const ButtonOne = ({ handleClick }) => (
  <button onClick={handleClick}>Click me</button>
)

export const UndefinedPropsGood = () => (
  <div>
    <ButtonOne />
    <ButtonOne handleClick={() => alert('Clicked!')} />
  </div>
)
```



### 设置依赖前一个状态的状态

如果新的状态依赖于之前的状态，那么一定要把状态设置为之前状态的函数。React的状态更新可以是分批进行的，如果不这样写你的更新就会导致意外的结果。



**糟糕的例子:**

```react
import React, { useState } from 'react'

export const PreviousStateBad = () => {
  const [isDisabled, setIsDisabled] = useState(false)

  const toggleButton = () => setIsDisabled(!isDisabled)

  const toggleButton2Times = () => {
    for (let i = 0; i < 2; i++) {
      toggleButton()
    }
  }

  return (
    <div>
      <button disabled={isDisabled}>
        I'm {isDisabled ? 'disabled' : 'enabled'}
      </button>
      <button onClick={toggleButton}>Toggle button state</button>
      <button onClick={toggleButton2Times}>Toggle button state 2 times</button>
    </div>
  )
}
```



**好的例子:**

```react
import React, { useState } from 'react'

export const PreviousStateGood = () => {
  const [isDisabled, setIsDisabled] = useState(false)

  const toggleButton = () => setIsDisabled(isDisabled => !isDisabled)

  const toggleButton2Times = () => {
    for (let i = 0; i < 2; i++) {
      toggleButton()
    }
  }

  return (
    <div>
      <button disabled={isDisabled}>
        I'm {isDisabled ? 'disabled' : 'enabled'}
      </button>
      <button onClick={toggleButton}>Toggle button state</button>
      <button onClick={toggleButton2Times}>Toggle button state 2 times</button>
    </div>
  )
}
```



## 总结

以下做法并非针对React，而是在JavaScript（以及任何编程语言）中编写干净代码的良好做法。

稍微做个总结:

- 将复杂的逻辑提取为明确命名的函数
- 将神奇的数字提取为常量
- 使用明确命名的变量



**我是TianTian，我们下一期见！！！**
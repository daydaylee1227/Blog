## 正文

这篇文章解释了React Hooks useState和useRef。你将学习它们的基本用法，并了解这两个Hooks的不同使用情况。







## 了解useState Hook

useState Hook可以为function组件开发组件状态。在React 16.8之前，只有基于类的组件才能实现组件的本地状态。





看一下下面的代码:

```react
import { useState } from "react";
function AppDemo1() {
  const stateWithUpdater = useState(true);
  const darkMode = stateWithUpdater[0];
  const darkModeUpdater = stateWithUpdater[1];
  return (
    <div>
      <p>{darkMode ? "dark mode on" : "dark mode off"}</p>
      <button onClick={() => darkModeUpdater(!darkMode)}>
        toggle dark mode
      </button>
    </div>
  );
}
```







## 参考

https://blog.logrocket.com/usestate-vs-useref/
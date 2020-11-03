## 前言

这次梳理的内容是数据结构专题中的**树**，如果你看到`树`这类数据结构时，满脑子头疼，觉得它很难理解，如果是这样子的话，那么本文可能对你或许有点帮助。

俗话说得好，要想掌握理解的话，我们得先了解它的概念，性质等内容。

围绕以下几个点来展开介绍树👇

- 树的基本概念
- 基本术语
- 树的种类
- 二叉树概念
- 二叉树的遍历
- 二叉树题目汇总



公众号**前端UpUp**，回复**二叉树**，即可获取脑图。



联系👉TianTianUp，遇到问题的话，可以联系作者噢，愿意陪你一起学习一起探讨问题。

脑图👇

![](C:\Users\litiantian03\Desktop\Blog\images\算法\树\树脑图.png)





--------------------







## 树的基本概念

树是用来模拟具有树状结构性质的数据集合。或者你可以把它认为是一种**抽象数据结构**或是实现这种抽象数据类型的数据结构，用来模拟具有树状结构性质的数据集合。

那么根据维基百科给出的定义，我们似乎可以这么理解：



它是由n（n>0）个有限节点组成一个具有层次关系的集合。把它叫做“树”是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的。它具有以下的特点：

> - 每个节点都只有有限个子节点或无子节点；
> - 没有父节点的节点称为根节点；
> - 每一个非根节点有且只有一个父节点；
> - 除了根节点外，每个子节点可以分为多个不相交的子树；
> - 树里面没有环路(cycle)



这个时候，我们就需要拿出一张图来看👇

<img src="C:\Users\litiantian03\Desktop\Blog\images\算法\树\树的概念.png" alt="树的概念" style="zoom:50%;" />





从图中来看，以上的五个特点都可以很好的总结出来

- A节点作为根节点，没有父节点，所以是根节点。
- 除根节点（A）外，其他的节点都有父节点，并且每个节点只有有限个子节点或无子节点。
- 从某个节点开始，可以分为很多个子树，举个例子，从B节点开始，即是如此。



既然对树有一定认识后，我们需要了解它的一些术语。







## 基本术语



![树的基本术语](C:\Users\litiantian03\Desktop\Blog\images\算法\树\树的基本术语.png)

为了更加规范的总结，这里给出的描述来自于维基百科：



> 1. **节点的度**：一个节点含有的子树的个数称为该节点的度；
> 2. **树的度**：一棵树中，最大的节点度称为树的度；
> 3. **叶节点**或**终端节点**：度为零的节点；
> 4. **非终端节点**或**分支节点**：度不为零的节点；
> 5. **父亲节点**或**父节点**：若一个节点含有子节点，则这个节点称为其子节点的父节点；
> 6. **孩子节点**或**子节点**：一个节点含有的子树的根节点称为该节点的子节点；
> 7. **兄弟节点**：具有相同父节点的节点互称为兄弟节点；
> 8. 节点的**层次**：从根开始定义起，根为第1层，根的子节点为第2层，以此类推；
> 9. **深度**：对于任意节点n,n的深度为从根到n的唯一路径长，根的深度为0；
> 10. **高度**：对于任意节点n,n的高度为从n到一片树叶的最长路径长，所有树叶的高度为0；
> 11. **堂兄弟节点**：父节点在同一层的节点互为堂兄弟；
> 12. **节点的祖先**：从根到该节点所经分支上的所有节点；
> 13. **子孙**：以某节点为根的子树中任一节点都称为该节点的子孙；
> 14. **森林**：由m（m>=0）棵互不相交的树的集合称为森林。



可以结合上述的图来理解这些概念，通过两者的结合，你一定会对树有进一步的了解的。



有以上基本概念，以及一些专业术语的掌握，接下来我们需要对树进行一个分类，看看树有哪些种类。



-----------





## 树的种类



理解了树的概念以及基本术语，接下来，我们需要拓展的内容就是树的种类。

我们可以根据维基百科的依据来作为分类的标准👇



- 无序树：树中任意节点的子节点之间没有顺序关系，这种树称为无序树，也称为[自由树](https://zh.wikipedia.org/wiki/自由树)；
- 有序树：树中任意节点的子节点之间有顺序关系，这种树称为有序树；
  - 二叉树：每个节点最多含有两个子树的树称为二叉树；
    - 完全二叉树：对于一颗二叉树，假设其深度为d（d>1）。除了第d层外，其它各层的节点数目均已达最大值，且第d层所有节点从左向右连续地紧密排列，这样的二叉树被称为完全二叉树；
      - [满二叉树](https://zh.wikipedia.org/wiki/满二叉树)：所有叶节点都在最底层的完全二叉树；
    - [平衡二叉树](https://zh.wikipedia.org/wiki/平衡二叉树)（[AVL树](https://zh.wikipedia.org/wiki/AVL树)）：当且仅当任何节点的两棵子树的高度差不大于1的二叉树；
    - 排序二叉树（英语：Binary Search Tree))：也称二叉搜索树、有序二叉树；
  - [霍夫曼树](https://zh.wikipedia.org/wiki/霍夫曼树)：[带权路径](https://zh.wikipedia.org/w/index.php?title=带权路径&action=edit&redlink=1)最短的二叉树称为哈夫曼树或最优二叉树；
  - [B树](https://zh.wikipedia.org/wiki/B树)：一种对读写操作进行优化的自平衡的二叉查找树，能够保持数据有序，拥有多于两个子树。





既然树的分类有这么多的话，那么我们是不是都需要一一掌握呢，我个人觉得，掌握二叉树这种结构就足够了，它也是树最简单、应用最广泛的种类。

那么接下来，我们就来介绍一下二叉树吧。





----------





## 二叉树的概念



二叉树是一种典型的树树状结构。如它名字所描述的那样，二叉树是每个节点最多有两个子树的树结构，通常子树被称作“左子树”和“右子树”。



![二叉树](C:\Users\litiantian03\Desktop\Blog\images\算法\树\二叉树.jpg)

图片来自网络，具体出处不明。



从这个图片的内容来看，应该很清楚的展示了二叉树的结构。

至于二叉树的性质的话，可以参考下图，作为补充知识吧，个人觉得这个不是重点。



![二叉树的性质](C:\Users\litiantian03\Desktop\Blog\images\算法\树\二叉树的性质.png)



重点的话，我们需要掌握的应该是它的遍历方式。





## 二叉树的遍历

我们知道对于二叉树的遍历而言，有常见得三种遍历方式，分别是以下三种：

- 前序遍历
- 中序遍历
- 后续遍历



对于任何一种遍历方式而言，我们不仅需要掌握它的非递归版本，同时对于它的递归版本来说，更是考察一个人的算法基本功，那么接下来，我们来看看吧。



### 前序遍历



点击这里，练习[二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

给你二叉树的根节点 `root` ，返回它节点值的 **前序** 遍历。



假设我们mock一下假数据👇

```js
输入: [1,null,2,3]
   1
    \
     2
    /
   3
输出: [1,3,2]
```

那么根据我们对前序遍历的理解，我们可以写出解题伪代码👇



```js
//   TianTianUp
//   * function TreeNode(val, left, right) {
//   *     this.val = (val===undefined ? 0 : val)
//   *     this.left = (left===undefined ? null : left)
//   *     this.right = (right===undefined ? null : right)
//   * }
let inorderTraversal  = (root, arr = []) => {
  if(root) {
    inorderTraversal(root.left, arr)
    arr.push(root.value)
    inorderTraversal(root.right, arr)
  }
  return arr
}
```



非递归版本👇

对于非递归的话，我们需要借助一个数据结构去存储它的节点，需要使用的就是栈，它的思路可以借鉴👇



- 根节点为目标节点，开始向它子节点遍历
- 1.访问目标节点
- 2.左孩子入栈 -> 直至左孩子为空的节点
- 3.节点出栈，以右孩子为目标节点，再依次执行1、2、3



```js

let preorderTraversal = (root, arr = []) => {
  const stack = [], res = []
  let current = root
  while(current || stack.length > 0) {
    while (current) {
      res.push(current.val)
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    current = current.right
  }
  return res
}
```



--------



### 中序遍历

给定一个二叉树，返回它的中序 遍历。

示例:

> 输入: [1,null,2,3]
>    1
>     \
>      2
>     /
>    3
>
> 输出: [1,3,2]



进阶: 递归算法很简单，你可以通过迭代算法完成吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-inorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



-------------



递归版本👇

```js
const inorderTraversal  = (root, arr = []) => {
  if(root) {
    inorderTraversal(root.left, arr)
    arr.push(root.val)
    inorderTraversal(root.right, arr)
  }
  return arr
}
```



非递归版本，这里就不解释了，跟前序遍历一样，思路一样，用栈维护节点信息。

```js
const inorderTraversal = (root, arr = []) => {
  const stack = [], res = []
  let current = root
  while(current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    res.push(current.val)
    current = current.right
  }
  return res
}
```



### 后续遍历



给定一个二叉树，返回它的 后序 遍历。

示例:

> 输入: [1,null,2,3]  
>    1
>     \
>      2
>     /
>    3 
>
> 输出: [3,2,1]

进阶: 递归算法很简单，你可以通过迭代算法完成吗？



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-postorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



--------------



递归版本👇

```js
const postorderTraversal  = (root, arr = []) => {
  if(root) {
    postorderTraversal(root.left, arr)
    postorderTraversal(root.right, arr)
    arr.push(root.val)
  }
  return arr
}
```



非递归版本👇

其实，嗯，做完前面两个后，会发现都是有套路滴~



```js
const postorderTraversal = (root, arr = []) => {
  const stack = [], res = []
  let current = root, last = null  // last指针记录上一个节点
  while(current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack[stack.length - 1]
    if (!current.right || current.right == last) {
      current = stack.pop()
      res.push(current.val)
      last = current
      current = null              // 继续弹栈
    } else {
      current = current.right
    }
  }
  return res
}
```







### [二叉树的层次遍历 ⭐⭐](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)



> 链接：[二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)



给你一个二叉树，请你返回其按 **层序遍历** 得到的节点值。 （即逐层地，从左到右访问所有节点）。



示例：
二叉树：[3,9,20,null,null,15,7],

>    3
>
>    / \
>   9  20
>     /  \
>    15   7

返回其层次遍历结果：

> [
>   [3],
>   [9,20],
>   [15,7]
> ]



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



---------



递归版本👇

```js
const levelOrder = function(root) {
  if(!root) return []
  let res = []
  dfs(root, 0, res)
  return res
}

function dfs(root, step, res){
  if(root){
      if(!res[step]) res[step] = []
      res[step].push(root.val)
      dfs(root.left, step + 1, res)
      dfs(root.right, step + 1, res)
    }
}
```



非递归版本👇

这里借助的就是队列这个数据结构，先进先出的机制。



```js
const levelOrder = (root) => {
  let queue = [], res = []
  if (root) queue.push(root);
  while (queue.length) {
      let next_queue = [],
          now_res = []
      while (queue.length) {
          root = queue.shift()
          now_res.push(root.val)
          root.left && next_queue.push(root.left)
          root.right && next_queue.push(root.right)
      }
      queue = next_queue
      res.push(now_res)
  }
  return res
}
```



------







## 题目汇总

还是那句话，题目做不完的，剩下的就靠刷leetcode了，我还准备了一些常见的二叉树题集，题目的质量还是不错的👇



- [二叉树的最小深度⭐](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)
- [二叉树的最大深度⭐](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
- [相同的树⭐](https://leetcode-cn.com/problems/same-tree/)
- [二叉搜索树的范围和⭐](https://leetcode-cn.com/problems/range-sum-of-bst/)
- [ 对称二叉树⭐](https://leetcode-cn.com/problems/symmetric-tree/)
- [将有序数组转换为二叉搜索树⭐](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)
- [二叉树的层次遍历 II⭐⭐](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)
- [二叉树的最近公共祖先⭐⭐](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- [验证二叉搜索树⭐⭐](https://leetcode-cn.com/problems/validate-binary-search-tree/)
- [路径总和 III⭐⭐](https://leetcode-cn.com/problems/path-sum-iii/)
- [存在重复元素 III⭐⭐](https://leetcode-cn.com/problems/contains-duplicate-iii/)
- [计算右侧小于当前元素的个数⭐⭐⭐](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/)





## ❤️ 感谢大家

如果你觉得这篇内容对你挺有有帮助的话：

1. 点赞支持下吧，让更多的人也能看到这篇内容（收藏不点赞，都是耍流氓 -_-）
2. 关注公众号**前端UpUp**，联系作者👉 **DayDay2021** ，我们一起学习一起进步。
3. 觉得不错的话，也可以阅读TianTian近期梳理的文章（感谢掘友的鼓励与支持🌹🌹🌹）： 
   - [「算法与数据结构」一张脑图带你看动态规划算法之美](https://juejin.im/post/6872115031501340679)（370+👍）
   
   - [「算法与数据结构」Trie树之美](https://juejin.im/post/6888451657504391181)（200+👍）
   
   - [「算法与数据结构」分治算法之美](https://juejin.im/post/6885104477297344525)（190+👍）
   
   - [「算法与数据结构」DFS和BFS算法之美](https://juejin.im/post/6861376131615227912)(240+👍)
   
   - [「算法与数据结构」梳理6大排序算法](https://juejin.im/post/6856546833025237006)(220+👍)
   
   - [「算法与数据结构」带你看哈希算法之美(210+👍)](https://juejin.im/post/6874708801208254478)
   
   - [「算法与数据结构」带你看回溯算法之美(190+👍)](https://juejin.im/post/6882394656148045838)
   
   - [「算法与数据结构」链表的9个基本操作(190+👍)](https://juejin.im/post/6850418120755494925)
   
     





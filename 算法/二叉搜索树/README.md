## 前言

你是不是会跟我一样，看到`树`这类数据结构时，满脑子头疼，觉得它很难理解，如果是这样子的话，那么本文可能对你或许有点帮助。



俗话说得好，要想掌握理解的话，我们得先了解它的概念，性质等内容。





如果你还不了解什么是分治法，或者知道一些，但是对于它具体是如何实现`回溯`，那么这篇文章可能适合你阅读。



那么围绕以下几个点来展开介绍树👇

- 基本思路
- 适用情况以及求解哪些经典问题
- 经典例题



联系👉TianTianUp，遇到问题的话，可以联系作者噢，愿意陪你一起学习一起探讨问题。



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



我觉得我们需要掌握的应该是它的遍历方式。





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









## 2个例子

接下来，我们通过三个题目作为例子，来看看怎么利用分治的思想来解决问题👇



### [二叉树的层次遍历 II⭐](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)



> 链接：[二叉树的层次遍历 II](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）



例如：
给定二叉树 [3,9,20,null,null,15,7],

> ​    3
>
>    / \
>   9  20
>     /  \
>    15   7



返回其自底向上的层次遍历为：



> [
>   [15,7],
>   [9,20],
>   [3]
> ]
> 通过次数106,923提交次数157,993

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



------

首先，我们看看能不能以O(n)复杂度解决这个问题，其实仔细想一想的话，我们可以通过一个简单





更多得是，我们这题尝试一下用分治法来解决这题。对于一个数组的最大子序和，它对答案的贡献，只能是以下几种情况👇

- 出现在左半边
- 出现在右半边
- 出现在中间，穿过中间。



那么我们是不是可以递归处理呢，对于出现在左边和出现在右边的答案，我们可以把它们当作是一种情况，然后递归去处理，当然了递归的出口，很显然，当递归的数组的长度为1时，我们需要递归结束。



对于出现在中间答案的情况，我们可以通过计算来算出答案，所以思路理清楚， 接下来，我们看如何写👇

![分治法求最大和](..\..\images\算法\分治法\分治法连续最大和.png)



当然了，这题用动态规划思路更好求解，也更加得好理解👇

> //dp[i]表示nums中以nums[i]结尾的最大子序和



![动态规划求连续和](..\..\images\算法\分治法\动态规划求连续和.png)









[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E5%88%86%E6%B2%BB%E7%AE%97%E6%B3%95/leetcode-%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%B1%82%E8%A7%A3%E8%BF%9E%E7%BB%AD%E6%9C%80%E5%A4%A7%E5%92%8C.js)

------





### [搜索二维矩阵 II⭐⭐](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)



> 链接：[搜索二维矩阵 II](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)



编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。
示例:

现有矩阵 matrix 如下：



> [
>   [1,   4,  7, 11, 15],
>   [2,   5,  8, 12, 19],
>   [3,   6,  9, 16, 22],
>   [10, 13, 14, 17, 24],
>   [18, 21, 23, 26, 30]
> ]



给定 target = `5`，返回 `true`。

给定 target = `20`，返回 `false`。



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-a-2d-matrix-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



------



这题的题目很清晰👉矩阵的每行从左到右是升序， 每列从上到下也是升序，在矩阵中查找某个数。



当然了，我们有一个简单的思路👇

- 维护两个指针（row,col),找到目标元素时，我们就放回true
- 当指向当前的元素值小于target时，我们就col++，向上移动一行。
- 如果当前的值大于当前的target，我们就row--，向左移动一列。
- 知道col > 矩阵的行，或者row < 0时，我们直接return false，表示不存在。



时间复杂度：O(n+m)

- 时间复杂度分析的关键是注意到在每次迭代（我们不返回 true）时，行或列都会精确地递减/递增一次。
- 由于行只能减少 m 次，而列只能增加 n次，因此在导致 while 循环终止之前，循环不能运行超过 n+m 次。
- 因为所有其他的工作都是常数，所以总的时间复杂度在矩阵维数之和中是线性的。



根据以上的伪代码，我们基本上就能解出这个题目👇

![二维矩阵求值](..\..\images\算法\分治法\二位矩阵求值.png)



这样子的解法，简单且容易理解，其实这并不是真正意义上的二分，只是根据数据的特殊性，使用特定的搜索方式完成对矩阵的查找。





既然一维数组查某个值时，我们可以将复杂度降为`log`级别的时间复杂度，那么在二维的情况下，我们是不是也可以这么考虑呢?

这个思路，可以借鉴一下👇



- 我们可以迭代矩阵对角线，二分搜索这些行和列，对它们进行切片。
- 在对角线上迭代，二分搜索行和列，知道对角线上的迭代元素用完为止（这个时候，就可以放回true或者是false）



说得更加简单一些，二分查找的思想是沿着对角线，行查找一下，列查找一下。

可以借鉴一下代码，就会明白如何利用矩阵的对角线去分治。



![](..\..\images\算法\分治法\二分求解矩阵值.png)





[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E5%88%86%E6%B2%BB%E7%AE%97%E6%B3%95/leetcode-%E4%BA%8C%E7%BB%B4%E7%9F%A9%E9%98%B5%E6%B1%82%E5%80%BC.js)



------





理清楚分治法思路，对它的特征有了一定的了解，明白何如利用它解决实际的问题，那或许这就是这篇文章的意义所在吧~







## 题目汇总

题目不多，准备了一些常见的二叉树题集，题目的质量还是不错的👇



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
   - [「算法与数据结构」DFS和BFS算法之美](https://juejin.im/post/6861376131615227912)(240+👍)
   - [「算法与数据结构」梳理6大排序算法](https://juejin.im/post/6856546833025237006)(220+👍)
   - [「算法与数据结构」带你看哈希算法之美(210+👍)](https://juejin.im/post/6874708801208254478)
   - [「算法与数据结构」带你看回溯算法之美(190+👍)](https://juejin.im/post/6874708801208254478)](https://juejin.im/post/6882394656148045838)





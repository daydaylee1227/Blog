## 前言

最近面网易某部门的时候，其中一道算法题考点就是DFS，深度优先遍历，所以这次准备梳理一遍，练练手，下次再找的话，也比较方便。

一定要会多种解法，面试的时候，我就是写了递归，面试小哥哥问我能不能用**迭代**去完成，所以多种解法都要会。



**文章结尾有进阶题目呢🤭**



这次梳理的BFS DFS常见的题型，以及它的套路是哪些？

BFS-DFS题目将收入GitHub中，思路和代码都有，有兴趣的小伙伴可以来玩👇



[数据结构-BFS-DFS]([https://github.com/daydaylee1227/Blog/tree/master/%E7%AE%97%E6%B3%95/%E6%A0%91](https://github.com/daydaylee1227/Blog/tree/master/算法/树))



## 什么是动态规划

动态规划（Dynamic Programming），因此常用 DP 指代动态规划。动态规划，首先我们得清楚，它的概念是啥，它能解决什么问题，维基百科对它的解释👇

> 动态规划在寻找有很多重叠子问题的情况的最佳解时有效。它将问题重新组合成子问题。为了避免多次解决这些子问题，它们的结果都逐渐被计算并被储存，从简单的问题直到整个问题都被解决。因此，动态规划储存递归时的结果，因而不会在解决同样的问题时花费时间。
>
> 动态规划只能应用于有最佳子结构的问题。最佳子结构的意思是局部最佳解能决定全域最佳解（对有些问题这个要求并不能完全满足，故有时需要引入一定的近似）。简单地说，问题能够分解成子问题来解决。



我稍微总结一下👇

- 将一个大的问题拆分成一个个子问题，我们把它称之为子结构。
- 每个最优解，也就是**最优值**均由[这些小规模子问题]推到而来。
- 更重要的就是利用`历史记录`，来避免我们重复的计算。



什么是重复计算，那怎么样可以利用历史记录来减少我们不必要的运算呢👇



我们拿**斐波那契数列**这题来看👇

![](..\..\images\算法\动态规划-状态转移斐波那契.png)



如果我们按照这个递归的写法来看，那么它的过程如下👇



<img src="..\..\images\算法\动态规划-斐波那契数列.jpg" alt="斐波那契数列" style="zoom: 33%;" />



它会多次计算结果，这个符合动态规划的点，**动态规划在寻找有很多重叠子问题的情况的最佳解时有效。**而且对于这个问题而言，它可以继续去拆分，变成更小的子问题去解决，它也符合动态规划的预期。



那么这里只是举个例子，后续会将做题思路👇





## 动态规划解题三大步骤

对于初学者而言，需要短时间就掌握的话，我觉得挺难的，所以这里我推荐大家可以看看**经典的动态规划**👉背包九讲，[点这里](https://zhuanlan.zhihu.com/p/93857890)，看完它，或许对你有点帮助吧。



解题思路，三大步骤👇

1. 定义数组的含义
2. 列出状态转移方程
3. 初始化数组



-----------



**定义数组的含义**

- 我们需要借助数组来保存之前计算的结果，所以一般采用的就是数组来维护我们的结果，一般dp数组。
- dp数组的含义一定要明确，也就是说，dp[i]表达是啥意思，举个例子，dp[i]表达到达第i个阶梯时的方案数。



----------



**列出状态转移方程**

- 通俗易懂的话，找出数组间关系式，这个时解决动态规范问题中，最难也是最重要的一步。
- 通常情况而言，dp[i]个状态的转移方程，跟dp[i-1] 与 dp[i-2] 之间存在某种联系。



举个例子，后续`爬梯子`的题目中，状态转移方程👇

```js
dp[i] = dp[i-1] + dp[i-2]
```

- 首先dp[i] 表示的就到第i个阶梯的方案数
- 那么爬到第i阶梯，有两种情况👇
  - 从第i-1阶梯再爬1阶就到第i阶
  - 从第i-2阶梯再爬2阶就到第i阶
- 那么它的状态方程转移就是上面的式子



---------



**初始化数组**

- 我们会发现，dp数组的第n项结果，是由状态转移方程求解而言的，所以我们需要的是第n-1项，n-2项，或者n-3项的值。
- 这个时候，我们就需要初始话dp数组的值，一般而言，比如`dp[1],dp[2]`,`dp[1][1]`,`dp[1][2]`。



从上面的场景，爬楼梯来说，我们需要初始话哪一项dp数组呢，当我们依次迭代到dp[3] = dp[1] + dp[2]，接下来就不再需要去分解了。

这个时候，我们实际意义而言，就需要我们去初始化，dp[1]和dp[2]数组。







## 动态规划分类

这么久以来，随着动态规划这种算法思路被很多牛人去探索，动态规划这类问题，被分为了很多种，参考网上的资料，列举了几个常见的dp，我们接下来看看吧。



我的经验之谈，按照不同dp专题来刷，效果很明显，当然了，具体看你自己掌握情况，以及刷题速度了。





#### 背包dp

这算是状态规划中比较经典的题目了，对于理解dp的话，我个人觉得很有帮助，也是我入门dp最开始看的专题👇

[dd大牛的《背包九讲》](https://zhuanlan.zhihu.com/p/139368825) 👈，可以看看这篇，这里就不展开了。



这里推荐几道题👇

- [分割等和子集- 01背包](https://leetcode-cn.com/problems/partition-equal-subset-sum/) 
- [目标和 - 01背包-求方案数](https://leetcode-cn.com/problems/target-sum/)
- [零钱兑换 - 完全背包](https://leetcode-cn.com/problems/coin-change/)
- [零钱兑换- II (完全背包-求方案数)](https://leetcode-cn.com/problems/coin-change-2/) 
- [一和零 -  (二维费用背包)](https://leetcode-cn.com/problems/ones-and-zeroes/)



----



#### 线性dp

- 顾名思义，线性DP就是在一条线上进行DP。
- 或者我的理解是，



这里推荐几道题👇

- [最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

- [三角形最小路径和](https://leetcode-cn.com/problems/triangle/)
- [最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)
- [最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)
- [俄罗斯套娃信封问题](https://leetcode-cn.com/problems/russian-doll-envelopes/)



------



#### 区间dp

- 顾名思义，在一段区间上dp，类似于`dp[l][r]`构成的，我们也是将大问题拆分成小问题来处理，这里就是拆分成小区间来处理。

- 然后对小区间处理后，再回溯的求出大区间的值。
- 主要的方法有两种，记忆化搜索和递推。



这里推荐几道题👇

- [最长回文子序列](https://leetcode-cn.com/problems/longest-palindromic-subsequence/)
- [统计不同回文子序列](https://leetcode-cn.com/problems/count-different-palindromic-subsequences/)
- [多边形三角剖分的最低得分](https://leetcode-cn.com/problems/minimum-score-triangulation-of-polygon/)
- [戳气球](https://leetcode-cn.com/problems/burst-balloons/)
- [奇怪的打印机](https://leetcode-cn.com/problems/strange-printer/)





-------



#### 树形dp

- 准确的来说，树形dp准确的说是一种dp的思想，将dp建立在树状结构的基础上。
- 你可以理解成，在一颗树上定义dp方程式，完成相应的操作。



这里推荐几道题👇

- [**树上染色**](https://www.luogu.org/problemnew/show/P3177)
- [**时态同步**](https://www.luogu.org/problemnew/show/P1131)
- [**选课**](https://www.luogu.org/problemnew/show/P2014)
- [**没有上司的舞会**](https://www.luogu.org/problemnew/show/P1352)
- [**访问美术馆**](https://www.luogu.org/problemnew/show/P1270)
- [**战略游戏**](https://www.luogu.org/problemnew/show/P2016)



----------



#### 数位dp



- 数位dp是一种计数用的dp，一般就是要统计一个区间[le,ri]内满足一些条件数的个数。
- 所谓数位dp，字面意思就是在数位上进行dp咯。
- 数位还算是比较好听的名字，数位的含义：一个数有个位、十位、百位、千位......数的每一位就是数位啦！



这里推荐几道题👇

- [数字 1 的个数](https://leetcode-cn.com/problems/number-of-digit-one/)
- [最大为 N 的数字组合](https://leetcode-cn.com/problems/numbers-at-most-n-given-digit-set/)
- [可被 K 整除的最小整数](https://leetcode-cn.com/problems/smallest-integer-divisible-by-k/)





我印象中，这个是模板，自己写很难，但是这是个板子题，哈哈哈，打过Acm都知道，这里就不展开了。







## 3个例子

接下来的题型梳理是按照个人刷题顺序的，难易程度，也会做个划分，可以参考一下。

主要做题网站👇

- [剑指offer](https://www.nowcoder.com/ta/coding-interviews)
- [力扣leetcode](https://leetcode-cn.com/problemset/all/)



接下来，我们通过三道习题为例，来看看DP动态规划问题解题思路。



### [爬楼梯⭐](https://leetcode-cn.com/problems/climbing-stairs/)



> 链接：[爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)



假设你正在爬楼梯。需要 *n* 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**注意：**给定 *n* 是一个正整数。

示例 1：

1. ```
   输入： 2
   输出： 2
   解释： 有两种方法可以爬到楼顶。
   
   1.  1 阶 + 1 阶
   2.  2 阶
   ```


   示例 2：

1. ```
   输入： 3
   输出： 3
   解释： 有三种方法可以爬到楼顶。
   
   1.  1 阶 + 1 阶 + 1 阶
   2.  1 阶 + 2 阶
   3.  2 阶 + 1 阶
   ```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/climbing-stairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。







**递归思路：**

- 每次分别遍历左节点,以及右节点,然后对比两者,取最大值
- 这样子，每次递归的话，深度都加1

```

var maxDepth = function (root) {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```



**非递归思路:**

- BFS，广度优先遍历
- 每一次用一个数组temp保存上一层的所有节点，每次计数器count+1
- 当temp为空的时候，也就是此时都是叶子节点情况

```js
var maxDepth = function (root) {
    if(!root) return 0
    let queue = [root],
        res = 0;
    while(queue.length) {
        let temp = []
        for(let i = 0; i < queue.length; i++) {
            if(queue[i].left) temp.push(queue[i].left)
            if(queue[i].right) temp.push(queue[i].right)
        }
        res += 1
        queue = temp
    }
    return res
};
```



[代码点这里☑️]([https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E6%A0%91/%E5%89%91%E6%8C%87offer55-%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%B7%B1%E5%BA%A6.js](https://github.com/daydaylee1227/Blog/blob/master/算法/树/剑指offer55-二叉树的深度.js))

------



### [打家劫🐍⭐⭐](https://leetcode-cn.com/problems/house-robber-ii/?utm_source=LCUS&utm_medium=ip_redirect_q_uns&utm_campaign=transfer2china)





> 链接：[打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/)



你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。



示例 1:

```
输入: [2,3,2]
输出: 3
解释: 你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
```


示例 2:

```
输入: [1,2,3,1]
输出: 4
解释: 你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/house-robber-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。







**递归思路：**

1. 判断当前节点是否是根，并且为空,是的话,返回0
2. 当前节点的左右节点都是null,也就是叶子节点时,此时就是目标节点,最小深度,返回1
3. 当前节点的左节点不为null,找左子树的深度
4. 当前节点的右节点不为null,找右子树的深度
5. 比较两者,返回的就是3和4条件的最小值,并且加1

一遍看代码一遍思路👇

```js
var minDepth = function (root) {
    if (root == null) return 0
    if (root.left == null && root.right == null) return 1
    let max = 10000;
    if (root.left) max = Math.min(max, minDepth(root.left))
    if (root.right) max = Math.min(max, minDepth(root.right))
    return max + 1
};
```



**非递归思路:**

- 遍历这个树的每一层,当这个一层级的节点都没有左右节点时,直接返回结果
- 遍历每一层的节点,当这个stack种,某个节点的左右节点都是空时,即找到目标节点。

做多的BFS，就会发现，原来都是套路题👇

```js
var minDepth = function (root) {
    if (!root) return 0
    let stack = [root],
        ans = 0
    while (stack.length) {
        let temp = []
        ans++
        for (let i = 0; i < stack.length; i++) {
            if (stack[i].left == null && stack[i].right == null) return ans;
            if (stack[i].left) temp.push(stack[i].left)
            if (stack[i].right) temp.push(stack[i].right)
        }
        stack = temp;
    }
    return ans
};
```



[代码点这里☑️]([https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E6%A0%91/leetcode111-%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%9C%80%E5%B0%8F%E6%B7%B1%E5%BA%A6.js](https://github.com/daydaylee1227/Blog/blob/master/算法/树/leetcode111-二叉树的最小深度.js))

------



### [买卖股票的最佳时机 IV⭐⭐⭐](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

给你一个二叉树，请你返回其按 **层序遍历** 得到的节点值。 （即逐层地，从左到右访问所有节点）。

> 链接：[买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)



---------



给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。

注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:

```
输入: [2,4,1], k = 2
输出: 2
解释: 在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
```


示例 2:

```
输入: [3,2,6,5,0,3], k = 2
输出: 7
解释: 在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





**思路：**

- 这个题最简单的做法就是BFS
- 每次遍历一层的时候，把它的子节点依次按顺序保存temp
- 把子节点的结果作为新的结果，也就是que = temp

```js
var levelOrder = function (root) {
    let res = [],
        que = [root];
    if (!root) return []
    while (que.length) {
        let temp = [],
            ans = []
        for (let i = 0; i < que.length; i++) {
            ans.push(que[i].val)
            if (que[i].left) temp.push(que[i].left)
            if (que[i].right) temp.push(que[i].right)
        }
        res.push(ans)
        que = temp
    }
    return res;
};
```

对于递归的思路，我就没有张开了，我觉得这个写法简单易理解。



[代码点这里☑️]([https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E6%A0%91/leetcode102-%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E5%B1%82%E5%BA%8F%E9%81%8D%E5%8E%86.js](https://github.com/daydaylee1227/Blog/blob/master/算法/树/leetcode102-二叉树的层序遍历.js))



------











### [二叉树的锯齿形层次遍历⭐⭐](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。



> 链接：[103二叉树的锯齿形层次遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

例如：
给定二叉树 `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回锯齿形层次遍历如下：

```
[
  [3],
  [20,9],
  [15,7]
]
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/



**BFS套路题**

- 一样的思路，不过这次需要翻转的就是结果
- 嗯，设置一个flag，判断奇偶情况，然后讲答案翻转即可



```js
var zigzagLevelOrder = function (root) {
    let res = [],
        que = [root],
        flag = 0;
    if (!root) return []
    while (que.length) {
        let temp = [],
            ans = []
        flag++;
        for (let i = 0; i < que.length; i++) {
            ans.push(que[i].val)
            if (que[i].left) temp.push(que[i].left)
            if (que[i].right) temp.push(que[i].right)
        }
        // 判断奇偶情况,然后翻转
        if (flag % 2 === 1) {
            res.push(ans)
        } else {
            res.push(ans.reverse())
        }
        que = temp // 套路,将这个层级的从新压入栈
    }
    return res;
};
```



[点这里代码🤭]([https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E6%A0%91/leetcode103-%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E9%94%AF%E9%BD%BF%E5%BD%A2%E5%B1%82%E6%AC%A1%E9%81%8D%E5%8E%86.js](https://github.com/daydaylee1227/Blog/blob/master/算法/树/leetcode103-二叉树的锯齿形层次遍历.js))



------



### [矩阵中的最长递增路径⭐⭐⭐](https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/)

题目描述：给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。**你不能只是单纯的改变节点内部的值**，而是需要实际的进行节点交换。

> 链接：[矩阵中的最长递增路径](https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/)

给定一个整数矩阵，找出最长递增路径的长度。

对于每个单元格，你可以往上，下，左，右四个方向移动。 你不能在对角线方向上移动或移动到边界外（即不允许环绕）。

示例 1:

```
输入: nums = 
[
  [9,9,4],
  [6,6,8],
  [2,1,1]
] 
```

输出: 4 
解释: 最长递增路径为 [1, 2, 6, 9]。
示例 2:

```
输入: nums = 
[
  [3,4,5],
  [3,2,6],
  [2,2,1]
] 
```

输出: 4 
解释: 最长递增路径是 [3, 4, 5, 6]。注意不允许在对角线方向上移动。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix



思路👇

- dfs+记忆化搜索
- 首先，你在（i，j）的位置，接下来可以走的方向有四个，上下左右，我们需要判断的就是是否合法
- 我们用dx，dy这个来模拟就是上下左右四个操作，也就是表示四个方向可以走
- 我们需要遍历的是每个位子，对于遍历过的位置，我们需要做的就是，把它接下来，也就是**记忆化**的过程
- dfs**难点就是在于如何剪枝**，如何去优化，如何去记住这些位置



我也没有完成写出来，看下别人的思路吧👇

```js
// 0和1、1和0、0和-1、-1和0，四个方向
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
const longestIncreasingPath = (matrix) => {
    if (matrix.length == 0) return 0;
    const m = matrix.length;
    const n = matrix[0].length;
    const dp = new Array(m);
    for (let i = 0; i < m; i++) dp[i] = new Array(n);
    // 每次长度至少长度为1
    let res = 1;

    //// 对坐标(i,j)进行dfs
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            res = Math.max(res, dfs(matrix, i, j, m, n, dp));
        }
    }
    return res;
};

const dfs = (matrix, i, j, m, n, dp) => {
    // 记忆化搜索
    if (dp[i][j]) return dp[i][j];
    let max = 1;

    // 以(i,j)为起点的路径，长度保底是1
    for (let k = 0; k < 4; k++) { //循环四次 就是有上下左右四个方向可以走
        const x = i + dx[k];
        const y = j + dy[k];
        // 判断接下来的坐标是否合法
        //  0<=x && x < m
        //  0 <= y <= n
        if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
            max = Math.max(max, 1 + dfs(matrix, x, y, m, n, dp));
        }
    }
    // 当前情况下, 需要求的就是(i,j)方格的最大值
    return dp[i][j] = max;
};
```



## 进阶题目汇总

以下是我收集的部分题目，希望对你们有帮助。

#### 简单



- [爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)
- [打家劫舍](https://leetcode-cn.com/problems/house-robber/)
- [使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)
- [连续数列](https://leetcode-cn.com/problems/contiguous-sequence-lcci/)
- [三步问题](https://leetcode-cn.com/problems/three-steps-problem-lcci/)



----



#### 中等



- [打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/)
- [最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)
- [打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii/)
- [不同路径](https://leetcode-cn.com/problems/unique-paths/)
- [不同路径 II](https://leetcode-cn.com/problems/unique-paths-ii/)
- [最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)



-----



#### 困难



- [买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)
- [买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)
- [青蛙过河](https://leetcode-cn.com/problems/frog-jump/)
- [单词拆分 II](https://leetcode-cn.com/problems/word-break-ii/)
- [最大子矩阵](https://leetcode-cn.com/problems/max-submatrix-lcci/)





## 参考

- [告别动态规划，连刷 40 道题，我总结了这些套路](https://zhuanlan.zhihu.com/p/91582909)
- [如何理解动态规划？](https://www.zhihu.com/question/39948290)
- [动态规划之背包问题系列](https://zhuanlan.zhihu.com/p/93857890)
- [dd大牛的《背包九讲》](https://zhuanlan.zhihu.com/p/139368825)
- [[力扣] DP问题分类汇总](https://zhuanlan.zhihu.com/p/126546914)




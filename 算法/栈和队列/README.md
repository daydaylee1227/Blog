## 前言

算法中有个专题，动态规划，它十分的重要，大厂面试中或多或少有所涉及，来网易之前，刷了部分dp，这次正好再次梳理一遍，希望对你们有一点点帮助。



如果你已经懂了dp思路，或者已经掌握了常见的dp解法，可以直接跳过。

如果你还不了解，或者知道动态规划，但是还没有开始刷题的话，可能这篇文章适合你。



公众号**前端UpUp**，回复dp，即可获取脑图。



联系👉TianTianUp，遇到问题的话，可以联系作者噢，愿意陪你一起学习一起探讨问题。

脑图👇



![](..\..\images\算法\动态规划.png)





---------





## 什么是动态规划





动态规划（Dynamic Programming），因此常用 DP 指代动态规划。动态规划，首先我们得清楚，它的概念是啥，它能解决什么问题，维基百科对它的解释👇

> 动态规划在寻找有很多重叠子问题的情况的最佳解时有效。它将问题重新组合成子问题，为了避免多次解决这些子问题，它们的结果都逐渐被计算并被储存，从简单的问题直到整个问题都被解决。因此，动态规划储存递归时的结果，因而不会在解决同样的问题时花费时间。
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



![](..\..\images\算法\动态规划解题三大步骤.png)

对于初学者而言，需要短时间就掌握的话，我觉得挺难的，所以这里我推荐大家可以看看**经典的动态规划**👉背包九讲，[点这里](https://zhuanlan.zhihu.com/p/93857890)，看完它，或许对你有点帮助吧。



解题思路，三大步骤👇

1. **状态定义**
2. **列出状态转移方程**
3. **初始化状态**



-----------



**状态定义**

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



**初始化状态**

- 我们会发现，dp数组的第n项结果，是由状态转移方程求解而言的，所以我们需要的是第n-1项，n-2项，或者n-3项的值。
- 这个时候，我们就需要初始话dp数组的值，一般而言，比如`dp[1],dp[2]`,`dp[1][1]`,`dp[1][2]`。



从上面的场景，爬楼梯来说，我们需要初始话哪一项dp数组呢，当我们依次迭代到dp[3] = dp[1] + dp[2]，接下来就不再需要去分解了。

这个时候，我们实际意义而言，就需要我们去初始化，dp[1]和dp[2]数组。







## 动态规划分类



![](..\..\images\算法\动态规划分类.png)



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
- 或者我的理解是，就是在线性空间上的递推。



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

- [打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii/)
- [**时态同步**](https://www.luogu.org/problemnew/show/P1131)
- [**选课**](https://www.luogu.org/problemnew/show/P2014)
- [二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)
- [二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)
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



------------

**状态压缩DP** **计数型DP** **递推型DP** **概率型DP** **博弈型DP**，嗯太多了，只当是抛砖引玉吧。





## 3个例子

接下来，我们就以三题为例子，来强化我们解题思路的三大步骤吧👇





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



---------



**我们按照解题思路走一遍👇**



**第一步：状态定义**

dp[i] 表示的含义:到第i阶方案数



**第二步： 确定状态转移方程**

根据实际的情况，我们很容易想到👇

- 到第i阶梯有两种方式
- 第一种, 从i-1向上走一步即可
- 第二中，从i-2向上走二步即可
- 所以 dp[i] = dp[i-1] + dp[i-2]



**第三步,初始化状态，dp数组**

```
dp[1] = 1,dp[2] = 2
```



按照这个三步走的话，我们就可以写出完整的解题代码

代码👇

![](C:\Users\litiantian03\Desktop\Blog\images\算法\动态规划题目1.png)





[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92/leetcode-%E7%88%AC%E6%A5%BC%E6%A2%AF.js)

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



------------



**我们按照解题思路走一遍👇**



**第一步：状态定义**

```
// 这里就利用二维状态,既然可以选择偷或者是不偷

// dp[i][0] 表示不偷当前第i个房间,获取最高金币数

// dp[i][1] 表示的是偷第i房间,获取最高金币数
```

**第二步： 确定状态转移方程**

```
// 第i个房间偷的话,dp[i][1] = nums[i] + dp[i-1][0]
// 第i个房间不偷的话, dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1])
```

**第三步,初始化状态，dp数组**

```
// dp[0][0] = 0
// dp[0][1] = nums[0]
```

但是这个题目的难点在于👇

第一个房子跟最后一个房子是挨着的，意味着我们需要做些改变，这个我也是在提示下完成的，写法很巧妙，我们具体看下代码下👇



按照这个三步走的话，我们就可以写出完整的解题代码👇



![](..\..\images\算法\动态规划题目2.png)





[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92/leetcode-%E5%81%B7%E6%88%BF%E5%AD%90.js)

------



### [买卖股票的最佳时机 IV⭐⭐⭐](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

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







**第一步：状态定义**

```
 // 可以定义如下
 // dp[i][j][0] 表示第i天交易了j次时卖出后的累计最大利润
 //  dp[i][j][1] 表示第i天交易了j次时买入后的累计最大利润
```

**第二步： 确定状态转移方程**

```
  // 第二步：确定状态转移方程
 // dp[i][j][0] 当第i天不持股的话，我们需要确定昨天是否持有股票
 // dp[i][j][0] = max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i])
 // dp[i][j][1] 同样的第i天,我们需要去确定昨天是否持有股票
 // dp[i][j][1] = max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i])
```

**第三步,初始化状态，dp数组**

```
// 所有不持股的状态值初始化的时候为 0。所有持股的状态值都设置为一个很大的负数（至少应该是最大的股价的负数 - 1），表示未知。
// dp[0][j][0] = 0;
// dp[0][j][1] = -prices[i];
```

但是这个题目的难点在于👇

当k大于len/2的时候，我们需要做一个处理，或者说，我们需要利用状态压缩，好难，我们看看该如何写吧👇



![](..\..\images\算法\动态规划题目3.png)





[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92/leetcode-%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E6%9C%80%E5%A4%A7%E6%97%B6%E6%9C%BA.js)



------





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



---------





## 参考

- [告别动态规划，连刷 40 道题，我总结了这些套路](https://zhuanlan.zhihu.com/p/91582909)
- [如何理解动态规划？](https://www.zhihu.com/question/39948290)
- [动态规划之背包问题系列](https://zhuanlan.zhihu.com/p/93857890)
- [dd大牛的《背包九讲》](https://zhuanlan.zhihu.com/p/139368825)
- [[力扣] DP问题分类汇总](https://zhuanlan.zhihu.com/p/126546914)



## ❤️ 感谢大家

如果你觉得这篇内容对你挺有有帮助的话：

1. 点赞支持下吧，让更多的人也能看到这篇内容（收藏不点赞，都是耍流氓 -_-）
2. 关注公众号**前端UpUp**，联系作者，我们一起学习一起进步。
3. 觉得不错的话，也可以阅读TianTian近期梳理的文章（感谢掘友的鼓励与支持🌹🌹🌹）： 
   - [「一劳永逸」一张脑图带你掌握Git命令](https://juejin.im/post/6869519303864123399)（1340+👍）
   - [「一劳永逸」48张小图带你领略flex布局之美](https://juejin.im/post/6866914148387651592)(800+👍)
   - [「查缺补漏」我的2020前端面试秘籍，为你秋招保驾护航](https://juejin.im/post/6864398060702760968)(490+👍)
   - [「面经」你可能需要的三轮网易面经](https://juejin.im/post/6862855292577644552)(340+👍)
   - [「一劳永逸」由浅入深配置webpack4](https://juejin.im/post/6859888538004783118)(960+👍)
   - [「查缺补漏」巩固你的HTTP知识体系](https://juejin.im/post/6857287743966281736)(1050+👍)
   - [「一劳永逸」送你21道高频JavaScript手写面试题](https://juejin.im/post/6854573215830933512)(666+👍)
   - [「查缺补漏」送你18道浏览器面试题](https://juejin.im/post/6854573215830933512)(820+👍)
   - [「查缺补漏」送你 54 道 JavaScript 面试题](https://juejin.im/post/6854573211443544078)(670+👍)


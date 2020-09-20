## 前言

最近在某面经上，看到关于哈希表相关的问题，对这个算法挺感兴趣，于是就有了这篇文章。

如果你经常听到`哈希算法`，`哈希表`，`哈希冲突`,但又是有点模棱两可的概念，说不定读完本文，对你些许有点帮助。





- 哈希概念介绍
- 哈希函数
- 哈希表
- 如何解决哈希冲突
- 哈希应用
- leetcode哈希表实践







---------





## 基本介绍

可能你听过散列表，散列函数，它们跟哈希表，哈希函数是一个概念，接下来我就以`哈希`这两个关键字来梳理。





### 哈希概念

借用一段话来描述哈希的概念👇

> 散列（hashing）是电脑科学中一种对资料的处理方法，通过某种特定的函数/算法（称为散列函数/算法）将要检索的项与用来检索的索引（称为散列，或者散列值）关联起来，生成一种便于搜索的数据结构（称为散列表）。也译为散列。旧译哈希（误以为是人名而采用了音译）。它也常用作一种资讯安全的实作方法，由一串资料中经过散列算法（Hashing algorithms）计算出来的资料指纹（data fingerprint），经常用来识别档案与资料是否有被窜改，以保证档案与资料确实是由原创者所提供。      ----Wikipedia





### 哈希函数



动态规划（Dynamic Programming），因此常用 DP 指代动态规划。动态规划，首先我们得清楚，它的概念是啥，它能解决什么问题，维基百科对它的解释👇

> 动态规划在寻找有很多重叠子问题的情况的最佳解时有效。它将问题重新组合成子问题，为了避免多次解决这些子问题，它们的结果都逐渐被计算并被储存，从简单的问题直到整个问题都被解决。因此，动态规划储存递归时的结果，因而不会在解决同样的问题时花费时间。
>
> 动态规划只能应用于有最佳子结构的问题。最佳子结构的意思是局部最佳解能决定全域最佳解（对有些问题这个要求并不能完全满足，故有时需要引入一定的近似）。简单地说，问题能够分解成子问题来解决。





### 哈希表

什么是哈希表，大概说的意思就是(Hash table，也叫散列表)



### 如何解决哈希冲突





### 哈希应用







## 3个例子

对哈希表数据结构有了一定的认识后，接下来，通过一定的题量来练习，下午准备了5道leetcode题目关于哈希表的，难度从简单到困难👇



- [两数之和⭐](https://leetcode-cn.com/problems/two-sum/)
- [有效的字母异位词⭐](https://leetcode-cn.com/problems/valid-anagram/)
- [无重复字符的最长子串⭐⭐](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
- [前K个高频单词⭐⭐](https://leetcode-cn.com/problems/top-k-frequent-words/)
- [原子的数量⭐⭐⭐](https://leetcode-cn.com/problems/number-of-atoms/)





----------------



接下来，我们就以三题为例子，来看看哈希表在题目中该这么应用👇



### [ 两数之和⭐](https://leetcode-cn.com/problems/two-sum/)





> 链接：[ 两数之和](https://leetcode-cn.com/problems/two-sum/)



给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

 

示例:

> 给定 nums = [2, 7, 11, 15], target = 9
>
> 因为 nums[0] + nums[1] = 2 + 7 = 9
> 所以返回 [0, 1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

--------



这题最简单做法就是O(n*n)复杂度，在这里，我们有考虑使用Map来降低时间复杂度，题目要求答案返回的是下标，所以我们Map可以做一个映射，将当前的值，与下标index做映射。

<img src="..\..\images\算法\哈希表\哈希表-题目1.png" style="zoom:80%;" />





[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E5%93%88%E5%B8%8C%E8%A1%A8/leetcode-%E4%B8%A4%E6%95%B0%E4%B9%8B%E5%92%8C.js)

------



### [无重复字符的最长子串⭐⭐](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)





> 链接：[无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)



给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

> 输入: "abcabcbb"
> 输出: 3 
> 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。



示例 2:

> 输入: "bbbbb"
> 输出: 1
> 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。



示例 3:

> 输入: "pwwkew"
> 输出: 3
>
> 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
>      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

------------



暴力解法时间复杂度较高，会达到 O(n^2)，那么如何来降低时间复杂度呢👇

- 滑动窗口来降低时间复杂度
- 定义一个map数据结构，维护这么一个结构（key,index），key值就是字符，index表示的就是第几个字符。
- 滑动窗口的话，我们需要维护的就是一个start开始位置，end结束位置。
- end指针不断向后走，当遇到区间[start,end]相同的字符时，我们就需要重新跟新start指针，并且把此时的答案ans更新即可。



代码👇

![](..\..\images\算法\哈希表\哈希表-题目2.png)



-----------





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


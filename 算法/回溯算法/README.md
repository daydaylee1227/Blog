## 前言

这次梳理的是回溯算法，掌握它的解决问题思路，对很多搜索尝试问题，都会在日后学习工作中有所帮助。







如果你还不了解什么是回溯算法，或者知道一些，但是对于它具体是如何实现`回溯`，那么这篇文章可能适合你阅读。



那么围绕以下几个点来展开介绍回溯算法👇

- 来源
- 基本思路
- 算法框架
- 经典例题







联系👉TianTianUp，遇到问题的话，可以联系作者噢，愿意陪你一起学习一起探讨问题。

脑图👇





## 回溯算法的来源

首先，我们得明白啥叫回溯算法，它的由来是什么。

根据维基百科给出的定义👇

回溯算法也叫试探法，它是一种系统地搜索问题的解的方法。

用回溯算法解决问题的一般步骤：



> 1、 针对所给问题，定义问题的解空间，它至少包含问题的一个（最优）解。
>
> 2 、确定易于搜索的解空间结构,使得能用`回溯法`方便地搜索整个解空间 。
>
> 3 、以深度优先的方式搜索解空间，并且在搜索过程中用剪枝函数避免无效搜索。



用更加简单的话术来解释的话👇

回溯法可以理解成为通过选择不同的岔路口，来寻找目的地，一个岔路口一个岔路口的去尝试找到目的地，如果走错了路的话，继续返回到上一个岔路口的另外一条路，直到找到目的地。





-------------





## 基本思路







## 算法框架

其实刷了一定的题量，你会发现，对于这种回溯思路而言，都是有一定的套路的，那么接下来就给出伪代码👇

接下来是自己的一点理解，觉得按照这个步骤来的话，也好理解一些👇

可以按照3个步骤来思考这类的问题：

1. **路径**：
2. **选择列表**：
3. **结束条件**：







```js
result = []

function backtrack(路径, 选择列表) {
    if('满足结束条件') {
        // 这里就是对答案做更新,依据实际题目出发
        result.push(路径)
        return
    } else {
        for(let i = 0; i < 选择列表.length; i++) {
            // 对一个选择列表做相应的选择
            
            做选择
            
            backtrack(路径, 选择列表)
            
            // 既然是回溯算法,那么在一次分岔路做完选择后
            // 需要回退我们之前做的操作
            
            撤销选择
        }
    }
}
```



做过类似的题目都知道，核心的处理就是for循环里面的递归操作，每次在递归之前，**做选择**，在这种方案结束后，我们需要**撤销选择**，这样子的话，就不会影响同一层决策树的其他选择。



举个例子，在走迷宫这类题型中，我们需要不断的去搜索，去试探答案，这个过程就是一个回溯算法的过程，每次要走下一个格子的时候，我们需要先将这个格子**做个标记**，代表这个格子已经走过，然后在往后继续搜索...

当这个方案不合理的时候，我们是不是需要将之前标记的格子清除标记呢？仔细想一想的话，这样子是非常合理的，在当前方案行不通的时候，我们要将这个**步骤撤销掉**。



-----------





## 动态规划解题三大步骤



![](C:/Users/DayDay/Desktop/Blog/images/算法/动态规划解题三大步骤.png)

对于初学者而言，需要短时间就掌握的话，我觉得挺难的，所以这里我推荐大家可以看看**经典的动态规划**👉背包九讲，[点这里](https://zhuanlan.zhihu.com/p/93857890)，看完它，或许对你有点帮助吧。



解题思路，三大步骤👇

1. **状态定义**
2. **列出状态转移方程**
3. **初始化状态**



------



**状态定义**

- 我们需要借助数组来保存之前计算的结果，所以一般采用的就是数组来维护我们的结果，一般dp数组。
- dp数组的含义一定要明确，也就是说，dp[i]表达是啥意思，举个例子，dp[i]表达到达第i个阶梯时的方案数。



------



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



------



**初始化状态**

- 我们会发现，dp数组的第n项结果，是由状态转移方程求解而言的，所以我们需要的是第n-1项，n-2项，或者n-3项的值。
- 这个时候，我们就需要初始话dp数组的值，一般而言，比如`dp[1],dp[2]`,`dp[1][1]`,`dp[1][2]`。



从上面的场景，爬楼梯来说，我们需要初始话哪一项dp数组呢，当我们依次迭代到dp[3] = dp[1] + dp[2]，接下来就不再需要去分解了。

这个时候，我们实际意义而言，就需要我们去初始化，dp[1]和dp[2]数组。







## 动态规划分类



![](C:/Users/DayDay/Desktop/Blog/images/算法/动态规划分类.png)



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



------



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





------



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



------



#### 数位dp



- 数位dp是一种计数用的dp，一般就是要统计一个区间[le,ri]内满足一些条件数的个数。
- 所谓数位dp，字面意思就是在数位上进行dp咯。
- 数位还算是比较好听的名字，数位的含义：一个数有个位、十位、百位、千位......数的每一位就是数位啦！



这里推荐几道题👇

- [数字 1 的个数](https://leetcode-cn.com/problems/number-of-digit-one/)
- [最大为 N 的数字组合](https://leetcode-cn.com/problems/numbers-at-most-n-given-digit-set/)
- [可被 K 整除的最小整数](https://leetcode-cn.com/problems/smallest-integer-divisible-by-k/)





我印象中，这个是模板，自己写很难，但是这是个板子题，哈哈哈，打过Acm都知道，这里就不展开了。



------

**状态压缩DP** **计数型DP** **递推型DP** **概率型DP** **博弈型DP**，嗯太多了，只当是抛砖引玉吧。





## 3个例子

接下来，我们就以三题为例子，来强化我们解题思路的三大步骤吧👇





### [字母大小写全排列⭐](https://leetcode-cn.com/problems/letter-case-permutation/)



> 链接：[字母大小写全排列](https://leetcode-cn.com/problems/letter-case-permutation/)



给定一个字符串S，通过将字符串S中的每个字母转变大小写，我们可以获得一个新的字符串。返回所有可能得到的字符串集合。

 

示例：

> 输入：S = "a1b2"
> 输出：["a1b2", "a1B2", "A1b2", "A1B2"]



> 输入：S = "3z4"
> 输出：["3z4", "3Z4"]



> 输入：S = "12345"
> 输出：["12345"]



提示：

> S 的长度不超过12。
> S 仅由数字和字母组成。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/letter-case-permutation
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



------



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





### [子集🐍⭐⭐](https://leetcode-cn.com/problems/subsets/)



> 链接：[子集](https://leetcode-cn.com/problems/subsets/)



给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。



示例:

> 输入: nums = [1,2,3]
> 输出:
> [
>   [3],
>   [1],
>   [2],
>   [1,2,3],
>   [1,3],
>   [2,3],
>   [1,2],
>   []
> ]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/subsets
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



------



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



![](C:/Users/DayDay/Desktop/Blog/images/算法/动态规划题目2.png)





[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92/leetcode-%E5%81%B7%E6%88%BF%E5%AD%90.js)

------



### [N皇后⭐⭐⭐](https://leetcode-cn.com/problems/n-queens/)



> 链接：[N 皇后](https://leetcode-cn.com/problems/n-queens/)



------

*n* 皇后问题研究的是如何将 *n* 个皇后放置在 *n*×*n* 的棋盘上，并且使皇后彼此之间不能相互攻击。

![](..\..\images\算法\回溯算法\8-queens.png)



上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

 

示例：

> 输入：4
> 输出：[
>  [".Q..",  // 解法 1
>   "...Q",
>   "Q...",
>   "..Q."],
>
>  ["..Q.",  // 解法 2
>   "Q...",
>   "...Q",
>   ".Q.."]
> ]
> 解释: 4 皇后问题存在两个不同的解法。


提示：

> 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
>



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/n-queens
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



-------

这个N皇后问题，跟[八皇后问题](https://baike.baidu.com/item/%E5%85%AB%E7%9A%87%E5%90%8E%E9%97%AE%E9%A2%98)基本上解决的思路是一致的，题目中不过是将`8 * 8 `换成了`N * N`棋盘，对于我们解决这类问题，是触类旁通的。





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



![](C:/Users/DayDay/Desktop/Blog/images/算法/动态规划题目3.png)





[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92/leetcode-%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E6%9C%80%E5%A4%A7%E6%97%B6%E6%9C%BA.js)



------





## 进阶题目汇总

以下是我收集的部分题目，希望对你们有帮助。

#### 

- [字母大小写全排列](https://leetcode-cn.com/problems/letter-case-permutation/)
- [子集](https://leetcode-cn.com/problems/subsets/)
- [全排列](https://leetcode-cn.com/problems/permutations/)
- [组合](https://leetcode-cn.com/problems/combinations/)
- [N 皇后](https://leetcode-cn.com/problems/n-queens/)





------





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


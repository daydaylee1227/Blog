## 前言

最近面网易某部门的时候，其中一道算法题考点就是DFS，深度优先遍历，所以这次准备梳理一遍，练练手，下次再找的话，也比较方便。

一定要会多种解法，面试的时候，我就是写了递归，面试小哥哥问我能不能用**迭代**去完成，所以多种解法都要会。



**文章结尾有进阶题目呢🤭**



这次梳理的BFS DFS常见的题型，以及它的套路是哪些？

BFS-DFS题目将收入GitHub中，思路和代码都有，有兴趣的小伙伴可以来玩👇



[数据结构-BFS-DFS]([https://github.com/daydaylee1227/Blog/tree/master/%E7%AE%97%E6%B3%95/%E6%A0%91](https://github.com/daydaylee1227/Blog/tree/master/算法/树))



## BFS & DFS

建议看下这篇知乎文章，关于概念的介绍 [搜索思想——DFS & BFS（基础基础篇）](https://zhuanlan.zhihu.com/p/24986203)



**BFS：广度优先搜索**

简单的说，**BFS是从根节点开始，沿着树的宽度遍历树的节点，如果发现目标，则演算终止**。



**DFS：深度优先搜索**

简单来说，从根节点出发，然后依次向下继续搜索，直到遇到叶子节点，此时就会向上回溯，继续向为访问过的点继续深度搜索。





## 基本题型

接下来的题型梳理是按照个人刷题顺序的，难易程度，也会做个划分，可以参考一下。

主要做题网站👇

- [剑指offer](https://www.nowcoder.com/ta/coding-interviews)
- [力扣leetcode](https://leetcode-cn.com/problemset/all/)



### 网易原题

题目如下👇

```
const tree = {
	name: 'root',
	children: [
		{
			name: 'c1',
			children: [
				{
						name: 'c11',
					children: []		
					},
					{
						name: 'c12',
					children: []		
				}
			]
		},
		{
			name: 'c2',
			children: [
				{
						name: 'c21',
					children: []		
					},
					{
						name: 'c22',
					children: []		
				}
			]
		}
	]
}

// 深度优先的方式遍历 打印 name
// ['root', 'c1','c11', 'c12', 'c2', 'c21', 'c22']
```

嗯，面试的时候写了一个递归的写法，网易的小哥哥似乎觉得不满意，问下，递归的缺陷，问我能不能优化，嗯，面的时候，没想起来，自己当时被蠢到了，下来给出栈模拟递归写法👇

```js
function solve(root) {
            let stack = [],
                result = [];
            if(!root) return [];
            stack.push(root)
            while(stack.length) {
                let node = stack.pop()
                if(node == null ) continue
                result.push(node.name)
                for(let i = node.children.length-1; i >= 0; i--) {
                    // 这里就是面试的重点,应该从后面的节点压入栈中
                    stack.push(node.children[i])
                }
            }
            return result
        }
```





### [二叉树的最大深度⭐](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

题目描述：给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

> 链接：[力扣-二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

**示例：**

给定二叉树 `[3,9,20,null,null,15,7]`，

```
  	3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/



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



### [二叉树的最小深度⭐](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

> 链接：[[力扣\]二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

**示例:**

给定二叉树 `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最小深度  2

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/



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



### [二叉树的层次遍历⭐⭐](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

给你一个二叉树，请你返回其按 **层序遍历** 得到的节点值。 （即逐层地，从左到右访问所有节点）。

> 链接：[[leetcode\]反转一个链表](https://leetcode-cn.com/problems/reverse-linked-list/)

**示例：**
二叉树：`[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```
[
  [3],
  [9,20],
  [15,7]
]
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-linked-list/



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

这个专题想进阶，就刷我下面提供的题目吧👇

### DFS

- #### [二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

- #### [二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

- #### [朋友圈](https://leetcode-cn.com/problems/friend-circles/)

- #### [找到最终的安全状态](https://leetcode-cn.com/problems/find-eventual-safe-states/)

- #### [矩阵中的最长递增路径](https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/)

- #### [扫雷游戏](https://leetcode-cn.com/problems/minesweeper/)

- #### [单词接龙](https://leetcode-cn.com/problems/word-ladder/)

### BFS

- #### [N叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)

- #### [二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

- #### [最小高度树](https://leetcode-cn.com/problems/minimum-height-trees/)

- #### [扫雷游戏](https://leetcode-cn.com/problems/minesweeper/)
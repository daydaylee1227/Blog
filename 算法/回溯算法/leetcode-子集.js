// https://leetcode-cn.com/problems/subsets/

// 首先我们得把我们思路整理一下👇

// - 这题肯定是求树的所有节点！
// - 对这颗树而言，我们可以遍历它的分支，选择其中一个分支，然后继续向下操作，不选这个分支的话，选择另外一个分支又是另外一个情况，所以每次枚举下一个数字的时候,也就是两种选择：选或不选。
// - 可以考虑使用一个index指针来记录**节点**的状态,即当前递归考察的数字`nums[index]`
// - 递归结束的条件： index === nums.length, 这个时候代表考察完所有的数字，把当前的子集加入题解，结束当前递归分支。
// - 每次结束一个分支，即结束递归，需要撤销当前的选择，（从list中删除），回到选择前的状态，做另外一个选择，即不选择当前的数字，往下递归，继续生成子集。




const subsets = (nums) => {
    const res = []
    const dfs = (index, list) => {
      if (index == nums.length) {         // 递归结束条件
        return res.push(list.slice());   // 加入解集,结束当前的递归
      }
      list.push(nums[index])          // 选择这个元素
      dfs(index + 1, list)           // 往下递归
      list.pop()                    // 递归结束，撤销选择
      dfs(index + 1, list)         // 不选这个元素，往下递归
    }
    dfs(0, [])
    return res
  }
  
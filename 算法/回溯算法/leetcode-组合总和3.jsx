/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
// https://leetcode-cn.com/problems/combination-sum-iii/
// 简单的剪个枝叶

const combinationSum3 = (k, n) => {
    const result = []
    const dfs = (index, sum, list) => {
      if (sum > n) return 
      if (sum === n && list.length === k) {
        result.push([...list])
      }
      for (let i = 1; i <= 9; i++) {
        if (i > index) { // 题目中说清楚,答案中数字只出现一次
          list.push(i)
          dfs(i, sum + i, list)
          list.pop()
        }
      }
    }
    dfs(0, 0, [])
    return result
  }
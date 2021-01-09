
// https://leetcode-cn.com/problems/combination-sum/
// 输入：candidates = [2,3,5], target = 8,
// 所求解集为：
// [
//   [2,2,2,2],
//   [2,3,3],
//   [3,5]
// ]


combinationSum = (candidates, target) => {
    const result = []
    const dfs = (list, sum, index) => {
      // 减去枝叶
      if (sum > target) return 
      if (sum === target) {
        result.push([...list])
        return 
      }
      candidates.forEach((el, i) => {
        if (i >= index) { // index做数组判断
          list.push(el)
          dfs(list, sum + el, i)
          list.pop() 
        }
      })
    }
    dfs([], 0, 0)
    return result
  }
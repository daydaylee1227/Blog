/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
//https://leetcode-cn.com/problems/combination-sum-ii/submissions/

  // 这题需要注意的是超时,如何去剪枝
  // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  // 27
  // 其中一个简单的思路,发现针对leetcode来说,数据比较弱,还是过了
  // 我们可以做一个判断,如果数据totalSum总和 < target 似乎后续的dfs都没有必要了
const combinationSum2 = (candidates, target) => {
    const result = []
    candidates.sort((a, b) => a - b)
    // 对特殊数据剪枝
    let totalSum = 0
    candidates.forEach(el => totalSum += el)
    if (totalSum < target) {
      return []
    }
    const setTemp = new Set()
    const resultSetTemp = new Set()
    const dfs = (list, sum, setTemp, index) => {
      // 减去枝叶
      if (sum > target) return 
      if (sum === target) {
        // 对答案去重
        const str = list.join('')
        if (!resultSetTemp.has(str)) {
          resultSetTemp.add(str)
          result.push([...list])
        }
        return 
      }
      candidates.forEach((el, i) => {
        if (!setTemp.has(i) && i >= index) { // index做数组判断
          setTemp.add(i)
          list.push(el)
          dfs(list, sum + el, setTemp, i)
          list.pop() 
          setTemp.delete(i)
        }
      })
    }
    dfs([], 0, setTemp, 0)
    return result
  }
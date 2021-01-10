/**
 * @param {string} digits
 * @return {string[]}
 */
// https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
// 正常的dfs,理论上没有剪枝操作
// curStr记入当前串 i记入第几个位置
const letterCombinations = (digits) => {
    const result = []
    if(digits.length === 0) return result
    const mapObj = {
      2: "abc",
      3: "def",
      4: "ghi",
      5: "jkl",
      6: "mno",
      7: "pqrs",
      8: "tuv",
      9: "wxyz",
    }
    const dfs = (curStr, i) => {
      if (curStr.length === digits.length) { // 枚举长度等于digits
        result.push(curStr)
        return 
      }
      // 每一次对应一个字符串
      const list = mapObj[digits[i]]
      for (let item of list) {
        dfs(curStr + item, i + 1)
      }
    }
    dfs('', 0)
    return result;
  }
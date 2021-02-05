/**
 * @param {number} n
 * @return {string[]}
 */

// https://leetcode-cn.com/problems/generate-parentheses/
  //  穷举所有情况, 经典回溯
  // 记入这个操作符用了多少次
  // 需要注意的是,如何判断有些括号匹配不合理呢
  // ["((()))","(()())","(())()","(()))(","()(())","()()()","()())(","())(()","())()    // (","()))(("]
  // 

const generateParenthesis = (n) => {
    const result = [], options = ['(', ')']
    const dfs = (option, count1, count2, item) => {
      // 需要判断括号合法
      // 比如每种情况下,右括号大于做括号时肯定不成立
      if (count1 < count2) {
        return 
      }
      if(count1 > n || count2 > n) return 
      if (count1+count2 === 2 * n) { // 以及达到上限
        result.push(item)
      }
      for (let i = 0; i < 2; i++) {
        if (i === 0) {
          dfs(options[i], count1+1,count2, item+options[i])
        } else {
          dfs(options[i], count1, count2+1, item+options[i])
        }
      }
    }
    dfs(options[0], 1, 0, '(')
    return result
  }
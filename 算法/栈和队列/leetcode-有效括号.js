/**
 * @param {string} s
 * @return {boolean}
 */

// https://leetcode-cn.com/problems/valid-parentheses/
// 用栈去维护这个结果
// 对应关系
const isValid = (s) => {
    const stack = []
    const judeObj = {
      '}': '{',
      ')': '(',
      ']': '[',
    }
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
        stack.push(s[i])
      } else {
        if (stack.length === 0) return false
        else {
          if (stack[stack.length - 1] === judeObj[s[i]]) {
            stack.pop()
          } else {
            stack.push(s[i])
          }
        }
      }
    }
    return stack.length === 0
  }
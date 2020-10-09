
//https://leetcode-cn.com/problems/letter-case-permutation/submissions/


// 思路：
// 对于数字而言的话，我们直接跳过，字母的话，无非就是两种状态，大小写字母，那么我们就有接下来的思路👇

// - 遇到数字的话，不会涉及新的分支，我们就直接往后搜，这样子的话，对于数字就只需要搜索一次。
// - 对于单个字母而言，我们需要**搜索2次**，小写字母搜索一次，大写字母搜索一次。
// - 我们可以去维护一个index，遇到数字的话，index+1，继续递归，遇到字母的话，需要递归两次，假设当字母是小写时，我们递归一次(index+1),然后回溯时将字母转为大写，又去递归一次。
// - 递归尽头：即搜索完整个字符串为止，我们前面维护的index，这个时候就可以作为条件判断。


const letterCasePermutation = S => {
    const ans = []
    const backtrack = (str, i) => {
      if (i ===  S.length) {
         return ans.push(str)
      }
  
      const curr = S[i]
      if ((curr >= 'A' && curr <= 'Z') || (curr >= 'a' && curr <= 'z')) {  // 大小写字母搜索两次
          const   low = str + curr.toLowerCase(),
                  high = str + curr.toUpperCase()
          backtrack(low, i + 1)
          backtrack(high, i + 1)
      } else {  // 数字的话,直接继续递归
        backtrack(str + curr, i + 1)
      }
    }
    backtrack("", 0)
    return ans
  }
  
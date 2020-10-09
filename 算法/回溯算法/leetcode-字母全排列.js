
//https://leetcode-cn.com/problems/letter-case-permutation/submissions/

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
  
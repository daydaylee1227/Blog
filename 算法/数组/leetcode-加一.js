/**
 * @param {number[]} digits
 * @return {number[]}
 */

// 从后往前相加
// 需要注意的是,特殊的数据需要处理 比如9999
const plusOne = (digits) => {
    let len = digits.length, sum = 1
    for (let i = len - 1; i >= 0; i--) {
      const value = digits[i] + sum
      digits[i] = value % 10
      if (value >= 10) {
        sum = 1
      } else {
        sum = 0
      }
    }
    if (sum) {
      // 需要增加一个选项
      digits.splice(0, 0, 1)
    }
    return digits
  }
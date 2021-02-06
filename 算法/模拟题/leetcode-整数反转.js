/**
 * @param {number} x
 * @return {number}
 */
// https://leetcode-cn.com/problems/reverse-integer/
// 判断数字合理
// 去掉末尾的0
// 字符串的反转 split变成数组，然后reverse反转最后join
// 截取字符串多少为 substring(i,j)

const reverse = (x) => {
    const minNumber = Math.pow(-2, 31),
      maxNumber = Math.pow(2, 31) - 1 
    if (x === 0) return 0
    let flag = x < 0 ? - 1 : 1
      if (flag === -1) {
        x = x * -1
      }
      let str = String(x)
      let len = str.length - 1
      while (len >= 0 && str[len] === '0') {
        len--
      }
      str = str.substring(0, len + 1)
      console.log(str)
    x = str.split('').reverse().join('') * flag
    if (x <= maxNumber && x >= minNumber) {
      return x
    } else {
      return 0
    }
  }
